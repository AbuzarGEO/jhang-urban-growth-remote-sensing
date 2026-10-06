// ============================================================================
// Jhang Urban Growth, Vegetation & Land Surface Temperature Analysis
// Using Google Earth Engine and Landsat Satellite Imagery
// ============================================================================
// Author: Syed Muhammad Abuzar
// Purpose: Multi-temporal remote sensing analysis of Jhang City, Punjab, Pakistan
// Technologies: Google Earth Engine, JavaScript, Landsat
// ============================================================================

// ============================================================================
// 1. DEFINE AREA OF INTEREST (AOI)
// ============================================================================

// Define Jhang City AOI as a geometry
// Note: Replace with your actual coordinates for Jhang City
var jhangAOI = ee.Geometry.Rectangle([72.31, 31.26, 72.35, 31.30]);

// Alternative: Use a pre-drawn feature from your assets
// var jhangAOI = ee.FeatureCollection('users/your-username/jhang_aoi').geometry();

// Center map on AOI
Map.centerObject(jhangAOI, 11);

// ============================================================================
// 2. LANDSAT IMAGE COLLECTION & FILTERING
// ============================================================================

// Define date ranges for analysis
var startDate = '2020-01-01';
var endDate = '2025-12-31';

// Load Landsat 8/9 Surface Reflectance Collection
var landsatCollection = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(jhangAOI)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUD_COVER', 20)); // Filter clouds < 20%

print('Image count:', landsatCollection.size());

// ============================================================================
// 3. CLOUD AND SHADOW MASKING
// ============================================================================

function maskCloudsAndShadows(image) {
  var qa = image.select('QA_PIXEL');
  
  // Cloud and shadow bit positions
  var cloudBit = 3;
  var shadowBit = 4;
  
  // Create masks
  var cloudMask = qa.bitwiseAnd(1 << cloudBit).eq(0);
  var shadowMask = qa.bitwiseAnd(1 << shadowBit).eq(0);
  
  // Apply masks
  return image.updateMask(cloudMask).updateMask(shadowMask);
}

// Apply masking to collection
var maskedCollection = landsatCollection.map(maskCloudsAndShadows);

// ============================================================================
// 4. CREATE MEDIAN COMPOSITE
// ============================================================================

var composite = maskedCollection.median();

// Clip to AOI
var compositeAOI = composite.clip(jhangAOI);

// ============================================================================
// 5. SELECT BANDS AND VISUALIZE RGB
// ============================================================================

// Select bands for RGB visualization
var rgbVis = compositeAOI.select(['SR_B4', 'SR_B3', 'SR_B2']);

// Visualization parameters
var rgbParams = {
  min: 8000,
  max: 30000,
  gamma: 1.2
};

Map.addLayer(rgbVis, rgbParams, 'RGB Composite');

// ============================================================================
// 6. CALCULATE NDVI (Normalized Difference Vegetation Index)
// ============================================================================

var ndvi = compositeAOI.normalizedDifference(['SR_B5', 'SR_B4'])
  .rename('NDVI');

// Visualization parameters for NDVI
var ndviParams = {
  min: -1,
  max: 1,
  palette: ['blue', 'white', 'green']
};

Map.addLayer(ndvi, ndviParams, 'NDVI');

// ============================================================================
// 7. CALCULATE NDBI (Normalized Difference Built-up Index)
// ============================================================================

// NDBI = (SWIR - NIR) / (SWIR + NIR)
// Landsat bands: B6 (SWIR1), B5 (NIR)
var ndbi = compositeAOI.normalizedDifference(['SR_B6', 'SR_B5'])
  .rename('NDBI');

// Visualization parameters for NDBI
var ndbiParams = {
  min: -1,
  max: 1,
  palette: ['blue', 'cyan', 'yellow', 'red']
};

Map.addLayer(ndbi, ndbiParams, 'NDBI');

// ============================================================================
// 8. CALCULATE LAND SURFACE TEMPERATURE (LST)
// ============================================================================

function calculateLST(image) {
  // Thermal band selection (Band 10 for Landsat 8/9)
  var thermal = image.select('ST_B10');
  
  // Convert to Kelvin (already in Kelvin from Collection 2)
  var lstK = thermal;
  
  // Convert to Celsius
  var lstC = lstK.subtract(273.15);
  
  return lstC.rename('LST');
}

var lst = calculateLST(compositeAOI);

