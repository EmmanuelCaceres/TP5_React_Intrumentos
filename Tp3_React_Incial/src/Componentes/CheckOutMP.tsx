import { useState,useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import PreferenceMP from '../Entities/PreferenceMP';
import { createPreferenceMP } from '../Functions/FunctionsApi';


export default function CheckOutMP({montoTotal=0}){

    const [idPreference, setIdPreference] = useState<string>('');

    const getPreferenceMP = async () => {
        if(montoTotal > 0){
            const response:PreferenceMP = await createPreferenceMP({id: 0, nombre:'Pedido Buen Sabor', montoTotal: montoTotal});
            console.log("Preference id: " + response.idPreference);
            if(response)
                setIdPreference(response.idPreference);
        }else{
            alert("Agregue al menos un plato al carrito");
        }
      
    }

    useEffect(() => {
                      // TEST-eff051e2-6610-48a8-952f-4423523253c4
        initMercadoPago('TEST-eff051e2-6610-48a8-952f-4423523253c4',{ locale: 'es-AR' });
      }, []);
    

    return(
        <div>
            <button onClick={getPreferenceMP} className='btMercadoPago'>Comprar</button>
            <div className={idPreference ? 'divVisible':'divInvisible'}>
                <Wallet initialization={{ preferenceId: idPreference, redirectMode:"blank" }} customization={{ texts:{ valueProp: 'smart_option'}}} />
            </div>

        </div>
    )
}