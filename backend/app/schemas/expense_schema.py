from pydantic import BaseModel
from datetime import date

class ExpenseCreate(BaseModel):
    description: str
    category: str | None
    amount: float
    date: date

class ExpenseResponse(BaseModel):
    id: int
    description: str
    category: str | None
    amount: float
    date: date

    class Config:
        from_attributes = True