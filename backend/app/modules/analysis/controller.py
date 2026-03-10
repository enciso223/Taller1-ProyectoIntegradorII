from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user  
from app.modules.analysis.schemas import AnalysisResponse
from app.modules.analysis.service import calculate_summary

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])


@router.post("/summary", response_model=AnalysisResponse)
def get_summary(
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user),  
):
    return calculate_summary(db)