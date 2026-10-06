# Jhang Urban Growth, Vegetation & Land Surface Temperature Analysis

## Overview

This project presents a multi-temporal remote sensing and GIS analysis of **Jhang City, Punjab, Pakistan**, using Google Earth Engine and Landsat satellite imagery.

The study focuses on three major components:

- 🏙️ Urban growth and built-up expansion
- 🌱 Vegetation dynamics using NDVI
- 🌡️ Land Surface Temperature (LST)

The project demonstrates a reproducible workflow for processing satellite imagery, deriving spectral indices, analyzing urban expansion, calculating statistics, and exporting GIS-ready results.

## Study Area

**Jhang City, Punjab, Pakistan**

The study area is analyzed using a defined Area of Interest (AOI) representing Jhang City.

## Objectives

The main objectives of this project are:

1. Analyze urban expansion over the study period.
2. Assess vegetation dynamics using NDVI.
3. Calculate Land Surface Temperature.
4. Analyze changes in built-up areas.
5. Produce GIS-ready raster and statistical outputs.
6. Develop a reproducible Google Earth Engine workflow.

## Data

The analysis uses multi-temporal **Landsat satellite imagery** accessed through Google Earth Engine.

Main processing steps include:

- AOI definition
- Satellite image collection
- Date filtering
- Cloud and shadow masking
- Median compositing
- Spectral band selection
- RGB visualization
- NDVI calculation
- NDBI calculation
- Built-up area extraction
- Land Surface Temperature calculation
- Change detection
- Statistical analysis
- GIS data export

## Methodology

```text
AOI
 ↓
Landsat Image Collection
 ↓
Date & Cloud Filtering
 ↓
Cloud/Shadow Masking
 ↓
Median Composite
 ↓
Band Selection
 ↓
 ┌───────────────┬───────────────┬───────────────┐
 ↓               ↓               ↓
NDVI            NDBI            LST
 ↓               ↓               ↓
Vegetation      Built-up        Temperature
Analysis        Analysis        Analysis
 └───────────────┴───────────────┘
                  ↓
            Change Detection
                  ↓
          Statistical Analysis
                  ↓
       GeoTIFF / GIS Exports
```

## Technologies

- Google Earth Engine
- JavaScript
- Landsat
- Remote Sensing
- GIS
- ArcGIS Pro / ArcMap
- QGIS

## Key Indices

### NDVI

Normalized Difference Vegetation Index is used to analyze vegetation conditions.

### NDBI

Normalized Difference Built-up Index is used to identify and analyze built-up areas.

### LST

Land Surface Temperature is used to investigate the spatial distribution of surface temperature across the study area.

## Repository Structure

```text
gee/
    Jhang_Urban_Growth_Analysis.js

figures/
    Study area and analysis maps

outputs/
    Exported GIS datasets

docs/
    Project documentation
```

## Results

The project will contain:

- NDVI maps
- NDBI maps
- LST maps
- Built-up area maps
- Urban change maps
- Statistical summaries
- GIS-ready GeoTIFF outputs

## Applications

This type of analysis can support:

- Urban planning
- Environmental monitoring
- Vegetation assessment
- Urban heat analysis
- Sustainable development planning
- GIS-based decision making

## Author

**Syed Muhammad Abuzar**

GIS & Remote Sensing Specialist

Interested in:

- GIS
- Remote Sensing
- Google Earth Engine
- Spatial Analysis
- WebGIS
- Geospatial Programming

## Status

🚧 **Project in development**

The repository will be updated as additional analysis, maps, statistics, documentation, and GIS outputs are completed.
