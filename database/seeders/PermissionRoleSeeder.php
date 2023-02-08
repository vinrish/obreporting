<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permission_role')->insert(
            array(
                [
                    'id'            => 1,
                    'permission_id' => 1,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 2,
                    'permission_id' => 2,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 3,
                    'permission_id' => 3,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 4,
                    'permission_id' => 4,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 5,
                    'permission_id' => 5,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 6,
                    'permission_id' => 6,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 7,
                    'permission_id' => 7,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 8,
                    'permission_id' => 8,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 9,
                    'permission_id' => 9,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 10,
                    'permission_id' => 10,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 11,
                    'permission_id' => 11,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 12,
                    'permission_id' => 12,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 13,
                    'permission_id' => 13,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 14,
                    'permission_id' => 14,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 15,
                    'permission_id' => 15,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 16,
                    'permission_id' => 16,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 17,
                    'permission_id' => 17,
                    'role_id'       => 1,
                ],
                [
                    'id'            => 18,
                    'permission_id' => 18,
                    'role_id'       => 1,
                ],
            ));
    }
}
