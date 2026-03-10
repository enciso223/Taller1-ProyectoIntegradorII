from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.recommendation.service import generate_recommendations
from app.modules.recommendation.schemas import RecommendationResponse
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/api/recommendation", tags=["Recommendation"])


@router.post("/generate", response_model=RecommendationResponse)
def recommend(db: Session = Depends(get_db)):

    try:
        return generate_recommendations(db)
    except Exception as e:
        logger.error(f"Error del LLM: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
        