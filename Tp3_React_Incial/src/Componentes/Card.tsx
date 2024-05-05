import Instrumento from '../Entities/Intrumento';
import { deleteData } from '../Functions/FunctionsApi';
import NavBar from './NavBar';
import '../index.css'
  
  interface Props {
    info: Instrumento; 
    key: Number; 
  }

  const Card: React.FC<Props> = (props:Props) => {

    const deletePlato = async (idIngrediente:Number) => {
        await deleteData(`http://localhost:8080/instrumento/delete/${idIngrediente}`);
        window.location.reload();
      }

    const infoCostoEnvio = props.info.costoEnvio !='G'
    ? "Costo de Envio interior Argentina: "+props.info.costoEnvio:"Envío gratis a todo el país";
    const costoClassName = props.info.costoEnvio !='G'
    ? 'CostoInterior mt-4':'CostoGratis mt-4 ';
    const rutaImagen = "src/assets/img/"+props.info.imagen;
    return(
        <>
            
            <div className='cardContainer'>
                <div className='flex'>
                    <div>
                        <img src={rutaImagen} />
                    </div>
                    <div className='cardBody'>
                        <h2 className='title'>{props.info.instrumento}</h2>
                        <p className='mt-4 price'>${props.info.precio}</p>
                        <p className={costoClassName}>
                            {
                                props.info.costoEnvio == 'G' ? (<img src="src/assets/img/camion.png" alt="camion" />):''
                            }
                            {infoCostoEnvio}
                        </p>
                        <p className='mt-4 sales'>{props.info.cantidadVendida} vendidos</p>
                    </div>
                </div>
                <a href={`instrumentos/${props.info.id}`}>
                    Detalle
                </a>
                <a className="btn btn-info" style={{ marginBottom:10 }} href={`instrumento/` + props.info.id}>Modificar</a>
                <a className="btn btn-danger" style={{ marginBottom:10 }} onClick={(e) => deletePlato(props.info.id)}>Eliminar</a>
            </div>
        </>
    );
}

export default Card;