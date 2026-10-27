<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kpi_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('periode');
            $table->integer('kedisiplinan_score');
            $table->integer('kedisiplinan_max')->default(100);
            $table->integer('mengajar_score');
            $table->integer('mengajar_max')->default(100);
            $table->integer('daily_report_score');
            $table->integer('daily_report_max')->default(100);
            $table->integer('teamwork_score');
            $table->integer('teamwork_max')->default(100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kpi_evaluations');
    }
};
