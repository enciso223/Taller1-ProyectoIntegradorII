from sqlalchemy.orm import Session
from app.models.expense import Expense
from app.utils.excel_parser import parse_excel
from datetime import datetime
from app.utils.logger import get_logger

logger = get_logger(__name__)

def process_excel(file, db: Session):

    logger.info("Iniciando procesamiento del Excel")

    df = parse_excel(file)

    records_inserted = 0

    for _, row in df.iterrows():
        expense = Expense(
            description=row["description"],
            category=row.get("category"),
            amount=float(row["amount"]),
            date=row["date"] if isinstance(row["date"], datetime)
            else datetime.strptime(str(row["date"]), "%Y-%m-%d")
        )

        db.add(expense)
        records_inserted += 1

    db.commit()

    logger.info("Excel cargado exitosamente")

    return records_inserted