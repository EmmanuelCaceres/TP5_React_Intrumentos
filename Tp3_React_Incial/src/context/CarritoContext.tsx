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

    const addCarrito = async (product: Instrumento) => {
        let existe:boolean = false
        cart.forEach(async (cartItem: PedidoDetalle) => {
            if(cartItem.instrumento?.id === product.id){
                existe = true
                return existe
            }
        });
        console.log(product)
        if (existe) {
            const cartClonado = JSON.parse(JSON.stringify(cart));
            cartClonado.forEach((detalle: PedidoDetalle) => {
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
            await setCart(prevCart => [...prevCart, nuevoDetalle])
        }   

        calcularTotalCarrito();
        console.log(totalPedido)
        console.log(cart)


    };

    // const removeCarrito = async (product: Plato) => {
    //     await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
    // };

    const removeItemCarrito = async (product: Instrumento) => {
        //const objetoBuscado = cart.find((objeto:Plato) => objeto.id === product.id);
        //const platoIndice = cart.findIndex((objeto:Plato) => objeto.id === product.id)
        //si el producto ya esta en el carrito
        let existe:boolean = false
        cart.forEach(async (cartItem: PedidoDetalle) => {
            if(cartItem.instrumento?.id === product.id){
                existe = true
            }
        });

        if (existe) {
            console.log("EXISTE");
            const cartClonado = JSON.parse(JSON.stringify(cart));
            cartClonado.forEach((detalle: PedidoDetalle, index: number) => {
                if (detalle.cantidad >1) {
                    detalle.cantidad -= 1
                    detalle.pedido.totalPedido -= Number(product.precio)
                }else{
                    cartClonado.splice(index, 1);
                    detalle.pedido.totalPedido -= Number(product.precio);
                }
            });
            setCart(cartClonado)
            console.log(cartClonado)
            // if( > 1){
            //     product.cantidad -= 1
            //     const cartClonado = await structuredClone(cart.filter(item => item.id !== product.id))
            //     await cartClonado.push(product)
            //     setCart(cartClonado)
            // }else{
            //     await setCart(prevCart => prevCart.filter(item => item.id !== product.id))
            // }
        }   

        calcularTotalCarrito();
    };

    // const limpiarCarrito = () => {
    //     setCart([])
    // }

    const calcularTotalCarrito = async () => {
        let total:number = 0;
        cart.forEach(async (element:PedidoDetalle) => {
            total += Number(element.instrumento?.precio) * element.cantidad;
        });
        await setTotalPedido(total);
    }

    return (
    <CartContext.Provider value={{ cart, addCarrito, removeItemCarrito }}>
      {children}
    </CartContext.Provider>
    );

}