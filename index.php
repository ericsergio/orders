<!DOCTYPE html>
	<head>
		<title>Count</title>
		<author>Eric Sergio</author>
		<meta charset="UTF-8">
		<link rel='stylesheet' href='styles/main.css'>
		<link rel='stylesheet' href='styles/header.css'>
		<link rel='stylesheet' href='styles/dialog.css'>
	</head>
	<body onresize = "resizeHead()">
		<header>
			<?php
				require('pages/header.php');
			?>
		</header>
		<div class = 'cContent'>
			<div class='typeMenu'>
				<ul class = boozTypes></ul>
			</div>
			<div class = 'rightSideBar'>
				<ul class = boozDists></ul>
			</div>
			<div class = 'tblContain'>
			<?php
				//fn.php has the booz function which has an array of all the booz items 
				//it also creates the form and table using the items from the array. 
				require('pages/fn.php');
				booz();
			 ?>
			</div>
		</div>
		<script type = 'text/javascript' src = 'scripts/jQuery.js'></script>
		<script type = 'text/javascript' src = 'scripts/jQueryUI.js'></script>
		<script type = 'text/javascript' src = 'scripts/app.js'></script>
		<script type = 'text/javascript' src = 'scripts/header.js'></script>
		<script type = 'text/javascript' src = 'scripts/o.js'></script>
		<!--<script id = 'dialogScript' type = 'text/javascript' src = 'scripts/man.js'></script>-->
		
	</body>


<?php
	
	//array of the post items used below 
	$pst = $_POST;
	extract($pst);
	echo "<p id = 'check'>$pst[5]</p>";
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
	
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
	

	$dsn = "mysql:host=$host;dbname=$db_name";
	//this creates a new table with only the items which the user entered a count number that is lower than the set 
	//par number. This table will eventually be hidden but is used for everything since that is the whole point of 
	//this project.
	$start_tbl = "<table class = 'showOrder'><tbody>";
	$end_tbl = "</tbody></table>";
	echo $start_tbl;
	foreach($pst as $current_booz => $on_hand){
		echo $current_booz;
		if(!empty($on_hand) && $on_hand !='Submit') {
			try{
				$db = new PDO($dsn, $user, $pass);

				$match = $current_booz;
		
				$update_query = "UPDATE items SET on_hand = $on_hand WHERE i_name = :match";
				$stmt = $db->prepare($update_query);
				$stmt->bindParam(':match', $match, PDO::PARAM_STR);
				$stmt->execute();
				$err_info = $stmt->errorInfo();
		
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />";
			echo "Code: " . $e->getCode() . "<br />";
			exit;
		}
	}
		
		
		
		$db = new PDO($dsn, $user, $pass);
		$match = $current_booz;
		if(!empty($on_hand) && $on_hand !='Submit') {
		try {
			//$query = "SELECT * FROM items WHERE i_name = :match";
			$query = "SELECT * from itemDetails WHERE name = :match";
			$stmt = $db->prepare($query);
			
			$stmt->bindParam(':match', $match, PDO::PARAM_STR);
			$stmt->execute();
			$err_info = $stmt->errorInfo();
			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_name = $result->name;
				$sql_field_dist = $result->dist;
				$sql_field_type = $result->type;
				$sql_field_par = $result->par;
				$sql_field_o_type = $result->order_unit;
				$sql_field_o_quantity = $result->order_quantity;
				$sql_field_default_order = $result->default_num;
				$sql_field_on_hand = $result->on_hand;
			}
				//and again for the dist number only since this is all that I need and the distributer is how the items need to be sorted, what changes case by case is the class each item is a member of. the switch statement below now builds the table row in the correct class. Underneath each row definition, each row is echod to the page because just before this loop start_tbl was echod so this is just populating that table with the <tr>'s having the appropriate class.
				$dist_js_class = strtolower(substr($sql_field_dist, 0, 2));
				$row = "<tr class = $dist_js_class>
						<td>$sql_field_name</td>
						<td>$sql_field_dist</td>
						<td>$sql_field_type</td>
						<td>$sql_field_par</td>
						<td>$sql_field_o_type</td>
						<td>$sql_field_o_quantity</td>
						<td>$sql_field_default_order</td>
						<td>$sql_field_on_hand</td>
						</tr>\n";
						echo $row;

			$db = NULL;
			//the catch below I think provides database errors. It gave me the error "too many connections within one 
			//hour" or something like that while testing. Then I changed my connection limit from 1000 to 10000, so 
			//it works at least. 
		} catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />";
			echo "Code: " . $e->getCode() . "<br />";
			exit;
			}
		}
	}
	//finishes writing the table
	echo $end_tbl;
	echo "<script type = 'text/javascript' src = 'scripts/o.js'></script>";
	?>
</html>
