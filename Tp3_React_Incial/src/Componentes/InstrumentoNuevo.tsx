import Instrumento from '../Entities/Intrumento';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Categoria from '../Entities/Categoria';
import { getAll,postData,getInstrumentoById,putData } from '../Functions/FunctionsApi';
import NavBar from './NavBar';
import '../index.css'


export default function InstrumentoNuevo(){
    const {id} = useParams();

    const [categoria,setCategoria] = useState<Categoria[]>([]);

    const [instrumento,setInstrumento] = useState<Instrumento>(new Instrumento());

    const getAllCategories = async () =>{
        const result = await getAll<Categoria[]>("http://localhost:8080/categorias")
        setCategoria(result);
    }
    const getInstrumento =async (idInstrumento:number) =>{
        const result = await getInstrumentoById(idInstrumento);
        console.log(result);
        setInstrumento(result);
    }
    useEffect(()=>{
        getAllCategories();
        if(Number(id) == 0){
            let instrumento:Instrumento = new Instrumento();
            setInstrumento(instrumento);
        }else{
            getInstrumento(Number(id));
        }
      },([]))

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;
        
        setInstrumento({ ...instrumento, [name]: value });
    }
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const categoriaSeleccionadaId = parseInt(e.target.value); // Convertir a número
        const categoriaSeleccionada = categoria.find(c => c.id === categoriaSeleccionadaId);
        if (categoriaSeleccionada) {
            setInstrumento({
                ...instrumento,
                categoria: categoriaSeleccionada
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let result = null;
        if(instrumento.id == 0){
            result = await postData<Instrumento>("http://localhost:8080/instrumento/save",instrumento);
        }else{
            result = await putData<Instrumento>(`http://localhost:8080/instrumento/update/${instrumento.id}`,instrumento);
        }
      };

    return(
        <>
        <NavBar />
        <div>
      <h2>Formulario de Instrumento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Instrumento:
          <input type="text" name="instrumento" defaultValue={instrumento.instrumento} onChange={handleChange} />
        </label>
        <br />
        <label>
          Marca:
          <input type="text" name="marca" defaultValue={instrumento.marca} onChange={handleChange} />
        </label>
        <br />
        <label>
          Modelo:
          <input type="text" name="modelo" defaultValue={instrumento?.modelo} onChange={handleChange} />
        </label>
        <br />
        <label>
          Imagen:
          <input type="text" name="imagen" defaultValue={instrumento?.imagen} onChange={handleChange} />
        </label>
        <br />
        <label>
          Precio:
          <input type="text" name="precio" defaultValue={instrumento?.precio} onChange={handleChange} />
        </label>
        <br />
        <label>
          Costo de Envío:
          <input type="text" name="costoEnvio" defaultValue={instrumento?.costoEnvio} onChange={handleChange} />
        </label>
        <br />
        <label>
          Cantidad Vendida:
          <input type="text" name="cantidadVendida" defaultValue={instrumento?.cantidadVendida} onChange={handleChange} />
        </label>
        <br />
        <label>
          Descripción:
          <input type="text" name="descripcion" defaultValue={instrumento?.descripcion} onChange={handleChange} />
        </label>
        <br />
        <select name="categoria" value={instrumento.categoria?.id} onChange={handleChangeSelect}>
            {
                categoria.map((categoria:Categoria)=>{
                    return(
                        <option key={categoria.id} value={categoria.id}>{categoria.denominacion}</option>
                    )
                })
            }
        </select>
        <button type="submit">Enviar</button>
      </form>
    </div>
        </>
    )
}