from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense import Expense
from app.modules.analysis.schemas import (
    AnalysisResponse,
    CategorySummary,
    MonthlyTrend
)
from collections import defaultdict


def calculate_summary(db: Session) -> AnalysisResponse:

    # Total general
    total_expenses = db.query(func.sum(Expense.amount)).scalar() or 0

    # Total por categoría
    category_data = (
        db.query(Expense.category, func.sum(Expense.amount))
        .group_by(Expense.category)
        .all()
    )

    category_breakdown = [
        CategorySummary(category=cat or "Sin categoría", total=float(total))
        for cat, total in category_data
    ]

    # Categoría con mayor gasto
    highest_category = (
        max(category_breakdown, key=lambda x: x.total).category
        if category_breakdown else "N/A"
    )

    # Tendencia mensual
    monthly_data = (
        db.query(
            func.to_char(Expense.date, 'YYYY-MM'),
            func.sum(Expense.amount)
        )
        .group_by(func.to_char(Expense.date, 'YYYY-MM'))
        .all()
    )

    monthly_trend = [
        MonthlyTrend(month=month, total=float(total))
        for month, total in monthly_data
    ]

    # Promedio mensual
    months_count = len(monthly_trend)
    average_monthly = float(total_expenses / months_count) if months_count > 0 else 0

    return AnalysisResponse(
        total_expenses=float(total_expenses),
        average_monthly_expense=average_monthly,
        highest_category=highest_category,
        category_breakdown=category_breakdown,
        monthly_trend=monthly_trend
    )