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
Create stats/Tests/FirstTest.php and add the following 

	<?php 
	namespace stats\Tests;
	use PHPUnit\Framework\TestCase;

	class FirstTest extends TestCase{
		public function testUselessness(){
			$this->assertTrue(true);
		}
	}

Step 8:
Create stats/Baseball.php and add the following 
	<?php
	namespace stats;
	class Baseball{
		public function calc_avg($ab, $hits){
			if ($ab == 0){
				$avg = "0.000";
			} else {
				$avg = $hits/$ab;
			}
			return $avg;
		}

		public function calc_obp($ab, $bb, $hp, $sac, $hits){
			if (!($total = $ab + $bb + $hp + $sac)){
				$obp = "0.000";
			} else {
				$obp = number_format(($hits + $bb + $hp + $sac) / $ab, 3);
			}
			return $obp;
		}
		public function calc_slg($ab, $singles, $doubles, $tripples, $hr){
			if ($ab == 0){
				$slg = "0.000";
			} else {
				$slg = number_format((($singles*1)+($doubles*2)+($tripples*3))/$ab, 3);
			}
			return $slg;
		}

		public function calc_ops($ab, $singles, $doubles, $tripples, $hr){
			$slg = number_format((($singles*1)+($doubles*2)+($tripples*3))/$ab, 3);
			$obp = number_format(($hits + $bb + $hp + $sac) / $ab, 3);
			$ops = $slg + $obp;
			return $ops; 
		}
	} ?>

Step 9: 
Ask yourself if these functions are testable and do they need to be refactored into smaller chunks?

Step 10:
Create stats/Tests/BaseballTest.php and add the following 

	<?php 
	namespace stats\Tests;

	require_once __DIR__."/../Baseball.php";

	use stats\Baseball;
	use PHPUnit\Framework\TestCase;

	class BaseballTest extends TestCase{
		public function testCalcAvgEquals(){
			$atbats = 389;
			$hits = 129;
			$baseball = new Baseball();
			$result = $baseball->calc_avg($atbats, $hits);
			$expectedresult = $hits/$atbats;
			$this->assertEquals($expectedresult, $result); 
		}
	} ?>

Step 10:
Does green mean a good test? Does this satisfy our expectations?
update stats/Tests/BaseballTest.php and stats/Baseball.php

	stats/Tests/BaseballTest.php
	<?php 
	namespace stats\Tests;

	require_once __DIR__."/../Baseball.php";

	use stats\Baseball;
	use PHPUnit\Framework\TestCase;

	class BaseballTest extends TestCase{
		public function testCalcAvgEquals(){
			$atbats = 389;
			$hits = 129;
			$baseball = new Baseball();
			$result = $baseball->calc_avg($atbats, $hits);
			$expectedresult = $hits/$atbats;
			
			$formatedexpectedresult = number_format($hits/$atbats, 3);
			$this->assertEquals($formatedexpectedresult, $result);
		}
	} 

	stats/Baseball.php
	<?php

	namespace stats;

	class Baseball{
		public function calc_avg($ab, $hits){
			if ($ab == 0){
				$avg = "0.000";
			} else {
				$avg = number_format($hits/$ab, 3);
			}
			return $avg;
		}

		public function calc_obp($ab, $bb, $hp, $sac, $hits){
			if (!($total = $ab + $bb + $hp + $sac)){
				$obp = "0.000";
			} else {
				$obp = number_format(($hits + $bb + $hp + $sac) / $ab, 3);
			}
			return $obp;
		}
		public function calc_slg($ab, $singles, $doubles, $tripples, $hr){
			if ($ab == 0){
				$slg = "0.000";
			} else {
				$slg = number_format((($singles*1)+($doubles*2)+($tripples*3))/$ab, 3);
			}
			return $slg;
		}

		public function calc_ops($ab, $singles, $doubles, $tripples, $hr){
			$slg = number_format((($singles*1)+($doubles*2)+($tripples*3))/$ab, 3);
			$obp = number_format(($hits + $bb + $hp + $sac) / $ab, 3);
			$ops = $slg + $obp;
			return $ops; 
		}
	}


