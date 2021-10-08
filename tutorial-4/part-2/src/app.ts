import { ColorCSS, ColorRGBA, emptyLine, lightningChart, LUT, PalettedFill, SolidFill, SolidLine } from "@arction/lcjs"
import { createWaterDropDataGenerator } from "@arction/xydata"

const chart = lightningChart().ChartXY({disableAnimations: true})

let columns = 1000
let rows = 1000

const heatmap = chart.addHeatmapGridSeries({
  columns,
  rows,
})
.setWireframeStyle(emptyLine)
  .setFillStyle(new PalettedFill({
    lookUpProperty: 'value',
    lut: new LUT({
      interpolate: false,
      steps: [
        { value: 0, color: ColorRGBA(255, 255, 0) },
        { value: 30, color: ColorRGBA(255, 204, 0) },
        { value: 45, color: ColorRGBA(255, 128, 0) },
        { value: 60, color: ColorRGBA(255, 0, 0) },
        { value: 90, color: ColorRGBA(127, 0, 255) },
      ]
    })
  }))
  .setPixelInterpolationMode('bilinear')

const legend = chart.addLegendBox().add(chart)

Promise.all(
  new Array(30).fill(0).map((_, i) => 
    createWaterDropDataGenerator()
      .setColumns(columns)
      .setRows(rows)
      .setWaterDrops([
        {rowNormalized: 0.2,columnNormalized: 0.6,amplitude:15 },
        {rowNormalized: 0.5,columnNormalized:0.5,amplitude:30},
        {rowNormalized:0.7,columnNormalized:0.3,amplitude:3}
      ])
      .setOffsetLevel(10 + i * 3)
      .generate()   
    )
).then(dataSetList => {
  let iDataSet = -1
  const nextDataSet = () => {
    iDataSet = (iDataSet + 1) % dataSetList.length
    const dataSet = dataSetList[iDataSet]
    heatmap.invalidateIntensityValues(dataSet)

    setTimeout(nextDataSet, 100);
  }
  nextDataSet()
})
