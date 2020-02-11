<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Editeaza meniu',
      'pageTitle' => 'Editeaza un meniu',
      'disableSidebar' => true,
      'hidemenu' => false,
    ]
  );
?>
<!DOCTYPE html>
<link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
<script src="./src/bootstrap-input-spinner.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

<html lang="en">

<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
    <div class="shadow p-2 m-2  rounded  bg-yellow text-center" style=" background-color:purple;color:white" align="center" style="margin-right: 25%;margin-left: 25%;">
        <h1>Un chelner a fost solicitat</h1>
        <h4>El se afla la masa cu numarul: <?= $comanda_chelner->comanda_masa?> </h4>
    </div>  
    
    <div class="col-md-12 text-center">
        <br>      
        <a href="<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_finalizate'?>" class='btn btn-danger'><i class="fa fa-arrow-circle-left"></i> Inapoi</a>
        <a href="<?php echo $this->config->item('base_url').'index.php/comenzi/confirma_cererea/'.$comanda_chelner->comanda_id; ?>" class='btn btn-success'> Confirma cererea</a>
     </div>
<br>

    
</div>

</body>
</html>

