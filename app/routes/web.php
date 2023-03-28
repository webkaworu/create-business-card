<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [CardController::class, 'index'])->name('home');
Route::get('/edit', [CardController::class, 'edit'])->name('edit');
Route::get('/confirm', [CardController::class, 'show'])->name('confirm');
