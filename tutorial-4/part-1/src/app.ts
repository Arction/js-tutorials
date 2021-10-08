import { ColorCSS, ColorRGBA, lightningChart, LUT, PalettedFill, SolidFill, SolidLine } from "@arction/lcjs"

const chart = lightningChart().ChartXY()

let columns = 100
let rows = 100

const heatmap = chart.addHeatmapGridSeries({
  columns,
  rows,
  start: {
    x: 10000, y: -1000
  },
  end: {
    x: 20000,
    y: 0,
  },
  dataOrder: 'columns',
})
  .setWireframeStyle(new SolidLine({
    thickness: 1,
    fillStyle: new SolidFill({color: ColorRGBA(0,0,0)})
  }))
  .setFillStyle(new PalettedFill({
    lookUpProperty: 'value',
    lut: new LUT({
      interpolate: false,
      steps: [
        {value: 0, color: ColorCSS('red')},
        {value: 1, color: ColorCSS('green')}
      ]
    })
  }))
  .setPixelInterpolationMode('bilinear')

const intensityValues = []
for (let x = 0; x < columns; x += 1) {
  intensityValues[x] = []
  for (let y = 0; y < rows; y += 1) {
    intensityValues[x][y] = Math.random() * 1.5
  }
}

heatmap.invalidateIntensityValues(intensityValues)

const legend = chart.addLegendBox().add(chart)
