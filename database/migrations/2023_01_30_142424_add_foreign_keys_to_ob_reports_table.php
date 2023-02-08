<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToObReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ob_reports', function (Blueprint $table) {
            // $table->foreign('client_id', 'client_id _ob_report')->references('id')->on('clients')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			// $table->foreign('user_id', 'user_id_ob_report')->references('id')->on('users')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			// $table->foreign('branch_id', 'branch_id_ob_report')->references('id')->on('branches')->onUpdate('RESTRICT')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ob_reports', function (Blueprint $table) {
            // $table->dropForeign('client_id _ob_report');
			// $table->dropForeign('user_id_ob_report');
			// $table->dropForeign('branch_id_ob_report');
        });
    }
}
