#!/usr/bin/env python3
"""Generate rich RetailCo US-states sales CSV for SAC geo enrichment practice."""
import csv
import hashlib
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT = DATA / "retailco_sales_analytic_us.csv"

US_REGIONS = {
    "Northeast": {
        "weight": 1.08,
        "states": {
            "New York": [("New York City", 40.7128, -74.0060), ("Buffalo", 42.8864, -78.8784), ("Albany", 42.6526, -73.7562)],
            "Massachusetts": [("Boston", 42.3601, -71.0589), ("Worcester", 42.2626, -71.8023)],
            "Pennsylvania": [("Philadelphia", 39.9526, -75.1652), ("Pittsburgh", 40.4406, -79.9959)],
        },
    },
    "Southeast": {
        "weight": 1.10,
        "states": {
            "Florida": [("Miami", 25.7617, -80.1918), ("Orlando", 28.5383, -81.3792), ("Tampa", 27.9506, -82.4572)],
            "Georgia": [("Atlanta", 33.7490, -84.3880), ("Savannah", 32.0809, -81.0912)],
            "North Carolina": [("Charlotte", 35.2271, -80.8431), ("Raleigh", 35.7796, -78.6382)],
        },
    },
    "Midwest": {
        "weight": 1.04,
        "states": {
            "Illinois": [("Chicago", 41.8781, -87.6298), ("Springfield", 39.7817, -89.6501)],
            "Ohio": [("Columbus", 39.9612, -82.9988), ("Cleveland", 41.4993, -81.6944)],
            "Michigan": [("Detroit", 42.3314, -83.0458), ("Grand Rapids", 42.9634, -85.6681)],
        },
    },
    "Southwest": {
        "weight": 1.12,
        "states": {
            "Texas": [("Houston", 29.7604, -95.3698), ("Dallas", 32.7767, -96.7970), ("Austin", 30.2672, -97.7431)],
            "Arizona": [("Phoenix", 33.4484, -112.0740), ("Tucson", 32.2226, -110.9747)],
            "Colorado": [("Denver", 39.7392, -104.9903), ("Colorado Springs", 38.8339, -104.8214)],
        },
    },
    "West": {
        "weight": 1.16,
        "states": {
            "California": [("Los Angeles", 34.0522, -118.2437), ("San Francisco", 37.7749, -122.4194), ("San Diego", 32.7157, -117.1611)],
            "Washington": [("Seattle", 47.6062, -122.3321), ("Spokane", 47.6588, -117.4260)],
            "Oregon": [("Portland", 45.5152, -122.6784), ("Eugene", 44.0521, -123.0868)],
        },
    },
}

CHANNELS = {
    "Modern Trade": {"weight": 1.12, "segment": "Premium", "discount_pct": 0.02},
    "General Trade": {"weight": 1.0, "segment": "Mass", "discount_pct": 0.015},
    "E-Commerce": {"weight": 1.10, "segment": "Premium", "discount_pct": 0.04},
    "Club Store": {"weight": 1.06, "segment": "Value", "discount_pct": 0.025},
}

CATEGORIES = {
    "Beverages": {
        "base": 210000,
        "cogs_pct": 0.39,
        "brands": [
            ("AquaFresh", "BEV-AF-1L", "1L"),
            ("SipWell", "BEV-SW-500ML", "500ML"),
            ("ChillUp", "BEV-CU-2L", "2L"),
            ("FizzRoot", "BEV-FR-750ML", "750ML"),
            ("PureMist", "BEV-PM-1L", "1L"),
        ],
    },
    "Snacks": {
        "base": 140000,
        "cogs_pct": 0.35,
        "brands": [
            ("CrunchyBite", "SNK-CB-200G", "200G"),
            ("MasalaMix", "SNK-MM-150G", "150G"),
            ("NutPop", "SNK-NP-100G", "100G"),
            ("SpiceRack", "SNK-SR-250G", "250G"),
            ("ChipsAhoy", "SNK-CA-180G", "180G"),
        ],
    },
    "Personal Care": {
        "base": 105000,
        "cogs_pct": 0.43,
        "brands": [
            ("GlowCare", "PC-GC-SOAP", "SOAP"),
            ("PureShield", "PC-PS-SAN", "SAN"),
            ("FreshWave", "PC-FW-SHAMPOO", "SHAMPOO"),
            ("SilkTouch", "PC-ST-LOTION", "LOTION"),
            ("CleanPro", "PC-CP-WASH", "WASH"),
        ],
    },
}

