## Appendientes de escritorio

	-	Aplicación sencilla para tener administradas tus tareas a realizar.

### Prerequisitos

-	Debes tener instalado (NodeJS)[https://nodejs.org/en/]

-	Electron

```
$ npm install electron-packager -g
```

### Instalando

Clona éste repositorio

```
$ git clone https://github.com/joeldeval/App-Tareas-escritorio.git
```
Entra al proyecto

```
$ cd App-Tareas-escritorio
```

Instala dependencias

```
$ npm install
```

Para contruir el proyecto

```
$ npm run build
```

Para iniciar la app (recuerda tener instalado ELECTRON de manera global)

```
$ npm run electron
```

Para empaquetar la App y generar el .EXE 

```
$ npm run windows
```

Para empaquetar la App y generar el .app (Mac)
* Nota para los lotes de destino de OS X / MAS: el paquete .app sólo se puede firmar cuando se construye en una plataforma de OS X del host.

```
$ npm run mac
```