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
  
<div class="container-fluid" >
	
	<div class="row">
	<div class="col-2 text-center shadow " style="margin-bottom:0px; solid gray;background-color:#707078">
	<br>
	<h6 class="text-center" style="color:white"><strong>Categorii de produse</strong></h6>
	<br><br>
	<?php
	$i=0;
	foreach($meniuri as $key=>$value){ if(count($value)<=0) continue;
	?>
	<button onclick="go_to_category(<?=$i;?>)" class="btn btn-block " style="background-color:#f47844;color:white" <?=$i===0?'disabled':''?> id="btn_<?=$key;?>"><?=ucfirst(str_replace("_"," ",$key))?></button><br>
	<?php
	$i++;
	}
	?>
	</div>
	<div class="col-10" style="background-color:#e5e6e1">

	<?php
	
	$i=0;
	foreach($meniuri as $key=>$value){ if(count($value)<=0) continue; $categories[]=$key;?>
	<div id="categorie_<?=$key;?>" class="catContainer mb-5" style="<?=$i?'display:none':'';?>">
		<div class="row">
		<div class="col-12 text-center shadow mb-5" style="background-color:#e5e6e1"><br><h3><?=strtoupper(str_replace("_"," ",$key));?></h3><br></div>
		
		<?php foreach($value as $meniu){ ?>
		<div class="col-md-3 text-center border border-left-0 border-right-0 border-top-0 border-bottom-0 rounded mb-5" >
			<div class="shadow mb-2 mt-2 text-center border border-1 rounded " style="margin-left:20px;margin-right:20px;background-color:	rgb(245,245,245);">
				
				<img src="/files/images/<?=$meniu->meniu_avatar?>" width="100%" height="200px">
				
				<h5><br><strong><?=$meniu->meniu_nume;?></strong></h5>
				<div class="row">
	
					<div class="col-md-12 ">
						<strong><?=$meniu->meniu_pret;?> LEI</strong>
						<br>
						<br>
					</div>
					
					<div class="col-md-12 pr-4 pl-4"> 
						<button class="btn btn-block" style="background-color:#f47844;color:white" onclick='add_to_cart(`<?=json_encode($meniu);?>`)'>Adaugă</button>
					</div>

					<div class="col-md-6 ">
					</div>

					<div class="col-12 p-6">
					<div class="col-md-6 ">
					</div>
						<small><strong>Descriere</strong><br><?=$meniu->meniu_ingrediente;?></small>
					</div>
					
				</div><br>
			</div>
		</div>
		<?php }?>
		</div>
	</div>

	<?php $i++; }?>

	</div>
	</div>
</div>
<nav class="navbar fixed-bottom navbar-light bg-dark">
 <div class="col-4">
 <button class="btn" style="background-color:#f47844;color:white" disabled id="btn_prev" onclick="prev_cat()"> << Înapoi</button>
 </div>
 <div class="col-4 text-center text-white" id="open_cart" data-toggle="modal" data-target="#myModal">
<a href="JavaScript: void(0);"><span id='cart_details'> 0 produse în coș(0 lei)</span></a>

 </div>
  <div class="col-4 text-right">
 <button class="btn" style="background-color:#f47844;color:white" onclick="next_cat()" id="btn_next"> Înainte</button>
 </div>
</nav>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>

      </div>
      <div class="modal-body">
		<h6 class="text-center">Produse din coș</h6>
		<table id="cartProducts" style="width:100%">
			<thead>
				<tr>
					<td><strong>Nr.crt</strong></td>
					<td><strong>Denumire</strong></td>
					<td><strong>Pret</strong></td>
					<td><strong>Sterge</strong></td>
				</tr>
				<tbody>

				</tbody>
			</thead>
		</table>

		<hr>
		<div class="row">
		<div class="col-6">
		<select id='nr_table' name='nr_table' class="form-control">
		<option value="">Selectati masa</option>
		<?php for($i=1;$i<=15;$i++){?>
		<option value="<?=$i;?>">Masa <?=$i?></option>
		<?php }?>
		</select>
		</div>

		<div class="col-6 text-right">
			<button class="btn btn-success" onclick="send_order()">Trimite comanda</button>
		</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Inchide</button>
      </div>
    </div>

  </div>
</div>

