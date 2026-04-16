import json
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models import FilterOptionRow, Listing, SiteBanner

NAV_MAKES = ["Star", "Tracker", "Learjet", "Glastron", "Yamaha", "Sea-Doo", "Bennington"]
NAV_STATES = ["North Carolina", "New York", "Oregon", "Nevada", "Ohio", "Venezuela", "Texas", "Tennessee", "Missouri"]
NAV_LOCATIONS = ["New Orleans", "Melbourne", "Arcadia", "Reno"]

FILTER_VEHICLE_TYPE = ["Boat", "Boat with trailer", "Jet skis", "Pontoon Booats"]
FILTER_MAKES = ["AVD", "Alumacraft", "Aquasport", "Baja", "Barletta", "Barletta Boats"]
FILTER_MODELS = ["19", "22", "1650 Boat", "17.5 feet", "175 Prowler", "180 CC", "Capri", "EXR"]
FILTER_LOCATIONS = ["Alberta", "Alaska", "Colorado", "Florida", "Ohio", "Texas"]
FILTER_TRANSMISSION = ["Automatic", "Manual"]
FILTER_FUEL = ["Other"]
FILTER_DAMAGE = ["All over", "Burn", "Damage History", "Burn Engine", "Hail", "FRear End", "Side", "Vandalism"]
FILTER_EXTERIOR = ["Black", "Blue", "Silver", "Teal", "Tan", "Orange", "Yellow", "White"]
FILTER_SALE_STATUS = ["On Minimum Bid", "On Approval", "Pure sale"]
FILTER_TITLE_TYPE = ["Clean Title", "Non-Repairable", "Salvage Title"]
FEATURED_FILTERS = [
    "Buy now",
    "Cars with No Damage",
    "Vehicle for Parts",
    "Clean Title",
    "Run and Drivers",
    "Flood Damaged",
    "Vandalism",
    "Selling Today",
    "No Bids Yet",
    "Lots with Bids",
    "New Arrivals",
    "Pure Sale",
]

IMG_POOL = [
    "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=200",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=200",
    "https://images.unsplash.com/photo-1540946499383-f45a6d9a1b5c?w=200",
    "https://images.unsplash.com/photo-1540202404-a6711a8b0870?w=200",
    "https://images.unsplash.com/photo-1583212292454-1fe6229606b2?w=200",
]


def _json_img(i: int) -> str:
    return json.dumps([IMG_POOL[i % len(IMG_POOL)]])


def _sale_dates_last_7_days(base: datetime) -> list[str]:
    return [(base - timedelta(days=i)).date().isoformat() for i in range(7)]


