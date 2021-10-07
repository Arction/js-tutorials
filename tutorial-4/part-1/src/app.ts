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
    `Static Heatmap Chart ${resolutionX}x${resolutionY} (${(
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
  ],
  interpolate: false,
});

// Generate heatmap data.
createWaterDropDataGenerator()
  .setRows(resolutionX)
  .setColumns(resolutionY)
  .generate()
  .then((data) => {
    // Add a Heatmap to the Chart.
    const heatmap = chart
      .addHeatmapGridSeries({
        columns: resolutionX,
        rows: resolutionY,
        start: { x: 0, y: 0 },
        end: { x: resolutionX, y: resolutionY },
        dataOrder: "columns",
      })
      // Color Heatmap using previously created color look up table.
      .setFillStyle(new PalettedFill({ lut: palette }))
      .setWireframeStyle(emptyLine)
      .invalidateIntensityValues(data)
      .setMouseInteractions(false);

    // Add LegendBox.
    const legend = chart.addLegendBox()
      // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
      .setAutoDispose({
        type: 'max-width',
        maxWidth: 0.30,
    })
      .add(chart)
  });
