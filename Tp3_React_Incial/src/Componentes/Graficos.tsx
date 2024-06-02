import { useEffect, useState } from "react";
import NavBar from "./NavBar"
import { Chart } from "react-google-charts";
import { getDataPieChart } from "../Functions/FunctionsApi";
  
  export const options = {
    title: "Cantidad de instrumentos en pedidos",
  };

export default function Graficos() {

    const [data,setData] = useState<any>();

    const getChartPie = async ()=>{
        const result = await getDataPieChart('http://localhost:8080/cantidadPedido');
        console.log(result);
        await setData(result);
    }

    useEffect(()=>{
        getChartPie();
    },[])

    return (
        <div>
            <NavBar />
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    )
}