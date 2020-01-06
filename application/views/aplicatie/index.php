<?php
/** @var $produss object */

$this->load->view(
    'layout/header',
    [
      'assetsNamespace' => 'aplicatie',
      'pageTitle' => 'Aplicatie',
        'requireJs'=>['libs/jquery.dataTables.min.js','libs/dataTables.fixedHeader.min.js'],
        'requireCSS'=>['libs/jquery.dataTables.min.css','libs/fixedHeader.dataTables.min.css'],
        'hidemenu' => false,
    ]
  );
?>

  <div class="page-header">
    <h1>Lista surse</h1>
  </div>




  <div class='row'>

  <div class='col-md-12'  >
  <table class="display" id="table_produs" style="'width:100%;">
      <thead>
            <tr>
              <th width="150">Cheie sursa</th>
              <th width="150">Logo</th>
              <th width="150">Marime</th>
              <th width="150">Nume sursa</th>
              <th width="150">Url sursa</th>
              
             
            </tr>
      </thead>

      <tbody>


          <?php
          foreach ($produse as $produs) {
            $av = "./files/produsLogos/";
          ?>
      <tr>
          <td><?php echo $produs->produs_id; ?><br />
          <td>
          <?php 
            if($produs->produs_avatar!= null && file_exists($av)==true){
            ?> 
              <img id="produsImg" src='./files/produsLogos/<?=$produs->produs_avatar?>' style='max-height:20px' onclick="onImgClick(this)" >    
            <?php
            }else{
           ?>
           <i class="fa fa-file text-secondary" style="font-size:20px;"></i>
      
             <?php
            }
            ?>
          </td>
          <td><?php echo substr($produs->produs_descriere,0,6); ?>KB</td>
          <td><?php echo $produs->produs_nume; ?></td>
          <td><?php echo $produs->produs_stoc;?></td>
         
      </tr>

      <?php
      }
      ?>

      </tbody>
      <tfoot>
      <tr>
            <th>Cheie sursa</th>
            <th width="150">Logo</th>
            <th width="150">Marime</th>
            <th width="150">Nume surs</th>
            <th width="150">Url sursa</th>
        </tr>
      </tfoot>
</table>
<div id="produsModal" class="modal" align="center">
  <span class="close">&times;</span>
  <img  id="sourgeImageModal" style="max-width:100%;">
  <div id="caption"></div>
</div>
</div>
</div>
<script>
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function() {

    var table=$('#table_produs').dataTable({
        "oSearch": {"sSearch": " "},
        "language": {
            "lengthMenu": "Afiseaza cate _MENU_ randuri pe pagina",
            "zeroRecords": "Nu sunt rezultate.",
            "info": "Pagina _PAGE_ din _PAGES_>",
            "infoEmpty": "Nu sunt informatii.>",
            "search": "Cautare:');?>",
            "paginate": {
                "previous":  "Pagina precedenta",
                "next": "'Pagina urmatoare"
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

      // Get the modal
      var modal = document.getElementById("produsModal");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
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
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
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
