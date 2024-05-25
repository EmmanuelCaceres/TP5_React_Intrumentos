
// import ItemCarrito from "./ItemCarrito"
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

    const handleCheckout = async () => {
        const result = await PostDetalleData<PedidoDetalle>("http://localhost:8080/pedidoDetalle/save",cart);
        console.log(result);
    }
    
    return(
        <div>
            <h3>Carrito de compras</h3>
            {cart.map((itemCart: PedidoDetalle) => (
                <ItemCarrito key={itemCart.instrumento.id} item={itemCart}/>
            ))}
            <p>{totalPedido}</p>
            <button className="btn btn-success mb-3"  onClick={handleCheckout}>Hacer pedido</button>
            <CheckOutMP montoTotal={totalPedido}></CheckOutMP>
        </div>
    )
}