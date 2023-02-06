<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToUserBranchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_branch', function(Blueprint $table)
		{
			$table->foreign('user_id', 'user_branch_user_id')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('branch_id', 'user_branch_branch_id')->references('id')->on('branches')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_branch', function (Blueprint $table) {
            $table->dropForeign('user_branch_user_id');
			$table->dropForeign('user_branch_branch_id');
        });
    }
}
