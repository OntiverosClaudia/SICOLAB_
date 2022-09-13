## SICOLAB: Sistema de Control de acceso a Laboratorios del departamento de Ingeniería Industrial

---

### Configuración

> Se deben realizar los debidos cambios a los siguientes documentos, según su ubicación en carpeta:  
> **Client**
>
> > Carpeta _API_  
> > ➭ **index.js:** dirección en la que se encuentra el servidor para realizar las peticiones.
>
> **Server**
>
> > ➭ **.env:** datos relevantes para conectar con la base de datos (usuario, nombre, contraseña, host).  
> > ➭ **app.js:** puerto en el que se levantará el servidor.

---

### Requerimientos

> SICOLAB requiere del siguiente gestionador de base de datos:
>
> > ➭ Mysql
>
> El sistema cuenta con una base de datos de 10 tablas.  
> Para la primera vez que se vaya a utilizar hay dos tablas que se deben modificar:
>
> > ➭ Roles  
> > ➭ Usuarios

1. Creación de **Roles**

| Id  | Descripción   |
| --- | ------------- |
| 1.  | Administrador |
| 2.  | Docente       |
| 3.  | Estudiante    |

- **Nota:** _El orden especificado anteriormente es de especial importancia, ya que garantiza el correcto funcionamiento del sistema._

2. Creación de **Usuarios**

   > Es importante crear el primer **usuario**, cuyo rol sea de tipo **administrador**, de esta forma tendrá acceso a todas las funcionalidades del sistema y podrá generar acceso a otros usuarios que pueden tener el mismo rol.  
   > El o los adminitradores se encargarán de llevar la administración de los distintos módulos del sistema.

3. Llamados realizados (tablas mencionadas)
   > A continuación se muestran las dos peticiones a la API que se deben hacer para poder usar el sistema:

| Tipo | Nombre del llamado | Descripción                                | Datos que solicita                                                | Llamado                         |
| ---- | ------------------ | ------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- |
| POST | /roles/            | Crea un rol dentro de la base de datos     | DescripcionRol                                                    | http://localhost:5000/roles/    |
| POST | /usuarios/         | Crea un usuario dentro de la base de datos | id_rol, Nombre, Apellido, Correo, Contraseña, CodigoInstitucional | http://localhost:5000/usuarios/ |
