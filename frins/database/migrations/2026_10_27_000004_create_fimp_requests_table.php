<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fimp_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('pengganti_id')->constrained('users')->cascadeOnDelete();
            $table->date('tanggal_awal');
            $table->date('tanggal_akhir');
            $table->integer('total_hari');
            $table->text('keperluan');
            $table->boolean('pengganti_mengetahui')->default(false);
            $table->boolean('pengganti_bersedia')->default(false);
            $table->integer('status')->default(0);
            $table->text('reject_statement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fimp_requests');
    }
};
