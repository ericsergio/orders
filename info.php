<!DOCTYPE html>
	<head>
		<title>Info</title>
		<meta name="author" content="Eric Sergio">
		<meta charset="UTF-8">
		<link rel='stylesheet' href='../styles/main.css'>
		<link rel='stylesheet' href='../styles/header.css'>
		<link rel='stylesheet' href='../styles/info.css'>
		<script type = 'text/javascript' src = '../scripts/jQuery.js'></script>
		<script type = 'text/javascript' src = '../scripts/jQueryUI.js'></script>
		<script type = 'text/javascript' src = '../scripts/app.js'></script>
		<script type = 'text/javascript' src = '../scripts/header.js'></script>
		<script type = 'text/javascript' src = '../scripts/info.js'></script>
	</head>
	<body onresize = "resizeHead()">
		<header>
			<?php
				require('header.php');
			?>
		</header>
		<div class = 'cContent'>
			<div class='typeMenu'>
				<ul class = boozTypes></ul>
			</div>
			<div class = 'tblContain'></div>
			<?php
				//fn.php has the booz function which has an array of all the booz items 
				//it also creates the form and table using the items from the array. 
				require('fn.php');
				booz();
				$clicked = htmlspecialchars($_POST['clicked']);
				//echo $clicked;
				$clicked_item = $clicked;

//$user = 'webdatat_serg852';$pass = 'l[V^p6?1PrN}';$host = 'serg8529.webdatatutorial.com';$db_name = 'webdatat_serg8529';
							
$user = 'ericsergio';$pass = 'password';$host = '127.0.0.1';$db_name = 'orders';
								
				$dsn = "mysql:host=$host;dbname=$db_name";
				
				try{
					$db = new PDO($dsn, $user, $pass);
					
					$query = "SELECT * FROM itemOrderHistory WHERE name = :clicked_item";
					$stmt = $db->prepare($query);
					$stmt->bindParam(':clicked_item', $clicked_item, PDO::PARAM_STR);
					$stmt->execute();
					
					while($result = $stmt->fetch(PDO::FETCH_OBJ)) {
						
						$sql_field_name = $result->Name;
						$sql_field_on_hand = $result->On_Hand;
						$sql_field_ordered_total = $result->Total;
						$sql_field_unit = $result->Unit;
						$sql_field_unit_quantity = $result->Unit_Quantity;
						$sql_field_type = $result->Type;
						$sql_field_datestart = $result->DateStart;
						$sql_field_dateend = $result->EndDate;
						$sql_field_orderedcount = $result->OrderedCount;

						echo "
						<div class = 'orderHistorySqlView'>
							<p id = 'selectedItem'>$sql_field_name</p>
							<p id = 'on_hand'>$sql_field_on_hand</p>
							<p id = 'quantity'>$sql_field_ordered_total</p>
							<p id = 'unit'>$sql_field_unit</p>
							<p id = 'unitQuantity'>$sql_field_unit_quantity</p>
							<p id = 'itemType'>$sql_field_type</p>
							<p id = 'firstOrder'>$sql_field_datestart</p>
							<p id = 'lastOrder'>$sql_field_dateend</p>
							<p id = 'orderedCount'>$sql_field_orderedcount</p>
						</div>";
					}	
					$db = NULL;
				} catch (PDOException $e) {
					echo "Error: " . $e->getMessage();
					exit;
				}
			?>
			</div>
		</div>
	</body>
</html>
