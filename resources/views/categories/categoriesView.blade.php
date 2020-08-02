<!DOCTYPE html>
<html>
<head>
    <title>Manage Categories</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <link href="{{ asset('css/categories.css') }}" rel="stylesheet">
</head>
<body>

<ul id="tree1">
    @foreach($rootCategory as $category)
        <li>
            <span> {{ $category->name }} </span>
            <div class="js-remove-el" data-id="{{$category->id}}">Remove</div>
            <div class="js-edit-el" data-id="{{$category->id}}" data-name="{{$category->name}}">Edit</div>
            @if(count($category->childs))
                @include('categories.categoriesChilds',['childs' => $category->childs])
            @endif
        </li>
    @endforeach
</ul>
<form role="form" id="category" method="POST" action="{{ route('add_category') }}" data-edit-action="{{ route('edit_category') }}" enctype="multipart/form-data">
    @csrf

    <input name="id" type="hidden" value=""/> 
    <div class="form-group {{ $errors->has('title') ? 'has-error' : '' }}">
        <label>Title:</label>
        <input type="text" id="name" name="name" value="" class="form-control" placeholder="Enter Title">
        @if ($errors->has('name'))
            <span class="text-red" role="alert">
                                <strong>{{ $errors->first('title') }}</strong>
                            </span>
        @endif
    </div>
    <div class="form-group {{ $errors->has('parent_id') ? 'has-error' : '' }}">
        <label>Category:</label>
        <select id="parent_id" name="parent_id" class="form-control">
            <option value="0">Select</option>
            @foreach($allCategories as $rows)
                <option value="{{ $rows->id }}">{{ $rows->name }}</option>
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
<script src="{{ asset('js/categories.js') }}"></script>
</body>
</html>
