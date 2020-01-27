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
  
<div class="container-fluid">
	
	
	<?php
	
	$i=0;
	foreach($meniuri as $key=>$value){ if(count($value)<=0) continue; $categories[]=$key;?>
	<div id="categorie_<?=$key;?>" class="catContainer mb-5" style="<?=$i?'display:none':'';?>">
		<div class="row">
		<div class="col-12 text-center "><h4><?=$key;?></h4><hr></div>
		<?php foreach($value as $meniu){ ?>
			<div class="col-md-3 text-center border border-left-0 border-right-0 rounded mb-4" style="">
				<h5><?=$meniu->meniu_nume;?></h5>
				<img src="<?=$meniu->meniu_avatar?$meniu->meniu_avatar:'/files/images/poza_meniu.png'?>" width="100%"><hr>
				<div class="row">
					<div class="col-md-12 display-4">
						<strong><?=$meniu->meniu_pret;?> LEI</strong>
					</div>
					
					<div class="col-md-12 display-4">
						<button class="btn btn-success btn-block" onclick='add_to_cart(`<?=json_encode($meniu);?>`)'>Adauga</button>
					</div>
					<div class="col-md-6 ">	
					
					</div>
					<div class="col-12">
						<small><strong>Descriere :</strong><br><?=$meniu->meniu_descriere;?></small>
					</div>
					<div class="col-12">
						<small><strong>Ingrediente :</strong><br><?=$meniu->meniu_ingrediente;?></small>
					</div>
				</div>
				
			</div>
		<?php }?>
		</div>
	</div>
	
	<?php $i++; }?>
</div>
<nav class="navbar fixed-bottom navbar-light bg-dark">
 <div class="col-3">
 <button class="btn btn-primary" disabled id="btn_prev" onclick="prev_cat()"> << Inapoi</button>
 </div>
 <div class="col-3 text-center text-white" id="cart_details">
 0 produse in cos(0 lei)
 </div>
  <div class="col-3 text-right">
 <button class="btn btn-primary" onclick="next_cat()" id="btn_next"> Inainte (<?=$categories[1];?>)</button>
 </div>
</nav>

<script>
 var categories=JSON.parse('<?=json_encode($categories);?>');
 var currentCategory=0;
 var maxCat=categories.length;
 var cart=new Array();
 var cartTotal=0;
 
 function next_cat()
 {
	 $('#categorie_'+categories[currentCategory]).hide();
	 $('#categorie_'+categories[currentCategory+1]).show();
	 if(maxCat>(currentCategory+2)){
		$('#btn_next').html("Inainte ("+categories[currentCategory+2]+")");
	$('#btn_prev').html("Inapoi ("+categories[currentCategory]+")").prop('disabled',false);
		currentCategory++;
	 }else{
		 $('#btn_prev').html("Inapoi ("+categories[currentCategory]+")").prop('disabled',false);
		 $('#btn_next').html("Finalizeaza comanda").removeClass().addClass("btn btn-success").attr('onclick','checkout()');
		currentCategory++;
	} 
 }
 
 function prev_cat()
 {
	 $('#categorie_'+categories[currentCategory]).hide();
	 $('#categorie_'+categories[currentCategory-1]).show();
	 if((currentCategory-2)>=0){
		$('#btn_next').html("Inainte ("+categories[currentCategory]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		$('#btn_prev').html("Inapoi ("+categories[currentCategory-2]+")").prop('disabled',false);
		currentCategory--;
	 }else{
		 $('#btn_prev').html("Inapoi ").prop('disabled',true);
		 $('#btn_next').html("Inainte ("+categories[currentCategory]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		 currentCategory--;
	 } 
 }
 
 function add_to_cart(productInfo){
	 cart.push(productInfo);
	 productInfo=JSON.parse(productInfo);
	 cartTotal+=parseFloat(productInfo['meniu_pret']);
	 $('#cart_details').html(cart.length +' produse in cos ('+ cartTotal +' lei)');
 }
 
 
</script>
<?php //$this->load->view('layout/footer'); ?>
