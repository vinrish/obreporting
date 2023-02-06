<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBranch extends Model
{
    protected $table ="user_branch";

   protected $fillable = [
    'user_id', 'branch_id',
];

protected $casts = [
    'user_id' => 'integer',
    'branch_id' => 'integer',
];

    public function assignedBranches()
    {
        return $this->hasMany('App\Models\Branch', 'id', 'branch_id');
    }
}
