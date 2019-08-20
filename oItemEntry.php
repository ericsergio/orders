<?php
//itemCount is the number of named items the js page has in its order table.
	$itemCount = $_POST['item_num'];
	for($i = 0; $i < $itemCount; $i++) {
		//increment $i as high as the count of elements being sent over 
		//set var $item to be item0 item1 etc..
		$item = "item$i";
		//$item0 = $_POST['item0'] etc.. which are the hidden input names in o.js
		$item = $_POST[$item];
	}
	//get everything 
	$pst = $_POST;
	extract($pst);
	foreach($pst as $current => $value) {
		//omit the count var
		if($current !== 'item_num'){
		$$current = explode('--', $value);
		}
	}
	//echo $item1[1];
	$items = [];
	for($i = 1; $i <= $itemCount; $i++) {
		$arrName = "item$i";
		array_push($items, $$arrName);
	}
	$itemsCount = count($items);
	$today = strftime('%F');

//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
			
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
		
		$dsn = "mysql:host=$host;dbname=$db_name";
	foreach($items as $current) {
		
		$o_name = $current[1];
		$o_quantity = $current[5];
		$o_unit = $current[6];
		$o_unit_quantity = $current[7];
		$o_date = $today;
		try{
			$db = new PDO($dsn, $user, $pass);
			$insert_query =  "INSERT INTO ordered( o_name, o_quantity, o_unit, o_unit_quantity, o_date ) VALUES( :o_name, :o_quantity, :o_unit, :o_unit_quantity, :o_date )";
		
			$stmt = $db->prepare($insert_query);
			$stmt->bindParam(':o_name', $o_name, PDO::PARAM_STR);
			$stmt->bindParam(':o_quantity', $o_quantity, PDO::PARAM_STR);
			$stmt->bindParam(':o_unit', $o_unit, PDO::PARAM_STR);
			$stmt->bindParam(':o_unit_quantity', $o_unit_quantity, PDO::PARAM_STR);
			$stmt->bindParam(':o_date', $o_date, PDO::PARAM_STR);		
			$stmt->execute();
			$db = NULL;
		} catch (PDOException $e) {
			echo "Error: ".$e->getMessage();
			exit;
		} 
	}
	
	$referer = getenv("HTTP_REFERER");
	echo '<script>this.location.href = "' . $referer . '"</script>';
?>
