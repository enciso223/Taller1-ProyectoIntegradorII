from tests.test_simulation import db_session
from app.modules.ingestion.service import process_excel
import pandas as pd

def test_process_excel_inserts_records(db_session, monkeypatch):

    df = pd.DataFrame([
        {"description": "Groceries", "category": "Food", "amount": 100, "date": "2024-01-01"},
        {"description": "Bus", "category": "Transport", "amount": 50, "date": "2024-01-02"},
    ])

    def mock_parse_excel(file):
        return df

    monkeypatch.setattr(
        "app.modules.ingestion.service.parse_excel",
        mock_parse_excel
    )

    records = process_excel("fake_file.xlsx", db_session)

    assert records == 2