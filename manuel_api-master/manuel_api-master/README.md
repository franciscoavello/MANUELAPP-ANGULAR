# MANUEL

## Configuración

Para no tener problemas con la versión de las gemas ni de rails debe usar el 
ambiente, IHC.box, que fue entregado por el ayudante. A continuación se 
mostrará como hay que instalar Vagrant y como usar el ambiente de trabajo que 
todos los contribuidores al proyecto deben usar.

### Bajo Linux

El primer paso es instalar Vagrant ya sea por linea de comandos (si tiene 
Ubuntu o Debian)

    $ sudo apt-get install vagrant virtualbox

O descargando el programa en la [página oficial][download], en donde podrá 
elegir el SO o distribución de Linux.

[download]: https://www.vagrantup.com/downloads.html "Descargas"

Una vez instalado Vagrant, se debe agregar el ambiente entregado por el 
ayudante 'IHC.box'.

    $ vagrant box add ruta/del/box/IHC.box --name ambIHC

Por ejemplo, si el archivo lo tiene en la carpeta `Descargas` entonces debería 
ejecutar

    $ vagrant box add ~/Descargas/IHC.box --name ambIHC

Hasta ahora tenemos el ambiente instalado. Para usarlo se debe ir a la ruta del 
proyecto y montar el ambiente.

    $ cd ruta/del/proyecto/
    $ vagrant up

En cosa de minutos tendrás corriendo una maquina virtual estándar que otros 
también usarán. Para terminar la maquina virtual ejecuta.

    $ vagrant destroy

## Acceder a la maquina virtual

Para interactuar con la MV, debes iniciar una sesion SSH, que en resumen es la 
terminal de la MV.

    $ vagrant ssh

Te aparecerá algo así

```bash
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.13.0-24-generic x86_64)

* Documentation:  https://help.ubuntu.com/
Last login: Fri Nov 20 17:56:17 2015 from 10.0.2.2
vagrant@vagrant-ubuntu-trusty:~$
```

La gracia está en que la carpeta en donde iniciaste la MV, en nuestro caso la 
carpeta del proyecto en Rails, está sincronizada con tu PC y puedes verla en la 
carpeta `/vagrant`.


```bash
vagrant@vagrant-ubuntu-trusty:~$ cd /vagrant/
vagrant@vagrant-ubuntu-trusty:/vagrant$ ls
Gemfile       README.md  Vagrantfile  bin     config.ru  lib  public  tmp
Gemfile.lock  Rakefile   app          config  db         log  test    vendor
vagrant@vagrant-ubuntu-trusty:/vagrant$
```
