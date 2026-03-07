from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest

from app.modules.recommendation.service import RecommendationServiceImpl
from app.modules.recommendation.models import Base, Recommendation
from app.modules.recommendation.schemas import CreateRecommendationSchema
from app.core.exceptions import NotFoundError


@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    TestingSessionLocal = sessionmaker(bind=engine)

    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    yield db
    db.close()


def test_create_recommendation(db_session):

    service = RecommendationServiceImpl(db_session)

    data = CreateRecommendationSchema(
        title="Reduce eating out",
        description="Cook more meals at home",
        category="Food"
    )

    result = service.create_recommendation(data)

    assert result.title == "Reduce eating out"
    assert result.category == "Food"


def test_get_recommendation_by_id(db_session):

    service = RecommendationServiceImpl(db_session)

    data = CreateRecommendationSchema(
        title="Save electricity",
        description="Turn off unused lights",
        category="Utilities"
    )

    created = service.create_recommendation(data)

    result = service.get_recommendation_by_id(created.id)

    assert result.id == created.id
    assert result.title == "Save electricity"


def test_delete_recommendation(db_session):

    service = RecommendationServiceImpl(db_session)

    data = CreateRecommendationSchema(
        title="Use public transport",
        description="Reduce fuel spending",
        category="Transport"
    )

    created = service.create_recommendation(data)

    result = service.delete_recommendation(created.id)

    assert result is True

    with pytest.raises(NotFoundError):
        service.get_recommendation_by_id(created.id)