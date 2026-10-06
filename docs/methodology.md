# Methodology

## Project Overview

This document describes the methodological approach for analyzing urban growth, vegetation dynamics, and land surface temperature in Jhang City using Google Earth Engine and Landsat satellite imagery.

## Research Framework

### Phase 1: Data Acquisition and Preprocessing

1. **Area of Interest (AOI) Definition**
   - Define study area geometry (polygon)
   - Ensure adequate coverage and validation

2. **Landsat Image Collection**
   - Access Landsat 8/9 Surface Reflectance (SR) collection
   - Filter by date range
   - Apply initial quality filters

3. **Cloud and Shadow Masking**
   - Use QA_PIXEL band for cloud identification
   - Apply masking to remove affected pixels
   - Create cloud-free composite

4. **Median Compositing**
   - Create median composite from filtered images
   - Reduces noise and atmospheric effects
   - Provides representative image for analysis period

### Phase 2: Spectral Index Calculation

#### NDVI (Normalized Difference Vegetation Index)

```
NDVI = (NIR - Red) / (NIR + Red)
```

Where:
- NIR = Near Infrared band (Band 5)
- Red = Red band (Band 4)

**Interpretation:**
- NDVI > 0.5: Dense vegetation
- NDVI 0.3-0.5: Moderate vegetation
- NDVI 0.1-0.3: Sparse vegetation
- NDVI < 0.1: Little to no vegetation
- NDVI < 0: Water and built-up areas

#### NDBI (Normalized Difference Built-up Index)

```
NDBI = (SWIR - NIR) / (SWIR + NIR)
```

Where:
- SWIR = Shortwave Infrared band (Band 6)
- NIR = Near Infrared band (Band 5)

**Interpretation:**
- NDBI > 0.1: Built-up areas
- NDBI 0 to 0.1: Mixed areas
- NDBI < 0: Vegetation and water

#### LST (Land Surface Temperature)

**Calculation Steps:**

1. **Thermal Radiance Calculation**
   ```
   Lλ = Ml × Qcal + Al
   ```
   Where:
   - Ml: Radiance multiplicative scaling constant
   - Qcal: Quantized and calibrated standard product DN
   - Al: Radiance additive scaling constant

2. **Brightness Temperature**
   ```
   BT = K2 / ln((K1 / Lλ) + 1)
   ```
   Where:
   - K1, K2: Thermal constants specific to Landsat band

3. **Wavelength Calculation**
   ```
   λ = 10.9 μm (for Band 10)
   ```

4. **Normalized Difference Moisture Index (NDMI)**
   ```
   NDMI = (NIR - SWIR) / (NIR + SWIR)
   ```

5. **Land Surface Emissivity (LSE)**
   ```
   LSE = 0.004 × NDMI + 0.986
   ```

6. **Land Surface Temperature (LST)**
   ```
   LST = BT / (1 + (λ × BT / ρ) × ln(LSE))
   ```
   Where:
   - ρ = Boltzmann's constant (1.4388 × 10⁻² m·K)

### Phase 3: Change Detection and Analysis

1. **Urban Growth Analysis**
   - Compare NDBI values across time periods
   - Identify areas of expansion
   - Calculate percentage change

2. **Vegetation Dynamics**
   - Compare NDVI values across time periods
   - Identify areas of increase/decrease
   - Quantify vegetation loss/gain

3. **Temperature Analysis**
   - Compare LST values across time periods
   - Identify urban heat islands
   - Correlate with land cover changes

### Phase 4: Statistical Analysis

1. **Descriptive Statistics**
   - Mean, median, standard deviation
   - Min/max values
   - Histogram analysis

2. **Correlation Analysis**
   - Relationship between NDVI and LST
   - Relationship between NDBI and LST
   - Relationship between urban growth and temperature

3. **Temporal Trends**
   - Linear regression analysis
   - Rate of change estimation
   - Trend significance testing

### Phase 5: Data Export and Visualization

1. **GIS Data Export**
   - Export rasters as GeoTIFF
   - Maintain geospatial metadata
   - Ensure compatibility with GIS software

2. **Map Production**
   - Create thematic maps
   - Apply appropriate color schemes
   - Generate publication-ready cartography

3. **Figure Generation**
   - Time-series visualizations
   - Comparison maps
   - Statistical plots and graphs

## Validation and Quality Assurance

1. **Data Quality Checks**
   - Verify cloud masking effectiveness
   - Check for data artifacts
   - Validate geometric accuracy

2. **Results Validation**
   - Compare with reference data
   - Cross-validate with secondary sources
   - Assess classification accuracy

3. **Metadata Documentation**
   - Record processing parameters
   - Document data sources
   - Note any limitations or assumptions

## Limitations and Considerations

1. **Spatial Resolution:** Landsat 30m resolution may miss fine-scale features
2. **Temporal Coverage:** Analysis limited to Landsat 8/9 availability
3. **Cloud Cover:** Persistent clouds may affect availability in wet seasons
4. **LST Accuracy:** Thermal resolution (100m) affects LST precision
5. **Atmospheric Effects:** Atmospheric conditions affect spectral reflectance

## References and Further Reading

- Google Earth Engine Documentation
- USGS Landsat Documentation
- Remote Sensing Textbooks and Publications
- GIS and Spatial Analysis Resources

## Notes

- All processing performed in Google Earth Engine
- Code is fully reproducible and documented
- Results are GIS-ready for further analysis
