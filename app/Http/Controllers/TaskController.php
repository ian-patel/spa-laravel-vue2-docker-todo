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
		    ->simplePaginate(10);

		return response()->json($tasks);
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
	public function show($id)
	{

	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		// Find task for the user
		$task = $request->user()
			->tasks()
			->findOrFail($id);

		if ($request->input('completed')) {
			$task->completed = $request->input('completed') == 'yes';
		}

		return response()->json([
			'success' => $task->save(),
		]);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
	    //
	}
}
