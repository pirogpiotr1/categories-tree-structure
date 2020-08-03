<ul class="js-sortable" data-id="{{$root_id}}" style="display: none">
    @foreach($childs as $child)
        <li data-id="{{$child->id}}">
            @if(count($child->childs))
                <div class="js-slide-el" data-id="{{$child->id}}"><img src="{{asset("storage/svg/right.png")}}"/>
                </div>
            @endif
            <span> {{ $child->name }} </span>

            <div class="js-remove-el" data-id="{{$child->id}}"><img src="{{asset("storage/svg/delete.svg")}}"/></div>
            <div class="js-edit-el" data-id="{{$child->id}}" data-name="{{$child->name}}" data-parent_id="{{$child->parent_id}}"><img src="{{asset("storage/svg/edit.svg")}}"/></div>
            @if(count($child->childs))
                @include('categories.categoriesChilds',['childs' => $child->childs,'root_id' =>$child->id])
            @endif
        </li>
    @endforeach
</ul>
