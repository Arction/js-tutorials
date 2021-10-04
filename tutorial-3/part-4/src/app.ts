import { ColorRGBA, lightningChart, LUT, PalettedFill, PointShape, SolidFill, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()

const data = []
for (let i = 0; i < 10000; i += 1) {
    const x = Math.random()
    const y = Math.random()
    const value = Math.random()
    data.push({x, y, value})
}

const series = chart.addPointSeries({pointShape: PointShape.Circle})
    .setIndividualPointValueEnabled(true)
    .add(data)
    .setPointSize(10)
    .setPointFillStyle(new PalettedFill({
        lookUpProperty: 'value',
        lut: new LUT({
            interpolate: true,
            steps: [
                {value: 0, color: ColorRGBA(255,255,255)},
                {value:.33, color: ColorRGBA(255, 0, 0)},
                {value: .66, color: ColorRGBA(0,255,0)}
            ]
        })
    }))

const legend = chart.addLegendBox().add(chart)
