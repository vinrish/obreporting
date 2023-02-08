<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert(
            array(
                'id' => 1,
                'email' => 'admin@example.com',
                'sms_gateway' => 1,
                'is_invoice_footer' => 0,
                'invoice_footer' => Null,
                'branch_id' => Null,
                'CompanyName' => 'Vinrish Technologies',
                'CompanyPhone' => '0791925895',
                'CompanyAdress' => 'Tom Mboya Street, Nairobi',
                'footer' => 'OB Reports',
                'developed_by' => 'Vinrish Technologies - TEL: 0791925895',
                'logo' => 'logo-default.png',
            )

        );
    }
}
