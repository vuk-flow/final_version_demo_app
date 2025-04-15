import pandas as pd 
from pathlib import Path

def read_csv_file(file_path):
    df = pd.read_csv(file_path)
    return df

current_dir = (Path(__file__).resolve().parents[2]) / 'example.csv'
df = read_csv_file(current_dir)

# print(current_dir)

df_list = df.to_dict(orient='records')

print(df_list)


