<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('leave_category_id')->constrained()->cascadeOnDelete();
            $table->date('tanggal_awal');
            $table->date('tanggal_akhir');
            $table->integer('jumlah_hari');
            $table->text('keterangan')->nullable();
            $table->integer('status')->default(0);
            $table->text('reject_statement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
