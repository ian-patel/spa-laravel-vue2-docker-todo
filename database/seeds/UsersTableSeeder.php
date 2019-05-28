<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	factory(App\User::class, 50)
    		->create()
    		->each(function ($user) {
    	    	$user->tasks()
    	    		->saveMany(
    	    			factory(App\Task::class, rand(1, 10))->make()
    	    		);
    		});
    }
}
