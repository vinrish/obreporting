<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//--------------------------- Reset Password  ---------------------------
// Route::post('register', 'RegisterController@store');
Route::group([
    'prefix' => 'password',
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::post('reset', 'PasswordResetController@reset');
});

Route::post('getAccessToken', 'AuthController@getAccessToken');
Route::middleware(['auth:api', 'Is_Active'])->group(function () {


    //-------------------------- Clear Cache ---------------------------

    Route::get("clear_cache", "SettingsController@Clear_Cache");

    //------------------------------- ObReports --------------------------\\
    //------------------------------------------------------------------\\
    Route::resource('obreports', 'ObReportsController');
    // Route::post('quotations_send_email', 'QuotationsController@SendEmail');
    // Route::post('quotations_send_sms', 'QuotationsController@Send_SMS');
    Route::post('obreportss_delete_by_selection', 'ObReportsController@delete_by_selection');

    //------------------------------- Users --------------------------\\
    //------------------------------------------------------------------\\

    Route::get('get_user_auth', 'UserController@GetUserAuth');
    Route::resource('users', 'UserController');
    Route::put('users_switch_activated/{id}', 'UserController@IsActivated');
    Route::get('Get_user_profile', 'UserController@GetInfoProfile');
    Route::put('update_user_profile/{id}', 'UserController@updateProfile');

    //------------------------------- Permission Groups user -----------\\
    //------------------------------------------------------------------\\

    Route::resource('roles', 'PermissionsController');
    Route::resource('roles/check/create_page', 'PermissionsController@Check_Create_Page');
    Route::post('roles/delete/by_selection', 'PermissionsController@delete_by_selection');


    //------------------------------- Settings ------------------------\\
    //------------------------------------------------------------------\\
    Route::resource('settings', 'SettingsController');
    Route::get('get_Settings_data', 'SettingsController@getSettings');
    Route::put('pos_settings/{id}', 'SettingsController@update_pos_settings');
    Route::get('get_pos_Settings', 'SettingsController@get_pos_Settings');

    //------------------------------- Mail Settings ------------------------\\

    Route::put('update_config_mail/{id}', 'MailSettingsController@update_config_mail');
    Route::get('get_config_mail', 'MailSettingsController@get_config_mail');

    //------------------------------- SMS Settings ------------------------\\

    Route::get('get_sms_config', 'Sms_SettingsController@get_sms_config');
    Route::post('update_twilio_config', 'Sms_SettingsController@update_twilio_config');
    Route::post('update_nexmo_config', 'Sms_SettingsController@update_nexmo_config');

     //------------------------------- Backup --------------------------\\
    //------------------------------------------------------------------\\

    Route::get("get_backup", "BackupController@Get_Backup");
    Route::get("generate_new_backup", "BackupController@Generate_Backup");
    Route::delete("delete_backup/{name}", "BackupController@Delete_Backup");
});

//-------------------------------  Print & PDF ------------------------\\
//------------------------------------------------------------------\\
Route::get('ob_pdf/{id}', 'ObReportsController@ObReport_pdf');
