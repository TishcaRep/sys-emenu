var socket = io.connect('http://localhost:8080',{'forceNew': true});

socket.on('menu', function(data){
  console.log(data);
  render(data);
});

var html='';
function render(data) {
  html+=`
    <form class="box" idmen="id${data.id}">
        <img src="${data.imagen}" style="width:100%">
        <div class="container">
          <h4><b>${data.nombre}</b></h4>
          <p>${data.precio}$
            <input class="invs" type="text" id="id${data.id}" value="${data.id}">
            <input class="invs" type="text" id="nombre${data.id}" value="${data.nombre}">
            <input class="invs" type="text" id="precio${data.id}" value="${data.precio}">
            <button onclick="return addCuenta(this,${data.id})"type="submit" name="button">Enviar</button>
          </p>
        </div>
    </form>
    `;
    document.getElementById('appmenu').innerHTML=html;
};
