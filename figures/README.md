# Figures

This directory stores the visual outputs generated from the Jhang urban growth, vegetation, and land surface temperature analysis.

## Contents

The following figures are expected in this folder:

- `Jhang_AOI.png` — Study area map showing the Jhang City AOI
- `Jhang_NDVI_2025.png` — Vegetation index map showing spatial distribution of NDVI
- `Jhang_NDBI_2025.png` — Built-up index map highlighting urbanized area
- `Jhang_LST_2025.png` — Land surface temperature map
- `urban_growth_change.png` — Multi-temporal change map showing urban expansion and land cover transformation

## Purpose

These figures are used to visually communicate:

- the spatial extent of the study area
- vegetation condition and distribution
- urban growth and built-up expansion
- thermal variation across the city
- temporal change patterns over the study period

## Recommended Figure Layouts

### 1. Study Area Map
- AOI boundary
- Jhang City context map
- Basic cartographic elements (north arrow, scale bar, legend)

### 2. NDVI Map
- Green-to-red vegetation gradient
- Highlight vegetation health and density changes
- Use clear legend and title

### 3. NDBI Map
- Highlight built-up expansion
- Show urban land conversion and density
- Use suitable color ramp for built-up intensity

### 4. LST Map
- Temperature gradient from cool to hot zones
- Urban heat island representation
- Overlay with built-up areas for interpretation

### 5. Urban Growth Change Map
- Compare early vs. recent years
- Highlight expansion, stability, and possible reduction areas
- Include change categories and legend

## Notes

- Figures can be created in GIS software such as QGIS or ArcGIS Pro
- Google Earth Engine can also export visualization images
- Final maps should be publication-ready and include labels, legends, and scale information

## Example Output Workflow

1. Generate raster outputs in the `outputs/` folder
2. Classify or style the maps using GIS tools
3. Export to PNG format with clear labels and legends
4. Save final visual files here

This folder acts as the repository for all generated charts, spatial maps, and project visualizations.
