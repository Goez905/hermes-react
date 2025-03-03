import // PlusCircleIcon,
// EyeIcon,
// PencilSquareIcon,
// TrashIcon,
"@heroicons/react/16/solid";
import { administrator } from "../../utilies/routes";
import Sidebar, { SidebarItem } from "../layout/Sidebar";
import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import swal from "sweetalert";
import { Services } from "../../models/services/services.model";
import { Form } from "react-bootstrap";

export default function Service() {
  const formService = new Services();
  const [serviceData, setServiceData] = useState(formService);
  const [data, setData] = useState([]);
  let [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setServiceData(new Services());
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
      } else {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
    } else {
      swal({
        title: "¿Quieres registrarte con estos datos?",
        text: "Revisa todos los campos antes de enviar el formulario para evitar conflictos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          setData([...data, serviceData]);
          swal({
            title: "Enviado",
            text: "Los datos fueron enviados correctamente",
            icon: "success",
            timer: 2000,
            buttons: false,
          });
        } else {
          swal({
            title: "Cancelado",
            text: "Los datos no se han enviado",
            icon: "error",
            timer: 2000,
            buttons: false,
          });
        }
      });
    }
    setValidated(true);
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
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="col-sm-12 col-md-6 p-1"
          >
            <div className="mb-3">
              <legend>Servicio</legend>
              <label>Categoría</label>
              <select
                className="form-select"
                name="id_categoryService"
                value={serviceData.id_categoryService}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value={1}>Transporte</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={serviceData.name}
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
                name="price"
                value={serviceData.price}
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
                  name="status"
                  value={true}
                  onChange={handleChange}
                  checked
                />
                <label htmlFor="deshabilitado">Deshabilitado</label>
                <input
                  type="radio"
                  id="deshabilitado"
                  name="status"
                  value={false}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="buttons">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button type="reset" className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </Form>
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
                    <td>{item.id_categoryService}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.status ? "Activo" : "Inactivo"}</td>
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
