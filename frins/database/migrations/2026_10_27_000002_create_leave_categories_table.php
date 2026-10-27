<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_categories', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('deskripsi')->nullable();
            $table->timestamps();
        });

        DB::table('leave_categories')->insert([
            ['nama' => 'Cuti Tahunan', 'deskripsi' => 'Cuti tahunan karyawan', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Cuti Sakit', 'deskripsi' => 'Cuti karena sakit', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Cuti Melahirkan', 'deskripsi' => 'Cuti melahirkan', 'created_at' => now(), 'updated_at' => now()],
            ['nama' => 'Cuti Urusan Penting', 'deskripsi' => 'Cuti untuk urusan penting', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_categories');
    }
};
