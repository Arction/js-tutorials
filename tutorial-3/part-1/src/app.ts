import { lightningChart, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()
    .setTitle('Static scatter chart')
    
const data = []
for (let i = 0; i < 10000; i+= 1) {
    data.push({
        x: Math.random(),
        y: Math.random()
    })
}

const series = chart.addPointSeries()
    .add(data)
