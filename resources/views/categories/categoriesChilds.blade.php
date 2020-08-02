<ul>
    @foreach($childs as $child)
        <li>

            <span> {{ $child->name }} </span>
            <div class="js-remove-el" data-id="{{$child->id}}">Remove</div>
            <div class="js-edit-el" data-id="{{$child->id}}" data-name="{{$child->name}}">Edit</div>
            @if(count($child->childs))
                @include('categories.categoriesChilds',['childs' => $child->childs])
            @endif
        </li>
    @endforeach
</ul>
