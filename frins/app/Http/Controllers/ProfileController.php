<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function show(): Response
    {
        $profile = auth()->user()->profile;

        return Inertia::render('profiles/show', [
            'profile' => $profile,
            'user' => auth()->user(),
        ]);
    }

    public function edit(): Response
    {
        return Inertia::render('profiles/form', [
            'profile' => auth()->user()->profile,
            'user' => auth()->user(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'nik' => 'nullable|string|max:50',
            'jenis_kelamin' => 'nullable|string|max:20',
            'tempat_lahir' => 'nullable|string|max:100',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:2000',
            'kota' => 'nullable|string|max:100',
            'provinsi' => 'nullable|string|max:100',
            'telepon' => 'nullable|string|max:50',
            'telepon_alternatif' => 'nullable|string|max:50',
            'pendidikan_terakhir' => 'nullable|string|max:100',
            'jabatan' => 'nullable|string|max:100',
            'departemen' => 'nullable|string|max:100',
            'tanggal_masuk' => 'nullable|date',
        ]);

        auth()->user()->profile()->updateOrCreate(
            ['user_id' => auth()->id()],
            $data
        );

        return to_route('profiles.show')->with('success', 'Data pribadi berhasil disimpan.');
    }
}
