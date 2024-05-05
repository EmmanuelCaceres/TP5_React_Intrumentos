import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import InstrumentoDetails from './Componentes/InstrumentoDetails.tsx';
import Home from './Componentes/Home.tsx';
import Map from './Componentes/Map.tsx';
import App from './App.tsx'
import InstrumentoNuevo from './Componentes/InstrumentoNuevo.tsx';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/instrumentos" element={<App />}></Route>
        <Route path="/instrumentos">
          <Route path=":id" element={<InstrumentoDetails/>}></Route>
        </Route>
        <Route path='/donde_estamos' element={<Map/>}></Route>
        <Route path='/instrumento/:id' element={<InstrumentoNuevo/>}></Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
