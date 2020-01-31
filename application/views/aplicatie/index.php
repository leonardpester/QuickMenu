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
	<div class="col-2 "  style="border-right:2px solid gray;">
	<br>
	<h6>Categorii de produse</h6>
	<br><br>
	<?php
	$i=0;
	foreach($meniuri as $key=>$value){ if(count($value)<=0) continue;
	?>
	<button onclick="go_to_category(<?=$i;?>)" class="btn btn-primary btn-block " <?=$i===0?'disabled':''?> id="btn_<?=$key;?>"><?=$key?></button><br>
	<?php
	$i++;
	}
	?>
	</div>
	<div class="col-10">

	<?php
	
	$i=0;
	foreach($meniuri as $key=>$value){ if(count($value)<=0) continue; $categories[]=$key;?>
	<div id="categorie_<?=$key;?>" class="catContainer mb-5" style="<?=$i?'display:none':'';?>">
		<div class="row">
		<div class="col-12 text-center "><h4><?=$key;?></h4><hr></div>
		<?php foreach($value as $meniu){ ?>
			<div class="col-md-2 text-center border border-left-0 border-right-0 rounded mb-4">
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
					<small><strong>Ingrediente</strong><br><?=$meniu->meniu_ingrediente;?></small>
					</div>
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
 <div class="col-3">
 <button class="btn btn-primary" disabled id="btn_prev" onclick="prev_cat()"> << Inapoi</button>
 </div>
 <div class="col-3 text-center text-white" id="open_cart" data-toggle="modal" data-target="#myModal">
<a href="JavaScript: void(0);"><span id='cart_details'> 0 produse in cos(0 lei)</span></a>

 </div>
  <div class="col-3 text-right">
 <button class="btn btn-primary" onclick="next_cat()" id="btn_next"> Inainte (<?=$categories[1];?>)</button>
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
		<h6 class="text-center">Produse din cos</h6>
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
		$('#btn_next').html("Inainte ("+categories[currentCategory+2]+")");
	$('#btn_prev').html("Inapoi ("+categories[currentCategory]+")").prop('disabled',false);
		currentCategory++;
	 }else{
		 $('#btn_prev').html("Inapoi ("+categories[currentCategory]+")").prop('disabled',false);
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
		$('#btn_next').html("Inainte ("+categories[currentCategory]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		$('#btn_prev').html("Inapoi ("+categories[currentCategory-2]+")").prop('disabled',false);
		currentCategory--;
	 }else{
		 $('#btn_prev').html("Inapoi ").prop('disabled',true);
		 $('#btn_next').html("Inainte ("+categories[currentCategory]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
		 currentCategory--;
	 } 

	 $('#btn_'+categories[currentCategory]).prop('disabled',true);
 }

 function add_to_cart(productInfo){
	 cart.push(productInfo);
	 productInfo=JSON.parse(productInfo);

	 cartTotal+=parseFloat(productInfo['meniu_pret']);
	 $('#cart_details').html(cart.length +' produse in cos ('+ cartTotal +' lei)');
	 $("#cartProducts tbody").append("<tr><td>"+cart.length+"</td><td>"+productInfo['meniu_nume']+"</td><td>"+productInfo['meniu_pret']+"</td><td><i class='fa fa-remove' onclick='remove_product("+(cart.length-1)+")'></i></tr>");
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
	  $('#cart_details').html(i +' produse in cos ('+ t +' lei)');
	  cartTotal=t;

 }

 function go_to_category(cat)
 {

	 $('.catContainer').hide();
	$('.btn').prop('disabled',false);
	currentCategory=cat;
	console.log(categories[currentCategory]);
	 $('#categorie_'+categories[currentCategory-1]).hide();
	 $('#categorie_'+categories[currentCategory]).show();

	 if(maxCat==(currentCategory+1)){
		$('#btn_next').html("Finalizeaza comanda").removeClass().addClass("btn btn-success").attr('onclick','checkout()');
		$('#btn_prev').html("Inapoi ("+categories[currentCategory-1]+")").prop('disabled',false);

	 }else if(currentCategory==0){
		$('#btn_prev').html("Inapoi ").prop('disabled',true);
		$('#btn_next').html("Inainte ("+categories[currentCategory+1]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
	}else{
	$('#btn_prev').html("Inapoi ("+categories[currentCategory-1]+")").prop('disabled',false);
	$('#btn_next').html("Inainte ("+categories[currentCategory+1]+")").removeClass().addClass("btn btn-primary").attr('onclick','next_cat()');
	}	

	$('#btn_'+categories[currentCategory]).prop('disabled',true);
 }

 function checkout()
 {
	 if(cart.length<=0){
		 alert('Nu aveti produse in cos!');
	 }else{
		 $('#open_cart').trigger('click');
	 }
 }

 function send_order(){
	 	 if(cart.length<=0){
		 alert('Nu aveti produse in cos!');
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
<?php //$this->load->view('layout/footer'); ?>