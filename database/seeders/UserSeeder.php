<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            array(
                'id' => 1,
                'firstname' => 'Vincent',
                'lastname' => 'Kariuki',
                'username' => 'Shadow Walker',
                'email' => 'admin@example.com',
                'password' => '$2y$10$IFj6SwqC0Sxrsiv4YkCt.OJv1UV4mZrWuyLoRG7qt47mseP9mJ58u',
                'avatar' => 'no_avatar.png',
                'phone' => '0791925895',
                'role_id' => 1,
                'statut' => 1,
                'is_all_branches' => 1,
            )
        );
    }
}
