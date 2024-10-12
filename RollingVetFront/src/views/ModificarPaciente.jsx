import { useForm } from "react-hook-form";
import { useParams, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormSelect from 'react-bootstrap/FormSelect';
// { Capturar usuario y Modificar Usuario } from utils
import { useEffect } from "react";


const ModificarPaciente = () => {
    
    const navigate = useNavigate()

    const {register, handleSubmit, formState:{errors}, reset, setValue } = useForm();
    const {id} = useParams();

    const modificarDatos = (obj) => {
        console.log(obj);
        // modificarUsuario(id, obj);
        navigate("/admin/gestionPacientes")
    }

    const obtenerProducto = async (id) => {
        try {
            // let data = await capturarUsuario(id)
            // let obj = data.data;
            if (obj) {
                console.log(obj);
                setValue("nombre",obj.nombre);
                // setValue("key", obj.key);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      obtenerProducto(id)
    }, [])
    
  return (
    <main className="main d-flex justify-content-around align-items-center flex-wrap">
    <Form className="w-50" onSubmit={handleSubmit(modificarDatos)} method="post">
        <FormGroup>
            <Form.Label>
                Nombre
            </Form.Label>
            <FormControl 
            type="text"
            {...register("nombre",{required:"Este campo es obligatorio."})}
            />
            <Form.Text className="text-danger">
                {errors.nombre?.message}
            </Form.Text>
        </FormGroup>
        {
        // agregar todos los form groups que hagan falta.
        }


        <FormGroup className="my-4">
            <Button type="submit">Agregar Producto.</Button>
        </FormGroup>
    </Form>
    </main>
  )
}

export default ModificarPaciente