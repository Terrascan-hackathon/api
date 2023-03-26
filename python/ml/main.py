from lib.internal_lib.utils import country_polygon_bbox
from lib.internal_lib.utils import display_country_on_world_map
from matplotlib import pyplot as plt
from shapely.geometry.polygon import Polygon
from descartes import PolygonPatch
import folium

country_name = 'Romania'
polygon, bbox = country_polygon_bbox(country_name)

print(country_name)
print(f'bbox = {bbox}')
print(polygon)

display_country_on_world_map(country_name, 20, 'red') 

m = folium.Map([50.854457, 4.377184], zoom_start=3, tiles='cartodbpositron')
folium.GeoJson(polygon).add_to(m)
folium.LatLngPopup().add_to(m)
m