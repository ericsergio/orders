<!DOCTYPE html>
	<head>
		<title>Count</title>
		<meta name="author" content="Eric Sergio">
		<meta charset="UTF-8">
		<link rel='stylesheet' href='styles/main.css'>
		<link rel='stylesheet' href='styles/header.css'>
		<link rel='stylesheet' href='styles/dialog.css'>
		
	</head>
	<body onresize = "resizeHeadDistsAndTypes()">
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
		<p id = 'hiddenIdx'></p>
		<script type = 'text/javascript' src = 'scripts/jQuery.js'></script>
		<script type = 'text/javascript' src = 'scripts/jQueryUI.js'></script>
		<script type = 'text/javascript' src = 'scripts/app.js'></script>
		<script type = 'text/javascript' src = 'scripts/header.js'></script>
		<script type = 'text/javascript' src = 'scripts/o.js'></script>
		<!--<script id = 'dialogScript' type = 'text/javascript' src = 'scripts/man.js'></script>-->
	</body>
<?php
	$pst = $_POST;
	extract($pst);
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
	$dsn = "mysql:host=$host;dbname=$db_name";
	$pgs = ['dists/Southern.html', 'dists/Columbia.html', 'dists/Crown.html', 'dists/Youngs.html'];
	$fp_end = "</tbody></table>";
	$start_tbl = "<table class = 'showOrder'><tbody>";
	$end_tbl = "</tbody></table>";
	echo $start_tbl;
	for($i = 0; $i < 4; $i++) {
		$table_id = substr($pgs[$i], 6, 2) . '_tbl';
		$fp_start = "<table id = '" . $table_id . "' class = 'orderTables'><tbody>\n";
		`echo '' > $pgs[$i]`;
		$fp = fopen($pgs[$i], 'a');
		fwrite($fp, $fp_start);
		fclose($fp);
	}
	$num = 0;
	foreach($pst as $current_booz => $on_hand){
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
				
				//and again for the dist number only since this is all that I need and the distributer is how the items need to be sorted, what changes case by case is the class each item is a member of. the switch statement below now builds the table row in the correct class. Underneath each row definition, each row is echod to the page because just before this loop start_tbl was echod so this is just populating that table with the <tr>'s having the appropriate class.
				$dist_js_class = strtolower(substr($sql_field_dist, 0, 2));
				if($sql_field_on_hand < $sql_field_par) {
					$new_order_yesno = ['so' => 0, 'co' => 0, 'cr' => 0, 'yo' => 0];
					extract($new_order_yesno);
					foreach($new_order_yesno as $current => $value) {
						if($current == $dist_js_class) {
							$new_order_yesno["$current"] = 1;
						}
					}
					$num++;
					$row = "<tr class = $dist_js_class>
						<td id = 'name'>$sql_field_name</td>
						<td id = 'defaultOrder'>$sql_field_default_order</td>
						<td id = 'dist'>$sql_field_dist</td>
						<td id = 'type'>$sql_field_type</td>
						<td id = 'par'>$sql_field_par</td>
						<td id = 'orderType'>$sql_field_o_type</td>
						<td id = 'orderQuantity'>$sql_field_o_quantity</td>
						<td id = 'onHand'>$sql_field_on_hand</td>
						</tr>\n";
				$str = "<p id = itemName_$num>$sql_field_name,$sql_field_dist,$sql_field_type,$sql_field_par,$sql_field_o_type,$sql_field_o_quantity,$sql_field_default_order,$sql_field_on_hand</p>\n";
						//echo $row;
						foreach($new_order_yesno as $current => $value) {
							if($value == 1) {
								$fp = fopen('dists/'.$sql_field_dist.'.html', 'a');
								fwrite($fp, $row);
								fclose($fp);
							}
						}
					}
				}
			$db = NULL;
		} 	catch (PDOException $e) {
			echo "Error: " . $e->getMessage() . "<br />";
			echo "Code: " . $e->getCode() . "<br />";
			exit;
			}
		}
	}
	//finishes writing the table
	echo $end_tbl;
	//echo "<script type = 'text/javascript' src = 'scripts/o.js'></script>";
	for($i = 0; $i < 4; $i++) {
		$fp = fopen($pgs[$i], 'a');
		fwrite($fp, $fp_end);
		fclose($fp);
		include($pgs[$i]);
	}
	?>
</html>
