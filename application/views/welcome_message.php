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
<body background="./files/images/body.jpg">
  	
	<div style="background-color:white; width: 85%; margin-right: auto;margin-left: auto;height: 100vh">	
	<br>
		<div class="container text-center">
			<div class="row">
				<div class="col-lg-12">
					<h4 align="center"><div class="alert alert-info"> <strong> Welcome, select how you would like to take your order!.</strong></div> </h4>
					<br><br><br>
					<p>
						<a id="chelner" class="btn btn-danger" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/chelner/index/'; ?>'>
							<br />
							<i class="fa fa-male fa-5x"></i>
							<br />
							<br />
							Chelner
							<br />
						</a>
						<a id="aplicatie" class="btn btn-warning" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/aplicatie/index/'; ?>'>
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
		<br><br>
		<div align="center">
			 <img src="<?=$this->config->item('base_url')?>files/images/welcome.png" width="30%">
		</div>
	



</body>
</html>
<?php $this->load->view('layout/footer'); ?>