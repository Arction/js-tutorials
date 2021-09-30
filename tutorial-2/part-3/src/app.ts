import { AxisScrollStrategies, AxisTickStrategies, ChartXY, emptyFill, lightningChart, SolidLine, synchronizeAxisIntervals } from "@arction/lcjs"
import { createProgressiveTraceGenerator } from '@arction/xydata'

const dashboard = lightningChart().Dashboard({
    numberOfColumns: 1,
    numberOfRows: 5,
})

let charts: ChartXY[] = []

for (let iTrend = 0; iTrend < 5; iTrend += 1) {

    const chart = dashboard.createChartXY({
        columnIndex: 0,
        rowIndex: iTrend,
    })
    charts.push(chart)
    
    const axisX = chart.getDefaultAxisX()

    const axisY = chart.getDefaultAxisY()
        .setThickness(50)

    const series = chart.addLineSeries({
        dataPattern: {
            pattern: 'ProgressiveX',
        }
    })
        .setDataCleaning({ minDataPointCount: 1 })

    createProgressiveTraceGenerator()
        .setNumberOfPoints(100000)
        .generate()
        .setStreamBatchSize(100)
        .setStreamInterval(1000 / 60)
        .setStreamRepeat(true)
        .toStream()
        .forEach(dataPoint => {
            series.add(dataPoint)
        })

    chart.setTitleFillStyle(emptyFill)

    if (iTrend < 4) {
        axisX
            .setTickStrategy(AxisTickStrategies.Empty)
            .setScrollStrategy(undefined)
    } else {
        axisX
            .setTickStrategy(AxisTickStrategies.Time)
            .setScrollStrategy(AxisScrollStrategies.progressive)
            .setInterval(-60 * 1000, 0)
    }
}

synchronizeAxisIntervals(...charts.map(chart => chart.getDefaultAxisX()))

// const legend = chart.addLegendBox().add(chart)
