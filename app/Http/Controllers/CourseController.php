<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Subject;
use App\Models\Text;

class CourseController extends Controller
{
    public function main($id) {
        
        $course = Subject::where('id',$id)->first();

        $texts = Text::where('subject_id', $id)->get();

        return Inertia::render('Course/Main', ['course' => $course, 'texts' => $texts]);
    }

    public function courseText($text_id) {

        $text = Text::find($text_id);

        return Inertia::render('Course/Text', ['text' => $text]);

    }
}
