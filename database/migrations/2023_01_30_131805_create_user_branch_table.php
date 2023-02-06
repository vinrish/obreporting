<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserBranchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_branch', function(Blueprint $table)
		{
			$table->engine = 'InnoDB';
			$table->integer('user_id')->index('user_branch_user_id');
			$table->integer('branch_id')->index('user_branch_branch_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_branch');
    }
}
