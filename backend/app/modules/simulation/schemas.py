from pydantic import BaseModel
from typing import List


class SimulationRequest(BaseModel):
    category: str
    percentage: float


class CategoryProjection(BaseModel):
    category: str
    original_total: float
    projected_total: float


class SimulationResponse(BaseModel):
    original_total_expenses: float
    projected_total_expenses: float
    estimated_savings: float
    category_projection: List[CategoryProjection]