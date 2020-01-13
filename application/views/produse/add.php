<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Adauga produs',
      'pageTitle' => 'Adauga un produs',
      'disableSidebar' => true,
      'hidemenu' => false,
    ]
  );
?>
<!DOCTYPE html>
<html lang="en">

<body>
<div class="page-header">
    <h1>Adauga un produs</h1>
  </div>

  <form id="addForm" method="POST" action="addAction" name="myForm " enctype="multipart/form-data" >
    <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
    <div class="row">
    

    <div class="form-group col-md-12">
        <label for="produs_nume">Nume produs</label>
        <input type="text" class="form-control" id="produs_nume" name="produs_nume" value="" required>
    </div>

    <div class="form-group col-md-12 " >
        <label for="produs_descriere">Descriere produs</label>
        <input type="text" class="form-control" id="produs_descriere" name="produs_descriere" value=""required >
    </div>

    <div class="form-group col-md-12 ">
        <label for="produs_avatar">Avatar</label>
        <input type="file" class="form-control" id="produs_avatar" name="produs_avatar" value="" multiple accept=".png,.jpg,.giff" >
    </div>

    <div class="form-group col-md-12 ">
        <label for="produs_stoc">STOC</label>
        <input type="text" class="form-control" id="produs_stoc" name="produs_stoc" value="" >
    </div>

    <div class="form-group col-md-12 ">
        <label for="produs_pret">Pret produs</label>
        <input type="text" class="form-control" id="produs_pret" name="produs_pret" value="" >
    </div>

    <div class='col-md-12'>
        <button type="submit" class="btn btn-primary" value=""  name="action" id="action_btn" >Adauga produs</button>
        <a href="<?php echo $this->config->item('base_url').'index.php/admin/list'; ?>" class='btn btn-danger'>Renunta</a>
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