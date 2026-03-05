from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.analysis.service import calculate_summary
from app.modules.analysis.schemas import AnalysisResponse

router = APIRouter(prefix="/api/analysis", tags=["Analysis"])


@router.post("/summary", response_model=AnalysisResponse)
def get_summary(db: Session = Depends(get_db)):
    return calculate_summary(db)