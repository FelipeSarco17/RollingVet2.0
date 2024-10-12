import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const AdministrarPacientes = () => {
  let pacienteEditar = {};
  const [show, setShow] = useState(false);
  const [pacientes, setPacientes] = useState([{nombre: "Alberto", id:"5"}]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
/*
  useEffect(() => {
    // Traer los usuarios
    });
  }, []);
*/
  const pasarDatos = (obj) => {
    pacienteEditar = obj;
  };

  return (
    <main>
      <h1>Adminsitrar Pacientes</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => {
            return (
              <tr key={`PacienteRow${paciente.id}`}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.email}</td> <td>{paciente.telefono}</td>
                <td>
                  <Link
                    className="btn btn-warning me-1"
                    to={`/admin/modificarPaciente/${paciente.id}`}
                    style={{background:"red"}}
                  >
                    Editar
                  </Link>
                  <Button >
                    Borrar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </main>
  );
};

export default AdministrarPacientes;