import pandas as pd 
from pathlib import Path
import re



field_rules = {
    'name':{'min_length':2, 'max_length':50, 'required':True, 'only_letters':True},
    'email':{'min_length':5, 'max_length':50, 'required': True, 'email':True}
    
}

name_pattern = r'^[A-Za-z]+$'
email_pattern =  r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

# def validate_csv(df, field_rules):
#     errors = []

#     for i, row in df.iterrows():
#         for field, rules in field_rules.items():
#             value = row.get(field)

#             if pd.isna(value) or str(value) == "":
#                 errors.append(f"Row {i+1}, Field '{field}' is empty")
#                 continue

#             value_str = str(value)
#             if 'min_length' in rules and len(value_str) < rules['min_length']:
#                 errors.append(f"Row {i+1}, Field '{field}' is too short (min {rules['min_length']} chars.)")
#             if 'max_length' in rules and len(value_str) > rules['max_length']:
#                 errors.append(f"Row {i+1}, Field '{field}' is too long (min {rules['max_length']} chars.)")
#             if field == 'email':
#                 if not re.match(email_pattern, value_str):
#                     if not re.match(email_pattern, value_str):
#                         errors.append(f"Row {i+1}, Field '{field}' is not a valid email address.")

#     return errors

def validate_csv(df, field_rules):
    errors = []

    for field, rules in field_rules.items():
        if field not in df.columns:
            errors.append(f"Missing expected column: '{field}'")
            continue

        series = df[field]

        if rules.get('required'):
            null_mask = series.isna() | series.astype(str).str.strip().eq('')
            for idx in df[null_mask].index:
                errors.append(f"Row {idx + 1}, Field '{field}' is empty.")

        if 'min_length' in rules:
            too_short = series.astype(str).str.len() < rules['min_length']
            for idx in df[too_short].index:
                errors.append(f"Row {idx + 1}, Field '{field}' is too short (min {rules['min_length']} chars).")

        if 'max_length' in rules:
            too_long = series.astype(str).str.len() > rules['max_length']
            for idx in df[too_long].index:
                errors.append(f"Row {idx + 1}, Field '{field}' is too long (max {rules['max_length']} chars).")

        if rules.get('email'):
            invalid_email_mask = ~series.astype(str).str.match(email_pattern, na=False)
            for idx in df[invalid_email_mask].index:
                errors.append(f"Row {idx + 1}, Field '{field}' is not a valid email address.")
        # if rules.get('only_letters') and field == 'name':
        #     invalid_name_mask = ~series.astype(str).str.match(name_pattern, na=False)
        #     for idx in df[invalid_name_mask].index:
        #         errors.append(f"Row {idx + 1}, Field '{field}' must contains only letters.")

    return errors


# print(current_dir)

# df_list = df.to_dict(orient='records')

# print(df_list)




