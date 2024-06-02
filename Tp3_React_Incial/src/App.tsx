import { useEffect, useState } from 'react'
import './App.css'
import Instrumento from './Entities/Intrumento.ts'
import Card from './Componentes/Card.tsx'
import NavBar from './Componentes/NavBar.tsx'
import { getAll } from './Functions/FunctionsApi.ts'
import { CarritoContextProvider } from './context/CarritoContext.tsx'
import Carrito from './Componentes/Carrito.tsx'

function App() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const mostrar = async () => {
    const result: Instrumento[] = await getAll<Instrumento[]>("http://localhost:8080/instrumentos");
    setInstrumentos(result)
  }

  const descargarExcel =()=>{
    if (fechaInicio && fechaFin) {
      const inicioISO = new Date(fechaInicio).toISOString();
      const finISO = new Date(fechaFin).toISOString();
      console.log(inicioISO,finISO)
      window.open(`http://localhost:8080/pedidos/api/downloadExcel?fechaInicio=${inicioISO}&fechaFin=${finISO}`, '_blank');
    } else {
      alert("Por favor selecciona ambas fechas.");
    }
}


  useEffect(() => {
    mostrar();
  }, ([]))

  return (
    <>
      <CarritoContextProvider>
        <NavBar />
        <div style={{ display: "flex",width:"100%" }}>
        <div>
      <h3>Selecciona el rango de fechas para descargar el Excel</h3>
      <div>
        <label>Fecha Inicio: </label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha Fin: </label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>
      <button onClick={descargarExcel}>Descargar Excel</button>
    </div>
          <div style={{width:"100%"}}>
            {
              instrumentos.map((instrumento: Instrumento) => {
                return (
                  <Card info={instrumento} key={instrumento.id} />
                )
              })
            }
          </div>
          <Carrito></Carrito>
        </div>
      </CarritoContextProvider>
    </>
  )
}

export default App
