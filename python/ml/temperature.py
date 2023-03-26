import os
import cdsapi

folder = "/home/adrian/Desktop/SBD/SBD-projects/hackathon/terrascan/api/python/ml/temperature"

os.environ['CDSAPI_URL'] = 'https://cds.climate.copernicus.eu/api/v2'
os.environ['CDSAPI_KEY'] = '186915:0cbd2793-51c7-4540-8c0f-5b223d8c0bf2'

if not os.path.exists(folder):
    os.makedirs(folder)

for i in range(1, 29):
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
            "year": ['2016','2017', '2018', '2019','2020','2021', '2022'],
            "month": "08",
            "day": day,
            "time": "12:00",
            "area": [20, 43, 30, 49],
            "format": "netcdf"
        },
        filename)

# Save the retrieved data to a netCDF file
# data.to_netcdf('temperature.nc')