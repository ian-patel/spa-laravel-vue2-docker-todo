<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Task;
use Faker\Generator as Faker;

$factory->define(Task::class, function (Faker $faker) {
	return [
	    'title' => $faker->sentence($faker->numberBetween(1, 3)),
	    'completed' => $faker->numberBetween(0, 1),
	];
});
