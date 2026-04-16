import json
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import Listing
from app.schemas import ListingOut, ListingsResponse

router = APIRouter(prefix="/api", tags=["listings"])


def _parse_images(images_json: Optional[str]) -> List[str]:
    if not images_json:
        return []
    try:
        data = json.loads(images_json)
        return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        return []


def _csv_to_list(value: Optional[str]) -> list[str]:
    if not value:
        return []
    return [v.strip() for v in value.split(',') if v.strip()]


@router.get("/listings", response_model=ListingsResponse)
def get_listings(
    db: Session = Depends(get_db),
    q: Optional[str] = Query(None, description="Search text"),
    category: str = Query("boat", description="boat, car, truck, scooter"),
    make: Optional[str] = None,
    model: Optional[str] = None,
    year_from: Optional[int] = None,
    year_to: Optional[int] = None,
    odometer_min: Optional[int] = None,
    odometer_max: Optional[int] = None,
    bid_min: Optional[float] = None,
    bid_max: Optional[float] = None,
    location: Optional[str] = None,
    state: Optional[str] = None,
    body_style: Optional[str] = None,
    drive_train: Optional[str] = None,
    engine: Optional[str] = None,
    transmission: Optional[str] = None,
    fuel: Optional[str] = None,
    damage: Optional[str] = None,
    sale_date: Optional[str] = None,
    exterior_color: Optional[str] = None,
    sales_status: Optional[str] = None,
    title_type: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    bid_bucket: Optional[str] = None,
    newly_added: Optional[str] = Query(None, description="all,24h,48h,7d"),
    zip_only: bool = False,
    buy_it_now: Optional[bool] = None,
    exclude_upcoming: Optional[bool] = None,
):
    query = db.query(Listing).filter(Listing.vehicle_category == category)

    if q:
        term = f"%{q.strip()}%"
        query = query.filter(
            or_(
                Listing.lot_number.ilike(term),
                Listing.vin.ilike(term),
                Listing.make.ilike(term),
                Listing.model.ilike(term),
                Listing.condition.ilike(term),
                Listing.title.ilike(term),
            )
        )

    make_vals = _csv_to_list(make)
    if make_vals:
        query = query.filter(Listing.make.in_(make_vals))

    model_vals = _csv_to_list(model)
    if model_vals:
        query = query.filter(Listing.model.in_(model_vals))

    if year_from is not None:
        query = query.filter(Listing.year >= year_from)
    if year_to is not None:
        query = query.filter(Listing.year <= year_to)

    if odometer_min is not None:
        query = query.filter(Listing.odometer >= odometer_min)
    if odometer_max is not None:
        query = query.filter(Listing.odometer <= odometer_max)

    if bid_min is not None:
        query = query.filter(Listing.current_bid >= bid_min)
    if bid_max is not None:
        query = query.filter(Listing.current_bid <= bid_max)

    location_vals = _csv_to_list(location)
    if location_vals:
        ors = [Listing.location.ilike(f"%{v}%") for v in location_vals]
        query = query.filter(or_(*ors))

    state_vals = _csv_to_list(state)
    if state_vals:
        query = query.filter(Listing.state.in_(state_vals))

    body_vals = _csv_to_list(body_style)
    if body_vals:
        query = query.filter(Listing.body_style.in_(body_vals))

    drive_vals = _csv_to_list(drive_train)
    if drive_vals:
        query = query.filter(Listing.drive_train.in_(drive_vals))

    eng_vals = _csv_to_list(engine)
    if eng_vals:
        query = query.filter(Listing.engine.in_(eng_vals))

    trans_vals = _csv_to_list(transmission)
    if trans_vals:
        query = query.filter(Listing.transmission.in_(trans_vals))

    fuel_vals = _csv_to_list(fuel)
    if fuel_vals:
        query = query.filter(Listing.fuel.in_(fuel_vals))

    dmg_vals = _csv_to_list(damage)
    if dmg_vals:
        query = query.filter(Listing.damage.in_(dmg_vals))

    if sale_date:
        query = query.filter(Listing.sale_date == sale_date)

    color_vals = _csv_to_list(exterior_color)
    if color_vals:
        query = query.filter(Listing.exterior_color.in_(color_vals))

    status_vals = _csv_to_list(sales_status)
    if status_vals:
        query = query.filter(Listing.sales_status.in_(status_vals))

    title_vals = _csv_to_list(title_type)
    if title_vals:
        query = query.filter(Listing.title_type.in_(title_vals))

    vehicle_type_vals = _csv_to_list(vehicle_type)
    if vehicle_type_vals:
        query = query.filter(Listing.vehicle_type.in_(vehicle_type_vals))

    if bid_bucket == "no_bids":
        query = query.filter((Listing.bid_count == 0) | (Listing.bid_count.is_(None)))
    elif bid_bucket == "lt_1000":
        query = query.filter(Listing.current_bid < 1000)
    elif bid_bucket == "1000_5000":
        query = query.filter(Listing.current_bid >= 1000, Listing.current_bid <= 5000)
    elif bid_bucket == "5000_10000":
        query = query.filter(Listing.current_bid > 5000, Listing.current_bid <= 10000)
    elif bid_bucket == "gt_10000":
        query = query.filter(Listing.current_bid > 10000)

    if newly_added and newly_added != "all":
        now = datetime.utcnow()
        if newly_added == "24h":
            cutoff = now - timedelta(hours=24)
        elif newly_added == "48h":
            cutoff = now - timedelta(hours=48)
        elif newly_added == "7d":
            cutoff = now - timedelta(days=7)
        else:
            cutoff = None
        if cutoff is not None:
            query = query.filter(Listing.created_at >= cutoff)

    if zip_only:
        query = query.filter(Listing.location_zip.isnot(None), Listing.location_zip != "")

    if buy_it_now is True:
        query = query.filter(Listing.buy_it_now.is_(True))
    elif buy_it_now is False:
        query = query.filter(Listing.buy_it_now.is_(False))

    if exclude_upcoming is True:
        query = query.filter(Listing.upcoming.is_(False))

    rows = query.order_by(desc(Listing.created_at), asc(Listing.id)).all()
    items: List[ListingOut] = []
    for r in rows:
        items.append(
            ListingOut(
                id=r.id,
                lot_number=r.lot_number,
                vin=r.vin,
                vehicle_category=r.vehicle_category,
                make=r.make,
                model=r.model,
                year=r.year,
                vehicle_type=r.vehicle_type,
                body_style=r.body_style,
                drive_train=r.drive_train,
                engine=r.engine,
                transmission=r.transmission,
                fuel=r.fuel,
                damage=r.damage,
                exterior_color=r.exterior_color,
                sales_status=r.sales_status,
                title_type=r.title_type,
                title=r.title,
                condition=r.condition,
                odometer=r.odometer,
                current_bid=r.current_bid,
                bid_count=r.bid_count,
                pre_bidding_ends_in=r.pre_bidding_ends_in,
                actual_cash_value=r.actual_cash_value,
                location=r.location,
                state=r.state,
                location_zip=r.location_zip,
                sale_date=r.sale_date,
                buy_it_now=r.buy_it_now,
                upcoming=r.upcoming,
                keys_available=r.keys_available,
                images=_parse_images(r.images_json),
                created_at=r.created_at,
            )
        )
    return ListingsResponse(items=items, total=len(items))
