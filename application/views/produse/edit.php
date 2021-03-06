<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Editeaza produs',
      'pageTitle' => 'Editeaza un produs',
      'disableSidebar' => true,
      'hidemenu' => false,
    ]
  );
?>
<!DOCTYPE html>
<html lang="en">

<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
<div class="page-header">
    <h1>Editeaza un produs</h1>
  </div>

  <form id="addForm" method="POST" action="/index.php/produse/editAction" name="myForm " enctype="multipart/form-data" >
    <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
    <div class="row">
    
     <input type="hidden" name="produs_id" value="<?php echo $produs->produs_id; ?>">

    <div class="form-group col-md-12">
        <label for="produs_nume">Nume produs</label>
        <input type="text" class="form-control" id="produs_nume" name="produs_nume" value="<?php echo ($post) ? set_value('produs_nume') : $produs->produs_nume; ?>" required>
    </div>

    
    <div class="form-group col-md-12 ">
        <label for="produs_cantitate">Cantitate produs</label>
        <input type="number" class="form-control" id="produs_cantitate" name="produs_cantitate" value="<?php echo ($post) ? set_value('produs_cantitate') : $produs->produs_cantitate; ?>" >
    </div>

    <div class='col-md-12'>
        <button type="submit" class="btn btn-success" value=""  name="action" id="action_btn" >Adauga produs</button>
        <a href="<?php echo $this->config->item('base_url').'index.php/produse/stoc'; ?>" class='btn btn-danger'>Renunta</a>
    </div>

</div>  
</div>

</form>
</body>

</html>
<style>

    .note-group-select-from-files {
        display: none;
    }

    .note-fontname{
        display:none;
    }

    .note-modal-footer
    {
        margin-bottom:20px;
    }
</style>

<script>

$(document).ready(function() {
    $('#addForm').on('submit', function(){
        $('#action_btn').text("Se proceaseaza...");
        $('#action_btn').addClass('disabled');
        $('#action_btn').prop('disabled',true);
    });
  });


</script>