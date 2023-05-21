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
       // In the migration file
       Schema::create('users', function (Blueprint $table) {
        $table->increments('id');
        $table->string('username');
        $table->string('password');
        $table->rememberToken();
        $table->foreignId('role_id')->nullable()->constrained('roles');
        $table->foreignId('customer_id')->nullable()->constrained('customers');
        $table->foreignId('coffee_brand_owner_id')->nullable()->constrained('coffee_brand_owners');
        $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
