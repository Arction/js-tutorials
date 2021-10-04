import { lightningChart, PointShape, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()
    .setTitle('Bubble chart')

chart.getDefaultAxisX().setInterval(0,1,false,true)
chart.getDefaultAxisY().setInterval(0,1,false,true)

for (let iSeries = 0; iSeries < 5; iSeries += 1) {
    
    const series = chart.addPointSeries({pointShape: PointShape.Circle})
        .setIndividualPointSizeEnabled(true)

    const points = []
    for (let i = 0; i < 10; i += 1) {
        points.push({x: Math.random(), y: Math.random(), size: 10 + Math.random() * 100})
    }

    series.add(points)

}


