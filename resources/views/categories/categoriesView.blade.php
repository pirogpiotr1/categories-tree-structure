@extends('layouts.app')

@section('content')
    <div class="container categories">
        <div class="categories-con">

            <ul class="js-sortable" data-id="0">
                @foreach($rootCategory as $category)
                    <li data-id="{{$category->id}}">
                        @if(count($category->childs))
                            <div class="js-slide-el" data-id="{{$category->id}}"><img class="" src="{{asset("storage/svg/right.png")}}"/>
                            </div>
                        @endif
                        <span> {{ $category->name }} </span>

                        <div class="js-remove-el" data-id="{{$category->id}}"><img src="{{asset("storage/svg/delete.svg")}}"/>
                         </div>
                        <div class="js-edit-el" data-id="{{$category->id}}" data-name="{{$category->name}}"
                             data-parent_id="{{$category->parent_id}}"><img src="{{asset("storage/svg/edit.svg")}}"/>
                        </div>
                        @if(count($category->childs))
                            @include('categories.categoriesChilds',['childs' => $category->childs,'root_id' =>$category->id])
                        @endif
                    </li>
                @endforeach
            </ul>
            <button class="js-show-all" >
                Show all nested categories
            </button>
        </div>
        <div class="categories-form-con">
            <button class="js-change-addform" style="display: none">
                Change to add category form
            </button>
            <form role="form" id="category" method="POST" action="{{ route('add_category') }}"
                  data-edit-action="{{ route('edit_category') }}" enctype="multipart/form-data">
                @csrf

                <input name="id" type="hidden" value=""/>
                <div class="form-row {{ $errors->has('name') ? 'has-error' : '' }}">
                    <label class="js-label">Category name:</label>
                    <input type="text" id="name" name="name" value="" class="form-control" placeholder="Enter name">
                    @if ($errors->has('name'))
                        <span class="text-red" role="alert">
                                <strong>{{ $errors->first('name') }}</strong>
                            </span>
                    @endif
                </div>
                <div class="form-row {{ $errors->has('parent_id') ? 'has-error' : '' }}">
                    <label>Parent category:</label>
                    <select id="parent_id" name="parent_id" class="form-control">
                        <option value="0">Select</option>
                        @php
                            $i = 0
                        @endphp
                        @foreach($rootCategory as $rows)
                            <option class="@if(count($rows->childs))strong @endif"
                                    value="{{ $rows->id }}">{{ $rows->name }}</option>
                            @if(count($rows->childs))
                                @include('categories.categoriesChildsSelect',['childs' => $rows->childs, 'parent' => $rows ,'deep' => $i])
                            @endif
                        @endforeach
                    </select>
                    @if ($errors->has('parent_id'))
                        <span class="text-red" role="alert">
                                <strong>{{ $errors->first('parent_id') }}</strong>
                            </span>
                    @endif
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-success js-add-edit" value="Add New"/>
                </div>
            </form>
        </div>
    </div>
@endsection
