import xarray as xr
import matplotlib.pyplot as plt
import numpy as np
import os

import os
import xarray as xr

folder = "/home/adrian/Desktop/SBD/SBD-projects/hackathon/terrascan/api/python/ml/temperature"
filenames = [os.path.join(folder, f) for f in os.listdir(folder) if f.endswith('.nc')]

# Open each netCDF file using xarray and concatenate them along the time dimension
datasets = [xr.open_dataset(f) for f in filenames]
dataset = xr.concat(datasets, dim='time').sortby('time')

# Extract the temperature variable
temperature = dataset['t']

# Compute some basic statistics
mean_temp = temperature.mean()
max_temp = temperature.max()
min_temp = temperature.min()

# Detect possible fire
diff_temp = temperature.diff(dim='time') # Compute the difference between adjacent time steps
fire_idx = np.where(diff_temp > 20) # Find indices where the temperature difference is greater than 15 degrees

if fire_idx[0].size > 0:
    print("Possible fire detected!")
    print(f"Indices: {fire_idx[0]}")
    plt.plot(fire_idx[1], fire_idx[0], 'ro', markersize=10)
    # Select the first time step
    temperature_single = temperature.isel(time=0)

    # Create a color-coded image of the temperature data
    plt.imshow(temperature_single, cmap='hot', aspect='auto')
    plt.ylabel('Temperature')
    plt.xlabel('Indices where the temperature difference is greater than 20 degrees')
    plt.savefig('../../../temperature.png', dpi=300)

    # Show the plot
    plt.show()

else:
    print("No fire detected.")


