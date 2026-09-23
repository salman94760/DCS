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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            $table->string('usdot')->nullable();
            $table->string('owner')->nullable();
            $table->string('cname')->nullable();

            $table->string('dot')->nullable();
            $table->string('mc')->nullable();
            $table->string('ein')->nullable();

            $table->string('dba')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('aphone')->nullable();

            $table->text('physicaladdress')->nullable();
            $table->text('mailaddress')->nullable();

            $table->string('image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
