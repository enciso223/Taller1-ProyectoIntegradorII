def build_prompt(summary_data: dict) -> str:

    return f"""
Eres un asesor financiero inteligente.

Analiza los siguientes datos financieros del usuario:

Datos:
{summary_data}

Devuelve exclusivamente un JSON con la siguiente estructura:

{{
  "risk_level": "bajo | moderado | alto",
  "recommendations": ["string", "string", "..."],
  "projected_savings": número
}}

Reglas:
- Máximo 5 recomendaciones
- No inventes datos
- No agregues texto fuera del JSON
- No expliques nada fuera del JSON
"""