from lib.internal_lib.utils import country_polygon_bbox
from lib.internal_lib.utils import display_country_on_world_map
from matplotlib import pyplot as plt
from shapely.geometry.polygon import Polygon
from descartes import PolygonPatch
import sys

if len(sys.argv) > 1:
    country_name = sys.argv[1]
else:
    country_name = "Romania"
polygon, bbox = country_polygon_bbox(country_name)

print(country_name)
print(f'bbox = {bbox}')
print(polygon)

display_country_on_world_map(country_name, 20, 'red')