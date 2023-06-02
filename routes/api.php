<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RatingReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
// Route::get('/users', [AuthController::class, 'getAllUsers']);
Route::get('/customers', [AuthController::class, 'getAllCustomers']);
Route::get('/coffee_brand', [AuthController::class, 'getAllCoffeeBrand']);
Route::get('/roles', [AuthController::class,'getRoles']);
Route::post('/roles', [AuthController::class,'addRole']);
Route::put('/roles/{id}', [AuthController::class,'editRole']);
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'delete']);
Route::delete('/roles/{id}', [AuthController::class, 'deleteRole']);

Route::get('/orders/{id}', [OrderController::class, 'OrderOfSpecificUser']);
Route::resource('products', ProductController::class);
Route::resource('orders', OrderController::class);
Route::get('products/{id}', [ProductController::class, 'singleProduct']);
Route::get('products/user/{id}', [ProductController::class, 'specificUserProducts']);
Route::post('/orders', [OrderController::class, 'store']);
Route::resource('reviews', RatingReviewController::class);
