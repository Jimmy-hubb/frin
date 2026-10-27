<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FimpRequest extends Model
{
    public const STATUS_MENUNGGU = 0;

    public const STATUS_DISETUJUI = 1;

    public const STATUS_DITOLAK = 2;

    protected $fillable = [
        'user_id',
        'pengganti_id',
        'tanggal_awal',
        'tanggal_akhir',
        'total_hari',
        'keperluan',
        'pengganti_mengetahui',
        'pengganti_bersedia',
        'status',
        'reject_statement',
    ];

    protected $appends = ['status_label'];

    protected function casts(): array
    {
        return [
            'tanggal_awal' => 'date',
            'tanggal_akhir' => 'date',
            'pengganti_mengetahui' => 'boolean',
            'pengganti_bersedia' => 'boolean',
            'status' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pengganti(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pengganti_id');
    }

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            self::STATUS_DISETUJUI => 'Disetujui',
            self::STATUS_DITOLAK => 'Ditolak',
            default => 'Menunggu',
        };
    }
}
