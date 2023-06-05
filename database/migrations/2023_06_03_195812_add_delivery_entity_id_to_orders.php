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
            Schema::table('orders', function (Blueprint $table) {
                $table->unsignedBigInteger('delivery_entity_id')->nullable();
                $table->foreign('delivery_entity_id')->references('id')->on('delivery_entities');
            });
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['delivery_entity_id']);
            $table->dropColumn('delivery_entity_id');
            //
        });
    }
};
