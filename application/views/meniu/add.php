<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Adauga meniu',
      'pageTitle' => 'Adauga un meniu',
      'disableSidebar' => true,
      'hidemenu' => false,
    ]
  );
?>
<!DOCTYPE html>
<script src="./src/bootstrap-input-spinner.js"></script>
<html lang="en">

<body>
<div class="page-header">
    <h1>Adauga un meniu</h1>
  </div>

  <form id="addForm" method="POST" action="/index.php/meniu/addAction" name="myForm " enctype="multipart/form-data" >
    <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
    <div class="row">
    

    <div class="form-group col-md-12">
        <label for="meniu_nume">Nume meniu</label>
        <input type="text" class="form-control" id="meniu_nume" name="meniu_nume" value="<?php echo set_value('meniu_nume'); ?>" required>
    </div>

     <div class="form-group col-md-12 ">
        <label for="meniu_descriere">Descriere meniu</label>
        <input type="text" class="form-control"   id="meniu_descriere" name="meniu_descriere" value="<?php echo set_value('meniu_descriere'); ?>">
    </div>

    <div class="form-group col-md-4 ">
        <label for="meniu_pret">Pret</label>
        <input type="number" class="form-control" id="meniu_pret" name="meniu_pret" value="<?php echo set_value('meniu_pret'); ?>">
    </div>

    <div class="form-group col-md-4 ">
        <label for="meniu_ingrediente">Ingrediente</label>
        <input type="text" class="form-control" id="meniu_ingrediente" name="meniu_ingrediente" value="<?php echo set_value('meniu_ingrediente'); ?>">
    </div>
    
    <div class="form-group col-md-4 ">
        <label for="meniu_categorie">Categorie meniu</label>
        <input type="number" class="form-control" id="meniu_categorie" name="meniu_categorie"value="<?php echo set_value('meniu_categorie'); ?>">
    </div>

    <div class="form-group col-md-12 ">
        <label for="meniu_avatar">Avatar</label>
        <input type="file" class="form-control" id="meniu_avatar" name="meniu_avatar" value="<?php echo set_value('meniu_avatar'); ?>" multiple accept=".png,.jpg,.giff" >
    </div>
  
    <div class='col-md-12'>
        <button type="number" class="btn btn-success" value=""  name="action" id="action_btn" >Adauga meniu</button>
        <a href="<?php echo $this->config->item('base_url').'index.php/admin/list'; ?>" class='btn btn-danger'>Renunta</a>
    </div>

  
</div>
</form>
</body>

</html>
<script>
    $('#produs_pret').inputSpinner()
</script>
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