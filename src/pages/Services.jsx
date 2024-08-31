import // PlusCircleIcon,
// EyeIcon,
// PencilSquareIcon,
// TrashIcon,
"@heroicons/react/16/solid";
import { administrator } from "../utilies/routes";
import Sidebar, { SidebarItem } from "./layout/Sidebar";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import swal from "sweetalert";
import { Services } from "../models/services/services.model";

export default function Service() {
  const formService = new Services();
  const [formData, setServiceData] = useState(formService);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setServiceData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkSeleccionado = document.querySelector(
      'input[name="estado"]:checked'
    );

    if (checkSeleccionado) {
      setData([...data, formData]);
      setServiceData({
        categoria: "",
        nombre: "",
        valor: "",
        estado: "",
      });
    }
  };

  const handleReset = () => {
    setServiceData({
      categoria: "",
      nombre: "",
      valor: "",
      estado: "",
    });
  };

  const handleCheck = (e) => {
    const state = e.target.checked;
    swal({
      title: "¿Estás seguro?",
      text: "Si desactivas este servicio, no podra ser exhibido en los paquetes",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        {
          e.target.checked = state ? true : false;
        }
      }
       else {
        e.target.checked = state ? false : true;
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
          <form className="col-sm-12 col-md-6" onSubmit={handleSubmit}>
            <div className="mb-3">
              <legend>Servicio</legend>
              <label>Categoría</label>
              <select
                className="form-select"
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value=" ">Selecciona una categoría</option>
                <option>Transporte</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">
                Valor
              </label>
              <input
                type="number"
                className="form-control"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <div>
                <label htmlFor="habilitado">Habilitado</label>
                <input
                  type="radio"
                  id="habilitado"
                  name="estado"
                  value="habilitado"
                  onChange={handleChange}
                />
                <label htmlFor="deshabilitado">Deshabilitado</label>
                <input
                  type="radio"
                  id="deshabilitado"
                  name="estado"
                  value="deshabilitado"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Limpiar
            </button>
          </form>
          <fieldset className="col-sm-12 col-md-5">
            <legend>Servicios</legend>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Acciones</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <PencilSquareIcon width={25} type="button" />
                      <TrashIcon width={25} type="button" />
                      <div className="form-switch d-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          name="state"
                          onChange={handleCheck}
                          checked
                        />
                        {/* Hacer la validacion de, si le doy al radio me tiene que poner el estado que selecciones, si es habilitado o deshabilitado */}
                      </div>
                    </td>
                    <td>{item.categoria}</td>
                    <td>{item.nombre}</td>
                    <td>{item.valor}</td>
                    <td>{item.estado}</td>
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
