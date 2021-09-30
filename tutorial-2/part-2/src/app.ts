import { AxisTickStrategies, ChartXY, emptyFill, emptyTick, lightningChart, SolidLine, synchronizeAxisIntervals } from "@arction/lcjs"
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
        .setTickStrategy(AxisTickStrategies.DateTime)

    const axisY = chart.getDefaultAxisY()
        .setThickness(60)

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
                x: Date.now() + 1 * 60 * 1000 * p.x,
                y: p.y,
            }))
            series.add(data)
        })

    if (i < 4) {
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
    }
}

synchronizeAxisIntervals(...charts.map(chart => chart.getDefaultAxisX()))

// const legend = chart.addLegendBox().add(chart)
