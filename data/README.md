# Data

This directory contains information about the data sources and processing used in this project.

## Data Sources

### Landsat Satellite Imagery

- **Source:** USGS Landsat 8/9
- **Platform:** Google Earth Engine
- **Bands Used:** 
  - Band 2: Blue (0.43-0.45 μm)
  - Band 3: Green (0.53-0.59 μm)
  - Band 4: Red (0.64-0.67 μm)
  - Band 5: Near Infrared (0.85-0.88 μm)
  - Band 10: Thermal Infrared (10.6-11.2 μm)
  - Band 11: Thermal Infrared (11.5-12.5 μm)

### Area of Interest (AOI)

- **Location:** Jhang City, Punjab, Pakistan
- **Coordinates:** [Define your AOI coordinates]
- **Format:** GeoJSON / Polygon geometry

## Data Processing Steps

1. **Image Collection:** Landsat imagery collected via Google Earth Engine
2. **Temporal Filtering:** Images filtered by date range
3. **Cloud Masking:** Cloud and shadow pixels removed using QA bands
4. **Composite Creation:** Median composite created from filtered images
5. **Band Selection:** Relevant bands selected for analysis
6. **Spectral Index Calculation:** NDVI, NDBI, and other indices computed
7. **LST Retrieval:** Land surface temperature extracted from thermal bands

## Data Availability

All Landsat data is freely available through Google Earth Engine. No additional data download is required to run the analysis scripts.

## Additional Notes

- Landsat imagery has 30-meter spatial resolution
- Analysis utilizes freely available satellite data
- Processing is cloud-based through Google Earth Engine
