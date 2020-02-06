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
    <div class="page-header">
      <div class="row">
        <div class="col-md-9">
            <h1>Comanda cu numarul: <?= $comanda['comanda_id'];?> <?= ($comanda['comanda_remove'] == 0 ) ? '' : ' este gata de servire!'  ?></h1><br>
        </div>

        <div class="col-md-3 text-right">
          <a href="<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi_primite'; ?>" class='btn btn-danger'><i class="fa fa-arrow-circle-left"></i> Inapoi</a>
        </div>
      
        <div class="col-md-12 text-left">
          <strong>Masa cu numarul:</strong> <?=$comanda['masa']?>
        </div>
      
        <div class="col-md-12 text-left">
          <strong>Total comanda:</strong> <?=$comanda['total_pret']?> lei<hr>
        </div>

      </div>
    </div>
<br>
<div class="row text-center">
    <div class=" form-group col-md-12 text-left">
          <table class="display" id="table_comanda1" style="'width:100%;">
              <thead>
                    <tr>
                      <th >Nr. Crt.</th>    
                      <th >Denumire</th>  
                      <th >Portii/Bucati</th> 
                  </tr>
              </thead>
              <tbody>
                  <?php
                  $i=1;
                  foreach(json_decode($comanda['nume'])  as $nume){
                  ?>
              <tr>
                  <td><?=$i?></td>
                  <td><?=$nume->comanda_nume?> </td >
                  <td><?=$nume->comanda_bucati?>  </td>
              </tr>
              <?php
               $i++;
              }
              ?>
              </tbody>
              <tfoot>
              <tr>
                      <th >Nr. Crt.</th>    
                      <th >Denumire</th>  
                      <th >Portii/Bucati</th>              
                </tr>
              </tfoot>
        </table>
    </div>
</div>

<?php if($comanda['comanda_remove']==0){ ?>
  <form id="addForm" method="POST" action="/index.php/comenzi/comanda_finalizata/<?= $comanda['comanda_id']?>" name="myForm " enctype="multipart/form-data" >
      <input type="hidden" class="formToken" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>">
      <div class="row">
      <div class='col-md-12 text-left'>
               <p><strong> (* ) Adăugați numărul de grame din fiecare ingredient  pe care le-ati folosit pentru produsele de mai sus. </strong></p>
            </div>
        <?php foreach($comanda['comanda_ingrediente']  as $key=>$ingredient){ ?>
                      <div class="form-group col-md-3">
                          <label for="ingredient_<?= $key?>"> <?= $ingredient ?></label>
                          <input type="text" class="form-control" id="ingredient_<?= $key?>" name="ingredient_<?= $key?>" required>
                      </div>
            <?php }?>
            <div class='col-md-12 text-right'>
                <button type="number" class="btn btn-success" value=""  name="action" id="action_btn" >Finalizare </button>
            </div>

  
        </div>
  </form>
<?php }?>
</body>
</html>


<script>


$(document).ready(function() {

    var table=$('#table_comanda1').dataTable({
        "oSearch": {"Search": " "},
        "language": {
            "lengthMenu": "Afiseaza cate _MENU_ randuri pe pagina",
            "zeroRecords": "Nu sunt rezultate.",
            "info": "Pagina _PAGE_ din _PAGES_",
            "infoEmpty": "Nu sunt informatii.",
            "search": "Cautare:",
            "paginate": {
                "previous":  "Pagina precedenta",
                "next": "Pagina urmatoare"
            },
            "infoFiltered": "(rezultate filtrate din _MAX_ totale)"

        },
        fixedHeader: {
            header: true,
            footer: true
        },
        'bFilter': true,
        'bSort': true,
        "aaSorting": [[0]],         
        'serverSide': false,
        'lengthMenu': [50, 100, 150, 200, 500],
        'iDisplayLength': 50,
        'order': [[0, 'desc']],

        columnDefs: [{
            targets: "_all",
            orderable: true
        }]
    });

    
  });




</script>