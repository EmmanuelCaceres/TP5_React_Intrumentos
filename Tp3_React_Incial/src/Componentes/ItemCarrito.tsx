import PedidoDetalle from "../Entities/PedidoDetalle";

export default function ItemCarrito(item:PedidoDetalle){
    return(
        <div>
            <span>{item.cantidad}</span>
        <span>
            <img width={50} height={50}
            src={`src/assets/img/${item.instrumento.imagen}`}
            alt={item.instrumento.instrumento}
            />
            <div>
                <strong>{item.instrumento.instrumento}</strong> - ${item.instrumento.precio}
            </div>
            <div>
                <b>{item.cantidad} {item.cantidad == 1 ? 'unidad' : 'unidades'} </b>
            </div>
        </span>
        <hr></hr>
        </div>
    )
}