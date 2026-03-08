from sqlalchemy.orm import Session
from app.models.metric import Metric
from sqlalchemy import func

# Precio estimado Gemini Flash (académico)
COST_PER_1K_TOKENS = 0.00035


def log_usage(
    db: Session,
    tokens: int,
    operation: str,
    response_time: float = None,
    error: bool = False,
    hallucination: bool = False
):

    cost = (tokens / 1000) * COST_PER_1K_TOKENS

    metric = Metric(
        operation=operation,
        tokens_used=tokens,
        cost_usd=cost,
        response_time=response_time,
        error=error,
        hallucination_detected=hallucination
    )

    db.add(metric)
    db.commit()


def get_metrics(db: Session):

    total_requests = db.query(func.count(Metric.id)).scalar() or 0
    total_tokens = db.query(func.sum(Metric.tokens_used)).scalar() or 0
    total_cost = db.query(func.sum(Metric.cost_usd)).scalar() or 0
    avg_tokens = db.query(func.avg(Metric.tokens_used)).scalar() or 0
    avg_cost = db.query(func.avg(Metric.cost_usd)).scalar() or 0
    avg_response_time = db.query(func.avg(Metric.response_time)).scalar() or 0
    errors = db.query(func.count(Metric.id)).filter(Metric.error == True).scalar() or 0
    error_rate = errors / total_requests if total_requests else 0
    hallucinations = db.query(func.count(Metric.id))\
        .filter(Metric.hallucination_detected == True)\
        .scalar() or 0
    avg_cost = total_cost / total_requests if total_requests else 0
    monthly_projection = avg_cost * 1000

    return {
        "total_requests": total_requests,                   # Total de solicitudes hechas al LLM
        "total_tokens": total_tokens,                       # Total de tokens usados en las solicitudes
        "total_cost_usd": float(total_cost),                # Costo total del uso del LLM
        "avg_tokens": float(avg_tokens),                    # Número de Tokens promedio entre solicitudes
        "avg_cost": float(avg_cost),                        # Costo promedio entre solicitudes
        "avg_response_time": avg_response_time,             # Tiempo de respuesta promedio del LLM
        "error_rate": error_rate,                           # Tasa de error de uso del LLM
        "hallucinations_detected": hallucinations,          # Número de alucinaciones detectadas
        "monthly_cost_projection": monthly_projection       # Proyección de costo mensual
    }
