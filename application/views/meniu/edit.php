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

<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
<div class="page-header">
    <h1>Editeaza un produs</h1>
  </div>

  <form id="addForm" method="POST" action="/index.php/meniu/editAction" name="myForm " enctype="multipart/form-data" >
    <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
    <div class="row">
    
     <input type="hidden" name="meniu_id" value="<?php echo $meniu->meniu_id; ?>">

    <div class="form-group col-md-12">
        <label for="meniu_nume">Denumire produs</label>
        <input type="text" class="form-control" id="meniu_nume" name="meniu_nume" value="<?php echo ($post) ? set_value('meniu_nume') : $meniu->meniu_nume; ?>" required>
    </div>

 
    
    <div class="form-group col-md-4 ">
        <label for="meniu_pret">Pret produs</label>
        <input type="number" class="form-control" id="meniu_pret" name="meniu_pret" value="<?php echo ($post) ? set_value('meniu_pret') : $meniu->meniu_pret; ?>" >
    </div>

    <div class="form-group col-md-4 ">
            <label for="meniu_ingrediente" class="required">Ingrediente</label>
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
        <label for="meniu_categorie">Categorie produs</label>
        <select class="form-control" id="meniu_categorie" name="meniu_categorie" >
            <?php    
            foreach ($categorii as $categorie) {
            ?>
            <option value="<?=$categorie->categorie_id; ?>" <?= ($meniu->meniu_categorie==$categorie->categorie_id) ? 'selected' : ''; ?>><?=$categorie->categorie_nume?></option>
            <?php
            }
            ?>
        </select>
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