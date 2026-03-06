from unittest.mock import MagicMock
from app.modules.analysis.service import calculate_summary
from app.modules.analysis.schemas import AnalysisResponse

def test_analysis_summary_simple_ci():
    # Creamos un mock de la sesión
    mock_db = MagicMock()

    # Mock del total de gastos
    mock_db.query.return_value.scalar.return_value = 1000

    # Mock del breakdown por categoría
    mock_db.query.return_value.group_by.return_value.all.return_value = [
        ("Alimentación", 600),
        ("Ocio", 400)
    ]

    # Mock de la tendencia mensual
    def query_side_effect(*args, **kwargs):
        q = MagicMock()
        if args and "to_char" in str(args[0]):
            q.group_by.return_value.all.return_value = [
                ("2026-01", 1000)
            ]
        else:
            q.scalar.return_value = 1000
            q.group_by.return_value.all.return_value = [
                ("Alimentación", 600),
                ("Ocio", 400)
            ]
        return q

    mock_db.query.side_effect = query_side_effect

    # Ejecutamos la función
    result: AnalysisResponse = calculate_summary(mock_db)

    # Comprobaciones básicas
    assert result.total_expenses == 1000
    assert result.highest_category == "Alimentación"