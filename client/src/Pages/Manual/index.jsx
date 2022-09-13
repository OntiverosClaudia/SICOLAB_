import Header from '../../Components/Header';
import { FaBook, FaBookReader, FaEye, FaTools } from 'react-icons/fa';
import './styles.css';
import { Table } from 'react-bootstrap';

const Manual = () => {
  return (
    <>
      <Header />
      <div className="container-ManualUso">
        <h1>Opciones del menú</h1>
        {/* Seccion 1 */}
        <div className="boxes-OpcionesM">
          <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-calendar"></i>
            </p>
            <h2>Horarios</h2>
            Módulo en donde se crean, eliminan y visualizan los horarios de los
            distintos laboratorios del departamento.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Laboratorios, Materias, Docentes
            </p>
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-desktop"></i>
            </p>
            <h2>Laboratorios</h2>
            Módulo en donde se crean, editan, eliminan y consultan los
            laboratorios del Departamento de Ingenieria Industrial.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Ninguna
            </p>
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <FaTools />
            </p>
            <h2>Herramientas</h2>
            Módulo en donde se crean, editan, eliminan y consultan las
            herramientas que se pueden prestar para utilizar en los
            laboratorios.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Laboratorios
            </p>
          </div>
        </div>
        {/* Seccion 2 */}
        <div className="boxes-OpcionesM">
          <div className="box-OpcionesM">
            <p className="icon">
              <FaBook />
            </p>
            <h2>Materias</h2>
            Módulo en donde se crean, editan, eliminan y consultan las materias
            que se imparten en los laboratorios.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Docentes
            </p>
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-users"></i>
            </p>
            <h2>Estudiantes</h2>
            Módulo en donde se crean (individualmente o en masa), editan,
            eliminan y consultan los estudiantes del departamento.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Ninguna
            </p>
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-list"></i>
            </p>
            <h2>Registros de acceso</h2>
            Módulo en donde se consultan los registros de acceso a los
            laboratorios creados desde la vista docente.
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Laboratorios, Materias, Docentes, Estudiantes
            </p>
          </div>
        </div>
        {/* Seccion 3 */}
        <div className="boxes-OpcionesM mb-5">
          <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-gears"></i>
            </p>
            <h2>Administrar cuentas</h2>
            Módulo en donde se crean, editan, eliminan y consultan las cuentas
            de usuario del sistema (administradores y docentes).
            <p className="subtitulos-OM">
              <b>Dependencia:</b> Ninguna
            </p>
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <FaEye />
            </p>
            <h2>Vista docente</h2>
            Al dar clic en esta opción, el administrador podrá acceder a los
            módulos del docente con una mayor facilidad.
          </div>
          <div className="box-OpcionesM">
            <p className="icon">
              <FaBookReader />
            </p>
            <h2>Manual de uso</h2>
            Apartado únicamente informativo para que el usuario comprenda puntos
            importantes de todos los módulos.
          </div>
          {/* <div className="box-OpcionesM">
            <p className="icon">
              <i className="fa fa-power-off"></i>
            </p>
            <h2>Cerrar sesión</h2>
            Al presionar esta opción del menú, se cerrará la cuenta del usuario
            y cargará el login para que se inicie sesión con otra cuenta.
          </div> */}
        </div>
        <hr />
        <div className="contentTextManual">
          {/* Orden */}
          <h1>Orden sugerido para manipulación de recursos</h1>
          <p>
            Especialmente la primera vez usando el sistema, se recomienda
            comenzar con la creación de datos de los siguientes módulos (sin
            importar el orden), puesto a que no tienen ninguna dependencia, y
            por ende no ocurrirá ningún error por incongruencia o falta de datos
            que aún no existen.
          </p>{' '}
          <p className="TabText">1. Laboratorios</p>{' '}
          <p className="TabText">2. Estudiantes</p>
          <p className="TabText">
            3. Usuarios: administradores y docentes (Administración de cuentas)
          </p>{' '}
          <p>
            Después de agregar los laboratorios, se puede crear el módulo de:
          </p>{' '}
          <p className="TabText">4. Herramientas</p>{' '}
          <p>
            Una vez que se hayan subido los docentes (usuarios), se recomienda
            crear el módulo de:
          </p>{' '}
          <p className="TabText">5. Materias</p>{' '}
          <p>
            Ya que se agregó todo lo anterior, ahora se puede crear sin
            problemas el siguiente módulo:
          </p>{' '}
          <p className="TabText">6. Horarios</p>{' '}
          <p>
            {' '}
            Ahora bien, aunque la opción restante aparece en el menú
            administrativo, ciertamente se trata de una opción de consulta. Para
            la creación de este módulo es necesario ingresar con una cuenta de
            rol docente o dar clic sobre la opción de “Vista docente”, en donde
            se podrá seguir con este importante proceso.
          </p>{' '}
          <p className="TabText mb-5">7. Registros de acceso</p>
          <hr />
          {/* Datos */}
          <h1 style={{ marginTop: '3rem' }}>Datos relevantes del sistema</h1>
          <ul className="ul-ListaPrincipalSquare mb-5">
            <li>
              A excepción de los campos “Observaciones” y “Herramientas”, no se
              permiten campos vacíos, ya que el sistema está validado para
              requerir que todos se llenen. Si el campo “Observaciones” se deja
              vacío, su valor por default será “Ninguna”.
            </li>

            <li>
              En el módulo “Horarios” existe un botón para eliminar todas las
              clases del horario de un laboratorio seleccionado, el cual cumple
              la función de facilitar el reseteo de horario cada inicio de ciclo
              escolar.
            </li>

            <li>
              El único módulo que no se puede manipular una vez es creado, es el
              de “Registros de acceso”, sino que es únicamente de consulta (por
              parte del administrador).
            </li>

            <li>
              En todos los campos donde se tiene que agregar un correo
              electrónico, obligatoriamente debe tener el siguiente formato:
              <p className="TabText">
                <ul>
                  <li>cadenadecaracteres@cadenadecaracteres</li>
                </ul>
              </p>
            </li>

            <li>
              Para la creación de más de un estudiante a la vez, se tiene la
              opción de hacerlo a través de seleccionar un documento de Excel,
              para esto, la tabla dentro de este documento debe lucir de la
              siguiente forma:
            </li>

            <Table bordered borderless>
              <thead>
                <tr className="table-titulo">
                  <th>NoControl</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                </tr>
              </thead>
            </Table>
            <div className="Manual-EstudiantesExcelNota">
              <p>
                <ul>
                  <li>
                    <b>Nota:</b> Los encabezados de la tabla del documento de
                    Excel deben tener el mismo orden y nombre (respetando
                    mayúsculas y minúsculas).
                  </li>
                </ul>
              </p>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Manual;
