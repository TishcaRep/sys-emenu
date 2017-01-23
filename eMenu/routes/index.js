var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
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
var query = connection.query('SELECT max(idmenu) AS idmax FROM menu', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
           console.log('numero de reg:',resultado[0].idmax);
          var n=resultado[0].idmax;
          for (var i = 1; i <n+1; i++) {
            var query = connection.query('SELECT * FROM menu WHERE idmenu = ?', [i], function(error, result){
                  if(error){
                     throw error;
                  }else{
                     var resultado = result;
                     if(resultado.length > 0){
                       console.log(n,i);
                        console.log(resultado[0].idmenu,resultado[0].nombre,resultado[0].descripcion,resultado[0].precio,resultado[0].imagen);
                        router.get('/', function(req, res) {
                          res.render('index', { id: resultado[0].idmenu,nombre: resultado[0].nombre,descripcion: resultado[0].descripcion, precio: resultado[0].precio , imge: resultado[0].imagen });
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

//-------------------------------------------------------------------







module.exports = router;
