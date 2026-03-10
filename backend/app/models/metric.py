from sqlalchemy import Column, Integer, Float, DateTime, String, Boolean
from datetime import datetime
from app.core.database import Base


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, nullable=False)
    tokens_used = Column(Integer, nullable=False)
    cost_usd = Column(Float, nullable=False)
    response_time = Column(Float)   # segundos
    error = Column(Boolean, default=False)
    hallucination_detected = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)