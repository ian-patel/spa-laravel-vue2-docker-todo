<?php

use Illuminate\Http\Request;

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

// Auth
Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function () {
    // Login
    Route::post('login', 'LoginController@login');
    // Register
    Route::post('register', 'RegisterController@register');

    Route::group(['middleware' => 'auth:api'], function () {
        // Logout
        Route::post('/logout', 'LoginController@logout');
        // Get User
        Route::get('/user', function (Request $request) {
            return ['user' => $request->user()];
        });
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
