<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->decimal('totalprice', 8, 2);
            $table->string('payment');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->dropColumn('totalprice'); // Drop the 'price' column if rolling back the migration
            $table->dropColumn('payment'); // Drop the 'price' column if rolling back the migration

        });
    }
};
