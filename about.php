<!DOCTYPE html>
	<head>
		<title>Info</title>
		<meta name="author" content="Eric Sergio">
		<meta charset="UTF-8">
		<link rel='stylesheet' href='../styles/main.css'>
		<link rel='stylesheet' href='../styles/header.css'>
		<link rel='stylesheet' href='../styles/p_main.css'>
		<script type = 'text/javascript' src = '../scripts/jQuery.js'></script>
		<script type = 'text/javascript' src = '../scripts/jQueryUI.js'></script>
		<script type = 'text/javascript' src = '../scripts/about.js'></script>
	</head>
	<body>
		<header>
			<?php
				require('header.php');
			?>
		</header>
		<div class = 'p_cContent'>
			<div class = 'p_top_controls'>
				<ul class = 'tblOpenControls'></ul>
			</div>
		</div>
		<footer class = 'p_footer'>
			<?php 
				include('footer.php');
			?>
		</footer>
	</body>
</html>
