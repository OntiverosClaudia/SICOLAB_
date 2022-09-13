import Calls from './calls';

const url = (url) => {
  return 'http://192.168.1.70:5000' + url;
};

export function UserExist() {
  return localStorage.getItem('user') !== null;
}
// Login
export function AuthLogin(user) {
  const params = new URLSearchParams();
  params.append('CodigoInstitucional', user.CodigoInstitucional);
  params.append('Contraseña', user.Contraseña);

  return Calls.Post({ url: url('/usuarios/auth'), body: params })
    .then((res) => res)
    .catch((err) => err);
}
// Laboratorios
export function GetLaboratories() {
  return Calls.Get({ url: url('/laboratorios/') })
    .then((res) => res)
    .catch((err) => err);
}

export function getLaboratoryForId(idLaboratorio) {
  return Calls.Get({
    url: url(`/laboratorios/${idLaboratorio}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateLaboratory(laboratorio) {
  const params = new URLSearchParams();
  params.append('ClaveLaboratorio', laboratorio.ClaveLaboratorio);
  params.append('NombreLaboratorio', laboratorio.NombreLaboratorio);

  return Calls.Post({ url: url('/laboratorios/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateLaboratory(laboratorio, idLaboratorio) {
  const params = new URLSearchParams();
  params.append('ClaveLaboratorio', laboratorio.ClaveLaboratorio);
  params.append('NombreLaboratorio', laboratorio.NombreLaboratorio);
  return Calls.PUT({
    url: url(`/laboratorios/modificar/${idLaboratorio}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeleteLaboratory(idLaboratorio) {
  return Calls.PUT({
    url: url(`/laboratorios/${idLaboratorio}`),
  })
    .then((res) => res)
    .catch((err) => err);
}
//
export function CreateReportLaboratory(laboratorio) {
  const params = new URLSearchParams();
  params.append('id_laboratorio', laboratorio.id_laboratorio);
  params.append('FechaInicial', laboratorio.FechaInicial);
  params.append('FechaFinal', laboratorio.FechaFinal);

  return Calls.Post({
    url: url('/laboratorios/reporte/'),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}
export function CreateReportLaboratoryNoGroup(laboratorio) {
  const params = new URLSearchParams();
  params.append('id_laboratorio', laboratorio.id_laboratorio);
  params.append('FechaInicial', laboratorio.FechaInicial);
  params.append('FechaFinal', laboratorio.FechaFinal);

  return Calls.Post({
    url: url('/laboratorios/reporteDetallado/'),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

// Herramientas
export function GetHerramientas() {
  return Calls.Get({ url: url('/herramientas/') })
    .then((res) => res)
    .catch((err) => err);
}

export function getHerramientasByIdLaboratory(idLaboratorio) {
  return Calls.Get({
    url: url(`/herramientas/filtro/${idLaboratorio}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateHerramienta(herramienta) {
  const params = new URLSearchParams();
  params.append('NombreHerramienta', herramienta.NombreHerramienta);
  params.append('id_laboratorio', herramienta.id_laboratorio.value);

  return Calls.Post({ url: url('/herramientas/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateHerramienta(herramienta, idHerramienta) {
  const params = new URLSearchParams();
  params.append('NombreHerramienta', herramienta.NombreHerramienta);
  params.append('id_laboratorio', herramienta.id_laboratorio.value);
  return Calls.PUT({
    url: url(`/herramientas/modificar/${idHerramienta}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeleteHerramienta(idHerramienta) {
  return Calls.PUT({
    url: url(`/herramientas/${idHerramienta}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

// Registros
export function GetListDetails() {
  return Calls.Get({ url: url('/lista/FormatoRegistro') })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateRegisters(registro) {
  const params = new URLSearchParams();
  params.append('id_clase', registro.id_clase);
  params.append('Fecha', registro.Fecha);
  params.append('Observaciones', registro.Observaciones);

  return Calls.Post({ url: url('/registros/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateRegistersStudents(registroe) {
  const params = new URLSearchParams();
  params.append('id_registro', registroe.id_registro);
  params.append('Estudiantes', registroe.Estudiantes);

  return Calls.Post({ url: url('/lista/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateRegistersTools(Herramientas) {
  const params = new URLSearchParams();
  params.append('id_registro', Herramientas.id_registro);
  params.append('Herramientas', Herramientas.Herramientas);

  return Calls.Post({ url: url('/registroHerramientas/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

// Cuentas usuario
export function GetUsersDetails() {
  return Calls.Get({ url: url('/usuarios/') })
    .then((res) => res)
    .catch((err) => err);
}
export function GetRoleList() {
  return Calls.Get({ url: url('/roles/') })
    .then((res) => res)
    .catch((err) => err);
}

export function GetTeachersDetails() {
  return Calls.Get({ url: url('/usuarios/docentes') })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateUsers(usuario) {
  const params = new URLSearchParams();
  params.append('id_rol', usuario.id_rol);
  params.append('Nombre', usuario.Nombre);
  params.append('Apellido', usuario.Apellido);
  params.append('CodigoInstitucional', usuario.CodigoInstitucional);
  params.append('Correo', usuario.Correo);
  params.append('Contraseña', usuario.Contraseña);

  return Calls.Post({ url: url('/usuarios/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateUsers(usuario, idUsuario) {
  const params = new URLSearchParams();
  params.append('id_rol', usuario.id_rol);
  params.append('Nombre', usuario.Nombre);
  params.append('Apellido', usuario.Apellido);
  params.append('CodigoInstitucional', usuario.CodigoInstitucional);
  params.append('Correo', usuario.Correo);
  if (usuario.Contraseña) params.append('Contraseña', usuario.Contraseña);
  return Calls.PUT({
    url: url(`/usuarios/modificar/${idUsuario}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeleteUsers(idUsuario) {
  return Calls.PUT({
    url: url(`/usuarios/${idUsuario}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

// Lista estudiantes
export function GetStudentsDetails() {
  return Calls.Get({ url: url('/estudiantes/') })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateStudents({ Nombre, Apellido, NoControl, Correo }) {
  const params = new URLSearchParams();
  params.append('Nombre', Nombre);
  params.append('Apellido', Apellido);
  params.append('NoControl', NoControl);
  params.append('Correo', Correo);

  return Calls.Post({ url: url('/estudiantes/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateStudents(estudiante, idUsuario) {
  const params = new URLSearchParams();
  params.append('Nombre', estudiante.Nombre);
  params.append('Apellido', estudiante.Apellido);
  params.append('NoControl', estudiante.NoControl);
  params.append('Correo', estudiante.Correo);

  return Calls.PUT({
    url: url(`/estudiantes/modificar/${idUsuario}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeleteStudents(idEstudiante) {
  return Calls.PUT({
    url: url(`/estudiantes/${idEstudiante}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

export function SearchStudentByControlNumber(controlNumber) {
  return Calls.Get({ url: url(`/estudiantes/buscar/${controlNumber}`) })
    .then((res) => res)
    .catch((err) => err);
}

// Clases / Horario
export function getClasesByIdLaboratory(idLaboratorio) {
  return Calls.Get({
    url: url(`/clases/horario/${idLaboratorio}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

export function GetDetailsEdit(customID) {
  return Calls.Get({ url: url('/clases/detallesMateria/' + customID) })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateSchedules(clase) {
  return Calls.Post({ url: url('/clases/'), body: clase })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateSchedules(clase, idClase) {
  const params = new URLSearchParams();
  params.append('id_laboratorio', clase.id_laboratorio);
  params.append('id_materia', clase.id_materia);
  params.append('HoraInicio', clase.HoraInicio);
  params.append('HoraFinal', clase.HoraFinal);
  params.append('Dia', clase.Dia);
  params.append('SlotInicial', clase.SlotInicial);
  params.append('SlotFinal', clase.SlotFinal);

  return Calls.PUT({
    url: url(`/clases/modificar/${idClase}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeactivateClass(CustomID) {
  return Calls.PUT({
    url: url(`/clases/eliminar/${CustomID}`),
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeactivateClassByLaboratory(id_laboratorio) {
  return Calls.PUT({
    url: url(`/clases/desactivar/${id_laboratorio}`),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// Materias
export function GetMaterias() {
  return Calls.Get({ url: url('/materias/') })
    .then((res) => res)
    .catch((err) => err);
}

export function CreateMaterias(materia) {
  const params = new URLSearchParams();
  params.append('NombreMateria', materia.NombreMateria);
  params.append('Clave', materia.Clave);
  params.append('id_usuario', materia.id_usuario);

  return Calls.Post({ url: url('/materias/'), body: params })
    .then((res) => res)
    .catch((err) => err);
}

export function UpdateMaterias(materia, idMateria) {
  const params = new URLSearchParams();
  params.append('NombreMateria', materia.NombreMateria);
  params.append('Clave', materia.Clave);
  params.append('id_usuario', materia.id_usuario);

  return Calls.PUT({
    url: url(`/materias/modificar/${idMateria}`),
    body: params,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function DeleteMateria(idMateria) {
  return Calls.PUT({
    url: url(`/materias/${idMateria}`),
  })
    .then((res) => res)
    .catch((err) => err);
}