BRAND_WEIGHTS = [1.15, 1.04, 1.0, 0.90, 0.80]

MONTHLY = [
    ("2025-01", 0.92), ("2025-02", 0.94), ("2025-03", 1.00), ("2025-04", 1.03),
    ("2025-05", 1.06), ("2025-06", 0.89), ("2025-07", 0.87), ("2025-08", 0.94),
    ("2025-09", 1.01), ("2025-10", 1.09), ("2025-11", 1.24), ("2025-12", 1.20),
]


def stable_id(*parts):
    return hashlib.md5("|".join(str(p) for p in parts).encode()).hexdigest()[:6].upper()


def generate():
    rows = []
    dist_n = 0
    for ym, season in MONTHLY:
        y, m = map(int, ym.split("-"))
        d = date(y, m, 1).isoformat()
        ecom_boost = 1.0 + min(0.16, m * 0.012)

        for region, rmeta in US_REGIONS.items():
            for state, cities in rmeta["states"].items():
                for ci, (city, lat, lon) in enumerate(cities):
                    city_w = 1.14 if ci == 0 else 0.86
                    dist_n += 1
                    dist_id = f"US-D-{dist_n:04d}"

                    for channel, cmeta in CHANNELS.items():
                        cw = cmeta["weight"] * (ecom_boost if channel == "E-Commerce" else 1.0)
                        for cat, catmeta in CATEGORIES.items():
                            for bi, (brand, sku, pack) in enumerate(catmeta["brands"]):
                                revenue = round(
                                    catmeta["base"] * rmeta["weight"] * city_w * cw
                                    * BRAND_WEIGHTS[bi] * season * (0.98 + bi * 0.012)
                                )
                                units = max(1, round(revenue / (52 + bi * 6)))
                                cogs = round(revenue * catmeta["cogs_pct"])
                                discount = round(revenue * cmeta["discount_pct"])
                                rows.append({
                                    "Date": d,
                                    "Country": "United States",
                                    "US_Region": region,
                                    "State": state,
                                    "State_Code": {"New York": "NY", "California": "CA", "Texas": "TX"}.get(state, state[:2].upper()),
                                    "City": city,
                                    "Latitude": lat,
                                    "Longitude": lon,
                                    "Channel": channel,
                                    "Customer_Segment": cmeta["segment"],
                                    "Product_Category": cat,
                                    "Brand": brand,
                                    "Product_SKU": sku,
                                    "Pack_Size": pack,
                                    "Distributor_ID": dist_id,
                                    "Sales_Rep_ID": f"US-REP-{stable_id(city, channel)}",
                                    "Promotion_Applied": "Yes" if m in (11, 12) and bi < 2 else "No",
                                    "Revenue": revenue,
                                    "Net_Revenue": revenue - discount,
                                    "Units_Sold": units,
                                    "Order_Count": max(1, units // 20),
                                    "Target": round(revenue * 0.96),
                                    "COGS": cogs,
                                    "Gross_Margin": revenue - cogs,
                                    "Discount_Amount": discount,
                                    "Returns_Units": max(0, round(units * 0.01)),
                                    "Marketing_Spend": round(revenue * 0.048),
                                    "Freight_Cost": round(revenue * 0.016),
                                    "Unit_Price": round(revenue / units, 2),
                                })

    fields = list(rows[0].keys())
    DATA.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    total = sum(r["Revenue"] for r in rows)
    ca = sum(r["Revenue"] for r in rows if r["State"] == "California")
    print(f"Wrote {OUT.name}: {len(rows)} rows · ${total:,.0f} USD · CA ${ca:,.0f}")


if __name__ == "__main__":
    generate()
