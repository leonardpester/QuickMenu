<?php
/** @var $produss object */

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

<body background="<?=$this->config->item('base_url')?>/files/images/body.jpg">
<div style="background-color:white; width: 85%; margin-right: auto;margin-left: auto;height: 100vh;padding:20px;";>
  <div class="page-header">
    <h1>Inventar</h1>
  </div>




  <div class='row'>

  <div class='col-md-12'  >
  <table class="display" id="table_produs" style="'width:100%;">
      <thead>
            <tr>
              <th width="5%">Nr. Crt.</th>
              <th width="5%">Imagine</th>
              <th width="15%">Denumire</th>
              <th width="40%">Descriere</th>
              <th width="10%">Pret</th>
              <th witdh="10%">Cantitate</th>
              <th witdh="5%">Stoc</th>
             
            </tr>
      </thead>
      <tbody>
          <?php
          $i =1;
          foreach ($produse as $produs) {
          ?>
      <tr>
          <td><?php echo $i; ?><br />
          <td>
          <?php 
            if($produs->produs_avatar!= null){
            ?> 
              <img id="produsImg" src='<?=$this->config->item('base_url')?>/files/images/<?=$produs->produs_avatar?>' style='max-height:20px' onclick="onImgClick(this)" >    
            <?php
            }else{
           ?>
           <i class="fa fa-file text-secondary" style="font-size:20px;"></i>
             <?php
            }
            ?>
          </td>
          <td><?php echo $produs->produs_nume; ?></td>
          <td><?php echo $produs->produs_descriere; ?></td>
          <td><?php echo $produs->produs_pret;?> lei</td>
          <td>10</td>
          <td>23</td>
      </tr>
      <?php
      $i++;
      }
      ?>

      </tbody>
      <tfoot>
       <tr>
              <th width="5%">Nr. Crt.</th>
              <th width="5%">Imagine</th>
              <th width="15%">Denumire</th>
              <th width="40%">Descriere</th>
              <th width="10%">Pret</th>
              <th witdh="10%">Cantitate</th>
              <th witdh="5%">Stoc</th>
              
        </tr>
      </tfoot>
</table>


<div id="produsModal" class="modal" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">X</button>
        <br>
      </div>
      <div class="modal-body">
        <img  id="sourgeImageModal" style="max-width:100%;">

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

      var modal = document.getElementById("produsModal");
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function() { 
        modal.style.display = "none";
      }
  });


  function onImgClick(e){
    $('#produsModal').css('display','block');
    $('#sourgeImageModal').attr('src',e.src);
    console.log(e.src);
  }


</script>

  <style>

  #produsImg {

    cursor: pointer;
    transition: 0.3s;
  }

  #produsImg:hover {opacity: 0.7;}

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

  /* Modal Content (image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation */
  .modal-content, #caption {  
    -webkit-animation-name: zoom;
    -webkit-animation-duration: 0.6s;
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @-webkit-keyframes zoom {
    from {-webkit-transform:scale(0)} 
    to {-webkit-transform:scale(1)}
  }

  @keyframes zoom {
    from {transform:scale(0)} 
    to {transform:scale(1)}
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    
    font-weight: bold;
    
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    .modal-content {
      width: 100%;
    }
  }
</style>
<?php $this->load->view('layout/footer'); ?>
