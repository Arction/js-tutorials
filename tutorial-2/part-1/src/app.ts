import { AxisTickStrategies, lightningChart, SolidLine } from "@arction/lcjs"
import { createProgressiveTraceGenerator } from '@arction/xydata'

const chart = lightningChart().ChartXY()

const axisX = chart.getDefaultAxisX()
    .setTickStrategy(AxisTickStrategies.DateTime)

for (let iTrend = 0; iTrend < 10; iTrend += 1) {
    const series = chart.addLineSeries({
        dataPattern: {
            pattern: 'ProgressiveX',
        }
    })

    createProgressiveTraceGenerator()
        .setNumberOfPoints(100000)
        .generate()
        .toPromise()
        .then(data => {
            data = data.map(p => ({
                x: Date.now() + 60 * 1000 * p.x,
                y: p.y,
            }))

            series.add(data)
        })
}

const legend = chart.addLegendBox().add(chart)
