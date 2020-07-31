<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $input)
 * @method static where(string $string, string $string1, string $string2)
 */
class Category extends Model
{

    protected $fillable = ['name','parent_id'];
    /**
     * Dzieci
     * @return HasMany
     */
    public function childs(){
       return $this->hasMany('App\Category','parent_id','id');
    }
}
