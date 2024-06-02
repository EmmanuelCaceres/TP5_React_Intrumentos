
import { useState } from "react"
import { useCarrito } from "../context/useCarrito"
import PedidoDetalle from "../Entities/PedidoDetalle"
import { PostPedidoData } from "../Functions/FunctionsApi"
import CheckOutMP from "./CheckOutMP"
import iconDeleteCart from "../assets/img/iconDeleteCart.svg"
import iconPurchaseCart from "../assets/img/iconPurchaseCart.svg"
import Pedido from "../Entities/Pedido"

function ItemCarrito(props: { item: PedidoDetalle }) {
    return (
        <div className="itemCarrito">
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
        </div>
    )
}

export default function Carrito() {
    const { cart, totalPedido,fechaActual } = useCarrito()
    const [status, setStatus] = useState<number>(0);

    const handleCheckout = async () => {
        if (totalPedido == 0) {
            alert("Debe agregar un intrumento al carrito antes de realizar la compra")
        } else {
            let pedidoAux:Pedido={
                id:0,
                fechaActual: fechaActual,
                totalPedido: totalPedido,
                detallesPedido: cart
            }

            const result = await PostPedidoData<Pedido>("http://localhost:8080/pedido/save", pedidoAux);
            if(result){
                alert(`Su pedido con id ${result.id} ha sido guardado exitosamente`)
                await setStatus(200);
            }else{
                alert("Hubo en error en su pedido")
            }
        }
    }

    return (
        <>
            {totalPedido > 0 && (
                <div style={{margin:"0 1rem"}}>
                    <h3>Carrito de compras</h3>
                    {cart.map((itemCart: PedidoDetalle) => (
                        <ItemCarrito key={itemCart.instrumento.id} item={itemCart} />
                    ))}
                    <p>Total del pedido: ${totalPedido}</p>

                    <div style={{ display: "flex",gap:".5rem" }}>
                        <button className="buttonPurchaseCart" onClick={handleCheckout}>
                            <img src={iconPurchaseCart} alt="iconDeleteCart" />
                            Hacer pedido
                        </button>

                        <button className="buttonDeleteCart">
                            <img src={iconDeleteCart} alt="iconDeleteCart" />
                            Eliminar carrito
                        </button>
                    </div>

                    <div className={status == 200 ? 'divVisible' : 'divInvisible'}>
                        <CheckOutMP montoTotal={totalPedido}></CheckOutMP>
                    </div>
                </div>
            )
            }
        </>
    )
}