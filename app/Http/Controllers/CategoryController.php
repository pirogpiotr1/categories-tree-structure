<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Response;

class CategoryController extends Controller
{
    /**
     * Widok zarządzania kategoriami
     * @return Factory|View
     */
    public function categoriesView(){

        $rootCategory = Category::whereNull('parent_id')->orderByRaw('-sort DESC')->get();
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
            'name' => 'required',
            'id' => 'in:""'
        ]);

        $input = $request->all();

        // jesli brak ustawiam na 0
        if(empty((  $input['parent_id']))){
            $input['parent_id'] = null;
        }
        Category::create($input);
        return back()->with('Success','added');
    }

    public function removeCategory(Request $request){
        $status = false;
        $data = $request->all();

        //element do usuniecia
        $deleteBranchEl = null;

        if( $data['id']){
            $deleteBranchEl = Category::where('id', $data['id'])->delete();
            if($deleteBranchEl){
                $status = true;
            }
        }

        return \Response::json(array(
            'success' => true
        ));
    }

    public function editCategory(Request $request){
        $this->validate($request,[
            'name' => 'required',
            'id' =>'required',
            'parent_id'=> 'different:id'
        ]);

        $input = $request->all();

        // jesli brak ustawiam na 0
        if(empty((  $input['parent_id']))){
            $input['parent_id'] = null;
        }

        Category::where('id', $input['id'])
          ->update([
              'name' => $input['name'],
              'parent_id' => $input['parent_id']
            ]);

        return back()->with('Success','added');
    }

    public function changePosition(Request $request){
        $status = false;
        $data = $request->all();

        if( $data['to_id'] == 0 ){
            $data['to_id'] = null;
        }
        $check = null;

        $check = true;
        Category::where('id', $data['from_id'])
            ->update([
                'parent_id' => $data['to_id']
            ]);

        return \Response::json(array(
            'success' => $check
        ));
    }
    public function changeSort(Request $request){
        $status = false;
        $data = $request->all();
        foreach ($data['order'] as $key => $item ) {
            Category::where('id', $item)
                ->update([
                    'sort' => $key
                ]);
        }

        return \Response::json(array(
            'success' => true
        ));
    }
}
