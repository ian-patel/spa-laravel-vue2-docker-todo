<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
	use WithFaker;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
    	$email = $this->faker->email;

    	// Register the user
    	$response = $this->json('POST', '/api/auth/register', [
    		'name' => $this->faker->name,
    		'email' => $email,
    		'password' => 'password',
    	]);
    	$response
	        ->assertOk()
	        ->assertJsonFragment([
	        	'authenticated' => true,
	        ]);

        // Logout the registered user
        $response = $this->json('POST', '/api/auth/logout', []);
        $response
            ->assertOk();

        // Login the user
        $response = $this->json('post', '/api/auth/login', [
            'email' => $email,
            'password' => 'password',
        ]);
    	$response
            ->assertOk()
            ->assertJsonFragment([
            	'authenticated' => true,
            ]);
    }
}
