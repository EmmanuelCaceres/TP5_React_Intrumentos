import Categoria from "./Categoria";

export default class Instrumento{
    id?:Number=0;
    instrumento:String='';
    marca:String='';
    modelo:String='';
    imagen:String='';
    precio:String='';
    costoEnvio:String='';
    cantidadVendida:String='';
    descripcion:String='';
    categoria?:Categoria;
}