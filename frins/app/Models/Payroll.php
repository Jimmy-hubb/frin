<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payroll extends Model
{
    public const STATUS_DRAFT = 0;

    public const STATUS_TERBIT = 1;

    protected $fillable = [
        'user_id',
        'periode',
        'gaji_pokok',
        'tunjangan',
        'potongan',
        'status',
    ];

    protected $appends = ['total_gaji', 'status_label'];

    protected function casts(): array
    {
        return [
            'status' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalGajiAttribute(): int
    {
        return $this->gaji_pokok + $this->tunjangan - $this->potongan;
    }

    public function getStatusLabelAttribute(): string
    {
        return $this->status === self::STATUS_TERBIT ? 'Terbit' : 'Draft';
    }
}
