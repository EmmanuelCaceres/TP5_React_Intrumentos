import PedidoDetalle from "../Entities/PedidoDetalle";

export default function ItemCarrito(item:PedidoDetalle){
    return(
        <div>
            <span>{item.cantidad}</span>
        {/* <span>
            <img width={50} height={50}
            src={`src/assets/img/${item.intrumento.imagen}`}
            alt={item.intrumento.instrumento}
            />
            <div>
                <strong>{item.intrumento.instrumento}</strong> - ${item.intrumento.precio}
            </div>
            <div>
                <b>{item.cantidad} {item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
            </div>
        </span>
        <hr></hr> */}
        </div>
    )
}