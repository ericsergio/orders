<?php
function booz(){
//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';

$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
			
			$dsn = "mysql:host=$host;dbname=$db_name";
	try{
		$db = new PDO($dsn, $user, $pass);
		$query = "SELECT i_name, i_type FROM items ORDER BY i_name";
		$stmt = $db->prepare($query);	
		$stmt->execute();
		echo "<form id = 'count_frm' action = 'index.php' method = 'post'><br /><table id = 'booz'>";
		echo "<th>Booz</th><th id = 'booz_type_header'>Booz Type</th><th>On Hand</th>";
		$pattern2 = ['/_/'];
		$replacement2 = ' ';
		while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
			
			$sql_field_name = $result->i_name;
			$sql_field_type = $result->i_type;
			
			if($sql_field_type >= 1){
				
				$current_item_str = preg_replace($pattern2, $replacement2, $sql_field_name);
				$row =  "
				<tr>
					<td id = '$sql_field_name'>
						$current_item_str
					</td>
					<td class = 'boozType' name = '" . $sql_field_name . "' bType = '" . $sql_field_type . "'>
						$sql_field_type
					</td>
					<td>
						<input type = 'text' name = '$sql_field_name'></input>
					</td>
				</tr>";
				echo $row;
			}
			
		}

		$db = NULL;
	} catch (PDOException $e) {
		echo "Error: ".$e->getMessage();
		exit;
	}
echo "</table><br /><input type='submit' id = 'submitBtn' name = 'submit' value = 'Submit'></input></form>";
}
?>
