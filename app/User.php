<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the tasks for the user.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * @return int
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get Burndown Chart Data for the user
     *
     * @param integer $hours
     * @param integer $interval
     * @return array
     */
    public function getBurndownChartData(int $hours = 1, int $intervals = 10)
    {
        $labels = [];
        $data = [];

        $iteration = 0;
        // Egger load all tasks, and filter in memory to optimise database connections
        $tasks = $this->tasks()->get();
        // Interval Minutes of x hours
        $intervalMinutes = ($hours * 60) / $intervals;

        do {
            // Interval Time for iteration
            $intervalTime = now()->subMinutes($intervalMinutes * $iteration);
            // Filter tasks
            $filtered = $tasks->filter(function ($task, $key) use ($intervalTime) {
                // Task must created before interval time
                return $task->created_at->lessThanOrEqualTo($intervalTime) and
                    // Task not completed
                    (
                        $task->completed == false or
                        // or Completed after intervalTime
                        ($task->completed_at and $task->completed_at->greaterThan($intervalTime))
                    );
            });

            $labels[] = $intervalTime->isoFormat('hh:mm');
            $data[] = $filtered->count();
            $iteration++;
        } while ($iteration < $intervals);

        return [
            'labels' => array_reverse($labels),
            'data' => array_reverse($data),
        ];
    }
}
