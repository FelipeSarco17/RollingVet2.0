import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBarApp from './common/NavBarApp'
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';
import Contacto from './views/Contacto';
import Planes from './views/Planes';
import IniciarSesion from './views/IniciarSesion';
import Registrarse from './views/Registrarse';
import AdministrarPacientes from './views/AdministrarPacientes';
import AdministrarTurnos from './views/AdministrarTurnos';
import AdministrarMascotas from './views/AdministrarMascotas';
import AdministrarEspecies from './views/AdministrarEspecies';
import Error404 from './views/Error404';
import ModificarPaciente from './views/ModificarPaciente';
import ModificarMascota from './views/ModificarMascota';
import RegistrarMascota from './views/RegistrarMascota';
import RegistrarEspecie from './views/RegistrarEspecie';
import AuthProvider from './contexts/AuthProvider';
import RutasProtegidasAdmin from './routes/RutasProtegidasAdmin'
import { RutasProtegidasUser } from './routes/RutasProtegidasUser';
import Footer from './common/Footer';
import RegistrarTurno from './views/RegistrarTurno';
import { RutasProtegidasUserLogueado } from './routes/RutasProtegidasUserLogueado';




function App() {


  return (
    <AuthProvider>


      <BrowserRouter className='bg-dark'>

        <NavBarApp />
        <Routes>



          <Route path='/registrarTurno' element={<RegistrarTurno />} />
          <Route path='*' element={<Error404 />} />
          <Route path='/' element={<Inicio />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/planes' element={<Planes />} />

          <Route element={<RutasProtegidasUserLogueado />}>
          </Route>

          <Route element={<RutasProtegidasUser />}>
            <Route path='/ingresar' element={<IniciarSesion />} />
            <Route path='/registrarse' element={<Registrarse />} />
          </Route>
          <Route element={<RutasProtegidasAdmin />}>
            <Route path='/admin/gestionPacientes' element={<AdministrarPacientes />} />
            <Route path='/admin/gestionTurnos' element={<AdministrarTurnos />} />
            <Route path='/admin/modificarMascota/:id' element={<ModificarMascota />} />
            <Route path='/admin/modificarPaciente/:id' element={<ModificarPaciente />} />
            <Route path='/admin/modificarMascota/:id' element={<ModificarMascota />} />
            <Route path='/admin/registrarMascota' element={<RegistrarMascota />} />
            <Route path='/admin/registrarEspecie' element={<RegistrarEspecie />} />
            <Route path='/admin/gestionTurnos' element={<AdministrarTurnos />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App
