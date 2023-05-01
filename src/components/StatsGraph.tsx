import {Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Radar} from "react-chartjs-2";
import {PokemonData, PageStyle} from "../typings/custom";
import {statNames} from "../constants";

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
        labels: statNames,
        datasets: [{
            data: pokeData.stats,
            backgroundColor: pageStyle.background,
            borderColor: pageStyle.border,
        }]
    }

    const graphOptions = {
        elements: {
            line: {
                borderWidth: 3,
            },
            point: {
                hitRadius: 20,
            }
        },
        scales: {
            /* conforme https://www.chartjs.org/docs/latest/charts/radar.html (Scale Options) */
            r: {
                grid: {
                    color: "#fff",
                },
                angleLines: {   
                    display: true,
                    lineWidth: 1,
                    color: "#fff",
                },
                pointLabels:{
                    /* conforme https://www.chartjs.org/docs/latest/axes/radial/linear.html#point-label-options */
                    color: "#fff",
                    font: {
                        size: 15,
                        weight: "700",
                        family: "'Poppins', sans-serif",
                    },
                    display: true,
                    backdropColor: "rgba(255, 255, 255, 0)",
                },
                ticks: {
                    /* conforme https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration */
                    stepSize: 60,
                    maxTicksLimit: 10, 
                    display: false,
                },
            }
        },
        plugins: {
            datalabels: {
                anchor: "end" as "end",
                opacity: 1,
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 100,
                font: {
                  weight: 700,
                  size: 12,
                  lineHeight: 1 /* align v center */
                },
                padding: {
                  top: 5
                },
                backgroundColor: "black",
                color: "white",
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
        },
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