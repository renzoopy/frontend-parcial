# Primer Parcial - Agendamiento de Atención a Proveedores

## Descripción

Este proyecto es una aplicación frontend desarrollada con Angular para gestionar el agendamiento de atención a proveedores. Permite la administración de proveedores, productos, jaulas, y reservas de turnos de recepción de productos.

## Requisitos

- Node.js y npm instalados
- Angular CLI instalado `npm install -g @angular/cli`
- json-server npm `npm install -g json-server`

## Entorno de desarrollo

1. Crea un archivo db.json en la raíz del proyecto:

   ```bash
   {
   "proveedores": [],
   "productos": [],
   "jaulas": [],
   "turnos": []
   }
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Inicia el servidor json-server:

   ```bash
   json-server --watch db.json
   ```

4. Inicia el servidor de desarrollo de Angular:

   ```bash
   ng serve
   ```
