import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base
from app.modules.auth.service import register_user, login_user
from app.models.user import User

DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(bind=engine)


@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)


def test_register_user(db):
    result = register_user("test@test.com", "123456", db)

    user = db.query(User).filter(User.email == "test@test.com").first()

    assert user is not None
    assert result["message"] == "Usuario creado correctamente"


def test_login_user_success(db):
    register_user("login@test.com", "123456", db)

    result = login_user("login@test.com", "123456", db)

    assert "access_token" in result


def test_login_user_invalid_password(db):
    register_user("login@test.com", "123456", db)

    with pytest.raises(Exception):
        login_user("login@test.com", "wrongpassword", db)