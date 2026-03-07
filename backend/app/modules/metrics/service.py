from sqlalchemy.orm import Session
from app.models.metric import Metric
from sqlalchemy import func

# Precio estimado Gemini Flash (académico)
COST_PER_1K_TOKENS = 0.00035


def log_usage(db: Session, tokens: int, operation: str):

    cost = (tokens / 1000) * COST_PER_1K_TOKENS

    metric = Metric(
        operation=operation,
        tokens_used=tokens,
        cost_usd=cost
    )

    db.add(metric)
    db.commit()


def get_metrics(db: Session):

    total_requests = db.query(func.count(Metric.id)).scalar() or 0
    total_tokens = db.query(func.sum(Metric.tokens_used)).scalar() or 0
    total_cost = db.query(func.sum(Metric.cost_usd)).scalar() or 0

    return {
        "total_requests": total_requests,
        "total_tokens": total_tokens,
        "total_cost_usd": float(total_cost)
    }