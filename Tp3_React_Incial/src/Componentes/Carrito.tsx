
// import ItemCarrito from "./ItemCarrito"
import { useState } from "react"
// import { useParams } from "react-router-dom"
import { useCarrito } from "../context/useCarrito"
import PedidoDetalle from "../Entities/PedidoDetalle"
import { PostDetalleData } from "../Functions/FunctionsApi"
import CheckOutMP from "./CheckOutMP"

 function ItemCarrito(props: { item: PedidoDetalle }){
    return(
        <div>
            {/* <span>{props.item.cantidad}</span> */}
        <span>
            <img width={50} height={50}
            src={`src/assets/img/${props.item.instrumento.imagen}`}
            alt={props.item.instrumento.instrumento}
            />
            <div>
                <strong>{props.item.instrumento.instrumento}</strong> - ${props.item.instrumento.precio}
            </div>
            <div>
                <b>{props.item.cantidad} {props.item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
            </div>
        </span>
        <hr></hr>
        </div>
    )
}

export default function Carrito(){
    const { cart, totalPedido } = useCarrito()
    const [status,setStatus] = useState<number>(0);
 
    const handleCheckout = async () => {
        if(totalPedido == 0){
            alert("Debe agregar un intrumento al carrito antes de realizar la compra")
        }else{
            const result = await PostDetalleData<PedidoDetalle>("http://localhost:8080/pedidoDetalle/save",cart);
            await setStatus(result);
            if(result==200){
                alert("Su compra fue efectuada correctamente")
            }else{
                alert("No se pudo realizar su compra")
            }
        }
    }
    
    return(
        <div>
            <h3>Carrito de compras</h3>
            {cart.map((itemCart: PedidoDetalle) => (
                <ItemCarrito key={itemCart.instrumento.id} item={itemCart}/>
            ))}
            <p>{totalPedido}</p>
            <button className="btn btn-success mb-3"  onClick={handleCheckout}>Hacer pedido</button>
            <div className={status==200 ? 'divVisible':'divInvisible'}>
                <CheckOutMP montoTotal={totalPedido}></CheckOutMP>
            </div>
        </div>
    )
}