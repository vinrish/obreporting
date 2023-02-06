<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\role_user;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Nwidart\Modules\Facades\Module;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            // 'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function create(array $data)
    {
        $filename = 'no_avatar.png';

        return User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'username' => $data['username'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'avatar'    => $filename,
            'password' => Hash::make($data['password']),
            'role_id'   => $data['role'],
        ]);

        $role_user = new role_user;
        $role_user->user_id = $user->id;
        $role_user->role_id = $user['role_id'];
        $role_user->save();

        return $user;
    }

    public function showRegisterForm(){
        $allModules = Module::all();
        $allEnabledModules = Module::allEnabled();

        $ModulesInstalled = [];
        $ModulesEnabled = [];

        foreach($allModules as $key => $modules_name){
            $ModulesInstalled[] = $key;
        }

        foreach($allEnabledModules as $key => $modules_name){
            $ModulesEnabled[] = $key;
        }

        return view('auth.register',[
            'ModulesInstalled' => $ModulesInstalled,
            'ModulesEnabled' => $ModulesEnabled,
        ]);
    }
}
