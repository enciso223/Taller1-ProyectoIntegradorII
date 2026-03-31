# Dockerfile

FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ARG DATABASE_URL
ARG GEMINI_API_KEY

# Establecer variables de entorno dentro del contenedor
ENV DATABASE_URL=$DATABASE_URL
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Elimina la versión con corchetes y usa esta:
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT