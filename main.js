var Firebase = require('firebase'); //Se requiere el módulo Firebase.  
var mraa = require("mraa"); //Se requiere el módulo mraa.
var firebaseRef = new Firebase('https://foto12.firebaseio.com');  //Se hace referencia a la dirección donde se encuentra alojada la aplicación Web(Firebase).
var image_original =  "/home/ffmpeg-3.0-32bit-static/"+(new Date).getTime() + ".jpeg"; //Se asigna un nombre a la foto que va ser tomada en este caso con respecto al tiempo.
var fs = require("fs"); //Se requiere el módulo fs.
var servoModule = require("jsupm_servo");//Se requiere el módulo jsupm_servo.
var value2 = 0.0;//Variable que va guardar el ángulo de giro del servo.
var imagenold='';//Nombre de la imagen antigua/anterior
var servo = new servoModule.ES08A(3);// Se setea el pin por el cual el servo motor va recibir dato.
var childProcess = require('child_process');// Se requiere módulo child_process.

//Función que permite tomar foto a la cámara con una resolución de 320x240 y guardar la foto en el Intel Edison con el nombre que se ha seteado a image_original
childProcess.exec('./ffmpeg -s 320x240 -f video4linux2 -i /dev/video0 -vframes 1 '+image_original,{cwd:'/home/ffmpeg-3.0-32bit-static/'},function(error, stdout, stderr) {
           } );
//Retardo de 1.9s después de la primera foto.		  
sleep(1900);


//Método que llama a una función con un tiempo de retardo de 1.5s entre cada llamada a esa función. Dicha función setea un nombre de foto a image_orginal con respecto al tiempo para luego asignarselo a la foto que se toma. 
setInterval(function () {
  imagenold=image_original;
  image_original =  "/home/ffmpeg-3.0-32bit-static/"+(new Date).getTime() + ".jpeg";
  childProcess.exec('./ffmpeg -s 320x240 -f video4linux2 -i /dev/video0 -vframes 1 '+image_original,{cwd:'/home/ffmpeg-3.0-32bit-static/'},function(error, stdout, stderr) {
  } );
}, 1500);	
	

//Método que llama una función, la cual se va ejecutar cada 20ms. Dicha función se va encargar de mover el servo con el ángulo indicado; convertir la foto a formato base 64; subirla a la base; y una vez subida, borrala de la memoria del Intel Edison con el fin de no malgastar su capacidad. 
setInterval(function () {
	var hopperRef = firebaseRef.child('movimiento'); //Variable que hace referencia al hijo movimiento que se encuentra en la base de datos(Firebase). La base tiene como padre "foto12", éste tiene como hijo "movimiento". "movimiento" tiene como hijo "servo", y éste último tiene como hijo a "angulo"
	hopperRef.on("child_changed", function(snapshot) { //Esta función se dispara cuando el dato guardado en un hijo o algún descendiente cambia.
    var data = snapshot.val();//Se obtiene el nodo completo (movimiento).
    var message2 = data.angulo;// Se obtiene el ángulo de rotación.
    value2=message2;//Se asigna dicho ángulo a value2.
	moveServo(value2); //Función que se encarga de mover el servo con el ángulo indicado.
	});
    sleep(100);//Retardo de 100ms
	fs.readFile(imagenold,  function(err, original_data){	  
        if(original_data!=null) //Si original_data es diferente de null, entro al lazo If.
        {	    
            console.log("Set angle tosjhcws " );
            var base64Image = original_data.toString('base64');// Se convierte la imagen en base 64.	    
            var imgsubida='data:image/jpeg;base64,'+base64Image //Se completa el formato de la imagen que va ser subida a la base.
            firebaseRef.child('snaps').update({'imagen':imgsubida});  //Se accede al hijo "snaps" cuyo padre es "foto12", y se actualiza el dato que contiene el hijo "imagen" cuyo padre es "snaps" con la imagen convertida a base 64.
            var img=imagenold.split('/');// Se hace un split a imageold con el fin de obtener el nombre de la imagen.
            var ii=img[3];//Se obtiene la imagen.
            childProcess.exec('rm '+ii,{cwd:'/home/ffmpeg-3.0-32bit-static/'},function(error, stdout, stderr) {                 
            });//Se ejecuta el comando rm para remover la imagen desde la ubicación dada con el fin de que las imágenes o fotos no se vayen acumulando en la memoria del Intel Edison. 
        }
	});      

}, 200);	


//Función que recibe un ángulo de rotación, el mismo que va ser asignado al servo para que éste rote al ángulo indicado. 
function moveServo(v) {
    if(v<156){
    var degrees = v;
    servo.setAngle(degrees);
    console.log("Set angle to " + degrees);
    }
}


//Función que produce un retardo de tiempo de acuerdo al time enviado como parámetro
function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}


  
