import { lightningChart, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()
    .setTitle('Real-time scatter chart')

const dataSets = []
for (let iDataSet = 0; iDataSet < 20; iDataSet += 1) {
    const data = []
    for (let i = 0; i < 1000; i+= 1) {
        data.push({
            x: Math.random(),
            y: Math.random()
        })
    }
    dataSets.push(data)
}

chart.getDefaultAxisX().setInterval(0,1,false,true)

chart.getDefaultAxisY().setInterval(0,1,false,true)

const series = chart.addPointSeries()

let iActiveDataSet = -1
const displayNextDataSet = () => {
    iActiveDataSet = (iActiveDataSet +1) % dataSets.length
    series.clear().add(dataSets[iActiveDataSet])

    requestAnimationFrame(displayNextDataSet)
}

// setInterval(displayNextDataSet, 500)
displayNextDataSet()
