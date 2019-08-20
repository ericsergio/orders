<?php
//written by Eric Sergio
//This page is the action page in the form post on managedb.html. It retrieves the tables from the database to be viewed. Eventually I intend on making the database editable via a more user friendly browser page so that one doesnt need to know SQL to modify database to fit their needs.




//This value changes based on which tab was clicked
//if the first tab was clicked it will be the name of the first item in the array in p_app.js along with the concatenated index number which is used for the below switch statement
$one = $_POST['one'];
$two = $_POST['two'];

//echo "$two";

//gets the last character of the variable submited from the form on managedb.html - used in below switch
$clicked = substr($one, -1, 1);
require('managedb.php');
echo "<p id = 'currTable'>$clicked</p>";
echo "<script type = 'text/javascript' src = '../scripts/do_db.js'></script>";

//echo "<p id = 'odb'>$one <br /> $clicked<p>";
//echo "<style>#odb{position:absolute;top:20%;left:65%;color:#000000; height:10%; width:11%; border:solid blue 2px; z-index:7;}</style>";

//start the table which will be populated based on the index of the tab that was clicked in managedb.html
echo "<table id = 'results'><tbody>";

//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';

$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
		
		$dsn = "mysql:host=$host;dbname=$db_name";
//the queries that correspond to which top tab in managedb.html that was clicked
$queries = [
	'SELECT * FROM items ORDER BY i_type',
	'SELECT * FROM dists',
	'SELECT * FROM order_units',
	'SELECT * FROM ordered',
	'SELECT * FROM unit_quantity'
];
try {
	$db = new PDO($dsn, $user, $pass);
	$query = $queries[$clicked];
	$stmt = $db->prepare($query);
	//$stmt->bindParam()
	$stmt->execute();
	
	
	//depending on the index of what tab was clicked get the contents of the corresponding table from the db
	switch($clicked) {
		case 0:
			echo "<tr class = 'tblHead'><th>Item</th><th>Distributer</th><th>Item Type</th><th>Par Number</th><th>Order Type</th><th>Order Quantity</th><th>Default Order</th><th>On Hand</th></tr>";
/*			echo "<tr><td><input type = 'text' name = 'field_name'></input></td><td><input type = 'text' name = 'field_dist'></input></td><td><input type = 'text' name = 'field_type'></input></td><td><input type = 'text' name = 'field_par'></input></td><td><input type = 'text' name = 'field_order_type'></input></td><td><input type = 'text' name = 'field_order_quantity'></input></td><td><input type = 'text' name = 'field_default_order'></input></td><td><input type = 'text' name = 'field_on hand'></input></td></tr>";
*/

			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_name = $result->i_name;
				$sql_field_dist = $result->i_dist;
				$sql_field_type = $result->i_type;
				$sql_field_par = $result->i_par;
				$sql_field_o_type = $result->d_order_type;
				$sql_field_o_quantity = $result->d_order_quantity;
				$sql_field_default_order = $result->default_order;
				$sql_field_on_hand = $result->on_hand;
				$result_arr = [$sql_field_name, $sql_field_dist, $sql_field_type, $sql_field_par, $sql_field_o_type, $sql_field_o_quantity, $sql_field_default_order, $sql_field_on_hand];
				extract($result_arr);
				echo "<tr id = row_" . $sql_field_name . ">";
				foreach($result_arr as $current) {
					echo "<td>$current</td>";
				}
				echo "</tr>";
			}
			echo "</tbody></table>";
			break;
		case 1:
			echo "<tr><th>d_id</th><th>d_name</th></tr>";
			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_d_id = $result->d_id;
				$sql_field_d_name = $result->d_name;
				$result_arr = [$sql_field_d_id, $sql_field_d_name];
				extract($result_arr);
				echo "<tr>";
				foreach($result_arr as $current) {
					echo "<td>$current</td>";
				}
				echo "</tr>";
			}
			echo "</tbody></table>";
			break;
		case 2:
			echo "<tr><th>ou_id</th><th>ou_name</th></tr>";
			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_ou_id = $result->ou_id;
				$sql_field_ou_name = $result->ou_name;
				$result_arr = [$sql_field_ou_id, $sql_field_ou_name];
				extract($result_arr);
				echo "<tr>";
				foreach($result_arr as $current) {
					echo "<td>$current</td>";
				}
				echo "</tr>";
			}
			echo "</tbody></table>";
			break;
		case 3:
			echo "<tr><th>o_id</th><th>o_name</th><th>o_quantity</th><th>o_unit</th><th>o_unit_quantity</th>o_date<th></th></tr>";
			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_o_id = $result->o_id;
				$sql_field_o_name = $result->o_name;
				$sql_field_o_quantity = $result->o_quantity;
				$sql_field_o_unit = $result->o_unit;
				$sql_field_o_unit_quantity = $result->o_unit_quantity;
				$sql_field_o_date = $result->o_date;
				$result_arr = [$sql_field_o_id, $sql_field_o_name, $sql_field_o_quantity, $sql_field_o_unit, $sql_field_o_unit_quantity, $sql_field_o_date];

				extract($result_arr);
				echo "<tr>";
				foreach($result_arr as $current) {
					echo "<td>$current</td>";
				}
				echo "</tr>";
			}
			echo "</tbody></table>";
			break;
		case 4:
			echo "<tr><th>uq_id</th><th>uq_name</th></tr>";
			while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
				$sql_field_uq_id = $result->uq_id;
				$sql_field_uq_name = $result->uq_name;
				$result_arr = [$sql_field_uq_id, $sql_field_uq_name];
				extract($result_arr);
				echo "<tr>";
				foreach($result_arr as $current) {
					echo "<td>$current</td>";
				}
				echo "</tr>";
			}
			echo "</tbody></table>";
			//echo "<script>tryMvTbl()</script>";
			break;
		default:
			echo "hoping this isnt shown";
			break;
	}
	$db = NULL;
	} catch (PDOException $e) {
		echo "Error: ".$e->getMessage();
		exit;
}
include('footer.php');
//something to look into later; uses js to change the form action page which could be used to control which function user intends on applying/what user wants to modify
/*echo "<script>doJs();</script>";*/

?>
