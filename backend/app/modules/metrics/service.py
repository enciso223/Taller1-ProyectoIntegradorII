metrics_store = {
    "total_requests": 0,
    "total_tokens": 0
}


def log_usage(tokens: int):
    metrics_store["total_requests"] += 1
    metrics_store["total_tokens"] += tokens


def get_metrics():
    return metrics_store