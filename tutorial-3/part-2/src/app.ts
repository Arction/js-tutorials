import { ColorRGBA, lightningChart, PointShape, SolidFill, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()

const dataSets = []
for (let iDataSet = 0; iDataSet < 5; iDataSet += 1) {
    const data = []
    for (let i = 0; i < 10000; i += 1) {
        const x = Math.random()
        const y = Math.random()
        data.push({x, y})
    }
    dataSets.push(data)    
}

const series = chart.addPointSeries({pointShape: PointShape.Circle})
    .setPointSize(10)
    .setPointFillStyle(new SolidFill({color: ColorRGBA(255, 0, 0)}))

let iActiveDataSet = -1
const changeDisplayedDataSet = () => {
    iActiveDataSet = (iActiveDataSet + 1) % dataSets.length
    series.clear().add(dataSets[iActiveDataSet])

    requestAnimationFrame(changeDisplayedDataSet)
}
changeDisplayedDataSet()
