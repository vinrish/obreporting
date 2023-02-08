<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(
            array([
                'id'    => 1,
                'name'  => 'Owner',
                'label' => 'Owner',
                'status' => 1,
                'description' => 'Owner',
            ],
            [
                'id'    => 2,
                'name'  => 'STAFF',
                'label' => 'STAFF',
                'status' => 1,
                'description' => 'STAFF',
            ]
        ));
    }
}
