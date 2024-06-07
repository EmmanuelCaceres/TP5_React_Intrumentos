import { useEffect, useState } from "react";
import NavBar from "./NavBar"
import { Chart } from "react-google-charts";
import { getDataPieChart, getDataBarChart } from "../Functions/FunctionsApi";

export const options = {
    title: "Cantidad de instrumentos en pedidos",
};
export const optionsBar = {
    title: "Cantidad de pedidos por mes y año",
};
export default function Graficos() {

    const [data, setData] = useState<any>();
    const [dataBar, setDataBar] = useState<any>();
    const [anio, setAnio] = useState<any>((new Date().getFullYear()));

    const getChartPie = async () => {
        const result = await getDataPieChart('http://localhost:8080/cantidadPedido');
        console.log(result);
        await setData(result);
    }
    const getChartBar = async () => {
        const result = await getDataBarChart(`http://localhost:8080/pedidoPorMes?anio=${anio}`);
        console.log(result);
        await setDataBar(result);
    }

    const handleClick = () =>{
        if(anio>2024){
            alert("Ingresa un numero menor a 2024")
        }else{
            getChartBar();
        }
    }

    useEffect(() => {
        getChartPie();
        getChartBar();
    }, [])

    return (
        <div>
            <NavBar />
            <div style={{ width: "50%", display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                <form className="formSave">
                    <label>
                        <p>Ingrese el año</p>
                        <input type="number" name="anio" max={new Date().getFullYear()} defaultValue={anio} onChange={(e) => setAnio(Number(e.target.value ))} />
                    </label>
                </form>
                <button style={{ width: "50%", height: "fit-content" }} className='buttonPrimary' onClick={handleClick}>Mostrar gráfico</button>

            </div>
            <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={dataBar}
                options={optionsBar}
            />
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