import { AxisTickStrategies, ChartXY, emptyFill, emptyLine, emptyTick, lightningChart, SolidLine, synchronizeAxisIntervals } from "@arction/lcjs"
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

    chart.setTitleFillStyle(emptyFill)

    if (iTrend < 4) {
        axisX.setTickStrategy(AxisTickStrategies.DateTime, ticks => ticks
            .setGreatTickStyle(emptyTick)
            .setMajorTickStyle(majorTicks => majorTicks
                .setLabelFillStyle(emptyFill)
                .setTickLength(0)
                .setTickPadding(0)
            )
            .setMinorTickStyle(minorTicks => minorTicks
                .setLabelFillStyle(emptyFill)
                .setTickLength(0)
                .setTickPadding(0)
            )
        )
    } else {
        axisX.setTickStrategy(AxisTickStrategies.DateTime)
    }
}

synchronizeAxisIntervals(...charts.map(chart => chart.getDefaultAxisX()))

// const legend = chart.addLegendBox().add(chart)
