<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$this->load->view(
    'layout/header',
    [
      	'assetsNamespace' => 'Welcomeee',
      	'pageTitle' => 'Welcome',
        'requireJs'=>['libs/jquery.dataTables.min.js','libs/dataTables.fixedHeader.min.js'],
        'requireCSS'=>['libs/jquery.dataTables.min.css','libs/fixedHeader.dataTables.min.css'],
    	'hidemenu' => false,
    ]
  );

?><!DOCTYPE html>

<html lang="en">
<head>
	
</head>
<body style="background-color:#e5e6e1">
	<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="width: 60%; margin-right: auto;margin-left: auto;height: 100%;">	
		<div class="container text-center">
			<div class="row">
				<div class="col-lg-12">
					<h4 align="center"> <div class="shadow p-4 rounded  bg-yellow" style=" background-color:#f07049;color:white" align="center" style="margin-right: 25%;margin-left: 25%;">
					<strong> Bine ati venit, selectati optiunea prin care doriti sa comandati!</strong></div> </h4>
					<br>
					<small><strong>INFO:</strong></small>
					<br>
					<small>Pentru optiunea 'Chelner' in cel mai scurt timp un chelner se va indrepta spre dumneavoastra iar comanda va fi preluata in mod obisnuit.</small>
					<br>
					<small>Daca selectati optiunea 'Aplicatie' comanda dumneavoastra va fi preluata in mod electronic fara a necesita venirea unui chelner pentru a va fi solicitata comanda.<small>
					<br><br><br>
					<p>
						<a id="chelner" class="btn btn-danger mb-4" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/chelner/index/'; ?>'>
							<br />
							<i class="fa fa-male fa-5x"></i>
							<br />
							<br />
							Chelner
							<br />
						</a>
						<a id="aplicatie" class="btn btn-warning mb-4" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/aplicatie/index/'; ?>'>
							<br />
							<i class="fa fa-tablet fa-5x"></i>
							<br />
							<br />
							Aplicatie
							<br />
						</a>
					</p>
				</div>
			</div>
		</div>
		
		<div align="center">
			 <img src="<?=$this->config->item('base_url')?>files/images/welcome.png" width="30%">
		</div>
</body>
</html>
