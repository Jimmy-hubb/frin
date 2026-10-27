<?php

namespace App\Http\Controllers;

use App\Models\FimpRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FimpRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('fimp-requests/index', [
            'requests' => FimpRequest::with(['user', 'pengganti'])->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('fimp-requests/form', [
            'item' => null,
            'users' => User::where('id', '!=', auth()->id())->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'pengganti_id' => 'required|exists:users,id|different:user_id',
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'keperluan' => 'required|string|max:2000',
        ]);

        $data['total_hari'] = Carbon::parse($data['tanggal_awal'])->diffInDays(Carbon::parse($data['tanggal_akhir'])) + 1;
        $data['user_id'] = auth()->id();
        $data['status'] = FimpRequest::STATUS_MENUNGGU;

        FimpRequest::create($data);

        return to_route('fimp-requests.index')->with('success', 'Pengajuan FIMP berhasil dibuat.');
    }

    public function show(FimpRequest $fimpRequest): Response
    {
        return Inertia::render('fimp-requests/show', [
            'item' => $fimpRequest->load(['user', 'pengganti']),
        ]);
    }

    public function edit(FimpRequest $fimpRequest): Response
    {
        $this->owned($fimpRequest);
        abort_unless($fimpRequest->status === FimpRequest::STATUS_MENUNGGU, 403);

        return Inertia::render('fimp-requests/form', [
            'item' => $fimpRequest,
            'users' => User::where('id', '!=', auth()->id())->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, FimpRequest $fimpRequest): RedirectResponse
    {
        $this->owned($fimpRequest);
        abort_unless($fimpRequest->status === FimpRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'pengganti_id' => 'required|exists:users,id',
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'keperluan' => 'required|string|max:2000',
        ]);

        $data['total_hari'] = Carbon::parse($data['tanggal_awal'])->diffInDays(Carbon::parse($data['tanggal_akhir'])) + 1;

        $fimpRequest->update($data);

        return to_route('fimp-requests.index')->with('success', 'Pengajuan FIMP berhasil diubah.');
    }

    public function destroy(FimpRequest $fimpRequest): RedirectResponse
    {
        $this->owned($fimpRequest);
        abort_unless($fimpRequest->status === FimpRequest::STATUS_MENUNGGU, 403);

        $fimpRequest->delete();

        return to_route('fimp-requests.index')->with('success', 'Pengajuan FIMP berhasil dihapus.');
    }

    public function confirm(FimpRequest $fimpRequest): RedirectResponse
    {
        abort_unless($fimpRequest->pengganti_id === auth()->id(), 404);
        abort_unless($fimpRequest->status === FimpRequest::STATUS_MENUNGGU, 403);

        $fimpRequest->update([
            'pengganti_mengetahui' => true,
            'pengganti_bersedia' => true,
            'status' => FimpRequest::STATUS_DISETUJUI,
        ]);

        return back()->with('success', 'FIMP dikonfirmasi: pengganti mengetahui dan bersedia.');
    }

    public function reject(Request $request, FimpRequest $fimpRequest): RedirectResponse
    {
        abort_unless($fimpRequest->pengganti_id === auth()->id(), 404);
        abort_unless($fimpRequest->status === FimpRequest::STATUS_MENUNGGU, 403);

        $data = $request->validate([
            'reject_statement' => 'required|string|max:2000',
        ]);

        $fimpRequest->update([
            'status' => FimpRequest::STATUS_DITOLAK,
            'reject_statement' => $data['reject_statement'],
        ]);

        return back()->with('success', 'FIMP ditolak.');
    }

    private function owned(FimpRequest $item): void
    {
        abort_unless($item->user_id === auth()->id(), 404);
    }
}
