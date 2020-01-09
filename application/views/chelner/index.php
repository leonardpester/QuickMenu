<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Chelner',
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
<br>
  <div align="center">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-info" align="center" style="margin-right: 20px;margin-left: 20px;">
          <strong>Info!</strong> Un chelner se indreapta spre dumneavoastra !
        </div>
        <br><br><br><br>
        <div >
          <img src="<?=$this->config->item('base_url')?>files/images/chelner.png" width="40%">
        </div>
      </div>
    </div>
  </div>

</body>
</html>
<?php $this->load->view('layout/footer'); ?>