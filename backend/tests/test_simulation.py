import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import date

from app.models.expense import Base, Expense
from app.modules.simulation.service import run_simulation


@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    TestingSessionLocal = sessionmaker(bind=engine)

    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    yield db
    db.close()


def test_run_simulation_reduces_category(db_session):

    expense1 = Expense(description="Groceries", category="Food", amount=100, date=date.today())
    expense2 = Expense(description="Restaurant", category="Food", amount=50, date=date.today())
    expense3 = Expense(description="Bus", category="Transport", amount=50, date=date.today())

    db_session.add_all([expense1, expense2, expense3])
    db_session.commit()

    result = run_simulation("Food", 10, db_session)

    assert result.original_total_expenses == 200
    assert result.projected_total_expenses == 185
    assert result.estimated_savings == 15