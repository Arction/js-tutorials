import { lightningChart, LUT, ColorRGBA, PalettedFill, emptyLine } from "@arction/lcjs";
import { createWaterDropDataGenerator } from "@arction/xydata";

// Specify the resolution used for the heatmap.
const resolutionX = 1000;
const resolutionY = 1000;

// Create a XY Chart.
const chart = lightningChart()
  .ChartXY({
    // theme: Themes.darkGold
  })
  .setTitle(
    `Refreshing Heatmap Chart ${resolutionX}x${resolutionY} (${(
      (resolutionX * resolutionY) /
      1000000
    ).toFixed(1)} million data points)`
  )
  .setPadding({ right: 40 });

// Create LUT and FillStyle
const palette = new LUT({
  units: "intensity",
  steps: [
    { value: 0, color: ColorRGBA(255, 255, 0) },
    { value: 30, color: ColorRGBA(255, 204, 0) },
    { value: 45, color: ColorRGBA(255, 128, 0) },
    { value: 60, color: ColorRGBA(255, 0, 0) },
    { value: 90, color: ColorRGBA(127, 0, 255) },
  ],
  interpolate: false,
});

Promise.all(
  new Array(30).fill(0).map((_, i) =>
    createWaterDropDataGenerator()
    .setWaterDrops([
      {rowNormalized: 0.2,columnNormalized: 0.6,amplitude:15 },
      {rowNormalized: 0.5,columnNormalized:0.5,amplitude:30},
      {rowNormalized:0.7,columnNormalized:0.3,amplitude:3}
    ])
      .setRows(resolutionX)
      .setColumns(resolutionY)
      .setOffsetLevel(10 + i * 3)
      .generate()    
    )
).then(dataSets => {
  // Add a Heatmap to the Chart.
  const heatmap = chart
    .addHeatmapGridSeries({
      columns: resolutionX,
      rows: resolutionY,
      start: { x: 0, y: 0 },
      end: { x: resolutionX, y: resolutionY },
      dataOrder: "columns",
    })
    .setFillStyle(new PalettedFill({ lut: palette }))
    .setWireframeStyle(emptyLine)
    .setMouseInteractions(false)

  const legend = chart.addLegendBox().add(chart)

  let iDataSet = -1
  const changeDataSet = () => {
    iDataSet = (iDataSet + 1) % dataSets.length
    heatmap.invalidateIntensityValues(dataSets[iDataSet])
  }
  setInterval(changeDataSet, 100)
})
