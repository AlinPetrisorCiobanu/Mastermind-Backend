# Backend MasterMind


# Contenido :

<br>

- [Descripción 📝](#descripción)
- [Tecnologías - Bibliotecas - Herramientas 🛠️](#tecnologías---bibliotecas---herramientas)
- [Instalación 🚀](#instalación)
- [Endpoints ⛏️⚙️](#endpoints)
- [Contribuciones 🤝](#contribuciones)
- [Licencia y Copyright📃](#licencia-y-copyright)

<br>
<br>
<br>

## Descripción 📝

Esta API gestiona la información básica de los usuarios del juego MasterMind. Permite a los usuarios registrarse, hacer login, ver sus datos, modificar el perfil o borrarlo. Además, proporciona funciones de autenticación y autorización para garantizar la seguridad de los datos.

<br>
<br>
<br>

## Tecnologías - Bibliotecas - Herramientas 🛠️
Aquí se incluyen las tecnologías, bibliotecas y herramientas utilizadas en el proyecto.


<table style="width:100%; border-collapse: collapse;">
  <tr>
    <td style="text-align:center; border: none;"><img src="./src/img/node.png" alt="Node.js" width="100px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/express.png" alt="Express.js" width="100px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/mongodb.png" alt="MongoDB" width="70px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/mongoose.png" alt="Mongoose" width="100px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/jwt.png" alt="JsonWebToken" width="70px"></td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;">Node.js</td>
    <td style="text-align:center; border: none;">Express.js</td>
    <td style="text-align:center; border: none;">MongoDB</td>
    <td style="text-align:center; border: none;">Mongoose</td>
    <td style="text-align:center; border: none;">JsonWebToken</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;"><img src="./src/img/bcrypt.jpg" alt="BCrypt" width="100px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/faker.jpg" alt="Faker" width="50px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/postman.png" alt="Postman" width="70px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/vercel.png" alt="Vercel" width="100px"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/vsc.png" alt="Visual Studio Code" width="70px"></td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;">BCrypt</td>
    <td style="text-align:center; border: none;">Faker</td>
    <td style="text-align:center; border: none;">Postman</td>
    <td style="text-align:center; border: none;">Vercel</td>
    <td style="text-align:center; border: none;">Visual Studio Code</td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;"></td>
    <td></td>
    <td></td>
    <td></td>
    <td style="text-align:center; border: none;"></td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;"><img src="./src/img/git.png" alt="Git Lab" width="70px"></td>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;"></td>
  </tr>
  <tr>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;">Git Lab</td>
    <td style="text-align:center; border: none;"></td>
    <td style="text-align:center; border: none;"></td>
  </tr>
</table>





<br>
<br>
<br>

## Instalación 🚀

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio: `git clone <url>`
2. Instala las dependencias: `npm install`

<br>
<br>
<br>

## Endpoints ⛏️⚙️

# Usuarios



| Verbos HTTP | ROUTE                 | Función de uso    |
|----------|--------------------------|-------------|
| GET ➕   | /                        | Healthcheck |
| POST ➕  | /register                | Creación usuario |
| POST ➕  | /login                   | Login usuario |
| GET 🔍   | /data_user/:id?          | Mostrar usuarios |
| GET 🔍   | /list_users/:page?       | Muestra usuario |
| PUT ♻️   | /modify_user/:id?        | Modifica usuario |
| PUT 🗑️   | /delete_user/:id?        | Elimina usuario  |
| PUT 🗑️   | /master_points_user/:id? | Añade Master_Points  |




- **GET /**
  - **Función:** Healthcheck.
  - **Detalles:**
    - Mensaje informativo indicando que el backend está en funcionamiento.

- **POST /Login**
  - **Función:** Iniciar sesión.
  - **Detalles:**
    - Genera un token JWT válido necesario para operaciones posteriores.

- **POST /Register**
  - **Función:** Registro de nuevo usuario.
  - **Detalles:**
    - Todos los campos son requeridos.
    - Nickname, Email y teléfonos son únicos.
    - La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos una mayúscula, un dígito y un carácter especial.

- **GET /data_user/:_id?**
  - **Función:** Obtener información de usuario.
  - **Detalles:**
    - Los clientes solo pueden ver su propio perfil.
    - Los administradores tienen acceso a todos los perfiles agregando el ID.

- **GET /list_users:page?**
  - **Función:** Listar usuarios.
  - **Detalles:**
    - Los usuarios se organizan en páginas. Si no se especifica una página, se muestra la primera.

- **PUT /modify_user/:id?**
  - **Función:** Modificar usuario.
  - **Detalles:**
    - Los administradores y superadministradores pueden modificar todos los usuarios al agregar su ID.
    - Requiere autenticación y permisos adecuados.

- **PUT /delete_user/:id?**
  - **Función:** Eliminar usuario de forma lógica.
  - **Detalles:**
    - El perfil del usuario se mantiene.
    - El campo "is_active" se establece en false.
    - Permite llevar un registro de los usuarios eliminados.

- **PUT /master_points_user/:id?**
  - **Función:** Agrega master_points al usuario.

<br>
<br>
<br>

## Contribuciones🤝

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes una mejora, ¡no dudes en abrir un problema o enviar un pull request!

<br>
<br>
<br>

## Licencia y Copyright 📃📃

Este proyecto pertenece a **`Alin Petrisor Ciobanu`**.
