<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\FimpRequest;
use App\Models\Handover;
use App\Models\LeaveRequest;
use App\Models\OvertimeRequest;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'leavePending' => LeaveRequest::where('status', LeaveRequest::STATUS_MENUNGGU)->count(),
                'overtimePending' => OvertimeRequest::where('status', OvertimeRequest::STATUS_MENUNGGU)->count(),
                'fimpPending' => FimpRequest::where('status', FimpRequest::STATUS_MENUNGGU)->count(),
                'handoverPending' => Handover::where('status', Handover::STATUS_MENUNGGU)->count(),
            ],
            'activeAnnouncements' => Announcement::active()->with('user')->latest()->take(5)->get(),
            'recentLeave' => LeaveRequest::with(['user', 'category'])->latest()->take(5)->get(),
            'recentOvertime' => OvertimeRequest::with('user')->latest()->take(5)->get(),
            'recentHandovers' => Handover::with(['user', 'penerima'])->latest()->take(5)->get(),
        ]);
    }
}
