from fastapi import APIRouter
from app.modules.metrics.service import get_metrics

router = APIRouter(prefix="/api/metrics", tags=["Metrics"])


@router.get("/")
def metrics():
    return get_metrics()