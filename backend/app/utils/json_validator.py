import json
import re

def validate_json_response(text: str):

    # eliminar markdown
    text = text.strip()

    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)

    try:
        data = json.loads(text)
    except Exception:
        raise ValueError("El LLM no devolvió un JSON válido")

    required_keys = {"risk_level", "recommendations", "projected_savings"}

    if not required_keys.issubset(data.keys()):
        raise ValueError("JSON incompleto en respuesta del LLM")

    if not isinstance(data["recommendations"], list):
        raise ValueError("Campo 'recommendations' debe ser una lista")

    return data