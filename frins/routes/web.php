<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FimpRequestController;
use App\Http\Controllers\HandoverController;
use App\Http\Controllers\KpiEvaluationController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\OvertimeRequestController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('data-pribadi', [ProfileController::class, 'show'])->name('profiles.show');
    Route::get('data-pribadi/edit', [ProfileController::class, 'edit'])->name('profiles.edit');
    Route::put('data-pribadi', [ProfileController::class, 'update'])->name('profiles.update');

    Route::resource('leave-requests', LeaveRequestController::class);
    Route::post('leave-requests/{leave_request}/approve', [LeaveRequestController::class, 'approve'])->name('leave-requests.approve');
    Route::post('leave-requests/{leave_request}/reject', [LeaveRequestController::class, 'reject'])->name('leave-requests.reject');

    Route::resource('fimp-requests', FimpRequestController::class);
    Route::post('fimp-requests/{fimp_request}/confirm', [FimpRequestController::class, 'confirm'])->name('fimp-requests.confirm');
    Route::post('fimp-requests/{fimp_request}/reject', [FimpRequestController::class, 'reject'])->name('fimp-requests.reject');

    Route::resource('overtime-requests', OvertimeRequestController::class);
    Route::post('overtime-requests/{overtime_request}/approve', [OvertimeRequestController::class, 'approve'])->name('overtime-requests.approve');
    Route::post('overtime-requests/{overtime_request}/reject', [OvertimeRequestController::class, 'reject'])->name('overtime-requests.reject');

    Route::resource('handovers', HandoverController::class);
    Route::post('handovers/{handover}/terima', [HandoverController::class, 'terima'])->name('handovers.terima');
    Route::post('handovers/{handover}/tolak', [HandoverController::class, 'tolak'])->name('handovers.tolak');

    Route::resource('kpi-evaluations', KpiEvaluationController::class);

    Route::resource('payrolls', PayrollController::class);
    Route::post('payrolls/{payroll}/publish', [PayrollController::class, 'publish'])->name('payrolls.publish');

    Route::resource('announcements', AnnouncementController::class);
});

require __DIR__.'/settings.php';
