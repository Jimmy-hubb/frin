<?php

use App\Models\FimpRequest;
use App\Models\Handover;
use App\Models\LeaveCategory;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\User;

test('company module pages render for authenticated users', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    foreach (['/dashboard', '/data-pribadi', '/leave-requests', '/fimp-requests', '/overtime-requests', '/handovers', '/kpi-evaluations', '/payrolls', '/announcements'] as $url) {
        $this->get($url)->assertOk();
    }
});

test('guests are redirected from company module pages', function () {
    $this->get('/leave-requests')->assertRedirect('/login');
    $this->get('/dashboard')->assertRedirect('/login');
});

test('profile can be saved for the authenticated user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->put('/data-pribadi', [
        'nik' => '1234567890',
        'jabatan' => 'Staff',
        'departemen' => 'IT',
    ])->assertRedirect('/data-pribadi');

    $this->assertDatabaseHas('profiles', [
        'user_id' => $user->id,
        'nik' => '1234567890',
        'jabatan' => 'Staff',
    ]);
});

test('leave request counts days inclusively and can be approved by another user', function () {
    $owner = User::factory()->create();
    $approver = User::factory()->create();
    $category = LeaveCategory::first();

    $this->actingAs($owner)->post('/leave-requests', [
        'leave_category_id' => $category->id,
        'tanggal_awal' => '2026-11-02',
        'tanggal_akhir' => '2026-11-04',
        'keterangan' => 'Liburan',
    ])->assertRedirect('/leave-requests');

    $leave = LeaveRequest::first();
    expect($leave->jumlah_hari)->toBe(3)
        ->and($leave->status)->toBe(LeaveRequest::STATUS_MENUNGGU);

    $this->actingAs($owner)->post("/leave-requests/{$leave->id}/approve")->assertForbidden();

    $this->actingAs($approver)->post("/leave-requests/{$leave->id}/approve");

    expect($leave->fresh()->status)->toBe(LeaveRequest::STATUS_DISETUJUI);
});

test('leave request can only be edited while pending by its owner', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $category = LeaveCategory::first();

    $leave = LeaveRequest::create([
        'user_id' => $owner->id,
        'leave_category_id' => $category->id,
        'tanggal_awal' => '2026-11-02',
        'tanggal_akhir' => '2026-11-03',
        'jumlah_hari' => 2,
        'status' => LeaveRequest::STATUS_DISETUJUI,
    ]);

    $this->actingAs($owner)->get("/leave-requests/{$leave->id}/edit")->assertForbidden();
    $this->actingAs($other)->get("/leave-requests/{$leave->id}/edit")->assertNotFound();
});

test('handover can be accepted by its recipient', function () {
    $giver = User::factory()->create();
    $recipient = User::factory()->create();

    $this->actingAs($giver)->post('/handovers', [
        'penerima_id' => $recipient->id,
        'jabatan' => 'Kepala Bagian',
        'tanggal_serah_terima' => '2026-11-10',
        'alasan' => 'Rotasi',
        'daftar_serah_terima' => "Dokumen A\nAset B",
    ])->assertRedirect('/handovers');

    $handover = Handover::first();

    $this->actingAs($recipient)->post("/handovers/{$handover->id}/terima");

    expect($handover->fresh()->status)->toBe(Handover::STATUS_DISETUJUI);
});

test('fimp substitute can confirm or reject', function () {
    $owner = User::factory()->create();
    $substitute = User::factory()->create();

    $fimp = FimpRequest::create([
        'user_id' => $owner->id,
        'pengganti_id' => $substitute->id,
        'tanggal_awal' => '2026-11-02',
        'tanggal_akhir' => '2026-11-03',
        'total_hari' => 2,
        'keperluan' => 'Dinas luar',
        'status' => FimpRequest::STATUS_MENUNGGU,
    ]);

    $this->actingAs($owner)->post("/fimp-requests/{$fimp->id}/confirm")->assertNotFound();

    $this->actingAs($substitute)->post("/fimp-requests/{$fimp->id}/confirm");

    $fimp->refresh();
    expect($fimp->status)->toBe(FimpRequest::STATUS_DISETUJUI)
        ->and($fimp->pengganti_bersedia)->toBeTrue();
});

test('overtime request can be approved by another user', function () {
    $owner = User::factory()->create();
    $approver = User::factory()->create();

    $overtime = OvertimeRequest::create([
        'user_id' => $owner->id,
        'tanggal' => '2026-11-05',
        'jam_mulai' => '18:00',
        'jam_selesai' => '21:00',
        'keperluan' => 'Laporan akhir bulan',
        'status' => OvertimeRequest::STATUS_MENUNGGU,
    ]);

    $this->actingAs($approver)->post("/overtime-requests/{$overtime->id}/approve");

    expect($overtime->fresh()->status)->toBe(OvertimeRequest::STATUS_DISETUJUI);
});
