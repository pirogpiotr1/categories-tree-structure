<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('categories', 'CategoryController@categoriesView')->name('categories');
Route::post('add_category', 'CategoryController@addCategory')->name('add_category');
Route::post('remove_category', 'CategoryController@removeCategory')->name('remove_category');
Route::post('edit_category', 'CategoryController@editCategory')->name('edit_category');
