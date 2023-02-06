<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateObReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ob_reports', function (Blueprint $table) {
            $table->engine = 'InnoDB';
			$table->integer('id', true);
			$table->integer('user_id')->index('user_id_ob_report');
			$table->date('date');
			$table->string('Ref', 192);
			$table->string('client_name');
            $table->string('client_email', 192);
            $table->string('client_phone', 192);
			$table->string('reporter_name');
            $table->integer('branch_id')->index('branch_id_ob_report');
            $table->integer('reporter_id')->index('reporter_id_ob_report');
            $table->string('staff_no', 192);
			$table->string('subject');
            $table->string('phone', 192);
			$table->text('notes')->nullable();
			$table->timestamps(6);
			$table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ob_reports');
    }
}
