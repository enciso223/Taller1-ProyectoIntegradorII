from pydantic import BaseModel
from typing import Dict, List


class CategorySummary(BaseModel):
    category: str
    total: float


class MonthlyTrend(BaseModel):
    month: str
    total: float


class AnalysisResponse(BaseModel):
    total_expenses: float
    average_monthly_expense: float
    highest_category: str
    category_breakdown: List[CategorySummary]
    monthly_trend: List[MonthlyTrend]