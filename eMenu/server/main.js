var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

app.use(express.static('public'));


//--------------------------------------------
//        sql
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'toor',
   database: 'emenu',
   port: 3306
});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

//-------------------------------------------------------------
io.on('connection',function(socket){

var query = connection.query('SELECT max(idmenu) AS idmax FROM menu', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
           console.log('numero de reg:',resultado[0].idmax);
          var n=resultado[0].idmax;
          for (var i = 0; i <n; i++) {
            var query = connection.query('SELECT * FROM menu WHERE idmenu = ?', [i+1], function(error, result){
                  if(error){
                     throw error;
                  }else{
                     var resultado = result;
                     if(resultado.length > 0){
                       console.log(n,i);
                        console.log(resultado[0].idmenu,resultado[0].nombre,resultado[0].descripcion,resultado[0].precio,resultado[0].imagen);
                        socket.emit('menu',{id: resultado[0].idmenu,nombre: resultado[0].nombre,descripcion: resultado[0].descripcion,precio: resultado[0].precio,imagen: resultado[0].imagen
                        });
                     }else{
                        console.log('Registro no encontrado');
                     }
                  }
               }

            );
          }
         }else{
            console.log('Registro no encontrado');
         }
      }
   }

);

});

//--------------------------------------------


server.listen(8080,function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
