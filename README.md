# Proyecto Monitoreo - Cámara Web


## Integrantes:
* Sixto Castro R.
* Jordy Vásquez C.




## Descripción del proyecto



Este proyecto tiene como objetivo utilizar un procesador Intel Edison para el monitoreo web mediante una cámara USB HD en tiempo real, y el uso de un servo-motor para el movimiento de la cámara.

Se utiliza Firebase, el cual es un proveedor de servicios en la nube y back-end. En este proyecto se ha sacado provecho de los servicios que Firebase proporciona, en este caso los servicios de bases de datos y de hosting que sería para alojar la aplicación Web.

Las capturas hechas por la cámara son procesadas por el Intel Edison y enviadas a través del módulo Wi-Fi del procesador a la base de datos (Firebase).  

Luego las mismas capturas que se guardan en  la base, son consumidas por una aplicación Web con el fin de poder mostrarlas en la misma. Cabe recalcar que para poder hacer streaming, se toman fotos consecutivas y se van mostrando inmediatamente en la aplicación con el propósito de simular un streaming.

El control del movimiento de la cámara, se la realiza desde la misma aplicación que tiene dos botones para controlar un servo-motor: uno para rotar a la izquierda y otro a la derecha. Una vez que se presiona uno de los 2 botones, se envía el ángulo de giro sea a la izquierda o derecha a la base, el Intel Edison consulta ese dato, y hace que el servo rote.




##Nota:



Se debe instalar el IDE Intel XDK IoT. Una vez ya instalado usted debe crear un proyecto vacío para poder probar el código en el Intel Edison. El código se encuentra en el archivo main.js. A continuación siga los siguientes pasos:
* Abrir el IDE: Intel XDK IoT Edition
* Ir a Projects
* Dar clic en Start a new Project.
* En el lado izquierdo, donde dice Internet of things embedded applications, seleccionar Templates.
* Luego escoger Blank Template.
* Dar clic en Continue.
* Luego, copiar el código del archivo indicado en el main.js que se crea por default.
* En la parte inferior, seleccionar un dispositivo (IoT Device->edison ip).
* Aparece un mensaje de conexión establecida.
* En la parte inferior a lado de IoT Devices hay 5 íconos, hago clic en Manage your Daemon/IoT Device, escoger Sync PC time w/clock on target device.
* Clic en Install/Build.
* Clic en Upload (subir actual proyecto al dispositivo).
* Finalmente Run (ejecutar el Proyecto que está actualmente instalado en el dispositivo).



##Archivo pdf


Ver ese archivo, ahí se encuentra toda la documentación del proyecto (incluyendo los recursos que se deben instalar para el funcionamiento del proyecto).

