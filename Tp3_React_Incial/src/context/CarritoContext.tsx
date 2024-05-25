import { createContext, ReactNode, useState } from "react";

import Instrumento from "../Entities/Intrumento";
import PedidoDetalle from "../Entities/PedidoDetalle";


interface CartContextType {
    cart: PedidoDetalle[];
    addCarrito: (product: Instrumento) => void;
    // removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    // limpiarCarrito: () => void;
    totalPedido?:number;
    fechaActual?:Date;
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

    const addCarrito = (product: Instrumento) => {
        let existe:boolean = false
        cart.map((cartItem: PedidoDetalle) => {
            if(cartItem.instrumento?.id === product.id){
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
                    detalle.pedido.totalPedido += Number(product.precio)
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
                pedido:{
                    id:0,
                    fechaActual:new Date(),
                    totalPedido:Number(product.precio)
                }
            };
            setCart(prevCart => [...prevCart, nuevoDetalle])
            console.log(cart)
        }   

        calcularTotalCarrito();

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
                        detalle.pedido.totalPedido -= Number(product.precio)
                    }
                }else{
                    if(detalle.instrumento?.id === product.id){
                        cartClonado.splice(index, 1);
                        detalle.pedido.totalPedido -= Number(product.precio);
                    }
                }
            });
            setCart(cartClonado)
        }   

        calcularTotalCarrito();
    };

    // const limpiarCarrito = () => {
    //     setCart([])
    // }

    const calcularTotalCarrito = () => {
        // let total:number = 0;
        const nuevoTotal = cart.reduce((sum, detalle) => sum + detalle.pedido.totalPedido, 0);
        setTotalPedido(nuevoTotal);
        // cart.forEach((element:PedidoDetalle) => {
        //     total += Number(element.pedido.totalPedido)
        // });
        // await setTotalPedido(total);
    }

    return (
    <CartContext.Provider value={{ cart, addCarrito, removeItemCarrito, totalPedido }}>
      {children}
    </CartContext.Provider>
    );

}