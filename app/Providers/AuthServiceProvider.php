<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Role'                      => 'App\Policies\RolePolicy',
        'App\Models\Server'                    => 'App\Policies\ServerPolicy',
        'App\Models\Setting'                   => 'App\Policies\SettingPolicy',
        'App\Models\User'                      => 'App\Policies\UserPolicy',
        'App\Models\Branch'                    => 'App\Policies\BranchPolicy',
        'App\Models\ObReport'                  => 'App\Policies\ObReportPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
