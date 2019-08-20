<!DOCTYPE html>
	<head>
		<title>Manage Database</title>
		<meta name="author" content="Eric Sergio">
		<meta charset="UTF-8">
		<link rel = 'stylesheet' href='../styles/p_main.css'>
		<link rel = 'stylesheet' href = '../styles/header.css'>
		<link rel = 'stylesheet' href = '../styles/insertItem.css'>
		<script type = 'text/javascript' src = '../scripts/jQuery.js'></script>
		<script type = 'text/javascript' src = '../scripts/jQueryUI.js'></script>
		<script type = 'text/javascript' src = '../scripts/p_app.js'></script>
		<script type = 'text/javascript' src = '../scripts/header.js'></script>
		<script type = 'text/javascript' src = '../scripts/insertItem.js'></script>
	</head>
	<body onresize = "resizeHeadAndTopControls()">
	<header>
		<?php
			include('header.php');
		?>
	</header>
	<form id = 'frm' name = 'myForm' action = 'do_db.php' method = 'post'></form>
		<div class = 'p_cContent'>
			<div class = 'p_top_controls'>
				<ul class = 'tblOpenControls'></ul>
			</div>
			
			<div class = 'p_sidebar'>
				<h4></h4>
			</div>
		</div>
		<footer class = 'p_footer'>
			<?php 
				include('footer.php');
			?>
		</footer>
	</body>
</html>
