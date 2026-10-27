<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PayrollController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('payrolls/index', [
            'items' => Payroll::with('user')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('payrolls/form', [
            'item' => null,
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'periode' => 'required|string|max:50',
            'gaji_pokok' => 'required|integer|min:0',
            'tunjangan' => 'required|integer|min:0',
            'potongan' => 'required|integer|min:0',
        ]);

        $data['status'] = Payroll::STATUS_DRAFT;

        Payroll::create($data);

        return to_route('payrolls.index')->with('success', 'Slip gaji berhasil dibuat.');
    }

    public function show(Payroll $payroll): Response
    {
        return Inertia::render('payrolls/show', [
            'item' => $payroll->load('user'),
        ]);
    }

    public function edit(Payroll $payroll): Response
    {
        return Inertia::render('payrolls/form', [
            'item' => $payroll,
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Payroll $payroll): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'periode' => 'required|string|max:50',
            'gaji_pokok' => 'required|integer|min:0',
            'tunjangan' => 'required|integer|min:0',
            'potongan' => 'required|integer|min:0',
        ]);

        $payroll->update($data);

        return to_route('payrolls.index')->with('success', 'Slip gaji berhasil diubah.');
    }

    public function destroy(Payroll $payroll): RedirectResponse
    {
        $payroll->delete();

        return to_route('payrolls.index')->with('success', 'Slip gaji berhasil dihapus.');
    }

    public function publish(Payroll $payroll): RedirectResponse
    {
        $payroll->update(['status' => Payroll::STATUS_TERBIT]);

        return back()->with('success', 'Slip gaji diterbitkan.');
    }
}
