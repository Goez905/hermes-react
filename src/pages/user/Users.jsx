import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { administrator } from "../../utilies/routes";
import Sidebar, { SidebarItem } from "../layout/Sidebar";
import UserForm from "./UserForm";
import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  // setUsers(JSON.parse(localStorage.getItem("users")))

  const handleEditUser = (e) => {
    console.log(parseInt(e.currentTarget.id));
    console.log("Editando usuario");
  };

  const handleDeleteUser = (e) => {
    console.log(parseInt(e.currentTarget.id));
    console.log("Eliminando usuario");
  };

  // useEffect(() => {}, [users]);
  // useEffect(() => {}, [formUser]);

  return (
    <div className="row">
      <Sidebar>
        {administrator.map((link) => {
          return (
            <SidebarItem
              key={link.name}
              name={link.name}
              href={link.href}
              icon={<link.icon width={30} />}
            />
          );
        })}
      </Sidebar>
      <main className="col-11">
        <div className="row p-2">
          <fieldset className="col-sm-12 col-md-6">
            <legend>Usuario</legend>
            <UserForm />
          </fieldset>
          <fieldset className="col-sm-12 col-md-6">
            <legend>Usuarios</legend>
            <header className="my-4">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar"
              />
            </header>
            <table className="table table-striped">
              <thead>
                <th scope="col">Acciones</th>
                <th scope="col">Identificacion</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col">Estado</th>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_user}>
                    <td className="d-flex">
                      <button className="btn m-0 p-0">
                        <PencilSquareIcon
                          width={25}
                          onClick={handleEditUser}
                          id={user.id_user}
                        />
                      </button>
                      <button className="btn m-0 p-0">
                        <TrashIcon
                          width={25}
                          onClick={handleDeleteUser}
                          id={user.id_user}
                        />
                      </button>
                      <div className="form-switch d-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          name="state"
                          checked={user.state}
                        />
                      </div>
                    </td>
                    <td>{user.identification}</td>
                    <td>{user.email}</td>
                    <td>{user.id_role}</td>
                    <td>{user.state ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>
      </main>
    </div>
  );
}
