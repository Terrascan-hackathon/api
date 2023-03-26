import netCDF4 as nc

# open the netCDF file
filename = 'data_new.nc'
datafile = nc.Dataset(filename, 'r')

# print the names of the variables in the file
print("Variable Names:")
for var in datafile.variables:
    print(var)

# get the data from a specific variable
varname = 'time'
vardata = datafile.variables[varname][:]

# print some information about the variable
print("Variable:", varname)
print("Shape:", vardata.shape)
print("Units:", datafile.variables[varname].units)

# close the netCDF file
datafile.close()