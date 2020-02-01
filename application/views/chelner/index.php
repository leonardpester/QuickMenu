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
<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
<br>
  <div align="center">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-info" align="center" style="margin:auto;">
          <p><strong>Info!</strong> Ati ales optiunea 'Chelner'</p>
          <p>Un chelner se indreapta spre dumneavoastra !</p>
        </div>
        <br>
        <br>
        <div >
          <img src="<?=$this->config->item('base_url')?>files/images/chelner.png" width="40%">
        </div>
        <br><br>
        <progress class="progress-bar" value="0" max="10" id="progressBar" style="width:40%;"></progress>
      </div>
    </div>
  </div>
<br><br>  
</body>
</html>
<script>
var timeleft = 10;
  var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
    if(timeleft <= 0){
      window.location.assign('<?= $this->config->item('base_url')?>') ;
    }
  }, 1000);
</script>
