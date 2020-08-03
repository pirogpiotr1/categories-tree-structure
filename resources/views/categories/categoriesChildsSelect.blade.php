{{++ $deep}}
@foreach($childs as $child)
        <option data-parent="@if(!empty($parent)){{$parent->id}}@endif" class="@if(count($child->childs))strong @endif" value="{{ $child->id }}" >
            @for ($i = 0; $i < $deep; $i++)
            &nbsp;
            @endfor
           {{ $child->name }} {{--@if(!empty($parent_name))  --{{$parent_name}} @endif--}}

        </option>
            @if(count($child->childs))
                @include('categories.categoriesChildsSelect',['childs' => $child->childs, 'parent' => $child,'deep' => $deep])
            @endif
@endforeach

