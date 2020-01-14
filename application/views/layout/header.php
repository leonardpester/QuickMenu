<!DOCTYPE html>
<?php
/** @var $hidemenu bool */
defined('BASEPATH') or exit('No direct script access allowed');


$ci = &get_instance();
$requiredJSFiles = [
  'libs/jquery-3.2.1.min.js',
  'libs/popper.min.js',
  'libs/bootstrap.min.js',
];
$requiredCSSFiles = [
  'libs/bootstrap.min.css',
  'libs/bootstrap-switch.min.css',
  'libs/font-awesome.min.css',
  'style.css',
];


if (isset($requireJs) && is_array($requireJs) && count($requireJs) > 0) {
  $requiredJSFiles = array_merge($requiredJSFiles, $requireJs);
}
if (isset($requireCSS) && is_array($requireCSS) && count($requireCSS) > 0) {
  $requiredCSSFiles = array_merge($requiredCSSFiles, $requireCSS);

}

?>

<html>
<head>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <title>Quick Menu <?= isset($pageTitle) && $pageTitle != '' ? '&raquo; ' . $pageTitle : ''; ?></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <title>::CMSys || Add Division::</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>
    <meta name="msapplication-TileColor" content="#66615b">
    <meta name="theme-color" content="#66615b">


    <link href='https://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css'>

  
 



  <?php foreach ($requiredJSFiles as $jsfile) { ?>
      <script src="/assets/js/<?php echo $jsfile; ?>"></script>
  <?php } ?>


</head>
<body>

<div id="loader" ></div>
<?php if (!$hidemenu) { ?>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
     <a class="navbar-brand" href="/">QuickMenu</a>
 
     <a class="navbar-brand" href="#" style="cursor:pointer"  onclick="openModal();" >Admin-Panel</a></button>

    </nav>

<?php } ?>
<div class="wrapper">
    <div class="content ">
        <div class="container-fluid">




<div id="adminModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <p>Acest camp poate fi introdus doar de un administrator</p>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
         <input type="password" class="form-control" id="password_admin" >
         <br>
         <a  class="btn btn-primary form-control"  onclick="adminControl()">Confirma</a>
         <br>
         <br>
          <div id="messages"></div>

           <div id="caption"></div>
        <br>     
        <div class="text-center">
          <br>
        </div>
      </div>
    </div>
  </div>
</div>


<script>

  $(document).ready(function(){
  // Get the modal
  var modal = document.getElementById("adminModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
    modal.style.display = "none";
}


  });

   function adminControl(){
   //post catre metoda de stergere utilizator  userid si parola 
   var password = $('#password_admin').val();
    $.ajax({
      type: "POST",
      url: "<?php echo $this->config->item('base_url').'index.php/admin/login'; ?>",
      data: {password : password},
      success: function(response){
        console.log(response);
        if(response==='Success'){   
          window.location.assign('<?= $this->config->item('base_url').'index.php/admin/list'; ?>') ;
        }else{
           $('#messages').html(response);
        }
      },
    });  
    }

  function openModal(){
    $('#adminModal').modal('show');
  }

</script>