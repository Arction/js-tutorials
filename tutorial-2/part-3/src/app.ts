import { AxisScrollStrategies, AxisTickStrategies, ChartXY, emptyFill, emptyTick, lightningChart, SolidLine, synchronizeAxisIntervals, VisibleTicks } from "@arction/lcjs"
import { createProgressiveTraceGenerator } from "@arction/xydata"

const dashboard = lightningChart().Dashboard({
    numberOfColumns: 1,
    numberOfRows: 5,
})

const charts: ChartXY[] = []

for (let i = 0; i < 5; i += 1) {
    
    const chart = dashboard.createChartXY({
        columnIndex: 0,
        rowIndex: i,
    })
        .setTitleFillStyle(emptyFill)

    charts.push(chart)

    const axisX = chart.getDefaultAxisX()

    const axisY = chart.getDefaultAxisY()
        .setThickness(60)

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

    if (i < 4) {
        axisX.setTickStrategy(AxisTickStrategies.Time, ticks => ticks
            .setMajorTickStyle(majorTicks => majorTicks
                .setLabelFillStyle(emptyFill)
                .setTickLength(0)
                .setTickPadding(0)
            )    
            .setMinorTickStyle((minorTicks: VisibleTicks) => minorTicks
                .setLabelFillStyle(emptyFill)
                .setTickLength(0)
                .setTickPadding(0)
            )
        )
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
