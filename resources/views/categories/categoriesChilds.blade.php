<ul class="js-sortable" data-id="{{$root_id}}">
    @foreach($childs as $child)
        <li data-id="{{$child->id}}">

            <span> {{ $child->name }} </span>
            <div class="js-remove-el" data-id="{{$child->id}}">Remove</div>
            <div class="js-edit-el" data-id="{{$child->id}}" data-name="{{$child->name}}" data-parent_id="{{$child->parent_id}}">Edit</div>
            @if(count($child->childs))
                @include('categories.categoriesChilds',['childs' => $child->childs,'root_id' =>$child->id])
            @endif
        </li>
    @endforeach
</ul>
