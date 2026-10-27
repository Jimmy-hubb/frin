<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('handovers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('penerima_id')->constrained('users')->cascadeOnDelete();
            $table->string('jabatan');
            $table->date('tanggal_serah_terima');
            $table->text('alasan');
            $table->text('daftar_serah_terima');
            $table->integer('status')->default(0);
            $table->text('reject_statement')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('handovers');
    }
};
