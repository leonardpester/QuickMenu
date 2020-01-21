<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Admin-Panel',
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
<body background="<?=$this->config->item('base_url')?>/files/images/body.jpg">
<div style="background-color:white; width: 85%; margin-right: auto;margin-left: auto;height: 100vh">

  <div align="center">
  <br>

  <div class="alert alert-danger" align="center" style="margin-right: 20%;margin-left: 20%;">
 	 <h3>Panoul administratorului</h3>
  </div>
  <div class="container text-center">
			<div class="row" >
				<div class="col-lg-12" >
					<br><br><br>
					<p style="margin:auto;" >
						<a id="chelner" class="btn btn-info" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_primite/'; ?>'>
							<br />
						    <i class="fa fa-inbox fa-5x"></i>
							<br />
							<br />
							Comenzi primite
							<br />
						</a>
						<a id="aplicatie" class="btn btn-success" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_finalizate/'; ?>'>
							<br />
							<i class="fa fa-book fa-5x"></i>
							<br />
							<br />
							Comenzi Finalizate
							<br />
						</a>
					</p>
				<div class="col-lg-12" >
					<br><br><br>
					<p style="margin:auto;">
						<a id="meniuri" class="btn btn-primary" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/meniu/meniu/'; ?>'>
							<br />
                            <i class="fa fa-medium fa-5x"></i>
							
							<br />
							<br />
							Meniuri
							<br />
						</a>
						<a id="produse" class="btn btn-dark" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/produse/stoc/'; ?>'>
							<br />
                            <i class="fa fa-cart-plus fa-5x"></i>
							<br />
							<br />
							Produse
							<br />
						</a>
					</p>
				</div>
			</div>
  </div>
</div>
</body>
</html>
<?php $this->load->view('layout/footer'); ?>