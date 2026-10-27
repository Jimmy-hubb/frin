<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Handover extends Model
{
    public const STATUS_MENUNGGU = 0;

    public const STATUS_DISETUJUI = 1;

    public const STATUS_DITOLAK = 2;

    protected $fillable = [
        'user_id',
        'penerima_id',
        'jabatan',
        'tanggal_serah_terima',
        'alasan',
        'daftar_serah_terima',
        'status',
        'reject_statement',
    ];

    protected $appends = ['status_label'];

    protected function casts(): array
    {
        return [
            'tanggal_serah_terima' => 'date',
            'status' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function penerima(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penerima_id');
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
