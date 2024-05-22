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
  const mostrar = async () => {
    const result: Instrumento[] = await getAll<Instrumento[]>("http://localhost:8080/instrumentos");
    setInstrumentos(result)
  }
  useEffect(() => {
    mostrar();
  }, ([]))

  return (
    <>
      <CarritoContextProvider>
        <NavBar />
        <div style={{ display: "flex" }}>
          <div>
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
