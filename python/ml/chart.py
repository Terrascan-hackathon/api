import pandas as pd
import re

# Read links from file
with open('links.txt', 'r') as f:
    links = f.read().splitlines()

# Extract URLs using regular expressions
urls = [re.search("(?P<url>https?://[^\s]+)", link).group("url") for link in links]

# Create a DataFrame with the URLs
df = pd.DataFrame({'URL': urls})

# Write the URLs to a CSV file
df.to_csv('urls.csv', index=False)