from sqlalchemy.orm import Session
from app.modules.analysis.service import calculate_summary
from app.modules.recommendation.prompt_builder import build_prompt
from app.modules.recommendation.llm_service import call_gemini
from app.utils.json_validator import validate_json_response
from app.utils.financial_validator import validate_projected_savings
from app.modules.metrics.service import log_usage
from app.modules.recommendation.schemas import RecommendationResponse


def generate_recommendations(db: Session):

    # 1. Datos reales backend
    summary = calculate_summary(db)
    summary_dict = summary.dict()

    real_total = summary.total_expenses

    # 2. Prompt
    prompt = build_prompt(summary_dict)

    # 3. LLM
    response = call_gemini(prompt)

    text_output = response.text

    # 4. Validar JSON
    validated = validate_json_response(text_output)

    # 5. Mitigar alucinaciones numéricas
    validated = validate_projected_savings(validated, real_total)

    # 6. Tokens
    tokens_used = response.usage_metadata.total_token_count
    log_usage(tokens_used)

    return RecommendationResponse(**validated)