<?php
	$one = $_POST["one"];
	$item = $_POST["item"];
	$oldVal = $_POST["oldVal"];
	$column = $_POST["column"];
	$currentTable = $_POST["currentTable"];
	echo "New Value: $one <br />Item: $item <br /> Old Value: $oldVal <br /> Column: $column <br /> Current Table: $currentTable";
	
	
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
					
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
	
		$dsn = "mysql:host=$host;dbname=$db_name";
	
	$db = new PDO($dsn, $user, $pass);
	$match_id = $item;
	$match_new_value = $one;
	$match_column = $column;
	
	try{
		$query = "UPDATE items SET $column = $one WHERE i_name = :match_id";
		$stmt = $db->prepare($query);
		$stmt->bindParam(':match_id', $match_id, PDO::PARAM_STR);
		$stmt->execute();
		$db = NULL;
	} catch (PDOException $e) {
		echo "Error: ".$e->getMessage();
		exit;
	}
	echo "<script>this.location.href = 'managedb.php'</script>";
	//echo "<script>this.location.href = 'http://serg8529.webdatatutorial.com/cis243/finalProj/pages/do_db.php'</script>";
?>
