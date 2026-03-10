from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense import Expense
from app.modules.simulation.schemas import (
    SimulationResponse,
    CategoryProjection
)
from app.utils.logger import get_logger

logger = get_logger(__name__)

def run_simulation(category: str, percentage: float, db: Session) -> SimulationResponse:

    logger.info("Corriendo simulación")

    # Total general actual
    original_total = db.query(func.sum(Expense.amount)).scalar() or 0

    # Totales por categoría
    category_data = (
        db.query(Expense.category, func.sum(Expense.amount))
        .group_by(Expense.category)
        .all()
    )

    projections = []
    projected_total = 0

    for cat, total in category_data:

        total = float(total)

        if cat == category:
            reduced_amount = total * (percentage / 100)
            new_total = total - reduced_amount
        else:
            new_total = total

        projected_total += new_total

        projections.append(
            CategoryProjection(
                category=cat or "Sin categoría",
                original_total=total,
                projected_total=new_total
            )
        )

    estimated_savings = original_total - projected_total

    return SimulationResponse(
        original_total_expenses=float(original_total),
        projected_total_expenses=float(projected_total),
        estimated_savings=float(estimated_savings),
        category_projection=projections
    )