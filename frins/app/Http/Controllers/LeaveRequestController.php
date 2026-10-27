<?php

namespace App\Http\Controllers;

use App\Models\LeaveCategory;
use App\Models\LeaveRequest;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('leave-requests/index', [
            'requests' => LeaveRequest::with(['user', 'category'])->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('leave-requests/form', [
            'item' => null,
            'categories' => LeaveCategory::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'leave_category_id' => 'required|exists:leave_categories,id',
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'keterangan' => 'nullable|string|max:2000',
        ]);

        $data['jumlah_hari'] = Carbon::parse($data['tanggal_awal'])->diffInDays(Carbon::parse($data['tanggal_akhir'])) + 1;
        $data['user_id'] = auth()->id();
        $data['status'] = LeaveRequest::STATUS_MENUNGGU;

        LeaveRequest::create($data);

        return to_route('leave-requests.index')->with('success', 'Pengajuan cuti berhasil dibuat.');
    }

    public function show(LeaveRequest $leaveRequest): Response
    {
        return Inertia::render('leave-requests/show', [
            'item' => $leaveRequest->load(['user', 'category']),
        ]);
    }

    public function edit(LeaveRequest $leaveRequest): Response
    {
        $this->owned($leaveRequest);
        abort_unless($leaveRequest->status === LeaveRequest::STATUS_MENUNGGU, 403);

        return Inertia::render('leave-requests/form', [
            'item' => $leaveRequest,
            'categories' => LeaveCategory::orderBy('nama')->get(),
        ]);
    }

    public function update(Request $request, LeaveRequest $leaveRequest): RedirectResponse
    {
        $this->owned($leaveRequest);
        abort_unless($leaveRequest->status === LeaveRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'leave_category_id' => 'required|exists:leave_categories,id',
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'keterangan' => 'nullable|string|max:2000',
        ]);

        $data['jumlah_hari'] = Carbon::parse($data['tanggal_awal'])->diffInDays(Carbon::parse($data['tanggal_akhir'])) + 1;

        $leaveRequest->update($data);

        return to_route('leave-requests.index')->with('success', 'Pengajuan cuti berhasil diubah.');
    }

    public function destroy(LeaveRequest $leaveRequest): RedirectResponse
    {
        $this->owned($leaveRequest);
        abort_unless($leaveRequest->status === LeaveRequest::STATUS_MENUNGGU, 403);

        $leaveRequest->delete();

        return to_route('leave-requests.index')->with('success', 'Pengajuan cuti berhasil dihapus.');
    }

    public function approve(LeaveRequest $leaveRequest): RedirectResponse
    {
        abort_unless($leaveRequest->user_id !== auth()->id(), 403, 'Tidak dapat menyetujui pengajuan sendiri.');
        abort_unless($leaveRequest->status === LeaveRequest::STATUS_MENUNGGU, 403);

        $leaveRequest->update(['status' => LeaveRequest::STATUS_DISETUJUI]);

        return back()->with('success', 'Pengajuan cuti disetujui.');
    }

    public function reject(Request $request, LeaveRequest $leaveRequest): RedirectResponse
    {
        abort_unless($leaveRequest->user_id !== auth()->id(), 403, 'Tidak dapat menolak pengajuan sendiri.');
        abort_unless($leaveRequest->status === LeaveRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'reject_statement' => 'required|string|max:2000',
        ]);

        $leaveRequest->update([
            'status' => LeaveRequest::STATUS_DITOLAK,
            'reject_statement' => $data['reject_statement'],
        ]);

        return back()->with('success', 'Pengajuan cuti ditolak.');
    }

    private function owned(LeaveRequest $item): void
    {
        abort_unless($item->user_id === auth()->id(), 404);
    }
}
