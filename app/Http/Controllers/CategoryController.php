<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class CategoryController extends Controller
{
    /**
     * Widok zarządzania kategoriami
     * @return Factory|View
     */
    public function categoriesView(){
        $rootCategory = Category::where('parent_id', '=', '0')->get();
        $allCategories = Category::all();
        return view('categories.categoriesView', compact('rootCategory','allCategories'));
    }

    /**
     * Dodawanie kategori
     * @param Request $request
     * @return RedirectResponse
     * @throws ValidationException
     */
    public function addCategory(Request $request){
        $this->validate($request,[
            'name' => 'required'
        ]);

        $input = $request->all();

        // jesli brak ustawiam na 0
        if(empty((  $input['parent_id']))){
            $input['parent_id'] = 0;
        }
        Category::create($input);
        return back()->with('Success','added');
    }

    public function removeCategory(Request $request){
       echo json_encode([
           'status' => 'SUCCESS'
       ]);
    }
}
