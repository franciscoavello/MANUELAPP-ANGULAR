# MANUELAPP-ANGULAR
Manuel con angular

La carpeta manuel_api-master contiene la base de datos y api. Esta debe ser ejecutada en rails y con vagrant.
Antes de ejecutar el server, hacer "bundle install" y luego "rake db:reset" para que cree la base de datos. 
De mommento la unica funcion implementada en la api es la de "buscar_por_correo", la cual se utiliza en el login. Por lo tanto
es necesario agregar usuarios y sus roles a la bd mediante el scaffold "localhost:3000/usuarios".

Todos los demas archivos y carpetas es el proyecto con angular. Se debe tener instalado un servidor apache como XAMPP (https://www.apachefriends.org/es/download.html)
Una vez instalado, todas estos archivos y carpetas dell git deben ir en una carpeta creada en la ruta c:/xampp/htdocs. 
Para iniciar la aplicación se debe ingresar mediante localhost/NOMBREDELACARPETACREADA, siempre teniendo el servidor de apache de XAMPP corriendo.

Considerar que para que funcione bien se deben tener los dos servdores corriendo (XAMPP y Rails).
