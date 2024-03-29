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
        Schema::create('coffee_brand_owners', function (Blueprint $table) {
            $table->id();
            $table->string('coffeeBrandName')->nullable();
            $table->string('licenseNumber')->nullable();
            $table->string('address')->nullable();
            $table->foreignId('subscription_id')->nullable()->constrained('subscriptions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coffee_brand_owners');
    }
};
