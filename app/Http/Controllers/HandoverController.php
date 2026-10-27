<?php

namespace App\Http\Controllers;

use App\Models\Handover;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HandoverController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('handovers/index', [
            'items' => Handover::with(['user', 'penerima'])->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('handovers/form', [
            'item' => null,
            'users' => User::where('id', '!=', auth()->id())->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'penerima_id' => 'required|exists:users,id|different:user_id',
            'jabatan' => 'required|string|max:200',
            'tanggal_serah_terima' => 'required|date',
            'alasan' => 'required|string|max:2000',
            'daftar_serah_terima' => 'required|string|max:5000',
        ]);

        $data['user_id'] = auth()->id();
        $data['status'] = Handover::STATUS_MENUNGGU;

        Handover::create($data);

        return to_route('handovers.index')->with('success', 'Penyerahan jabatan berhasil dibuat.');
    }

    public function show(Handover $handover): Response
    {
        return Inertia::render('handovers/show', [
            'item' => $handover->load(['user', 'penerima']),
        ]);
    }

    public function edit(Handover $handover): Response
    {
        $this->owned($handover);
        abort_unless($handover->status === Handover::STATUS_MENUNGGU, 403);

        return Inertia::render('handovers/form', [
            'item' => $handover,
            'users' => User::where('id', '!=', auth()->id())->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Handover $handover): RedirectResponse
    {
        $this->owned($handover);
        abort_unless($handover->status === Handover::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'penerima_id' => 'required|exists:users,id',
            'jabatan' => 'required|string|max:200',
            'tanggal_serah_terima' => 'required|date',
            'alasan' => 'required|string|max:2000',
            'daftar_serah_terima' => 'required|string|max:5000',
        ]);

        $handover->update($data);

        return to_route('handovers.index')->with('success', 'Penyerahan jabatan berhasil diubah.');
    }

    public function destroy(Handover $handover): RedirectResponse
    {
        $this->owned($handover);
        abort_unless($handover->status === Handover::STATUS_MENUNGGU, 403);

        $handover->delete();

        return to_route('handovers.index')->with('success', 'Penyerahan jabatan berhasil dihapus.');
    }

    public function terima(Handover $handover): RedirectResponse
    {
        abort_unless($handover->penerima_id === auth()->id(), 404);
        abort_unless($handover->status === Handover::STATUS_MENUNGGU, 403);

        $handover->update(['status' => Handover::STATUS_DISETUJUI]);

        return back()->with('success', 'Penyerahan jabatan diterima.');
    }

    public function tolak(Request $request, Handover $handover): RedirectResponse
    {
        abort_unless($handover->penerima_id === auth()->id(), 404);
        abort_unless($handover->status === Handover::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'reject_statement' => 'required|string|max:2000',
        ]);

        $handover->update([
            'status' => Handover::STATUS_DITOLAK,
            'reject_statement' => $data['reject_statement'],
        ]);

        return back()->with('success', 'Penyerahan jabatan ditolak.');
    }

    private function owned(Handover $item): void
    {
        abort_unless($item->user_id === auth()->id(), 404);
    }
}
