<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    use HasFactory;

    protected $table = 'text';
    protected $fillable = [
        'title',
        'title_pt',
        'title_fr',
        'title_de',
        'title_es',
        'title_it',
        'title_nl',
        'slug',
        'text',
        'text_pt',
        'text_fr',
        'text_de',
        'text_es',
        'text_it',
        'text_nl',
        'subject_id',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function bookmarkTexts()
    {
        return $this->hasMany(BookmarkText::class, 'text_id');
    }
}
