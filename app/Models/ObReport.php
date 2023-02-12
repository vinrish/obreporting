<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObReport extends Model
{
    // protected $table ="ob_reports";
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'date',
        'Ref',
        'client_name',
        'client_personel',
        'reporter_name',
        'phone',
        'reporter_id',
        'personel',
        'subject',
        'branch',
        'escalate',
        'notes',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        // 'GrandTotal' => 'double',
        // 'user_id' => 'integer',
        // 'branch_id' => 'integer',
        // 'reporter_id' => 'integer',
        // 'discount' => 'double',
        // 'shipping' => 'double',
        // 'TaxNet' => 'double',
        // 'tax_rate' => 'double',

    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function branch()
    {
        return $this->belongsTo('App\Models\Branch');
    }
}
