from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.modules.metrics.service import get_metrics

router = APIRouter(prefix="/api/metrics", tags=["Metrics"])


@router.get("/")
def metrics(db: Session = Depends(get_db)):
    return get_metrics(db)