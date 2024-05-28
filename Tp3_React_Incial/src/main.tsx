import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import InstrumentoDetails from './Componentes/InstrumentoDetails.tsx';
import Home from './Componentes/Home.tsx';
import Map from './Componentes/Map.tsx';
import App from './App.tsx'
import InstrumentoNuevo from './Componentes/InstrumentoNuevo.tsx';
import { RutaPrivada } from './ControlAcceso/RutaPrivada.tsx';
import Register from './Componentes/Register.tsx';
import Login from './Componentes/Login.tsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <RutaPrivada><Home/></RutaPrivada>
        }></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}></Route>
        <Route path="/instrumentos" element={
          <RutaPrivada><App /></RutaPrivada>
        
        }></Route>
        <Route path="/instrumentos">
          <Route path=":id" element={
          <RutaPrivada><InstrumentoDetails/></RutaPrivada>
            
          }></Route>
        </Route>
        <Route path='/donde_estamos' element={
          <RutaPrivada><Map/></RutaPrivada>
        }></Route>

        <Route path='/instrumento/:id' element={
          <RutaPrivada>
            <InstrumentoNuevo/>
          </RutaPrivada>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
