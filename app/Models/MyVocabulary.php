<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MyVocabulary extends Model
{
    use HasFactory;

    protected $table = 'my_vocabulary';

    protected $fillable = [
        'dictionary_id',
        'user_id',
        'myVocabularyStatus_id',
        'lang',
    ];

    public function dictionary()
    {
        return $this->belongsTo(Dictionary::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTermsByUser($userId)
    {
        return $this->select(
                'my_vocabulary.id', 
                'dictionary.term', 
                'dictionary.meaning', 
                'dictionary.meaning_pt', 
                'dictionary.slug', 
                'dictionary.lang',
                DB::raw('dictionary.id as dictionary_id')
            )
        ->join('dictionary', 'my_vocabulary.dictionary_id', '=', 'dictionary.id')
        ->where('my_vocabulary.user_id', $userId)
        ->get();
    }
}
