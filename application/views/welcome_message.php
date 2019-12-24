<?php

defined('BASEPATH') OR exit('No direct script access allowed');
$this->load->view(
	'layout/header',
	[
	  'assetsNamespace' => 'listContractsssssssss',
	  'pageTitle' => 'Contracte',
	   'requireJs' => ['libs/jquery.fileDownload.js','libs/jquery.dataTables.min.js', 'libs/dataTables.fixedHeader.min.js', 'libs/moment.min.js', 'libs/daterangepicker.js', 'libs/select2.full.min.js', 'libs/datedropper.min.js', 'libs/interact.min.js','libs/query-builder.standalone.js', 'libs/query-builder.it.js'],
	   'requireCSS' => ['libs/jquery.dataTables.min.css', 'libs/fixedHeader.dataTables.min.css', 'libs/query-builder.default.css','libs/select2.min.css', 'libs/date_filter.css', 'libs/datedropper.min.css'],
   	   'hidemenu' => false,
	]
  );
  
?><!DOCTYPE html>
<html lang="en">
<head>
	
</head>
<body>
	<h1 align="center"><?= $welcome_message?></h1>
</body>
</html>
<?php $this->load->view('layout/footer'); ?>