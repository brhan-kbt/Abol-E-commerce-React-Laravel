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
        Schema::create('rating_reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('rating')->nullable();
            $table->text('message')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rating_reviews');
    }
};
