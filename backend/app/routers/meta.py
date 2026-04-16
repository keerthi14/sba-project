import json

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import FilterOptionRow, SiteBanner
from app.schemas import BannerOut, FindBoatTabsOut, NavMenusOut, VehicleFiltersOut

router = APIRouter(prefix="/api", tags=["meta"])

NAV_MENUS = {
    "vehicle_search": {
        "label": "Vehicle Search",
        "children": [
            {
                "label": "Search by make",
                "type": "submenu",
                "options": [
                    "Star",
                    "Tracker",
                    "Learjet",
                    "Glastron",
                    "Yamaha",
                    "Sea-Doo",
                    "Bennington",
                ],
            },
            {
                "label": "Search by state",
                "type": "submenu",
                "options": [
                    "North Carolina",
                    "New York",
                    "Oregon",
                    "Nevada",
                    "Ohio",
                    "Venezuela",
                    "Texas",
                    "Tennessee",
                    "Missouri",
                ],
            },
            {
                "label": "Search by location",
                "type": "submenu",
                "options": ["New Orleans", "Melbourne", "Arcadia", "Reno"],
            },
            {"label": "Advanced search", "href": "/advanced-search"},
            {"label": "Compare vehicles", "href": "/compare-vehicles"},
        ],
    },
    "live_auctions": {
        "label": "Live Auctions",
        "children": [
            {"label": "Today's auctions", "href": "/todays-auctions"},
            {"label": "Join auctions", "href": "/join-auctions"},
            {"label": "Sales", "href": "#"},
            {"label": "Calendar sales", "href": "/auctions-calendar"},
            {"label": "Sales list", "href": "/sales-list"},
        ],
    },
    "support": {
        "label": "Support",
        "children": [
            {"label": "How to buy", "href": "/how-to-buy"},
            {"label": "FAQS", "href": "/faqs"},
            {"label": "Fees", "href": "/fees"},
            {"label": "Salvage Boats", "href": "/salvage-boats"},
            {"label": "Used Boats for Sale", "href": "/used-boats-for-sale"},
            {"label": "Buy Salvage Boats", "href": "/buy-salvage-boats"},
            {"label": "Salvage Boats Definition", "href": "/salvage-boats-definition"},
            {"label": "Salvage Title Boats", "href": "/salvage-title-boats"},
            {"label": "Buying Tips", "href": "/buying-tips"},
            {"label": "Contact us", "href": "/contact-us"},
            {"label": "About us", "href": "/about-us"},
            {"label": "Blog", "href": "/blog"},
        ],
    },
    "services": {
        "label": "Services",
        "children": [
            {"label": "Salvage Inspection", "href": "/salvage-inspection"},
            {"label": "Transportation", "href": "/transportation"},
            {"label": "Price History", "href": "/price-history"},
        ],
    },
}


@router.get("/banner", response_model=BannerOut)
def get_banner(db: Session = Depends(get_db), category: str = Query("boat")):
    row = db.query(SiteBanner).first()
    if not row:
        return BannerOut(
            message="There are 45 auctions scheduled for today and currently 22 boats on sale — Join now!",
            auctions_today=45,
            vehicles_on_sale=22,
            vehicle_label="boats",
        )
    label = row.vehicle_label
    if category == "car":
        label = "cars"
    elif category == "truck":
        label = "trucks"
    elif category == "scooter":
        label = "scooters"
    elif category == "boat":
        label = "boats"
    message = (
        f"There are {row.auctions_today} auctions scheduled for today and currently "
        f"{row.vehicles_on_sale} {label} on sale — Join now!"
    )
    return BannerOut(
        message=message,
        auctions_today=row.auctions_today,
        vehicles_on_sale=row.vehicles_on_sale,
        vehicle_label=label,
    )


@router.get("/vehicle-filters", response_model=VehicleFiltersOut)
def vehicle_filters(
    db: Session = Depends(get_db),
    category: str = Query("boat"),
):
    rows = db.query(FilterOptionRow).filter(FilterOptionRow.vehicle_category == category).all()
    filters: dict[str, list[str]] = {}
    skip_keys = {"find_locations", "quick_picks", "damage_types"}
    for r in rows:
        if r.option_key in skip_keys:
            continue
        try:
            filters[r.option_key] = json.loads(r.values_json)
        except json.JSONDecodeError:
            filters[r.option_key] = []
    return VehicleFiltersOut(filters=filters)


@router.get("/find-boat/options", response_model=FindBoatTabsOut)
def find_boat_options(
    db: Session = Depends(get_db),
    category: str = Query("boat"),
):
    rows = db.query(FilterOptionRow).filter(FilterOptionRow.vehicle_category == category).all()
    by_key: dict[str, list[str]] = {}
    for r in rows:
        try:
            by_key[r.option_key] = json.loads(r.values_json)
        except json.JSONDecodeError:
            by_key[r.option_key] = []

    boat_finder_keys = [
        "make",
        "model",
        "year",
        "location",
        "primary_dmg",
        "title_type",
    ]
    boat_finder = {k: by_key.get(k, []) for k in boat_finder_keys}
    return FindBoatTabsOut(
        locations=by_key.get("find_locations", []),
        makes=by_key.get("make", []),
        quick_picks=by_key.get("quick_picks", []),
        damage_types=by_key.get("damage_types", []),
        boat_finder=boat_finder,
    )


@router.get("/nav-menus", response_model=NavMenusOut)
def nav_menus():
    return NavMenusOut(menus=NAV_MENUS)
