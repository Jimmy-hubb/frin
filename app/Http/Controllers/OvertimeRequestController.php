<?php

namespace App\Http\Controllers;

use App\Models\OvertimeRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OvertimeRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('overtime-requests/index', [
            'requests' => OvertimeRequest::with('user')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('overtime-requests/form', [
            'item' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'tanggal' => 'required|date',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required|after:jam_mulai',
            'keperluan' => 'required|string|max:2000',
        ]);

        $data['user_id'] = auth()->id();
        $data['status'] = OvertimeRequest::STATUS_MENUNGGU;

        OvertimeRequest::create($data);

        return to_route('overtime-requests.index')->with('success', 'Permintaan lembur berhasil dibuat.');
    }

    public function show(OvertimeRequest $overtimeRequest): Response
    {
        return Inertia::render('overtime-requests/show', [
            'item' => $overtimeRequest->load('user'),
        ]);
    }

    public function edit(OvertimeRequest $overtimeRequest): Response
    {
        $this->owned($overtimeRequest);
        abort_unless($overtimeRequest->status === OvertimeRequest::STATUS_MENUNGGU, 403);

        return Inertia::render('overtime-requests/form', [
            'item' => $overtimeRequest,
        ]);
    }

    public function update(Request $request, OvertimeRequest $overtimeRequest): RedirectResponse
    {
        $this->owned($overtimeRequest);
        abort_unless($overtimeRequest->status === OvertimeRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'tanggal' => 'required|date',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required|after:jam_mulai',
            'keperluan' => 'required|string|max:2000',
        ]);

        $overtimeRequest->update($data);

        return to_route('overtime-requests.index')->with('success', 'Permintaan lembur berhasil diubah.');
    }

    public function destroy(OvertimeRequest $overtimeRequest): RedirectResponse
    {
        $this->owned($overtimeRequest);
        abort_unless($overtimeRequest->status === OvertimeRequest::STATUS_MENUNGGU, 403);

        $overtimeRequest->delete();

        return to_route('overtime-requests.index')->with('success', 'Permintaan lembur berhasil dihapus.');
    }

    public function approve(OvertimeRequest $overtimeRequest): RedirectResponse
    {
        abort_unless($overtimeRequest->user_id !== auth()->id(), 403, 'Tidak dapat menyetujui permintaan sendiri.');
        abort_unless($overtimeRequest->status === OvertimeRequest::STATUS_MENUNGGU, 403);

        $overtimeRequest->update(['status' => OvertimeRequest::STATUS_DISETUJUI]);

        return back()->with('success', 'Permintaan lembur disetujui.');
    }

    public function reject(Request $request, OvertimeRequest $overtimeRequest): RedirectResponse
    {
        abort_unless($overtimeRequest->user_id !== auth()->id(), 403, 'Tidak dapat menolak permintaan sendiri.');
        abort_unless($overtimeRequest->status === OvertimeRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'catatan_approval' => 'required|string|max:2000',
        ]);

        $overtimeRequest->update([
            'status' => OvertimeRequest::STATUS_DITOLAK,
            'catatan_approval' => $data['catatan_approval'],
        ]);

        return back()->with('success', 'Permintaan lembur ditolak.');
    }

    private function owned(OvertimeRequest $item): void
    {
        abort_unless($item->user_id === auth()->id(), 404);
    }
}
