import { ColorRGBA, lightningChart, PointShape, SolidFill, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()

const data = []
for (let i = 0; i < 10000; i += 1) {
    const x = Math.random()
    const y = Math.random()
    data.push({x, y})
}

const series = chart.addPointSeries({pointShape: PointShape.Circle})
    .add(data)
    .setPointSize(10)
    .setPointFillStyle(new SolidFill({color: ColorRGBA(255, 0, 0)}))