<script>
 var categories=JSON.parse('<?=json_encode($categories);?>');
 var currentCategory=0;
 var maxCat=categories.length;
 var cart=new Array();
 var cartTotal=0;




 function next_cat()
 {	$('.btn').prop('disabled',false);
	 $('#categorie_'+categories[currentCategory]).hide();
	 $('#categorie_'+categories[currentCategory+1]).show();
	 if(maxCat>(currentCategory+2)){
		$('#btn_next').html("Înainte");
	$('#btn_prev').html("Înapoi").prop('disabled',false);
		currentCategory++;
	 }else{
		 $('#btn_prev').html("Înapoi").prop('disabled',false);
		 $('#btn_next').html("Finalizeaza comanda").removeClass().addClass("btn btn-success").attr('onclick','checkout()');
		currentCategory++;
	} 
	$('#btn_'+categories[currentCategory]).prop('disabled',true);
 }

 function prev_cat()
 {	 $('.btn').prop('disabled',false);
	 $('#categorie_'+categories[currentCategory]).hide();
	 $('#categorie_'+categories[currentCategory-1]).show();
	 if((currentCategory-2)>=0){
		$('#btn_next').html("Înainte").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		$('#btn_prev').html("Înapoi").prop('disabled',false);
		currentCategory--;
	 }else{
		 $('#btn_prev').html("Înapoi").prop('disabled',true);
		 $('#btn_next').html("Înainte").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		 currentCategory--;
	 } 

	 $('#btn_'+categories[currentCategory]).prop('disabled',true);
 }

 function add_to_cart(productInfo){
	 cart.push(productInfo);
	 productInfo=JSON.parse(productInfo);
	 cartTotal+=parseFloat(productInfo['meniu_pret']);
	 $('#cart_details').html(cart.length +' produse în coș ('+ cartTotal +' lei)');
	 $("#cartProducts tbody").append("<tr><td>"+cart.length+"</td><td>"+productInfo['meniu_nume']+"</td><td>"+productInfo['meniu_pret']
	 +"</td><td><i class='fa fa-remove' onclick='remove_product("+(cart.length-1)+")'></i></tr>");
 }


 function remove_product(key){

	 cart.splice(key, 1);
	 var t=0;
	 $("#cartProducts tbody").html('');
	 var i=0;
	 for(productInfo in cart){
		 var p=JSON.parse(cart[productInfo]);
		 t+=parseInt(p['meniu_pret']);
		 	 $("#cartProducts tbody").append("<tr><td>"+(i+1)+"</td><td>"+p['meniu_nume']+"</td><td>"+p['meniu_pret']+"</td><td><i class='fa fa-remove' onclick='remove_product("+i+")'></i></tr>");
			 i++;
	 }
	  $('#cart_details').html(i +' produse în coș ('+ t +' lei)');
	  cartTotal=t;

 }

 function go_to_category(cat)
 {
	$('.catContainer').hide();
	$('.btn').prop('disabled',false);
	currentCategory=cat;
	 $('#categorie_'+categories[currentCategory-1]).hide();
	 $('#categorie_'+categories[currentCategory]).show();

	 if(maxCat==(currentCategory+1)){
		$('#btn_next').html("Finalizeaza comanda").removeClass().addClass("btn btn-success").attr('onclick','checkout()');
		$('#btn_prev').html("Înapoi").prop('disabled',false);
	 }else if(currentCategory==0){
		$('#btn_prev').html("Înapoi ").prop('disabled',true);
		$('#btn_next').html("Înainte").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
	}else{
		$('#btn_prev').html("Înapoi").prop('disabled',false);
		$('#btn_next').html("Înainte").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
	}	
	$('#btn_'+categories[currentCategory]).prop('disabled',true);
 }

 function checkout()
 {
	 if(cart.length<=0){
		 alert('Nu aveti produse în coș!');
	 }else{
		 $('#open_cart').trigger('click');
	 }
 }

 function send_order(){
	 	 if(cart.length<=0){
		 alert('Nu aveti produse  coș!');
	 }else if(!$('#nr_table').val()){
		alert('Nu ati selectat masa!'); 
	 }else{
		    $.ajax({
                url: '/index.php/aplicatie/sendOrder',
                type: 'post',
                data: {cart:cart,table:$('#nr_table').val()},
                success: function( data, textStatus, jQxhr ){
                  if(data==='1'){
					  alert('Comanda a fost trimisa! Mergeti la masa dumneavoastra');
					  window.location.reload();
				  }
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
	 }
 }
</script>