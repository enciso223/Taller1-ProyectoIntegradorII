metrics_store = {
    "total_requests": 0,
    "total_tokens": 0,
    "total_cost_usd": 0.0
}

# Precio estimado Gemini Flash (ejemplo académico)
COST_PER_1K_TOKENS = 0.00035


def log_usage(tokens: int):

    cost = (tokens / 1000) * COST_PER_1K_TOKENS

    metrics_store["total_requests"] += 1
    metrics_store["total_tokens"] += tokens
    metrics_store["total_cost_usd"] += cost


def get_metrics():
    return metrics_store