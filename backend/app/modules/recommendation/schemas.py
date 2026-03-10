from pydantic import BaseModel
from typing import List


class RecommendationResponse(BaseModel):
    risk_level: str
    recommendations: List[str]
    projected_savings: float