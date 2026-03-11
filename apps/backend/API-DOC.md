## 🔐 Autenticación (Auth)

### Registrar nuevo usuario (Register)

Crea una nueva cuenta de usuario en el sistema.

**Endpoint:** `POST /api/auth/register`

#### 📥 Request Body

El cuerpo de la petición debe estar en formato `application/json`.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `name` | String | Sí | Nombre completo del usuario. |
| `email` | String | Sí | Correo electrónico del usuario. |
| `password` | String | Sí | Contraseña para la cuenta. |
| `role` | String | Sí | Rol asignado (ej: `user`, `profesional`). |
| `avatar` | String | No | URL de la imagen de perfil del usuario. |
| `trade` | String | No | Oficio o especialidad (ej: `plumbing`, `masonry`, `electrician`). |

**Ejemplo de Petición:**
```json
{
  "name": "Franco Lopez",
  "email": "franco@mail.com",
  "password": "12345678",
  "role": "user",
  "avatar": "[https://picsum.photos/seed/franco@mail.com/200](https://picsum.photos/seed/franco@mail.com/200)",
  "trade": "plumbing"
}
```

#### 📤 Respuestas

🟢 201 Created - Usuario registrado exitosamente

Devuelve los datos del usuario creado junto con el token de acceso.

```json
{
  "message": "User created",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Franco Lopez",
    "email": "franco@mail.com",
    "username": "franco_lopez",
    "role": "user",
    "trade": "plumbing"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

🔴 400 Bad Request - Error de validación

Ocurre cuando faltan campos requeridos o el formato de los datos es incorrecto.

___

### Iniciar Sesión (Login)

Autentica a un usuario en el sistema y genera un token de acceso (JWT). Este token es necesario para realizar peticiones a los endpoints protegidos del proyecto.

**Endpoint:** `POST /api/auth/login`

#### 📥 Cuerpo de la Petición (Request Body)

El cuerpo debe enviarse en formato `application/json`.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `email` | String | Sí | Correo electrónico del usuario registrado. |
| `password` | String | Sí | Contraseña de la cuenta. |

**Ejemplo de entrada:**
```json
{
  "email": "franco@mail.com",
  "password": "12345678"
}
```

#### 📤 Respuestas (Responses)
🟢 200 OK - Login exitoso

El servidor validó las credenciales y devuelve el objeto del usuario junto con el token de sesión.

```json
{
  "message": "Login successful",
  "user": {
    "id": "cmmjh0nib0037mrlaj7tbnx4p",
    "name": "Franco Lopez",
    "email": "franco@mail.com",
    "username": "franco_lopez",
    "role": "user",
    "trade": "plumbing"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

🔴 400 Bad Request - Error de validación

Se dispara si el formato de los datos es incorrecto (por ejemplo, un email mal formado) o si faltan campos obligatorios.

```json
{
  "message": "Validation error",
  "error": "Email and password are required"
}
```
🔴 401 Unauthorized - Credenciales inválidas

Ocurre cuando el email no existe en la base de datos o la contraseña no coincide.

```json
{
  "message": "Invalid credentials"
}
```
🔴 500 Internal Server Error - Error del servidor

Error inesperado en el backend o caída de la base de datos.

```json
{
  "message": "Internal server error"
}
```

___

## 🏗️ Proyectos (Projects)

### Crear nuevo proyecto

Crea un registro de obra completo en el sistema. Este endpoint requiere que el usuario esté autenticado para vincular el proyecto a su cuenta.

**Endpoint:** `POST /api/projects`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📥 Cuerpo de la Petición (Request Body)

El cuerpo debe enviarse en formato `application/json`.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `name` | String | Sí | Nombre descriptivo de la obra. |
| `code` | String | Sí | Código único de proyecto (ej: `RENO-US-2026`). |
| `category` | String | Sí | Categoría del proyecto (ej: `Residential Renovation`). |
| `location` | String | Sí | Ubicación geográfica o dirección. |
| `surface_sqft` | Number | Sí | Superficie total en pies cuadrados. |
| `structure_type` | String | Sí | Tipo de estructura (ej: `Concrete`, `Steel`). |
| `intervention_type`| String | Sí | Tipo de obra (ej: `Renovation`, `New Construction`). |
| `assigned_professional`| String | Sí | ID del profesional a cargo del proyecto. |
| `project_team` | Array | Sí | Lista de strings con los ID´s de los integrantes del equipo. |
| `trades` | Array | Sí | Lista de oficios involucrados (ej: `Plumber`). |
| `project_plan_photo`| String | No | URL del archivo PDF o imagen de los planos. |
| `userId` | String | Sí | ID del usuario propietario (creador). |

**Ejemplo de entrada:**
```json
{
  "name": "Reno USA Main Project",
  "code": "RENO-US-2026",
  "category": "Residential Renovation",
  "location": "Barcelona",
  "surface_sqft": 1200,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "id_prof_a_cargo",
  "project_team": ["id_prof_2", "id_prof_3", "id_prof_4"],
  "trades": ["Electrician", "Plumber", "Mason"],
  "project_plan_photo": "[https://cdn.igrowker.com/projects/renousa/project_plan.pdf](https://cdn.igrowker.com/projects/renousa/project_plan.pdf)",
  "userId": "id_usuario_creador"
}
```

#### 📤 Respuestas (Responses)
🟢 201 Created - Proyecto creado exitosamente

Devuelve el objeto completo del proyecto creado, incluyendo los arrays inicializados de fases y snapshots.

```json
{
  "id": "cmmb7xdg900037bx0k4pfm2x2",
  "code": "RENO-US-2026",
  "name": "Reno USA Main Project",
  "category": "Residential Renovation",
  "location": "Barcelona",
  "surface_sqft": 1200,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "id_prof_a_cargo",
  "project_team": ["id_prof_2", "id_prof_3", "id_prof_4"],
  "trades": ["Electrician", "Plumber", "Mason"],
  "project_plan_photo": "[https://cdn.igrowker.com/projects/renousa/project_plan.pdf](https://cdn.igrowker.com/projects/renousa/project_plan.pdf)",
  "userId": "id_usuario_creador",
  "phases": [{}],
  "projectSnapshots": [{}]
}
```
🔴 400 Bad Request - Error de validación

Falta algún campo obligatorio, el code ya existe en la base de datos o el formato de los datos es inválido.

```json
{
  "message": "Validation error",
  "error": "Field 'code' must be unique"
}
```
🔴 401 Unauthorized - No autorizado

El token JWT falta, es inválido o ha expirado.

```json
{
  "message": "Unauthorized"
}
```

___

### Obtener todos los proyectos asociados

Recupera la lista de proyectos en los que el usuario autenticado está involucrado, ya sea como profesional a cargo o como miembro del equipo de trabajo.
 
**Endpoint:** `GET /api/projects`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 🔍 Lógica de Filtrado
Para que un proyecto aparezca en esta lista, el usuario debe cumplir al menos una de estas condiciones:
1. Ser el **Profesional Asignado** (`assigned_professional`).
2. Estar incluido en el array de **Equipo del Proyecto** (`project_team`).

*Nota: Este endpoint filtra por la identidad del usuario extraída del token JWT (logged)*


#### 📥 Parámetros (Query Params)
No requiere parámetros adicionales.


#### 📤 Respuestas (Responses)

🟢 200 OK - Lista de proyectos recuperada**

Devuelve un array de objetos con el detalle de cada obra asociada al usuario. Si no tiene proyectos asociados, devuelve un array vacío `[]`.

```json
[
  {
    "id": "cmmb7xdg900037bx0k4pfm2x2",
    "code": "RENO-US-2026",
    "name": "Reno USA Main Project",
    "category": "Residential Renovation",
    "location": "Barcelona",
    "surface_sqft": 1200,
    "structure_type": "Concrete",
    "intervention_type": "Renovation",
    "assigned_professional": "Franco Lopez",
    "project_team": ["Alice Smith", "Bob Johnson", "Carlos Ruiz"],
    "trades": ["Electrician", "Plumber", "Mason"],
    "project_plan_photo": "[https://cdn.igrowker.com/projects/renousa/project_plan.pdf](https://cdn.igrowker.com/projects/renousa/project_plan.pdf)",
    "userId": "cmmb72y5s00017bx0zagzffoi",
    "phases": [{}],
    "projectSnapshots": [{}]
  }
]

``` 

🔴 401 Unauthorized - Token inválido o ausente

El usuario no ha iniciado sesión o el token proporcionado ha expirado.

```json
{
  "message": "Unauthorized access"
}
```

🔴 500 Internal Server Error - Error del servidor

Error inesperado al consultar la base de datos.

```json
{
  "message": "Error retrieving projects"
}
```

___

### Obtener métricas del proyecto (Dashboard)

Calcula y devuelve las métricas clave de una obra específica, incluyendo el progreso temporal, el avance de tareas y los oficios que tienen trabajo pendiente.

**Endpoint:** `GET /api/projects/{id}/metrics`
**Seguridad:** Requiere `Authorization: Bearer <token>`


#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto (UUID/CUID). |


#### 📤 Respuestas (Responses)

🟢 200 OK - Métricas calculadas con éxito**

Devuelve un objeto con tres secciones: duración de la obra, progreso de tareas y lista de oficios activos.

```json
{
  "duration": {
    "totalDays": 45,
    "elapsedDays": 12,
    "remainingDays": 33,
    "startDate": "2026-03-01T08:00:00.000Z",
    "endDate": "2026-04-15T18:00:00.000Z"
  },
  "progress": {
    "advancePercentage": 25,
    "totalTasks": 40,
    "completedTasks": 10
  },
  "activeTrades": [
    {
      "id": "cmmkcw7h00099zrxu6si5mbg",
      "name": "Electrician"
    },
    {
      "id": "cmmkcw7j000b9zrxxlbt3rt7",
      "name": "Plumber"
    }
  ]
}
```

🔴 401 Unauthorized - No autorizado

El token es inválido o no se proporcionó en los encabezados de la petición.

```json
{
  "message": "Unauthorized"
}

```
🔴 404 Not Found - Proyecto no encontrado

El ID proporcionado no corresponde a ningún proyecto existente en la base de datos.

```json
{
  "message": "Project not found"
}

```
🔴 500 Internal Server Error - Error de cálculo

Error al procesar los datos o al realizar la agregación de fechas en la base de datos.

```json
{
  "message": "Error calculating project metrics"
}
```

`Aclaración:` Fijarse que en este caso el `id` va en la URL (path)

___

### Obtener fases del proyecto

Recupera todas las fases (etapas) asociadas a un proyecto específico, ordenadas automáticamente por su fecha de inicio planificada.

**Endpoint:** `GET /api/projects/{id}/phases`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto del cual se quieren obtener las fases. |

#### 📤 Respuestas (Responses)

🟢 200 OK - Fases recuperadas con éxito**

Devuelve un array de objetos, donde cada objeto representa una fase de la obra con sus fechas y estado.

```json
[
  {
    "id": "cmmkh1abc0001mrld2xyz999",
    "name": "Site Preparation",
    "order": 1,
    "planned_start": "2026-03-01T08:00:00.000Z",
    "planned_end": "2026-03-10T18:00:00.000Z",
    "status": "completed",
    "projectId": "cmmjh0nib0037mrlaj7tbnx4p"
  },
  {
    "id": "cmmkh2def0002mrld3abc888",
    "name": "Foundation",
    "order": 2,
    "planned_start": "2026-03-11T08:00:00.000Z",
    "planned_end": "2026-03-25T18:00:00.000Z",
    "status": "in_progress",
    "projectId": "cmmjh0nib0037mrlaj7tbnx4p"
  }
]
```

🔴 401 Unauthorized - Token inválido

El usuario no está autenticado o su sesión ha expirado.

```json
{
  "message": "Unauthorized"
}
```
🔴 404 Not Found - Proyecto no encontrado

No existe un proyecto con el ID proporcionado, por lo tanto no se pueden recuperar sus fases.

```json
{
  "message": "Project not found"
}
```
🔴 500 Internal Server Error - Error de base de datos

Error al intentar realizar la consulta o el ordenamiento de las fases.

```json
{
  "message": "Error retrieving project phases"
}
```

____


###  Obtener historial de tareas completadas

Recupera un listado de las tareas que han sido marcadas como completadas recientemente en un proyecto específico. Ideal para mostrar el feed de actividad o el registro de avances.

**Endpoint:** `GET /api/projects/{id}/history`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto del cual se desea obtener el historial. |

#### 📤 Respuestas (Responses)

🟢 200 OK - Historial recuperado con éxito**

Devuelve un array de objetos con las tareas completadas, ordenadas generalmente de la más reciente a la más antigua.

```json
[
  {
    "id": "cmmkh5ghi0005mrld4jkl222",
    "name": "Instalación de tuberías de cobre",
    "completedAt": "2026-03-10T14:30:00.000Z",
    "phaseName": "Plomería",
    "trade": {
      "id": "cmmkcw7j000b9zrxxlbt3rt7",
      "name": "Plumber"
    }
  },
  {
    "id": "cmmkh6mno0006mrld5pqr333",
    "name": "Nivelación de contrapiso",
    "completedAt": "2026-03-09T10:15:00.000Z",
    "phaseName": "Estructura",
    "trade": {
      "id": "cmmkcw7h00099zrxu6si5mbg",
      "name": "Mason"
    }
  }
]

```

🔴 401 Unauthorized - Sin autorización

El token no fue enviado o es inválido.

```json
{
  "message": "Unauthorized access"
}

```

🔴 404 Not Found - Proyecto no encontrado

El ID de proyecto no existe en el sistema.

```json
{
  "message": "Project not found"
}
```

🔴 500 Internal Server Error - Error de servidor

Error al intentar filtrar o recuperar el historial de la base de datos.

```json
{
  "message": "Error retrieving project history"
}
```
____

### Obtener detalle de un proyecto por ID

Recupera toda la información detallada de un proyecto específico utilizando su identificador único. 

**Endpoint:** `GET /api/projects/{id}`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único (UUID/CUID) del proyecto a consultar. |

*Nota: El servidor verificará que el usuario del token tenga permisos sobre este proyecto antes de devolver los datos.*

#### 📤 Respuestas (Responses)

🟢 200 OK - Proyecto encontrado**

Devuelve el objeto completo con toda la configuración, equipo, oficios y los arrays de fases/snapshots.

```json
{
  "id": "cmmb7xdg900037bx0k4pfm2x2",
  "code": "RENO-US-2026",
  "name": "Reno USA Main Project",
  "category": "Residential Renovation",
  "location": "Barcelona",
  "surface_sqft": 1200,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "John Doe",
  "project_team": ["Alice Smith", "Bob Johnson", "Carlos Ruiz"],
  "trades": ["Electrician", "Plumber", "Mason"],
  "project_plan_photo": "[https://cdn.igrowker.com/projects/renousa/project_plan.pdf](https://cdn.igrowker.com/projects/renousa/project_plan.pdf)",
  "userId": "cmmb72y5s00017bx0zagzffoi",
  "phases": [{}],
  "projectSnapshots": [{}]
}
```

🔴 401 Unauthorized - No autorizado

El token de acceso no es válido, ha expirado o no se proporcionó en la petición.

```json
{
  "message": "Unauthorized access"
}
```

🔴 404 Not Found - Proyecto no encontrado

Ocurre si el ID no existe en la base de datos o si el usuario autenticado no tiene permisos para ver este proyecto específico.

```json
{
  "message": "Project not found"
}
```

____

### Actualizar proyecto

Permite modificar los datos de un proyecto existente. Solo el usuario propietario o con permisos de gestión sobre el proyecto puede realizar esta acción.

**Endpoint:** `PUT /api/projects/{id}`
**Seguridad:** Requiere `Authorization: Bearer <token>`

---

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto que se desea modificar. |

---

#### 📥 Cuerpo de la Petición (Request Body)

El cuerpo debe enviarse en formato `application/json`. Se recomienda enviar el objeto completo con los cambios realizados.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `name` | String | Sí | Nombre del proyecto. |
| `code` | String | Sí | Código único (no puede duplicar otros proyectos). |
| `category` | String | Sí | Categoría de la obra. |
| `location` | String | Sí | Ubicación actualizada. |
| `surface_sqft` | Number | Sí | Superficie total. |
| `structure_type` | String | Sí | Material o tipo de estructura. |
| `intervention_type`| String | Sí | Tipo de intervención. |
| `assigned_professional`| String | Sí | ID del responsable actual del proyecto. |
| `project_team` | Array | Sí | Lista actualizada de los ID´s de los miembros del equipo. |
| `trades` | Array | Sí | Lista actualizada de oficios involucrados. |
| `project_plan_photo`| String | No | Nueva URL de planos o archivos. |

**Ejemplo de entrada:**
```json
{
  "name": "Reno USA Main Project - Fase II",
  "code": "RENO-US-2026",
  "category": "Residential Renovation",
  "location": "Barcelona, Spain",
  "surface_sqft": 1250,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "John Doe",
  "project_team": ["Alice Smith", "Bob Johnson", "Carlos Ruiz", "Marta Gomez"],
  "trades": ["Electrician", "Plumber", "Mason", "Painter"],
  "project_plan_photo": "[https://cdn.igrowker.com/projects/renousa/plan_v2.pdf](https://cdn.igrowker.com/projects/renousa/plan_v2.pdf)"
}
```
___

### Actualizar proyecto

Permite modificar los datos de un proyecto existente. Solo el usuario propietario o con permisos de gestión sobre el proyecto puede realizar esta acción.

**Endpoint:** `PUT /api/projects/{id}`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto que se desea modificar. |

#### 📥 Cuerpo de la Petición (Request Body)

El cuerpo debe enviarse en formato `application/json`. Se recomienda enviar el objeto completo con los cambios realizados.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `name` | String | Sí | Nombre del proyecto. |
| `code` | String | Sí | Código único (no puede duplicar otros proyectos). |
| `category` | String | Sí | Categoría de la obra. |
| `location` | String | Sí | Ubicación actualizada. |
| `surface_sqft` | Number | Sí | Superficie total. |
| `structure_type` | String | Sí | Material o tipo de estructura. |
| `intervention_type`| String | Sí | Tipo de intervención. |
| `assigned_professional`| String | Sí | Responsable actual del proyecto. |
| `project_team` | Array | Sí | Lista actualizada de miembros del equipo. |
| `trades` | Array | Sí | Lista actualizada de oficios involucrados. |
| `project_plan_photo`| String | No | Nueva URL de planos o archivos. |

**Ejemplo de entrada:**
```json
{
  "name": "Reno USA Main Project - Fase II",
  "code": "RENO-US-2026",
  "category": "Residential Renovation",
  "location": "Barcelona, Spain",
  "surface_sqft": 1250,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "ID_1",
  "project_team": ["ID_2", "ID_3", "ID_4", "ID_5"],
  "trades": ["Electrician", "Plumber", "Mason", "Painter"],
   "project_plan_photo": "https://cdn.igrowker.com/projects/renousa/project_plan.pdf",
  "userId": "ID_6"
}
```

📤 Respuestas (Responses)

🟢 200 OK - Proyecto actualizado exitosamente

Devuelve el objeto del proyecto con todos los campos actualizados.

```json
{
  "name": "Reno USA Main Project - Fase II",
  "code": "RENO-US-2026",
  "category": "Residential Renovation",
  "location": "Barcelona, Spain",
  "surface_sqft": 1250,
  "structure_type": "Concrete",
  "intervention_type": "Renovation",
  "assigned_professional": "ID_1",
  "project_team": ["ID_2", "ID_3", "ID_4", "ID_5"],
  "trades": ["Electrician", "Plumber", "Mason", "Painter"],
   "project_plan_photo": "https://cdn.igrowker.com/projects/renousa/project_plan.pdf",
  "userId": "ID_6",
  "phases": [{}],
  "projectSnapshots": [{}]
}
```
🔴 401 Unauthorized - No autorizado

El token es inválido o el usuario no tiene permisos para editar este proyecto específico.

```json
{
  "message": "Unauthorized: You don't have permission to edit this project"
}
```

🔴 404 Not Found - Proyecto no encontrado

El ID proporcionado no existe en la base de datos.

```json
{
  "message": "Project not found"
}
```

____

###  Eliminar proyecto

Elimina de forma permanente un proyecto del sistema. Esta acción es irreversible y borra todos los datos asociados (fases, tareas, etc.). Solo el usuario propietario del proyecto tiene permisos para realizar esta operación.

**Endpoint:** `DELETE /api/projects/{id}`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | String | Sí | El ID único del proyecto que se desea eliminar de forma definitiva. |

---

#### 📤 Respuestas (Responses)

🟢 200 OK - Proyecto eliminado exitosamente**

La operación se completó correctamente y el recurso ha sido removido de la base de datos.

```json
{
  "message": "Project deleted successfully"
}
```

🔴 401 Unauthorized - No autorizado

El token de acceso es inválido o el usuario autenticado no es el propietario del proyecto, por lo que no tiene permisos de eliminación.

```json
{
  "message": "Unauthorized: Only the owner can delete this project"
}
```
🔴 404 Not Found - Proyecto no encontrado

El identificador proporcionado no coincide con ningún proyecto existente.

```json
{
  "message": "Project not found"
}
```
🔴 500 Internal Server Error - Error de servidor

Error inesperado al intentar procesar la baja en la base de datos.

```json
{
  "message": "Error deleting project"
}
```

___

## 🤖 Módulo de IA (Análisis)

Este módulo conecta el backend con el servicio de Inteligencia Artificial para procesar los datos del proyecto y devolver métricas de incidencia y progreso.

### Generar análisis de IA para un proyecto

Congela el estado actual de la obra, genera un Snapshot y solicita al servicio de Python el cálculo de métricas de avance e incidencias.

**Endpoint:** `POST /api/ai/analyze/{projectId}`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📍 Parámetros de Ruta (Path Parameters)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `projectId` | String | Sí | ID del proyecto a analizar. |

---

#### 📤 Respuestas (Responses)

🟢 201 Created - Análisis procesado exitosamente**

La respuesta es un objeto estructurado para dashboards, enfocado en conteos y porcentajes de incidencia.

```json
{
    "status": "success",
    "data": {
        "advancePercentage": 16,
        "completedTasksCount": 6,
        "uncompletedTasksCount": 32,
        "inProcessTasks": [
            "Clearing and cleaning",
            "Leveling",
            "Soil study",
            "Layout marking"
        ],
        "safetyPercent": 0,
        "safetyCount": 0,
        "electricalPercent": 0,
        "electricalCount": 0,
        "correctionPercent": 0,
        "correctionCount": 0
    }
}

```

🔴 400 Bad Request - Error de procesamiento

El servicio de Python no pudo procesar los datos o el Snapshot está incompleto.

```json
{
  "message": "Error en la generación del reporte"
}
```
🔴 404 Not Found - Proyecto inexistente

```json
{
  "message": "Project not found"
}
```

___

## 📝 Módulo de Tareas

Este módulo permite gestionar el avance diario de los operarios en la obra y el registro de cumplimiento de las tareas asignadas.

### Registrar progreso de tareas

Recibe un listado de tareas que han sido finalizadas. El sistema actualiza su estado a `completed` y realiza un cálculo automático: si se detectan tareas previas sin completar, se registran como incidencias en el historial del proyecto.

**Endpoint:** `PATCH /api/tasks/log-progress`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 📥 Cuerpo de la Petición (Request Body)

El cuerpo debe enviarse en formato `application/json`.

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `taskIds` | Array | Sí | Lista de strings con los IDs únicos de las tareas a marcar como completadas. |

**Ejemplo de entrada:**
```json
{
  "taskIds": [
    "cmkcw7h00099zrxu6si5mbg",
    "cmkcw7j000b9zrxxlbt3rt7"
  ]
}
```

📤 Respuestas (Responses)

🟢 200 OK - Progreso guardado exitosamente

Las tareas fueron actualizadas y se procesaron las incidencias correspondientes.

```json
{
  "message": "Progreso guardado e incidencias calculadas correctamente",
  "updatedTasks": 2,
  "incidencesCreated": 1
}
```
🔴 400 Bad Request - Datos inválidos

Ocurre si el campo taskIds no es un array, está vacío o si Postman envió el paquete como Text en lugar de JSON.

```json
{
  "message": "Se requiere un array válido de taskIds"
}
```
🔴 404 Not Found - Tareas no encontradas

Al menos uno de los IDs enviados no corresponde a ninguna tarea en la base de datos.

```json
{
  "message": "No se encontraron las tareas especificadas"
}
```
🔴 500 Internal Server Error - Error de lógica

Error inesperado al intentar actualizar los estados o al ejecutar el algoritmo de detección de incidencias.

```json
{
  "message": "Error interno del servidor"
}
```

____

### Obtener mis tareas pendientes por oficio

Devuelve la lista de tareas con estado `pending` o `in_progress` de un proyecto específico, filtradas automáticamente por el oficio (`trade`) del usuario autenticado. 

**Endpoint:** `GET /api/tasks/my-pending-tasks`
**Seguridad:** Requiere `Authorization: Bearer <token>`

#### 🔍 Lógica de Negocio
El sistema identifica el oficio del usuario a través del token JWT y solo devuelve las tareas que coincidan con ese OFICIO (trade) en la fase ACTUAL en el proyecto solicitado. Si el usuario no tiene un oficio asignado en su perfil, la petición será rechazada.

#### 📥 Parámetros de Consulta (Query Params)

| Parámetro | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `projectId` | String | Sí | El ID único del proyecto para filtrar las tareas. |

**Ejemplo de URL:** `/api/tasks/my-pending-tasks?projectId=cmmjwnnvq0000o72ecwjcco05`

#### 📤 Respuestas (Responses)

🟢 200 OK - Lista de tareas obtenida con éxito**

Devuelve un array de objetos con las tareas que el operario LOGGEADO tiene pendientes en la fase ACTUAL del proyecto filtrado.

```json
{
    "message": "Tareas pendientes para el oficio: Masonry (Fase actual: Site Preparation)",
    "count": 4,
    "data": [
        {
            "id": "cmmjwno18000no72el96xhnk1",
            "name": "Clearing and cleaning",
            "description": null,
            "status": "pending",
            "category": "SAFETY",
            "order": 1,
            "is_incidence": false,
            "completedAt": null,
            "phaseId": "cmmjwno0z000lo72elv0m1ja4",
            "tradeId": "cmmhbmary0004nxslvl4s696m",
            "phase": {
                "name": "Site Preparation"
            }
        },
        {
            "id": "cmmjwno1h000po72evbukn43b",
            "name": "Leveling",
            "description": null,
            "status": "pending",
            "category": "CORRECTION",
            "order": 2,
            "is_incidence": false,
            "completedAt": null,
            "phaseId": "cmmjwno0z000lo72elv0m1ja4",
            "tradeId": "cmmhbmary0004nxslvl4s696m",
            "phase": {
                "name": "Site Preparation"
            }
        },
        {
            "id": "cmmjwno1r000ro72ed6ql2y9w",
            "name": "Soil study",
            "description": null,
            "status": "pending",
            "category": "SAFETY",
            "order": 3,
            "is_incidence": false,
            "completedAt": null,
            "phaseId": "cmmjwno0z000lo72elv0m1ja4",
            "tradeId": "cmmhbmary0004nxslvl4s696m",
            "phase": {
                "name": "Site Preparation"
            }
        },
        {
            "id": "cmmjwno22000to72ez5zjvzni",
            "name": "Layout marking",
            "description": null,
            "status": "pending",
            "category": "CORRECTION",
            "order": 4,
            "is_incidence": false,
            "completedAt": null,
            "phaseId": "cmmjwno0z000lo72elv0m1ja4",
            "tradeId": "cmmhbmary0004nxslvl4s696m",
            "phase": {
                "name": "Site Preparation"
            }
        }
    ]
}
```

🔴 400 Bad Request - Falta el projectId

Ocurre cuando no se envía el parámetro projectId en la URL.

```json
{
  "message": "Falta el projectId en la query"
}
```
🔴 401 Unauthorized - Token inválido

El token falta o ha expirado.

```json
{
  "message": "No autorizado (falta token)"
}
```
🔴 403 Forbidden - Sin oficio asignado

El usuario está autenticado pero su perfil no tiene un oficio (trade) definido, por lo que no se pueden filtrar tareas.

```json
{
  "message": "El usuario no tiene un oficio asignado"
}
```