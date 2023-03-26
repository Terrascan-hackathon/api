import os
import cdsapi

folder = "/home/adrian/Desktop/SBD/SBD-projects/hackathon/terrascan/api/python/ml/glaciar"

os.environ['CDSAPI_URL'] = 'https://cds.climate.copernicus.eu/api/v2'
os.environ['CDSAPI_KEY'] = '186915:0cbd2793-51c7-4540-8c0f-5b223d8c0bf2'

if not os.path.exists(folder):
    os.makedirs(folder)

filename = folder + '/glaciar'

# Make a request to the CDS API to retrieve data
c = cdsapi.Client()

# Save the retrieved data to a tgz file
c.retrieve("insitu-glaciers-elevation-mass",
    {
        "variable": "all",
        "product_type": "elevation_change",
        "file_version": "20170405",
        'model':'hadgem2_cc',
        "format": "tgz"
    },
    filename)