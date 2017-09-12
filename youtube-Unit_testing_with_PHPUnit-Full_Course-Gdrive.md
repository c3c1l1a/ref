https://www.youtube.com/watch?v=uncVbYGOJ8c

Code can be found here 
~/Documents/tizi/tuts/Unit-testing-in-php

Refactoring is making code small and more modularised for easy testing 
Automatic integration testing or black box testing 

Installations and initial setup
-------------------------------
Step 1: 
$ curl -sS https://getcomposer.org/installer | php

Step 2: 
Create composer.json and add the following

	{
		"require": {
		}, 
		"require-dev":{
			"phpunit/phpunit":"*"
		}, 
		"autoload":{
			"psr-0":{
				"stats":""
			}
		}
	}

Step 3:
Create phpunit.xml and add the following

	<?xml version="1.0" encoding="UTF-8"?>
	<phpunit colors="true" boostrap="vendor/autoload.php">
		<testsuites>
			<testsuite name="Application Test Suite">
				<directory>./stats/Tests</directory>
			</testsuite>
		</testsuites>
	</phpunit>

Step 4: 
User composer to update our dependencies 
	./composer.phar update dev

Step 5:
Install phpunit 
	wget https://phar.phpunit.de/phpunit.phar
	chmod +x phpunit.phar
	sudo mv phpunit.phar /usr/local/bin/phpunit
	phpunit

Step 6:
	mkdir stats
	mkdir stats/Tests 

Step 7: 
Create FirstTest.php and add the following 

	<?php 
	namespace stats\Tests;
	use PHPUnit\Framework\TestCase;

	class FirstTest extends TestCase{
		public function testUselessness(){
			$this->assertTrue(true);
		}
	}



