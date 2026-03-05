import pandas as pd

REQUIRED_COLUMNS = {"description", "category", "amount", "date"}

def validate_excel_structure(df: pd.DataFrame):
    columns = set(df.columns.str.lower())
    if not REQUIRED_COLUMNS.issubset(columns):
        raise ValueError(
            f"El archivo debe contener las columnas: {REQUIRED_COLUMNS}"
        )

def parse_excel(file):
    df = pd.read_excel(file)

    df.columns = df.columns.str.lower()

    validate_excel_structure(df)

    return df