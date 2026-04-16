from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import User
from app.schemas import AuthResponse, AuthUserOut, LoginIn, RegisterIn

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    if not email or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return AuthResponse(success=False, message="Email already registered", user=None)

    user = User(email=email, password=payload.password, remember_me=payload.remember_me)
    db.add(user)
    db.commit()
    db.refresh(user)
    return AuthResponse(
        success=True,
        message="Registration successful",
        user=AuthUserOut(id=user.id, email=user.email),
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    email = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user or user.password != payload.password:
        return AuthResponse(success=False, message="Invalid email or password", user=None)

    if payload.remember_me is not None:
        user.remember_me = payload.remember_me
        db.commit()

    return AuthResponse(
        success=True,
        message="Login successful",
        user=AuthUserOut(id=user.id, email=user.email),
    )
