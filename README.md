# Proyecto Monitoreo - Camara Web

Integrantes:
Sixto Castro R.
Jordy Vásquez C.


Descripción del proyecto

Este proyecto tiene como objetivo utilizar un procesador Intel Edison para el monitoreo mediante una cámara USB HD en tiempo real, y el uso de servo-motores para el movimiento de la cámara. 
Se utiliza Firebase, el cual es un proveedor de servicios en la nube y back-end. En este proyecto se ha sacado provecho de los servicios que Firebase proporciona, en este caso los servicios de bases de datos y de hosting que sería para alojar la aplicación Web.
Las capturas hechas por la cámara son procesadas por el Intel Edison y enviadas a la base de datos ofrecido por Firebase a través del módulo Wi-Fi del procesador. 
Luego las mismas capturas guardadas en  la base, son consumidas por una aplicación Web con el fin de poder mostrar las imágenes en la misma. Cabe recalcar que para poder hacer streaming, se toma fotos consecutivas y se van mostrando inmediatamente en la aplicación con el fin de simular un streaming.
El control del movimiento de la cámara, se la realiza desde la misma aplicación que tiene dos botones para controlar los servos: uno para rotar a la izquierda y otro a la derecha. Una vez que se presiona uno de los 2 botones, se envía el ángulo de giro sea a la izquierda o derecha a la base, el Intel Edison consulta ese dato, y hace que los servos roten a la dirección indicada.



