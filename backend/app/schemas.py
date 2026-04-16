from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class ListingOut(BaseModel):
    id: int
    lot_number: str
    vin: Optional[str]
    vehicle_category: str
    make: Optional[str]
    model: Optional[str]
    year: Optional[int]
    vehicle_type: Optional[str]
    body_style: Optional[str]
    drive_train: Optional[str]
    engine: Optional[str]
    transmission: Optional[str]
    fuel: Optional[str]
    damage: Optional[str]
    exterior_color: Optional[str]
    sales_status: Optional[str]
    title_type: Optional[str]
    title: Optional[str]
    condition: Optional[str]
    odometer: Optional[int]
    current_bid: Optional[float]
    bid_count: Optional[int]
    pre_bidding_ends_in: Optional[str]
    actual_cash_value: Optional[float]
    location: Optional[str]
    state: Optional[str]
    location_zip: Optional[str]
    sale_date: Optional[str]
    buy_it_now: bool
    upcoming: bool
    keys_available: Optional[bool]
    images: List[str] = Field(default_factory=list)
    created_at: datetime

    class Config:
        from_attributes = True


class ListingsResponse(BaseModel):
    items: List[ListingOut]
    total: int


class BannerOut(BaseModel):
    message: str
    auctions_today: int
    vehicles_on_sale: int
    vehicle_label: str


class VehicleFiltersOut(BaseModel):
    filters: Dict[str, List[str]]


class FindBoatTabsOut(BaseModel):
    locations: List[str]
    makes: List[str]
    quick_picks: List[str]
    damage_types: List[str]
    boat_finder: Dict[str, List[str]]


class NavMenusOut(BaseModel):
    menus: Dict[str, Any]


class RegisterIn(BaseModel):
    email: str
    password: str
    remember_me: bool = False


class LoginIn(BaseModel):
    email: str
    password: str
    remember_me: bool = False


class AuthUserOut(BaseModel):
    id: int
    email: str


class AuthResponse(BaseModel):
    success: bool
    message: str
    user: Optional[AuthUserOut] = None
