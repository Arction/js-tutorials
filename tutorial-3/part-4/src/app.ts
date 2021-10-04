import { Color, ColorRGBA, lightningChart, LUT, PalettedFill, PointShape, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()
    .setTitle('Value palette scatter chart')

chart.getDefaultAxisX().setInterval(0,1,false,true)
chart.getDefaultAxisY().setInterval(0,1,false,true)

const series = chart.addPointSeries({pointShape: PointShape.Circle})
    .setIndividualPointValueEnabled(true)
    .setPointFillStyle(new PalettedFill({
        lookUpProperty: 'value',
        lut: new LUT({
            interpolate: false,
            steps: [
                { value: .000, color: ColorRGBA(255, 255, 255) },
                { value: .333, color: ColorRGBA(255, 0, 0) },
                { value: .666, color: ColorRGBA(0, 255, 0) }
            ]
        })
    }))

const points = []
for (let i = 0; i < 10000; i += 1) {
    points.push({x: Math.random(), y: Math.random(), value: Math.random()})
}

series.add(points)

const legend = chart.addLegendBox().add(chart)