def validate_projected_savings(llm_data: dict, real_total: float):

    projected = llm_data.get("projected_savings", 0)

    # El ahorro no puede superar el total real
    if projected > real_total:
        llm_data["projected_savings"] = real_total * 0.2  # ajuste conservador

    if projected < 0:
        llm_data["projected_savings"] = 0

    return llm_data