<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('discusion_id');
            $table->integer('clientToPentester')->default(0);
            $table->integer('pentesterToClient')->default(0);
            $table->mediumText('text')->nullable();
            $table->integer('first')->default(0);
            $table->integer('last')->default(0);
            $table->string('file_url',100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
