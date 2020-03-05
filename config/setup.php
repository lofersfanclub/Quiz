<?php
$host_name = "localhost:8889 ";
$database = "dbjvgrki_thegame";
$username = "root";
$password = "root";


try {
$dbo = new PDO('mysql:host='.$host_name.';dbname='.$database, $username, $password);
} catch (PDOException $e) {
print "Error!: " . $e->getMessage() . "<br/>";
die();
}
?>
