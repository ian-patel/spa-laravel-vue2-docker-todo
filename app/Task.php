<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
	    'title',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
	    'completed' => 'boolean',
	];

	/**
	 * Get the user of the task.
	 */
	public function user()
	{
	    return $this->belongsTo(User::class);
	}
}