// Visualization parameters for LST
var lstParams = {
  min: 20,
  max: 45,
  palette: ['blue', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(lst, lstParams, 'LST (Celsius)');

// ============================================================================
// 9. EXTRACT BUILT-UP AREAS
// ============================================================================

// Threshold for built-up areas (NDBI > 0.1)
var builtUp = ndbi.gt(0.1).rename('BuiltUp');

var builtUpParams = {
  min: 0,
  max: 1,
  palette: ['white', 'red']
};

Map.addLayer(builtUp, builtUpParams, 'Built-up Areas');

// ============================================================================
// 10. STATISTICAL ANALYSIS
// ============================================================================

// Calculate statistics for NDVI
var ndviStats = ndvi.reduceRegion({
  reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true),
  geometry: jhangAOI,
  scale: 30,
  maxPixels: 1e9
});

print('NDVI Statistics:', ndviStats);

// Calculate statistics for NDBI
var ndbiStats = ndbi.reduceRegion({
  reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true),
  geometry: jhangAOI,
  scale: 30,
  maxPixels: 1e9
});

print('NDBI Statistics:', ndbiStats);

// Calculate statistics for LST
var lstStats = lst.reduceRegion({
  reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true),
  geometry: jhangAOI,
  scale: 30,
  maxPixels: 1e9
});

print('LST Statistics:', lstStats);

// ============================================================================
// 11. EXPORT RESULTS AS GEOTIFFs
// ============================================================================

// Export NDVI
Export.image.toDrive({
  image: ndvi,
  description: 'Jhang_NDVI_2025',
  folder: 'GEE_Exports',
  fileNamePrefix: 'Jhang_NDVI_2025',
  scale: 30,
  region: jhangAOI,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Export NDBI
Export.image.toDrive({
  image: ndbi,
  description: 'Jhang_NDBI_2025',
  folder: 'GEE_Exports',
  fileNamePrefix: 'Jhang_NDBI_2025',
  scale: 30,
  region: jhangAOI,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Export LST
Export.image.toDrive({
  image: lst,
  description: 'Jhang_LST_2025',
  folder: 'GEE_Exports',
  fileNamePrefix: 'Jhang_LST_2025',
  scale: 30,
  region: jhangAOI,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Export Built-up areas
Export.image.toDrive({
  image: builtUp,
  description: 'Jhang_BuiltUp_2025',
  folder: 'GEE_Exports',
  fileNamePrefix: 'Jhang_BuiltUp_2025',
  scale: 30,
  region: jhangAOI,
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// ============================================================================
// 12. ADDITIONAL ANALYSIS - MULTI-TEMPORAL COMPARISON
// ============================================================================

// Function to create yearly composites
function getYearlyComposite(year) {
  var startDate = year + '-01-01';
  var endDate = (year + 1) + '-01-01';
  
  return landsatCollection
    .filterDate(startDate, endDate)
    .map(maskCloudsAndShadows)
    .median()
    .clip(jhangAOI);
}

// Create composites for different years (optional)
var composite2021 = getYearlyComposite(2021);
var composite2023 = getYearlyComposite(2023);
var composite2025 = getYearlyComposite(2025);

// Calculate NDVI for different years
var ndvi2021 = composite2021.normalizedDifference(['SR_B5', 'SR_B4']);
var ndvi2023 = composite2023.normalizedDifference(['SR_B5', 'SR_B4']);
var ndvi2025 = composite2025.normalizedDifference(['SR_B5', 'SR_B4']);

// Change detection: NDVI difference
var ndviChange = ndvi2025.subtract(ndvi2021);

var changeParams = {
  min: -1,
  max: 1,
  palette: ['red', 'white', 'green']
};

Map.addLayer(ndviChange, changeParams, 'NDVI Change (2021-2025)');

// ============================================================================
// 13. PRINT ANALYSIS SUMMARY
// ============================================================================

print('=== JHANG URBAN GROWTH ANALYSIS ===');
print('Study Area: Jhang City, Punjab, Pakistan');
print('Analysis Period:', startDate, 'to', endDate);
print('Satellite: Landsat 8/9');
print('Spatial Resolution: 30 meters');
print('Cloud Cover Threshold: 20%');
print('');
print('Indices Calculated:');
print('  - NDVI (Normalized Difference Vegetation Index)');
print('  - NDBI (Normalized Difference Built-up Index)');
print('  - LST (Land Surface Temperature)');
print('  - Built-up Area Extraction');
print('  - Change Detection Analysis');
print('');
print('Outputs exported to Google Drive.');
print('Check Tasks tab to monitor export progress.');

// ============================================================================
// END OF SCRIPT
// ============================================================================
