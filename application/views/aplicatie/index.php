<?php
/** @var $produss object */

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'aplicatie',
      'pageTitle' => 'Aplicatie',
        'requireJs'=>['libs/jquery.dataTables.min.js','libs/dataTables.fixedHeader.min.js'],
        'requireCSS'=>['libs/jquery.dataTables.min.css','libs/fixedHeader.dataTables.min.css'],
        'hidemenu' => false,
    ]
  );
?>
  
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>


<body background="<?=$this->config->item('base_url')?>/files/images/body.jpg">
<div style="background-color:white; width: 85%; margin-right: auto;margin-left: auto;height: 100vh;padding:20px;";>
 
</div>
</body>

<?php $this->load->view('layout/footer'); ?>
