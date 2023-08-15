<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Subject extends Model
{
    use HasFactory;

    protected $table = 'subject';

    protected $fillable = [
        'subject',
        'parent_subject_id',
        'order',
        'slug',
        'workspace_id'
    ];

    public static function allWithTextCount()
    {
        return static::selectRaw('*, get_child_subjects_text_count(id) as text_count');
    }

    public static function getBreadcrumb($targetId) {
        $result = DB::select('CALL get_breadcrumb(?, @breadcrumb)', [$targetId]);
        $breadcrumb = DB::select('SELECT @breadcrumb AS breadcrumb')[0]->breadcrumb;
        return $breadcrumb;
    }

    public function parentSubject()
    {
        return $this->belongsTo(Subject::class, 'parent_subject_id');
    }

    public function childSubjects()
    {
        return $this->hasMany(Subject::class, 'parent_subject_id');
    }
}
