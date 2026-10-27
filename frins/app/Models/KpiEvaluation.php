<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KpiEvaluation extends Model
{
    protected $fillable = [
        'user_id',
        'periode',
        'kedisiplinan_score',
        'kedisiplinan_max',
        'mengajar_score',
        'mengajar_max',
        'daily_report_score',
        'daily_report_max',
        'teamwork_score',
        'teamwork_max',
    ];

    protected $appends = ['total_score', 'total_max', 'percentage'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalScoreAttribute(): int
    {
        return $this->kedisiplinan_score + $this->mengajar_score + $this->daily_report_score + $this->teamwork_score;
    }

    public function getTotalMaxAttribute(): int
    {
        return $this->kedisiplinan_max + $this->mengajar_max + $this->daily_report_max + $this->teamwork_max;
    }

    public function getPercentageAttribute(): float
    {
        if ($this->total_max === 0) {
            return 0;
        }

        return round(($this->total_score / $this->total_max) * 100, 1);
    }
}
