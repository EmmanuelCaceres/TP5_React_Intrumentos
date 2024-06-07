import Instrumento from '../Entities/Intrumento';
import { deleteData } from '../Functions/FunctionsApi';
import { useState } from 'react';
import Usuario from '../Entities/Usuario';
import '../index.css'
import { useCarrito } from '../context/useCarrito';
import iconDetalle from '../assets/img/iconDetalles.svg'
import iconEdit from '../assets/img/iconEdit.svg'
import iconDelete from '../assets/img/iconDelete.svg'
import iconAddCart from '../assets/img/iconAddCart.svg'
import iconMinusCart from '../assets/img/iconMinusCart.svg'
import { Link } from 'react-router-dom';

interface Props {
    info: Instrumento;
    key: Number;
}

const Card: React.FC<Props> = (props: Props) => {

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    const { addCarrito, removeItemCarrito } = useCarrito()

    const deleteInstrumento = async (idIngrediente: Number) => {
        await deleteData(`http://localhost:8080/instrumento/delete/${idIngrediente}`);
        window.location.reload();
    }

    const infoCostoEnvio = props.info.costoEnvio != 'G'
        ? "Costo de Envio interior Argentina: " + props.info.costoEnvio : "Envío gratis a todo el país";
    const costoClassName = props.info.costoEnvio != 'G'
        ? 'CostoInterior mt-4' : 'CostoGratis mt-4 ';
    // const rutaImagen = "src/assets/img/" + props.info.imagen;
    return (
        <>
            <div className='cardContainer'>
                <div className='flex'>
                    <div>
                        <img width={160} height={160} src={`http://localhost:8080/images/${props.info.imagen}`} />
                    </div>
                    <div className='cardBody'>
                        <h2 className='title'>{props.info.instrumento}</h2>
                        <p className='mt-4 price'>${props.info.precio}</p>
                        <p className={costoClassName}>
                            {
                                props.info.costoEnvio == 'G' ? (<img src="src/assets/img/camion.png" alt="camion" />) : ''
                            }
                            {infoCostoEnvio}
                        </p>
                        <p className='mt-4 sales'>{props.info.cantidadVendida} vendidos</p>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>

                        <Link to={`../instrumentos/${props.info.id}`} className='buttonSecondary'>
                            <img src={iconDetalle} alt="Detalle" />
                            Detalle
                        </Link>
                        {
                            (usuarioLogueado.rol == "Admin")
                                ?
                                <div style={{ display: "flex" }}>
                                    <a href={`instrumento/` + props.info.id}>
                                        <img src={iconEdit} alt="iconEdit" />
                                    </a>
                                    <a style={{ cursor: "pointer" }} onClick={(e) => deleteInstrumento(props.info.id)}>
                                        <img src={iconDelete} alt="iconDelete" />
                                    </a>
                                </div>
                                : <div></div>

                        }
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",gap:"1rem" }}>
                        <div className='buttonMinusCart' onClick={() => removeItemCarrito(props.info)}>
                            <img src={iconMinusCart} alt="iconMinusCart"  />
                            Quitar articulo
                        </div>
                        <div className='buttonAddCart' onClick={() => addCarrito(props.info)}>
                            <img src={iconAddCart} alt="iconAddCart"  />
                            Añadir articulo
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Card;