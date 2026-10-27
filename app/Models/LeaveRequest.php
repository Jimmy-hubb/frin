<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    public const STATUS_MENUNGGU = 0;

    public const STATUS_DISETUJUI = 1;

    public const STATUS_DITOLAK = 2;

    protected $fillable = [
        'user_id',
        'leave_category_id',
        'tanggal_awal',
        'tanggal_akhir',
        'jumlah_hari',
        'keterangan',
        'status',
        'reject_statement',
    ];

    protected $appends = ['status_label'];

    protected function casts(): array
    {
        return [
            'tanggal_awal' => 'date',
            'tanggal_akhir' => 'date',
            'status' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(LeaveCategory::class, 'leave_category_id');
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
