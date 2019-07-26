<?php
	$table_num = $_POST['tableNum'];
	include('managedb.php');
	$tables = ['items', 'dists', 'order_units', 'ordered', 'unit_quantity'];
	echo "<p id = checkTNum>$tables[$table_num]</p>";
	$table = $tables[$table_num];
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
	echo "<table id = sql_parts>";
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
			
		$dsn = "mysql:host=$host;dbname=$db_name";


	try{
		$db = new PDO($dsn, $user, $pass);
		$tbl_query = "DESCRIBE $table";
		$stmt = $db->prepare($tbl_query);
		$stmt->execute();
		while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
			$sql_field_name = $result->Field;
			$sql_field_type = $result->Type;
			echo "<tr><td>$sql_field_name</td><td>$sql_field_type</td></tr>";
			
		}
		echo "</table><p id = 'saveTbl'>$table</p>";
		$db = NULL;
	} catch (PDOException $e) {
		echo "Error: ".$e->getMessage();
		exit;
	}
?>