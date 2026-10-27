<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('announcements/index', [
            'items' => Announcement::with('user')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('announcements/form', [
            'item' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string|max:10000',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after_or_equal:published_at',
            'is_published' => 'boolean',
        ]);

        $data['user_id'] = auth()->id();

        Announcement::create($data);

        return to_route('announcements.index')->with('success', 'Pengumuman berhasil dibuat.');
    }

    public function show(Announcement $announcement): Response
    {
        return Inertia::render('announcements/show', [
            'item' => $announcement->load('user'),
        ]);
    }

    public function edit(Announcement $announcement): Response
    {
        abort_unless($announcement->user_id === auth()->id(), 404);

        return Inertia::render('announcements/form', [
            'item' => $announcement,
        ]);
    }

    public function update(Request $request, Announcement $announcement): RedirectResponse
    {
        abort_unless($announcement->user_id === auth()->id(), 404);

        $data = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string|max:10000',
            'published_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after_or_equal:published_at',
            'is_published' => 'boolean',
        ]);

        $announcement->update($data);

        return to_route('announcements.index')->with('success', 'Pengumuman berhasil diubah.');
    }

    public function destroy(Announcement $announcement): RedirectResponse
    {
        abort_unless($announcement->user_id === auth()->id(), 404);

        $announcement->delete();

        return to_route('announcements.index')->with('success', 'Pengumuman berhasil dihapus.');
    }
}
