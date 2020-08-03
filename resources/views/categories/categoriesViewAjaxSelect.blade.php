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
