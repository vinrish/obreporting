<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('branches')->insert(
            array(
                'id'      => 1,
                'name'    => 'Default Branch',
                'city'    => NULL,
                'mobile'  => NULL,
                'zip'     => NULL,
                'email'   => NULL,
                'country' => NULL,
            )
        );
    }
}
