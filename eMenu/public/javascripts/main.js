div='';
function cajas(id,name,desc,precio,imge){
  div+='<div class="menu"><form class="" action="index.php" method="post"><div class="box"><img src="'+imge+'" style="width:100%"><div class="container"><h4><b>'+name+'</b></h4><p>'+precio+'$<input class="invs" type="text" name="ord" value="'+id+'"><input type="submit"  value="Enviar"></p></div></div></form></div>';
}
function enviar(){
  document.getElementById("inputs1").innerHTML=div;
}
