from fastapi import FastAPI
from app.core.database import engine, Base
from app.modules.ingestion.controller import router as ingestion_router
from app.modules.analysis.controller import router as analysis_router

app = FastAPI(title="Gestor Inteligente de Gastos")

Base.metadata.create_all(bind=engine)

app.include_router(ingestion_router)
app.include_router(analysis_router)

@app.get("/")
def health_check():
    return {"status": "Backend funcionando correctamente"}