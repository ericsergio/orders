<?php
$delete_this = $_POST['deleteThis'];
$from_table = $_POST['fromTable'];

$tables = ['items', 'dists', 'order_units', 'ordered', 'unit_quantity'];
$col_names = ['i_name', 'd_name', 'ou_name', 'o_name', 'uq_name'];
$col_name = $col_names[$from_table];
$table = $tables[$from_table];
echo "delete_this : $delete_this<br />";
echo "from_table : $from_table<br />";
echo "col_name : $col_name<br />";
echo "table : $table<br />";
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';

$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
		
		$dsn = "mysql:host=$host;dbname=$db_name";


try{
	$db = new PDO($dsn, $user, $pass);
	$del_table = $table;
	$column = $col_name;
	$delete_item = $delete_this;
	//$query = "DELETE FROM :del_table WHERE :column = :delete_item";
	$query = "DELETE FROM $del_table WHERE $column = \"$delete_item\"";
	$stmt = $db->prepare($query);
	//$stmt->bindParam(':del_table', $del_table, PDO::PARAM_STR);
	//$stmt->bindParam(':column', $column, PDO::PARAM_STR);
	//$stmt->bindParam(':delete_item', $delete_item, PDO::PARAM_STR);
	$stmt->execute();
	$db = NULL;
} catch (PDOException $e) {
	echo "Error: ".$e->getMessage();
	exit;
}
echo "<script>this.location.href = 'managedb.php'</script>";


?>