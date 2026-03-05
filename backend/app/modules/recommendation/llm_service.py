import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

MODEL_NAME = "gemini-2.5-flash"  # Gemini 2.5 Flash equivalente actual


def call_gemini(prompt: str):

    model = genai.GenerativeModel(MODEL_NAME)

    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.3,
            "top_p": 0.8,
            "max_output_tokens": 1000
        }
    )

    return response