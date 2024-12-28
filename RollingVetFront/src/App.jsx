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
import Error404 from './views/Error404';
import ModificarPaciente from './views/ModificarPaciente';
import AuthProvider from './contexts/AuthProvider';
import RutasProtegidasAdmin from './routes/RutasProtegidasAdmin'
import { RutasProtegidasUser } from './routes/RutasProtegidasUser';
import Footer from './common/Footer';

function App() {


  return (
    <AuthProvider>

    
    <BrowserRouter className='bg-dark'>
    
      <NavBarApp/>  
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/nosotros' element={<Nosotros />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/ingresar' element={<IniciarSesion/>}/>
          <Route path='/registrarse' element={<Registrarse/>}/>
          <Route path='/planes' element={<Planes />}/>
          <Route path='/admin/gestionPacientes' element={<AdministrarPacientes/>}/>
          <Route path='/admin/modificarPaciente/:id' element={<ModificarPaciente/>}/>
          <Route path='/admin/gestionTurnos' element={<AdministrarTurnos/>}/>
          <Route path='/admin/gestionMascotas' element={<AdministrarMascotas/>}/>

          {/*
          <Route element={<RutasProtegidasUser/>}>
          
          </Route>
          

      <BrowserRouter className='bg-dark'>

        <NavBarApp />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/contacto' element={<Contacto />} />

          <Route path='/planes' element={<Planes />} />

          <Route element={<RutasProtegidasUser />}>
            <Route path='/ingresar' element={<IniciarSesion />} />
            <Route path='/registrarse' element={<Registrarse />} />
          </Route>


          <Route element={<RutasProtegidasAdmin />}>


          ////////////////////////////////////////////////////////  IMPORTANTE
            <Route path='/admin/gestionPacientes' element={<AdministrarPacientes />} />
            <Route path='/admin/gestionTurnos' element={<AdministrarTurnos />} />
          </Route>
*/}

          <Route path='*' element={<Error404 />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App
