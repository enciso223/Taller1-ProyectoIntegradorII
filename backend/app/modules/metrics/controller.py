from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.modules.metrics.service import get_metrics

router = APIRouter(prefix="/api/metrics", tags=["Metrics"])


@router.get("/")
def metrics(
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user),
):
    return get_metrics(db)