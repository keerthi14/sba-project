from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class Listing(Base):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lot_number: Mapped[str] = mapped_column(String(64), index=True)
    vin: Mapped[Optional[str]] = mapped_column(String(32), nullable=True, index=True)
    vehicle_category: Mapped[str] = mapped_column(String(32), index=True)

    make: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    model: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    vehicle_type: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    body_style: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    drive_train: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    engine: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    transmission: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    fuel: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    damage: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    exterior_color: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    sales_status: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    title_type: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    condition: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    odometer: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    current_bid: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    bid_count: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    pre_bidding_ends_in: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    actual_cash_value: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    location: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    state: Mapped[Optional[str]] = mapped_column(String(64), nullable=True, index=True)
    location_zip: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    sale_date: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    buy_it_now: Mapped[bool] = mapped_column(Boolean, default=False)
    upcoming: Mapped[bool] = mapped_column(Boolean, default=False)
    keys_available: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)

    images_json: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class SiteBanner(Base):
    __tablename__ = "site_banner"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    auctions_today: Mapped[int] = mapped_column(Integer, default=45)
    vehicles_on_sale: Mapped[int] = mapped_column(Integer, default=222)
    vehicle_label: Mapped[str] = mapped_column(String(32), default="boats")


class FilterOptionRow(Base):
    __tablename__ = "filter_options"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    option_key: Mapped[str] = mapped_column(String(64), index=True)
    vehicle_category: Mapped[str] = mapped_column(String(32), index=True)
    values_json: Mapped[str] = mapped_column(Text)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(255))
    remember_me: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
