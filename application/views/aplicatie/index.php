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

  
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>


<body background="<?=$this->config->item('base_url')?>/files/images/body.jpg">
<div style="background-color:white; width: 85%; margin-right: auto;margin-left: auto;height: 100vh;padding:20px;";>
  <div class="page-header">
    <h1>Meniu</h1>
  </div>
    <div id="gustari" class='row'>
      <?php foreach($meniuri['gustari'] as $meniu ) {?>
        <div class='col-md-3'  >
          <ul class="check-card">
            <li class="check-card-item">
              <input type="checkbox" id="check<?= $meniu->produs_id?>" name="check" value="1">
              <label for="check<?= $meniu->produs_id?>" class="radio"></label>
              <div class="check-card-bg"></div>
              <div class="check-card-body">
                <div class="check-card-toggle">
                  <span></span>
                  <span></span>
                </div>
                  <img src="<?=$this->config->item('base_url')?>/files/images/body.jpg" style="width:100%;height:150px;">
              
                <div class="check-card-body-in text-center">
                  <h3 class="check-card-title">- <?= $meniu->produs_nume?> -</h3>
                  <p class="check-card-description">
                    <?= $meniu->produs_descriere?> 
                  </p>
                  <p class="check-card-description">
                    Pret: <?= $meniu->produs_pret?> lei
                  </p>
                </div>
                
              </div>
            </li>
          </ul>
        </div>
      <?php }?>
      <button class="btn" id='next_mic_dejun'>NEXT<button>
    </div>
    <div id="mic_dejun" class='row' style="display:none">
      <?php foreach($meniuri['mic_dejun'] as $meniu ) {?>
        <div class='col-md-3'  >
          <ul class="check-card">
            <li class="check-card-item">
              <input type="checkbox" id="check<?= $meniu->produs_id?>" name="check" value="1">
              <label for="check<?= $meniu->produs_id?>" class="radio"></label>
              <div class="check-card-bg"></div>
              <div class="check-card-body">
                <div class="check-card-toggle">
                  <span></span>
                  <span></span>
                </div>
                  <img src="<?=$this->config->item('base_url')?>/files/images/body.jpg" style="width:100%;height:150px;">
              
                <div class="check-card-body-in text-center">
                  <h3 class="check-card-title">- <?= $meniu->produs_nume?> -</h3>
                  <p class="check-card-description">
                    <?= $meniu->produs_descriere?> 
                  </p>
                  <p class="check-card-description">
                    Pret: <?= $meniu->produs_pret?> lei
                  </p>
                </div>
                
              </div>
            </li>
          </ul>
        </div>
      <?php }?>
      
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

      var modal = document.getElementById("meniuModal");
      var span1 = document.getElementsByClassName("closeModal")[0];
      span1.onclick = function() { 
        modal.style.display = "none";
      }

    

    $('#produs_checkbox').click(function() {
      console.log("dsa");
      if(this.checked) {
            $('#produs_numar').css("display","block");
          }
            
    });
  });


  function onImgClick(e){
    $('#meniuModal').css('display','block');
    $('#sourgeImageModal').attr('src',e.src);
    console.log(e.src);
  }



 //Select all
    $("#selectAll").change(function () {
        if ($(this).is(":checked")) {
            $(".checkboxSelection").each(function () {
                $(this).prop('checked', true);
            });
        }
        else {
            $(".checkboxSelection").each(function () {
                $(this).prop('checked', false);
            });
        }
    });

    $(".checkboxSelection").change(function () {
        var allSelected = true;
        $(".checkboxSelection").each(function () {
            if (!$(this).is(":checked")) {
                $("#selectAll").prop('checked', false);
                allSelected = false;
            }
        });
        if (allSelected)
            $("#selectAll").prop('checked', true);
    });
</script>

  <style>

  * {
	margin: 0;
	padding: 0;
}
*, *:before, *:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	box-sizing: border-box;
}
body {
	font-family: 'Josefin Sans', sans-serif;
	background: #ddd;
}
.check-card {
	list-style: none;
	margin: 40px auto;
  width: 16em;
}
.check-card .check-card-item {
	position: relative;
	width: 100%;
	margin: 0 1% 15px;
	font-size: 16px;
	background: #050004;
	overflow: hidden;
}
.check-card li label {
	display: block;
	position: absolute;
	height: 300px;
	width: 100%;
	z-index: 100;
	cursor: pointer;
}
.check-card .check-card-body {
	height: 24em;
	color: #fff;
	z-index: 2;
	position: relative;
}
.check-card .check-card-body-in {
	padding: 40px 20px 20px;

}
.check-card .check-card-title {
	font-family: 'Oswald', sans-serif;
	font-size: 32px;
	margin-bottom: 5px;
}
.check-card .check-card-bg,
.check-card .check-card-toggle {
	position: relative;
	background: #1e54ea;
	width: 36px;
	height: 36px;
	top: 10px;
	left: 10px;
	-webkit-border-radius: 50%;
	border-radius: 50%;
}
.check-card .check-card-bg {
	position: absolute;
	background: #3f9037;
	-webkit-transition: all .3s ease-out;
	transition: all .3s ease-out;
	-webkit-transform:scale(1);
	transform:scale(1);
	z-index: 0;
}
.check-card .check-card-toggle span {
	position: absolute;
	display: block;
	width: 20px;
	margin-left: -10px;
	height: 1px;
	top: 50%;
	left: 50%;
	background: #fff;
	-webkit-transition: all .4s ease-out;
	transition: all .4s ease-out;

	-webkit-transform: rotate(-270deg);
	transform: rotate(-270deg);
}
.check-card .check-card-toggle span:first-child {
	-webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.check-card .check-card-cancel {
	font-size: 18px;
	border-top: solid 1px #fff;
	border-bottom: solid 1px #fff;
	padding: 10px 0 7px;
	text-align: center;
	position: absolute;
	bottom: -50px;
	margin: 0 7%;
	width: 86%;
	-webkit-transition: all .3s cubic-bezier(0.5, -0.8, 0.5, 1.8);
	transition: all .3s cubic-bezier(0.5, -0.8, 0.5, 1.8);
}
.check-card input[type=checkbox] {
	display: none;
}
.check-card input[type=checkbox]:checked ~ .check-card-body .check-card-toggle span {
	-webkit-transform: rotate(0deg);
	transform: rotate(0deg);
}
.check-card input[type=checkbox]:checked ~ .check-card-body .check-card-toggle span:first-child {
	-webkit-transform: rotate(0deg);
	transform: rotate(0deg);
}
.check-card input[type=checkbox]:checked ~ .check-card-bg {
	-webkit-transform:scale(25);
	transform:scale(25);
}
.check-card input[type=checkbox]:checked ~ .check-card-body .check-card-cancel {
	bottom: 30px;
}
</style>
<?php $this->load->view('layout/footer'); ?>