def _build_boat_rows(now: datetime, count: int = 240) -> list[dict]:
    rows: list[dict] = []
    dates = _sale_dates_last_7_days(now)

    for i in range(count):
        lot = 200000 + i
        make = FILTER_MAKES[i % len(FILTER_MAKES)]
        model = FILTER_MODELS[i % len(FILTER_MODELS)]
        vehicle_type = FILTER_VEHICLE_TYPE[i % len(FILTER_VEHICLE_TYPE)]
        location = FILTER_LOCATIONS[i % len(FILTER_LOCATIONS)]
        state = NAV_STATES[i % len(NAV_STATES)]
        transmission = FILTER_TRANSMISSION[i % len(FILTER_TRANSMISSION)]
        fuel = FILTER_FUEL[0]
        damage = FILTER_DAMAGE[i % len(FILTER_DAMAGE)]
        exterior = FILTER_EXTERIOR[i % len(FILTER_EXTERIOR)]
        sale_status = FILTER_SALE_STATUS[i % len(FILTER_SALE_STATUS)]
        title_type = FILTER_TITLE_TYPE[i % len(FILTER_TITLE_TYPE)]
        sale_date = dates[i % len(dates)]

        bid_count = i % 15
        if bid_count == 0:
            bid = 0.0
        elif i % 5 == 0:
            bid = 700.0
        elif i % 5 == 1:
            bid = 3200.0
        elif i % 5 == 2:
            bid = 7600.0
        else:
            bid = 12500.0

        buy_now = i % 3 == 0
        upcoming = i % 9 == 0
        keys_avail = i % 4 != 0

        condition = "Runs and drives" if i % 6 != 0 else "Vehicle for parts"
        if damage == "Vandalism":
            condition = "Vandalism detected"
        if damage == "Burn":
            condition = "Burn damage"

        # Ensure featured filters map to >=10 rows
        if i % 12 == 0:
            damage = "All over"  # Cars with No Damage semantic fallback
        if i % 12 == 1:
            condition = "Vehicle for parts"
        if i % 12 == 2:
            title_type = "Clean Title"
        if i % 12 == 3:
            condition = "Runs and drives"
        if i % 12 == 4:
            damage = "Flood Damaged"
        if i % 12 == 5:
            damage = "Vandalism"
        if i % 12 == 6:
            sale_date = now.date().isoformat()
        if i % 12 == 7:
            bid_count = 0
            bid = 0.0
        if i % 12 == 8:
            bid_count = 9
            bid = 6200.0
        if i % 12 == 9:
            sale_status = "Pure sale"
        if i % 12 == 10:
            buy_now = True
        if i % 12 == 11:
            condition = "New Arrivals"

        rows.append(
            {
                "lot_number": str(lot),
                "vin": f"BOAT{lot}",
                "vehicle_category": "boat",
                "make": make,
                "model": model,
                "year": 2014 + (i % 13),
                "vehicle_type": vehicle_type,
                "body_style": "Pontoon" if "Pontoon" in vehicle_type else "Bowrider",
                "drive_train": "Outboard",
                "engine": "V8 5.3L",
                "transmission": transmission,
                "fuel": fuel,
                "damage": damage,
                "exterior_color": exterior,
                "sales_status": sale_status,
                "title_type": title_type,
                "title": f"{2014 + (i % 13)} {make} {model}",
                "condition": condition,
                "odometer": 100 + (i * 111),
                "current_bid": bid,
                "bid_count": bid_count,
                "pre_bidding_ends_in": f"{1 + (i % 36)}h",
                "actual_cash_value": max(2000.0, bid * 1.7 + 3500.0),
                "location": location,
                "state": state,
                "location_zip": f"{10000 + (i % 89999)}",
                "sale_date": sale_date,
                "buy_it_now": buy_now,
                "upcoming": upcoming,
                "keys_available": keys_avail,
                "images_json": _json_img(i),
                "created_at": now - timedelta(hours=i % 120),
            }
        )

    # Add explicit nav make/location rows so top nav redirects always return many
    for j in range(84):
        lot = 500000 + j
        nm = NAV_MAKES[j % len(NAV_MAKES)]
        city = NAV_LOCATIONS[j % len(NAV_LOCATIONS)]
        rows.append(
            {
                "lot_number": str(lot),
                "vin": f"NAV{lot}",
                "vehicle_category": "boat",
                "make": nm,
                "model": FILTER_MODELS[j % len(FILTER_MODELS)],
                "year": 2016 + (j % 10),
                "vehicle_type": FILTER_VEHICLE_TYPE[j % len(FILTER_VEHICLE_TYPE)],
                "body_style": "Bowrider",
                "drive_train": "Outboard",
                "engine": "V6",
                "transmission": FILTER_TRANSMISSION[j % 2],
                "fuel": "Other",
                "damage": FILTER_DAMAGE[j % len(FILTER_DAMAGE)],
                "exterior_color": FILTER_EXTERIOR[j % len(FILTER_EXTERIOR)],
                "sales_status": FILTER_SALE_STATUS[j % len(FILTER_SALE_STATUS)],
                "title_type": FILTER_TITLE_TYPE[j % len(FILTER_TITLE_TYPE)],
                "title": f"{2016 + (j % 10)} {nm} {city}",
                "condition": "Runs and drives",
                "odometer": 500 + j * 90,
                "current_bid": 1500 + (j % 9) * 1200,
                "bid_count": 2 + (j % 11),
                "pre_bidding_ends_in": f"{2 + (j % 18)}h",
                "actual_cash_value": 9000 + (j % 9) * 1000,
                "location": city,
                "state": NAV_STATES[j % len(NAV_STATES)],
                "location_zip": f"{20000 + j}",
                "sale_date": (now - timedelta(days=j % 7)).date().isoformat(),
                "buy_it_now": j % 3 == 0,
                "upcoming": False,
                "keys_available": j % 2 == 0,
                "images_json": _json_img(j + 1000),
                "created_at": now - timedelta(hours=j % 24),
            }
        )

    return rows


