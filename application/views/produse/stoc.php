<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'stoc',
      'pageTitle' => 'Stoc',
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

<body style="background-color:#e5e6e1">
<div class="shadow p-3 mb-2 mt-2 bg-white rounded" style="background-color:white; width: 60%; margin-right: auto;margin-left: auto;height: 100%">
 <div class="page-header">
    <h1>Inventar</h1>
  </div>




  <div class='row'>

  <div class='col-md-12'  >
  <table class="display" id="table_produs" style="'width:100%;">
      <thead>
            <tr>
               <th >Nr. Crt.</th>    
              <th >Denumire</th>  
              <th >Cantitate</th> 
               <th width="150"><a href='<?php echo $this->config->item('base_url').'index.php/produse/adaugaProdus'; ?>'><button class='btn btn-success btn-sm d-block'>Adaugă ingredient</button></a></th>
            </tr>
      </thead>
      <tbody>
          <?php
          $i =1;
          foreach ($produse as $produs) {
          ?>
      <tr>
          <td><?php echo $i; ?><br >
          <td><?php echo $produs->produs_nume; ?></td>
          <td><?php echo $produs->produs_cantitate;?>g</td>
         
          <th>
            <a href='<?php echo $this->config->item('base_url').'index.php/produse/edit/'.$produs->produs_id; ?>' ><i class='fa fa-edit' style="font-size:30px;" data-toggle="tooltip" title="Editeaza ingredientul"></i></a>
            <a href='<?php echo $this->config->item('base_url').'index.php/produse/delete/'.$produs->produs_id ?>' onclick="return confirm('Sunteti sigur ca doriti sa stergeti acest ingredient?');"><i class="fa fa-remove" style="font-size:30px;color:red;" data-toggle="tooltip" title="Sterge produsul"></i></a>
          </th>
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
              <th >Cantitate</th> 
              <th width="150"><a href='<?php echo $this->config->item('base_url').'index.php/produse/adaugaProdus'; ?>'><button class='btn btn-success btn-sm d-block'>Adaugă ingredient</button></a></th>
       
              
        </tr>
      </tfoot>
</table>


<div id="produsModal" class="modal" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" id="inchideModal" class="close" data-dismiss="modal">X</button>
        <br>
      </div>
      <div class="modal-body">
        <img  id="produsImageModal" style="max-width:100%;">
      </div>
    </div>
  </div>
</div>


 
</div>
</div>
</div>
</div>
</body>
<script>


$(document).ready(function() {

    var table=$('#table_produs').dataTable({
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

      $('#inchideModal').click = function() { 
        console.log("dsadsad");
        $('#produsModal').css('display','none');
      }
  });


  function onImgClick(e){
    $('#produsModal').css('display','block');
    $('#produsImageModal').attr('src',e.src);
  }

</script>
