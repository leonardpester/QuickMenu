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
<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
  <div align="center">
  
  <div class="shadow p-3 rounded  bg-yellow" style="background-color:#f86d71;color:white" align="center" style="margin-right: 25%;margin-left: 25%;">
 	 <h3>Panoul administratorului</h3>
  </div>
  <div class="container text-center">
			<div class="row" style="height:100%">
				<div class="col-lg-12" >
					<br><br><br>
					<p style="margin:auto;" >
						<a id="chelner" class="btn btn-info ml-5 mr-5 mb-3" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_primite/'; ?>'>
							<br />
						    <i class="fa fa-inbox fa-5x"></i>
							<br />
							<br />
							Comenzi primite
							<br />
						</a>
						<a id="aplicatie" class="btn btn-success ml-5 mr-5 mb-3" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_finalizate/'; ?>'>
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
						<a id="meniuri" class="btn btn-primary ml-5 mr-5 mb-3" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/meniu/meniu/'; ?>'>
							<br />
                            <i class="fa fa-medium fa-5x"></i>
							
							<br />
							<br />
							Meniuri
							<br />
						</a>
						<a id="produse" class="btn btn-dark ml-5 mr-5 mb-3" style="height:200px;width:250px;"  href='<?php echo $this->config->item('base_url').'index.php/produse/stoc/'; ?>'>
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
