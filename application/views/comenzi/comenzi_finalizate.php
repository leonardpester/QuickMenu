<?php

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'Comenzi Finalizate',
      'pageTitle' => 'Comenzi Finalizate',
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

<div class="shadow p-2 m-2  rounded  bg-yellow" style=" background-color:#707078;color:white" align="center" style="margin-right: 25%;margin-left: 25%;">
    <h1>Comenzi finalizate</h1>
</div>
<br><br>




  <div class='row'>
  
    <div class='col-md-12 text-center'  >

            <?php
            foreach ($comenzi_chelner as $comanda_chelner) {
            ?>
                <a class="btn m-3"  style=" background-color:blue;color:white" href='<?php echo $this->config->item('base_url').'index.php/comenzi/comanda_chelner/'.$comanda_chelner->comanda_id ?>' >Chelner: <?= $comanda_chelner->comanda_id?></a>

            <?php
            }
            ?>


    </div>

  <div class='col-md-12 text-center'  >

        <?php
        foreach ($comenzi as $comanda) {
        ?>
            <a class="btn m-3"  style=" background-color:#fe0002;color:white" href='<?php echo $this->config->item('base_url').'index.php/comenzi/comenzi/'.$comanda->comanda_id ?>' >Comanda numarul: <?= $comanda->comanda_id?></a>
        
      <?php
        }
        ?>

        <div class="col-md-12 text-center">
            <br><br><br><br>    
            <a href="<?php echo $this->config->item('base_url').'index.php/admin/list'; ?>" class='btn btn-danger'><i class="fa fa-arrow-circle-left"></i> Inapoi</a>
        </div>
 
</div>
</div>
</div>
</div>
</body>
<script>


$(document).ready(function() {

    var table=$('#table_comanda').dataTable({
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