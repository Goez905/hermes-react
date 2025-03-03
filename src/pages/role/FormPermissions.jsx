import { useState } from "react";
import swal from "sweetalert";

export default function FormPermissions() {
 // Creamos un arreglo llamado "permissions" que contiene objetos con información sobre permisos
const permissions = [
  { id_permission: 1, name: "Dashboard", state: true },  // Permiso 1: Dashboard (activo)
  { id_permission: 2, name: "Gestion de Roles", state: true },  // Permiso 2: Gestión de Roles (activo)
  { id_permission: 3, name: "Gestion de Servicios", state: true },  // Permiso 3: Gestión de Servicios (activo)
  { id_permission: 4, name: "Gestion de Usuarios", state: true },  // Permiso 4: Gestión de Usuarios (activo)
  { id_permission: 5, name: "Gestion de Reservas", state: true },  // Permiso 5: Gestión de Reservas (activo)
];

// Creamos otro arreglo llamado "privilegios" que contiene objetos con información sobre privilegios
const privilegios = [
  { id_privilege: 1, name: "Crear" },  // Privilegio 1: Crear
  { id_privilege: 2, name: "Ver" },    // Privilegio 2: Ver
  { id_privilege: 3, name: "Editar" },  // Privilegio 3: Editar
  { id_privilege: 4, name: "Eliminar" }, // Privilegio 4: Eliminar
  { id_privilege: 5, name: "Cambiar estado" },  // Privilegio 5: Cambiar estado
];

// Utilizamos el hook useState de React para crear un estado inicial para el rol y los permisos con privilegios
const [role, setRole] = useState({ name: "" });  // Estado del rol (inicialmente vacío)
const [permissionsWithPrivileges, setPermissionsWithPrivileges] = useState(
  permissions.map(permission => ({
    ...permission,  // Copiamos las propiedades del permiso original
    privileges: privilegios.reduce((acc, privilege) => {  // Creamos un objeto para los privilegios de cada permiso
      acc[privilege.id_privilege] = false;  // Inicializamos cada privilegio como deshabilitado (false)
      return acc;
    }, {})
  }))
);

// Función para manejar el envío del formulario
const handleSubmit = (e) => {
  e.preventDefault();  // Evita que el formulario se recargue por defecto

  // Verificamos si se ha seleccionado al menos un privilegio
  const hasSelectedPrivileges = permissionsWithPrivileges.some(permission =>
    Object.values(permission.privileges).includes(true)
  );

  if (!hasSelectedPrivileges) {
    // Mostramos una alerta si no se ha seleccionado ningún privilegio
    swal({
      title: "Por favor seleccione al menos un privilegio",
      icon: "warning",
    });
    return;  // Detenemos la ejecución de la función
  }

  // Mostramos una confirmación para otorgar los privilegios
  swal({
    title: "¿Quieres otorgar estos privilegios?",
    text: "Revisa todos los campos antes de enviar el formulario para evitar conflictos",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((confirm) => {
    if (confirm) {
      // Si se confirma, reseteamos los permisos y el rol, y mostramos una alerta de éxito
      setPermissionsWithPrivileges(
        permissionsWithPrivileges.map(permission => ({
          ...permission,
          privileges: privilegios.reduce((acc, privilege) => {
            acc[privilege.id_privilege] = false;
            return acc;
          }, {})
        }))
      );
      setRole({ name: "" });
      swal({
        title: "Enviado",
        text: "Los datos fueron enviados correctamente",
        icon: "success",
        timer: 2000,
        buttons: false,
      });
    } else {
      // Si se cancela, mostramos una alerta de cancelación
      swal({
        title: "Cancelado",
        text: "Los datos no se han enviado",
        icon: "error",
        timer: 2000,
        buttons: false,
      });
    }
  });
};

const handleChangeRole = (e) => {
  // Extraemos el nombre y el valor del campo de entrada que generó el evento
  const { name, value } = e.target;

  // Creamos una copia del estado actual del rol
  setRole({ ...role, [name]: value });
  // Actualizamos el estado del rol con el nuevo valor.
  // Utilizamos el operador de propagación (...) para copiar las propiedades existentes
  // y luego usamos notación de corchetes para actualizar la propiedad específica
  // con el nombre y el valor extraídos del evento.
};

const handleChangePrivilege = (permissionId, privilegeId) => (e) => {
  // Extraemos el estado del checkbox (true si está marcado, false si no)
  const { checked } = e.target;

  // Actualizamos el estado de los permisos con privilegios
  setPermissionsWithPrivileges(prev =>
      prev.map(permission =>
          permission.id_permission === permissionId
          // Si el ID del permiso coincide, actualizamos el privilegio
          ? {...permission, // Copiamos las propiedades del permiso
              privileges: {...permission.privileges, // Copiamos los privilegios existentes
                  [privilegeId]: checked // Actualizamos el privilegio específico
              }
          }// Si no coincide, devolvemos el permiso sin cambios
          : permission
      )
  );
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="role">Rol:</label>
        <input
          className="form-control"
          name="name"
          value={role.name}
          onChange={handleChangeRole}
          pattern="^[A-Z][a-zñ]{3,}[^\d\W_]*$"
          required
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            {privilegios.map(privilege => (
              <th key={privilege.id_privilege}>{privilege.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissionsWithPrivileges.map(permission => (
            <tr key={permission.id_permission}>
              <td className="px-4 py-3">{permission.name}</td>
              {privilegios.map(privilege => (
                <td className="px-4 py-3" key={privilege.id_privilege}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={!!permission.privileges[privilege.id_privilege]}
                    value={privilege.id_privilege}
                    onChange={handleChangePrivilege(permission.id_permission, privilege.id_privilege)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button type="reset" className="btn btn-primary">
          Cancelar
        </button>
      </div>
    </form>
  );
}
