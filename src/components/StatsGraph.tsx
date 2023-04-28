import {Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Radar} from "react-chartjs-2";
import {PokemonData, PageStyle} from "../typings/custom";

interface GraphProps{
    pokeData: PokemonData;
    pageStyle: PageStyle;
}

export default function StatsGraph({pokeData, pageStyle}: GraphProps){
    ChartJS.register(
        LineElement,
        PointElement,
        Tooltip,
        Legend,
        RadialLinearScale,
        Filler,
        ChartDataLabels
    );

    const graphData = {
        labels: pageStyle.statNames,
        datasets: [{
            data: pokeData.stats,
            backgroundColor: pageStyle.background,
            borderColor: pageStyle.border,
        }]
    }

    const graphOptions = {
        plugins: {
            datalabels: {
                color: "black",
                font: {
                    weight: 700,
                },
                //conforme: https://chartjs-plugin-datalabels.netlify.app/guide/formatting.html#custom-labels
                formatter: function(value: any, context: any) {
                    return context.chart.data.labels[context.value];
                }
            },
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false,
            }
        }
    }

    return (
        <div>
            <Radar
                data={graphData}
                options={graphOptions}
              />
        </div>
    );
}