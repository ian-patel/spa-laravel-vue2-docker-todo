<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tasks = $request->user()
            ->tasks()
            ->with('user')
            ->latest()
            ->get();

        return response()->json(['tasks' => $tasks]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
        ]);

        $task = $request->user()
            ->tasks()
            ->create([
                'title' => $request->input('title'),
                'completed' => false,
            ]);

        return response()->json([
            'task' => $task->load('user')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function chart(Request $request)
    {
        return response()->json([
            'data' => $request->user()->getBurndownChartData()
        ]);
    }

    /**
     * Complete the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function complete(Request $request, $id)
    {
        // Find task for the user
        $task = $request->user()
            ->tasks()
            ->findOrFail($id);

        $task->complete();

        return response()->json([
            'success' => $task->save(),
        ]);
    }
}
