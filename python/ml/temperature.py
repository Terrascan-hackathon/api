import os
import cdsapi
import sys
from lib.internal_lib.utils import country_polygon_bbox
import subprocess

folder = "/home/adrian/Desktop/SBD/SBD-projects/hackathon/terrascan/api/python/ml/temperature"

os.environ['CDSAPI_URL'] = 'https://cds.climate.copernicus.eu/api/v2'
os.environ['CDSAPI_KEY'] = '186915:0cbd2793-51c7-4540-8c0f-5b223d8c0bf2'

if not os.path.exists(folder):
    os.makedirs(folder)

if len(sys.argv) > 1:
    country_name = sys.argv[1]
else:
    country_name = "Romania"

polygon, bbox = country_polygon_bbox(country_name)

for i in range(21, 23):
    file = f'/temperature{i}.nc'
    day = 1+i
    filename = folder + os.sep + file
    # Make a request to the CDS API to retrieve data
    c = cdsapi.Client()

    c.retrieve("reanalysis-era5-pressure-levels",
        {
            "variable": "temperature",
            "pressure_level": "1000",
            "product_type": "reanalysis",
            "year": "2022",
            "month": "07",
            "day": day,
            "time": "12:00",
            "area": bbox,
            "format": "netcdf"
        },
        filename)
    
# Run the script
subprocess.run(['python3', '/home/adrian/Desktop/SBD/SBD-projects/hackathon/terrascan/api/python/ml/temperature/analyze_temp.py'])

# Save the retrieved data to a netCDF file
# data.to_netcdf('temperature.nc')