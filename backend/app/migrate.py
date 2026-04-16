"""SQLite lightweight migrations for dev."""

from sqlalchemy import inspect, text

from app.db import engine


def _add_column_if_missing(table: str, column: str, ddl: str) -> None:
    try:
        insp = inspect(engine)
        cols = [c["name"] for c in insp.get_columns(table)]
    except Exception:
        return
    if column in cols:
        return
    try:
        with engine.begin() as conn:
            conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {column} {ddl}"))
    except Exception:
        pass


def ensure_listings_columns() -> None:
    _add_column_if_missing("listings", "state", "VARCHAR(64)")
    _add_column_if_missing("listings", "title", "VARCHAR(255)")
    _add_column_if_missing("listings", "pre_bidding_ends_in", "VARCHAR(64)")
    _add_column_if_missing("listings", "actual_cash_value", "FLOAT")
    _add_column_if_missing("listings", "keys_available", "BOOLEAN")
