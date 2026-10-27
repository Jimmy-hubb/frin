<?php

namespace App\Http\Controllers;

use App\Models\KpiEvaluation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KpiEvaluationController extends Controller
{
    public function index(): Response
    {
        $evaluations = KpiEvaluation::with('user')->latest()->get();

        return Inertia::render('kpi-evaluations/index', [
            'items' => $evaluations,
            'averagePercentage' => $evaluations->avg('percentage') ? round($evaluations->avg('percentage'), 1) : 0,
            'totalEvaluations' => $evaluations->count(),
            'bestPercentage' => $evaluations->max('percentage') ?? 0,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('kpi-evaluations/form', [
            'item' => null,
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'periode' => 'required|string|max:50',
            'kedisiplinan_score' => 'required|integer|min:0|lte:kedisiplinan_max',
            'kedisiplinan_max' => 'required|integer|min:1',
            'mengajar_score' => 'required|integer|min:0|lte:mengajar_max',
            'mengajar_max' => 'required|integer|min:1',
            'daily_report_score' => 'required|integer|min:0|lte:daily_report_max',
            'daily_report_max' => 'required|integer|min:1',
            'teamwork_score' => 'required|integer|min:0|lte:teamwork_max',
            'teamwork_max' => 'required|integer|min:1',
        ]);

        KpiEvaluation::create($data);

        return to_route('kpi-evaluations.index')->with('success', 'Evaluasi KPI berhasil dibuat.');
    }

    public function show(KpiEvaluation $kpiEvaluation): Response
    {
        $item = $kpiEvaluation->load('user');

        return Inertia::render('kpi-evaluations/show', [
            'item' => $item,
            'aspects' => [
                ['label' => 'Kedisiplinan', 'score' => $item->kedisiplinan_score, 'max' => $item->kedisiplinan_max],
                ['label' => 'Mengajar', 'score' => $item->mengajar_score, 'max' => $item->mengajar_max],
                ['label' => 'Daily Report', 'score' => $item->daily_report_score, 'max' => $item->daily_report_max],
                ['label' => 'Teamwork', 'score' => $item->teamwork_score, 'max' => $item->teamwork_max],
            ],
        ]);
    }

    public function edit(KpiEvaluation $kpiEvaluation): Response
    {
        return Inertia::render('kpi-evaluations/form', [
            'item' => $kpiEvaluation,
            'users' => User::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, KpiEvaluation $kpiEvaluation): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'periode' => 'required|string|max:50',
            'kedisiplinan_score' => 'required|integer|min:0|lte:kedisiplinan_max',
            'kedisiplinan_max' => 'required|integer|min:1',
            'mengajar_score' => 'required|integer|min:0|lte:mengajar_max',
            'mengajar_max' => 'required|integer|min:1',
            'daily_report_score' => 'required|integer|min:0|lte:daily_report_max',
            'daily_report_max' => 'required|integer|min:1',
            'teamwork_score' => 'required|integer|min:0|lte:teamwork_max',
            'teamwork_max' => 'required|integer|min:1',
        ]);

        $kpiEvaluation->update($data);

        return to_route('kpi-evaluations.index')->with('success', 'Evaluasi KPI berhasil diubah.');
    }

    public function destroy(KpiEvaluation $kpiEvaluation): RedirectResponse
    {
        $kpiEvaluation->delete();

        return to_route('kpi-evaluations.index')->with('success', 'Evaluasi KPI berhasil dihapus.');
    }
}
