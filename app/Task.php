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
        'title', 'completed',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user of the task.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only tasks are completed
     *
     * @param bool $completed
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query, bool $completed = true)
    {
        return $query->where('completed', $completed);
    }

    /**
     * Complete the task.
     *
     * @return bool
     */
    public function complete(): bool
    {
        $this->completed = true;
        $this->completed_at = now();
        return $this->save();
    }
}