def _build_other_category_rows(now: datetime) -> list[dict]:
    out = []
    for k, cat in enumerate(["car", "truck", "scooter"]):
        for i in range(40):
            lot = 700000 + k * 1000 + i
            out.append(
                {
                    "lot_number": str(lot),
                    "vin": f"{cat[:3].upper()}{lot}",
                    "vehicle_category": cat,
                    "make": NAV_MAKES[i % len(NAV_MAKES)],
                    "model": FILTER_MODELS[i % len(FILTER_MODELS)],
                    "year": 2015 + (i % 11),
                    "vehicle_type": "Sedan" if cat == "car" else ("Truck" if cat == "truck" else "Scooter"),
                    "body_style": "Sedan" if cat == "car" else ("Crew Cab" if cat == "truck" else "Scooter"),
                    "drive_train": "FWD",
                    "engine": "I4",
                    "transmission": FILTER_TRANSMISSION[i % 2],
                    "fuel": "Other",
                    "damage": FILTER_DAMAGE[i % len(FILTER_DAMAGE)],
                    "exterior_color": FILTER_EXTERIOR[i % len(FILTER_EXTERIOR)],
                    "sales_status": FILTER_SALE_STATUS[i % len(FILTER_SALE_STATUS)],
                    "title_type": FILTER_TITLE_TYPE[i % len(FILTER_TITLE_TYPE)],
                    "title": f"{cat.title()} sample {i+1}",
                    "condition": "Runs and drives",
                    "odometer": 1200 + i * 330,
                    "current_bid": 900 + i * 230,
                    "bid_count": i % 10,
                    "pre_bidding_ends_in": f"{3 + (i % 20)}h",
                    "actual_cash_value": 5000 + i * 410,
                    "location": FILTER_LOCATIONS[i % len(FILTER_LOCATIONS)],
                    "state": NAV_STATES[i % len(NAV_STATES)],
                    "location_zip": f"{30000 + i}",
                    "sale_date": (now - timedelta(days=i % 7)).date().isoformat(),
                    "buy_it_now": i % 2 == 0,
                    "upcoming": i % 12 == 0,
                    "keys_available": i % 2 == 1,
                    "images_json": _json_img(i + 3000 + k * 100),
                    "created_at": now - timedelta(hours=i % 72),
                }
            )
    return out


def seed_if_empty(db: Session) -> None:
    if db.query(SiteBanner).first() is None:
        db.add(SiteBanner(auctions_today=45, vehicles_on_sale=222, vehicle_label="boats"))
        db.commit()

    if db.query(Listing).count() == 0:
        now = datetime.utcnow()
        rows = _build_boat_rows(now) + _build_other_category_rows(now)
        for row in rows:
            db.add(Listing(**row))
        db.commit()

    if db.query(FilterOptionRow).count() == 0:
        categories = ["boat", "car", "truck", "scooter"]
        common_filters = {
            "vehicle_type": FILTER_VEHICLE_TYPE,
            "make": FILTER_MAKES + NAV_MAKES,
            "state": NAV_STATES,
            "model": FILTER_MODELS,
            "year": [str(y) for y in range(2010, 2027)],
            "location": FILTER_LOCATIONS + NAV_LOCATIONS,
            "body_style": ["Bowrider", "Pontoon", "Sedan", "Crew Cab", "Scooter"],
            "drive_train": ["Outboard", "FWD", "4WD"],
            "engine": ["V8 5.3L", "V6", "I4", "125cc"],
            "transmission": FILTER_TRANSMISSION,
            "fuel": FILTER_FUEL,
            "damage": FILTER_DAMAGE + ["Flood Damaged"],
            "sale_date": [str((datetime.utcnow() - timedelta(days=i)).date()) for i in range(7)],
            "exterior_color": FILTER_EXTERIOR,
            "sales_status": FILTER_SALE_STATUS,
            "title_type": FILTER_TITLE_TYPE,
            "primary_dmg": FILTER_DAMAGE,
            "featured_filters": FEATURED_FILTERS,
            "bid_bucket": [
                "All",
                "No Bids yet",
                "Less than $1000",
                "Between $1000 and $5000",
                "Between $5000 and $10000",
                "more than $10000",
            ],
        }
        for cat in categories:
            for key, vals in common_filters.items():
                db.add(
                    FilterOptionRow(
                        option_key=key,
                        vehicle_category=cat,
                        values_json=json.dumps(vals),
                    )
                )
            db.add(
                FilterOptionRow(
                    option_key="find_locations",
                    vehicle_category=cat,
                    values_json=json.dumps(NAV_LOCATIONS),
                )
            )
            db.add(
                FilterOptionRow(
                    option_key="quick_picks",
                    vehicle_category=cat,
                    values_json=json.dumps(["Under $5k", "Runs & Drives", "Clean Title", "No Minimum Bid"]),
                )
            )
            db.add(
                FilterOptionRow(
                    option_key="damage_types",
                    vehicle_category=cat,
                    values_json=json.dumps(FILTER_DAMAGE),
                )
            )
        db.commit()
