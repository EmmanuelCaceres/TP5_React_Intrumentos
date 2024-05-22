import Categoria from "./Categoria";
import PedidoDetalle from "./PedidoDetalle";

export default class Instrumento{
    id?:number=0;
    instrumento:string='';
    marca:string='';
    modelo:string='';
    imagen:string='';
    precio:string='';
    costoEnvio:string='';
    cantidadVendida:string='';
    descripcion:string='';
    categoria?:Categoria;

}