<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'email', 'CompanyName', 'CompanyPhone', 'CompanyAdress',
         'logo','footer','developed_by','branch_id','default_language',
         'is_invoice_footer','invoice_footer',
    ];

    protected $casts = [
        // 'currency_id' => 'integer',
        // 'client_id' => 'integer',
        'is_invoice_footer' => 'integer',
        'branch_id' => 'integer',
    ];

    // public function Currency()
    // {
    //     return $this->belongsTo('App\Models\Currency');
    // }
}
