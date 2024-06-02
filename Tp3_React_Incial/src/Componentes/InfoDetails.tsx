import Instrumento from "../Entities/Intrumento";
import pdfDownload from '../assets/img/pdfDownload.svg';

interface Props {
    instrumento: Instrumento;  
  }

  const InfoDetails: React.FC<Props> = (props:Props)=>{

    const descargarPdf =()=>{
      window.open(`http://localhost:8080/intrumentos/api/downloadPdf/${props.instrumento.id}`,'_blank')
  }


    const infoCostoEnvio = props.instrumento?.costoEnvio !='G'
    ? "Costo de Envio interior Argentina: "+props.instrumento?.costoEnvio:"Envío gratis a todo el país";
    const costoClassName = props.instrumento?.costoEnvio !='G'
    ? 'CostoInterior mt-4':'CostoGratis mt-4 ';
    return(
        <div className='infoDetalle'>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem"}}>
              <p style={{margin:"0"}}>{props.instrumento?.cantidadVendida} vendidos</p>
              <img style={{cursor:"pointer"}} src={pdfDownload} alt="pdfDownload" onClick={(e) => descargarPdf()} />

          </div>
              <h1 className='titleInformacion'>{props.instrumento?.instrumento}</h1>
              <p>$ {props.instrumento?.precio}</p>
              <p>Marca: {props.instrumento?.marca}</p>
              <p>Modelo: {props.instrumento?.modelo}</p>
              <p className={costoClassName}>
                {
                  props.instrumento?.costoEnvio == 'G' ? (<img src="../src/assets/img/camion.png" alt="camion" />):''
                }
                {infoCostoEnvio}</p>
            </div>
    )
}

export default InfoDetails;