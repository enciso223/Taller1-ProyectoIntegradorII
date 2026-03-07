from unittest.mock import MagicMock
from app.modules.analysis.service import calculate_summary
from app.modules.analysis.schemas import AnalysisResponse, CategorySummary, MonthlyTrend

def test_calculate_summary_mocked():
    # Mock de la sesión
    mock_db = MagicMock()

    # Mock para total general
    mock_total = MagicMock()
    mock_total.scalar.return_value = 150000

    # Mock para breakdown por categoría
    mock_category = MagicMock()
    mock_category.group_by.return_value.all.return_value = [
        ("Alimentación", 100000),
        ("Ocio", 50000)
    ]

    # Mock para tendencia mensual
    mock_monthly = MagicMock()
    mock_monthly.group_by.return_value.all.return_value = [
        ("2026-01", 150000)
    ]

    # Cada llamada a query devuelve un mock diferente
    mock_db.query.side_effect = [mock_total, mock_category, mock_monthly]

    # Llamamos a la función
    result: AnalysisResponse = calculate_summary(mock_db)

    # Verificaciones
    assert result.total_expenses == 150000
    assert result.highest_category == "Alimentación"

    categories = {c.category: c.total for c in result.category_breakdown}
    assert categories["Alimentación"] == 100000
    assert categories["Ocio"] == 50000

    assert result.monthly_trend[0].month == "2026-01"
    assert result.monthly_trend[0].total == 150000
    assert result.average_monthly_expense == 150000  # solo un mes