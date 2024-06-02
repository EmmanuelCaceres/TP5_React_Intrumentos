import { createContext, ReactNode, useState,useEffect } from "react";
import Instrumento from "../Entities/Intrumento";
import PedidoDetalle from "../Entities/PedidoDetalle";
import Pedido from "../Entities/Pedido";


interface CartContextType {
    cart: PedidoDetalle[];
    addCarrito: (product: Instrumento) => void;
    // removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    // limpiarCarrito: () => void;
    totalPedido:number;
    fechaActual:Date;
  }


export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    // removeCarrito: () => {},
    removeItemCarrito: () => {},
    // limpiarCarrito: () => {},
    totalPedido: 0,
    fechaActual: new Date()
});

export function CarritoContextProvider({ children }: { children: ReactNode }){
    const[cart, setCart] = useState<PedidoDetalle[]>([]);
    const[totalPedido, setTotalPedido] = useState<number>(0);
    const[fechaActual,setFechaActual] = useState<Date>(new Date())

    const addCarrito = (product: Instrumento) => {
        let existe:boolean = false
        cart.map((cartItem: PedidoDetalle) => {
            if(cartItem.instrumento.id === product.id){
                existe = true
                return existe
            }
        });
        console.log(product)
        if (existe) {
            const cartClonado = JSON.parse(JSON.stringify(cart));
            cartClonado.map((detalle: PedidoDetalle) => {
                if (detalle.instrumento?.id === product.id) {
                    detalle.cantidad += 1
                }
            });
            setCart(cartClonado)
        } 
        else {
            console.log("NO EXISTE");
            const nuevoDetalle: PedidoDetalle = {
                id:0,
                instrumento: product,
                cantidad: 1,
            };
            setCart(prevCart => [...prevCart, nuevoDetalle])
            console.log(cart)
        }   

    };

    // const removeCarrito = async (product: Plato) => {
    //     await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    // };

    const removeItemCarrito = (product: Instrumento) => {
        let existe:boolean = false
        cart.map((cartItem: PedidoDetalle) => {
            if(cartItem.instrumento?.id === product.id){
                existe = true
            }
        });

        if (existe) {
            console.log("EXISTE");
            const cartClonado = JSON.parse(JSON.stringify(cart));
            cartClonado.map((detalle: PedidoDetalle, index: number) => {
                if (detalle.cantidad >1) {
                    if(detalle.instrumento?.id === product.id){
                        detalle.cantidad -= 1
                    }
                }else{
                    if(detalle.instrumento?.id === product.id){
                        cartClonado.splice(index, 1);
                    }
                }
            });
            setCart(cartClonado)
        }   

    };

    // const limpiarCarrito = () => {
    //     setCart([])
    // }

    const calcularTotalCarrito = async() => {
        let total:number = 0;
        cart.forEach((element:PedidoDetalle) => {
            total += Number(element.instrumento.precio) * element.cantidad;
        });
        await setTotalPedido(total);
    }
    useEffect(() => {
        calcularTotalCarrito();
    }, [cart]);

    return (
    <CartContext.Provider value={{ cart, addCarrito,removeItemCarrito, totalPedido, fechaActual }}>
      {children}
    </CartContext.Provider>
    );

}