<ul>
    @foreach($childs as $child)
        <li>

            <span> {{ $child->name }} </span>
            <div class="js-remove-el" id="{{$child->id}}">Remove</div>
            @if(count($child->childs))
                @include('categories.categoriesChilds',['childs' => $child->childs])
            @endif
        </li>
    @endforeach
</ul>
