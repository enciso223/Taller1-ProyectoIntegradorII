from sqlalchemy import Column, Integer, Float, DateTime, String
from datetime import datetime
from app.core.database import Base


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    operation = Column(String, nullable=False)
    tokens_used = Column(Integer, nullable=False)
    cost_usd = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)