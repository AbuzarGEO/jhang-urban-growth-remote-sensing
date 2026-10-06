# Outputs

This directory contains the exported GIS datasets and raster products from the analysis.

## Output Files

### Raster Data (GeoTIFF Format)

- **Jhang_NDVI_2025.tif** - Normalized Difference Vegetation Index
  - Range: -1 to 1
  - Resolution: 30m
  - Description: Vegetation health and density

- **Jhang_NDBI_2025.tif** - Normalized Difference Built-up Index
  - Range: -1 to 1
  - Resolution: 30m
  - Description: Built-up area identification

- **Jhang_LST_2025.tif** - Land Surface Temperature
  - Range: Temperature in Kelvin
  - Resolution: 30m (resampled from 100m thermal bands)
  - Description: Surface temperature distribution

## How to Use These Files

1. **Open in GIS Software:**
   - ArcGIS Pro
   - QGIS
   - GDAL/OGR tools

2. **Apply Color Ramps:**
   - NDVI: Green-Yellow-Red scale
   - NDBI: Blue-White-Red scale
   - LST: Blue-Cyan-Green-Yellow-Red (temperature scale)

3. **Analysis & Visualization:**
   - Create thematic maps
   - Perform statistical analysis
   - Conduct change detection studies
   - Export to other formats as needed

## Data Format

- **Format:** GeoTIFF
- **Projection:** WGS 84 (EPSG:4326)
- **Spatial Resolution:** 30 meters
- **Data Type:** Float32

## Metadata

Each GeoTIFF file contains embedded geospatial metadata including:
- Coordinate Reference System (CRS)
- Georeferencing information
- Spatial extent and resolution
- Timestamp and analysis parameters

## Further Processing

These outputs can be further processed for:
- Change detection analysis
- Classification and segmentation
- Spatial statistics and zoning
- Integration with other datasets
- Web mapping applications
