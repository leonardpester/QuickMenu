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
    <title>Quick Menu <?= isset($pageTitle) && $pageTitle != '' ? '&raquo; ' . $pageTitle : ''; ?></title>
   
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>
    <meta name="msapplication-TileColor" content="#66615b">
    <meta name="theme-color" content="#66615b">

    <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href='https://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
   
  <?php foreach ($requiredJSFiles as $jsfile) { ?>
      <script src="/assets/js/<?php echo $jsfile; ?>"></script>
  <?php } ?>
</head>
<body>

<div id="loader" ></div>
<?php if (!$hidemenu) { ?>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    <a class="navbar-brand" href="/">QuickMenu</a>
  </nav>
<?php } ?>



