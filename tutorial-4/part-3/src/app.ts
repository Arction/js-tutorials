import { AxisScrollStrategies, ColorHSV, ColorRGBA, lightningChart, LUT, PalettedFill, SolidFill, SolidLine } from "@arction/lcjs"
import { createSpectrumDataGenerator } from "@arction/xydata"

const chart = lightningChart().ChartXY()

const heatmapScrolling = chart.addHeatmapScrollingGridSeries({
  scrollDimension: 'columns',
  resolution: 100,
})
  .setFillStyle(new PalettedFill({
    lookUpProperty: 'value',
    lut: new LUT({
      interpolate: true,
      steps: [
        { value: 0, color: ColorHSV(0, 1, 0) },
        { value: .15, color: ColorHSV(270, 0.84, 0.2) },
        { value: .30, color: ColorHSV(289, 0.86, 0.35) },
        { value: .45, color: ColorHSV(324, 0.97, 0.56) },
        { value: .60, color: ColorHSV(1, 1, 1) },
        { value: .75, color: ColorHSV(44, 0.64, 1) },
      ],
    })
  }))
  .setDataCleaning({minDataPointCount: 10000})

chart.getDefaultAxisX().setScrollStrategy(AxisScrollStrategies.progressive).setInterval(-100, 0)

createSpectrumDataGenerator()
  .setNumberOfSamples(1000)
  .setSampleSize(100)
  .generate()
  .toPromise()
  .then(data => {
    let iSample = 0
    const addSample = () => {
      iSample = (iSample + 1) % data.length
      const sample = data[iSample]
      heatmapScrolling.addIntensityValues([sample])
      setTimeout(addSample, 100);
    }
    addSample()
  })
