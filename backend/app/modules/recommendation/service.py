from sqlalchemy.orm import Session
from app.modules.analysis.service import calculate_summary
from app.modules.recommendation.prompt_builder import build_prompt
from app.modules.recommendation.llm_service import call_gemini
from app.utils.json_validator import validate_json_response
from app.utils.financial_validator import validate_projected_savings
from app.modules.metrics.service import log_usage
from app.modules.recommendation.schemas import RecommendationResponse
import time
from app.utils.logger import get_logger

logger = get_logger(__name__)

def generate_recommendations(db: Session):

    logger.info("Generando recomendación del LLM")

    # 1. Datos reales backend
    summary = calculate_summary(db)
    summary_dict = summary.dict()

    real_total = summary.total_expenses

    # 2. Prompt
    prompt = build_prompt(summary_dict)

    # 3. LLM
    start_time = time.time() # Para medir el tiempo de respuesta
    error = False
    try:
        response = call_gemini(prompt)
    except Exception:
        error = True
        raise
    end_time = time.time()
    response_time = end_time - start_time
    text_output = response.text

    # 4. Validar JSON
    validated = validate_json_response(text_output)
    hallucination_detected = False
    validated_fixed = validate_projected_savings(validated, real_total)
    if validated_fixed != validated:
        hallucination_detected = True
    validated = validated_fixed

    # 5. Mitigar alucinaciones numéricas
    validated = validate_projected_savings(validated, real_total)

    # 6. Tokens
    tokens_used = response.usage_metadata.total_token_count

    logger.info("Respuesta del LLM recibida")

    log_usage(
    db,
    tokens_used,
    operation="recommendation_generation",
    response_time=response_time,
    error=error,
    hallucination=hallucination_detected
)

    return RecommendationResponse(**validated)