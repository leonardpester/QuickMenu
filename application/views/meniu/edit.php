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
<html lang="en">

<body>
<div class="page-header">
    <h1>Editeaza un meniu</h1>
  </div>

  <form id="addForm" method="POST" action="/index.php/meniu/editAction" name="myForm " enctype="multipart/form-data" >
    <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
    <div class="row">
    
     <input type="hidden" name="meniu_id" value="<?php echo $meniu->meniu_id; ?>">

    <div class="form-group col-md-12">
        <label for="meniu_nume">Denumire meniu</label>
        <input type="text" class="form-control" id="meniu_nume" name="meniu_nume" value="<?php echo ($post) ? set_value('meniu_nume') : $meniu->meniu_nume; ?>" required>
    </div>

    <div class="form-group col-md-12 " >
        <label for="meniu_descriere">Descriere meniu</label>
        <input type="text" class="form-control" id="meniu_descriere" name="meniu_descriere" value="<?php echo ($post) ? set_value('meniu_descriere') : $meniu->meniu_descriere; ?>"required >
    </div>
    
    <div class="form-group col-md-4 ">
        <label for="meniu_pret">Pret</label>
        <input type="number" class="form-control" id="meniu_pret" name="meniu_pret" value="<?php echo ($post) ? set_value('meniu_pret') : $meniu->meniu_pret; ?>" >
    </div>

    <div class="form-group col-md-4 ">
            <label for="meniu_ingrediente" class="required">Produse</label>
            <select class="form-control"  id="meniu_ingrediente" name="meniu_ingrediente[]" multiple="multiple">
              
              <?php
              
                  foreach ($produse as $produs) {
              ?>
                    <option value="<?= $produs->produs_nume; ?>" <?= in_array($produs->produs_nume,$produseMeniu) ? 'selected' : ''; ?>><?= $produs->produs_nume; ?></option>
              <?php
              }
              ?>
            </select>
            <span class="label_error">&nbsp;</span>  </div>
    
    <div class="form-group col-md-4 ">
        <label for="meniu_categorie">Categorie meniu</label>
        <input type="number" class="form-control" id="meniu_categorie" name="meniu_categorie" value="<?php echo ($post) ? set_value('meniu_categorie') : $meniu->meniu_categorie; ?>" >
    </div>

    <div class="form-group col-md-12 ">
        <label for="meniu_avatar">Avatar</label>
        <input type="file" class="form-control" id="meniu_avatar" name="meniu_avatar" value="<?php echo ($post) ? set_value('meniu_avatar') : $meniu->meniu_avatar; ?>" multiple accept=".png,.jpg,.giff" >
    </div>

    <div class='col-md-12'>
        <button type="submit" class="btn btn-success" value=""  name="action" id="action_btn" >Editeaza meniu</button>
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

     $('#meniu_ingrediente').select2();
    
    $('#addForm').on('submit', function(){
        $('#action_btn').text("Se proceaseaza...");
        $('#action_btn').addClass('disabled');
        $('#action_btn').prop('disabled',true);
    });
  });


</script>