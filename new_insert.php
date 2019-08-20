<?php
$pst = $_POST;
extract($pst);
$one_arr = [];
$tbl = $_POST['table'];
foreach($pst as $current) {
	array_push($one_arr, $current);
}
$one_str = implode('___', $one_arr);
//echo $one_str;
$arr_pieces = explode('__', $one_str);
echo "<br />";
$arr_pieces_num_div_2 = count($arr_pieces) / 2;
//echo "<br />$arr_pieces_num_div_2<br />";
$patt = ['/_/'];
$replace = '';
$cols = [];
$vals = [];
for($i = 0; $i < $arr_pieces_num_div_2; $i++ ) {
	array_push($cols, $arr_pieces[$i]);
}
for($i = count($cols);$i < $arr_pieces_num_div_2 * 2; $i++) {
	array_push($vals, $arr_pieces[$i]);
}

$insert_part = "INSERT INTO $tbl(";
$cols_no_table = array_pop($cols);
$columns = implode(', ', $cols);
$value_part = ") VALUES(";

$values = preg_replace($patt, $replace, $vals);

for($i = 0; $i < count($values); $i++) {
	if(strlen($values[$i]) > 2) {
		$values[$i] = '"' . $values[$i] . '"';
		//echo "<br />string: " . "gettype($values[$i])" . ": $values[$i]<br />";
	}
}

//needed to allow for underscores in inserts
$values[0] = '"' . substr($vals[0], 1) . '"';
$val_str = implode(', ', $values);
$end = ");";
$query_part1 = $insert_part . $columns . $value_part; 
$query_part2 = $val_str . $end;
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';



$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
		
		$dsn = "mysql:host=$host;dbname=$db_name";
try {
	$db = new PDO($dsn, $user, $pass);
	$query = $query_part1 . $query_part2;
	$stmt = $db->prepare($query);
	//$stmt->bindParam()
	$stmt->execute();
	$db = NULL;
	} catch (PDOException $e) {
		echo "Error: ".$e->getMessage();
	exit;
}
echo "<script>this.location.href = 'managedb.php'</script>";

?>