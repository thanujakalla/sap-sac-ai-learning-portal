#!/usr/bin/env python3
"""Generate rich RetailCo practice CSVs for SAC learning portal (India + derived files)."""
import csv
import json
import hashlib
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

# Region → states → (city, lat, lon) — lat/lon for optional Geo Enrichment By Coordinates
REGIONS = {
    "North": {
        "weight": 1.0,
        "states": {
            "Delhi": [("New Delhi", 28.6139, 77.2090), ("Noida", 28.5355, 77.3910), ("Gurugram", 28.4595, 77.0266)],
            "Punjab": [("Ludhiana", 30.9010, 75.8573), ("Amritsar", 31.6340, 74.8723)],
            "Haryana": [("Faridabad", 28.4089, 77.3178), ("Panipat", 29.3909, 76.9635)],
        },
    },
    "South": {
        "weight": 1.14,
        "states": {
            "Tamil Nadu": [("Chennai", 13.0827, 80.2707), ("Coimbatore", 11.0168, 76.9558), ("Madurai", 9.9252, 78.1198)],
            "Karnataka": [("Bengaluru", 12.9716, 77.5946), ("Mysuru", 12.2958, 76.6394)],
            "Kerala": [("Kochi", 9.9312, 76.2673), ("Thiruvananthapuram", 8.5241, 76.9366)],
        },
    },
    "East": {
        "weight": 0.93,
        "states": {
            "West Bengal": [("Kolkata", 22.5726, 88.3639), ("Siliguri", 26.7271, 88.3953)],
            "Odisha": [("Bhubaneswar", 20.2961, 85.8245), ("Cuttack", 20.4625, 85.8828)],
            "Bihar": [("Patna", 25.5941, 85.1376), ("Gaya", 24.7955, 85.0002)],
        },
    },
    "West": {
        "weight": 1.06,
        "states": {
            "Maharashtra": [("Mumbai", 19.0760, 72.8777), ("Pune", 18.5204, 73.8567), ("Nagpur", 21.1458, 79.0882)],
            "Gujarat": [("Ahmedabad", 23.0225, 72.5714), ("Surat", 21.1702, 72.8311)],
            "Goa": [("Panaji", 15.4909, 73.8278), ("Margao", 15.2832, 73.9582)],
        },
    },
    "Central": {
        "weight": 0.89,
        "states": {
            "Madhya Pradesh": [("Bhopal", 23.2599, 77.4126), ("Indore", 22.7196, 75.8577)],
            "Chhattisgarh": [("Raipur", 21.2514, 81.6296), ("Bilaspur", 22.0797, 82.1391)],
            "Rajasthan": [("Jaipur", 26.9124, 75.7873), ("Jodhpur", 26.2389, 73.0243)],
        },
    },
}

CHANNELS = {
    "Modern Trade": {"weight": 1.14, "segment": "Premium", "discount_pct": 0.012},
    "General Trade": {"weight": 1.0, "segment": "Mass", "discount_pct": 0.018},
    "E-Commerce": {"weight": 1.06, "segment": "Premium", "discount_pct": 0.035},
    "Quick Commerce": {"weight": 0.92, "segment": "Value", "discount_pct": 0.028},
}

CATEGORIES = {
    "Beverages": {
        "base": 185000,
        "cogs_pct": 0.41,
        "brands": [
            ("AquaFresh", "BEV-AF-1L", "1L"),
            ("SipWell", "BEV-SW-500ML", "500ML"),
            ("ChillUp", "BEV-CU-2L", "2L"),
            ("FizzRoot", "BEV-FR-750ML", "750ML"),
            ("PureMist", "BEV-PM-1L", "1L"),
        ],
    },
    "Snacks": {
        "base": 125000,
        "cogs_pct": 0.37,
        "brands": [
            ("CrunchyBite", "SNK-CB-200G", "200G"),
            ("MasalaMix", "SNK-MM-150G", "150G"),
            ("NutPop", "SNK-NP-100G", "100G"),
            ("SpiceRack", "SNK-SR-250G", "250G"),
            ("ChipsAhoy", "SNK-CA-180G", "180G"),
        ],
    },
    "Personal Care": {
        "base": 95000,
        "cogs_pct": 0.44,
        "brands": [
            ("GlowCare", "PC-GC-SOAP", "SOAP"),
            ("PureShield", "PC-PS-SAN", "SAN"),
            ("FreshWave", "PC-FW-SHAMPOO", "SHAMPOO"),
            ("SilkTouch", "PC-ST-LOTION", "LOTION"),
            ("CleanPro", "PC-CP-WASH", "WASH"),
        ],
    },
}

BRAND_WEIGHTS = [1.18, 1.05, 1.0, 0.92, 0.78]

MONTHLY = [
    ("2025-04", 1.00, "Q1"),
    ("2025-05", 1.05, "Q1"),
    ("2025-06", 0.84, "Q1"),
    ("2025-07", 0.81, "Q2"),
    ("2025-08", 0.87, "Q2"),
    ("2025-09", 0.95, "Q2"),
    ("2025-10", 1.10, "Q3"),
    ("2025-11", 1.30, "Q3"),
    ("2025-12", 1.12, "Q3"),
    ("2026-01", 0.97, "Q4"),
    ("2026-02", 1.03, "Q4"),
    ("2026-03", 1.08, "Q4"),
]

HR_DEPARTMENTS = ["Sales", "Warehouse", "Admin", "Field_Marketing", "Customer_Support"]
HR_BASE = {
    "North": {"Sales": 48, "Warehouse": 58, "Admin": 22, "Field_Marketing": 18, "Customer_Support": 14},
    "South": {"Sales": 62, "Warehouse": 72, "Admin": 28, "Field_Marketing": 24, "Customer_Support": 20},
    "East": {"Sales": 38, "Warehouse": 48, "Admin": 16, "Field_Marketing": 14, "Customer_Support": 12},
    "West": {"Sales": 45, "Warehouse": 54, "Admin": 20, "Field_Marketing": 17, "Customer_Support": 15},
    "Central": {"Sales": 32, "Warehouse": 42, "Admin": 14, "Field_Marketing": 11, "Customer_Support": 10},
}

PLANNING_ACCOUNTS = [
    ("Gross_Sales", "INC", 1.0),
    ("COGS", "EXP", 0.42),
    ("Marketing", "EXP", 0.06),
    ("Distribution", "EXP", 0.045),
    ("Salary", "EXP", 0.085),
    ("Freight", "EXP", 0.025),
    ("Other_Opex", "EXP", 0.035),
]

WAREHOUSES = {
    "North": "WH-NO-01",
    "South": "WH-SO-01",
    "East": "WH-EA-01",
    "West": "WH-WE-01",
    "Central": "WH-CE-01",
}


def fmt_inr(n):
    cr = n / 10_000_000
    if cr >= 1:
        return f"₹{cr:.2f} Cr"
    return f"₹{n / 100_000:.1f} L"


def stable_id(*parts):
    h = hashlib.md5("|".join(str(p) for p in parts).encode()).hexdigest()[:6].upper()
    return h


def generate_sales():
    rows = []
    totals = {"revenue": 0, "south": 0, "rows": 0}
    spot = None
    dist_counter = 0

    for ym, season, fq in MONTHLY:
        y, m = map(int, ym.split("-"))
        d = date(y, m, 1).isoformat()
        ecom_boost = 1.0 + min(0.18, (m % 12) * 0.014)

        for region, rmeta in REGIONS.items():
            wh = WAREHOUSES[region]
            for state, cities in rmeta["states"].items():
                city_weight_base = 1.0
                for ci, (city, lat, lon) in enumerate(cities):
                    city_w = city_weight_base * (1.12 if ci == 0 else 0.88)
                    dist_counter += 1
                    dist_id = f"DIST-{region[:2].upper()}-{dist_counter:04d}"
                    dist_name = f"{city} FMCG Distributors Pvt Ltd"

                    for channel, cmeta in CHANNELS.items():
                        cw = cmeta["weight"] * (ecom_boost if channel in ("E-Commerce", "Quick Commerce") else 1.0)
                        segment = cmeta["segment"]
                        if channel == "General Trade" and region in ("Central", "East"):
                            segment = "Rural"
                        if channel == "Quick Commerce":
                            segment = "Value"

                        for cat, catmeta in CATEGORIES.items():
                            for bi, (brand, sku, pack) in enumerate(catmeta["brands"]):
                                bw = BRAND_WEIGHTS[bi]
                                promo = "Yes" if (m in (10, 11) and bi < 2) or (m == 6 and channel == "E-Commerce") else "No"
                                promo_mult = 1.08 if promo == "Yes" else 1.0

                                revenue = round(
                                    catmeta["base"]
                                    * rmeta["weight"]
                                    * city_w
                                    * cw
                                    * bw
                                    * season
                                    * promo_mult
                                    * (0.98 + bi * 0.015)
                                )
                                units = max(1, round(revenue / (38 + bi * 7 + len(cat))))
                                target = round(revenue * (0.94 if promo == "Yes" else 0.96))
                                cogs = round(revenue * catmeta["cogs_pct"])
                                discount = round(revenue * cmeta["discount_pct"])
                                returns = max(0, round(units * 0.011))
                                marketing = round(revenue * 0.052)
                                freight = round(revenue * 0.018)
                                unit_price = round(revenue / units, 2)
                                net_revenue = revenue - discount
                                gross_margin = revenue - cogs
                                orders = max(1, round(units / (18 + bi * 2)))
                                stock_rate = min(99, max(72, round(88 + (bi - 2) * 2 - (0 if m not in (6, 7) else 8))))
                                rep_id = f"REP-{region[:2]}-{stable_id(city, channel)}"

                                row = {
                                    "Date": d,
                                    "Fiscal_Quarter": fq,
                                    "Region": region,
                                    "State": state,
                                    "City": city,
                                    "Latitude": round(lat, 4),
                                    "Longitude": round(lon, 4),
                                    "Channel": channel,
                                    "Customer_Segment": segment,
                                    "Product_Category": cat,
                                    "Brand": brand,
                                    "Product_SKU": sku,
                                    "Pack_Size": pack,
                                    "Distributor_ID": dist_id,
                                    "Distributor_Name": dist_name,
                                    "Sales_Rep_ID": rep_id,
                                    "Warehouse_Code": wh,
                                    "Promotion_Applied": promo,
                                    "Revenue": revenue,
                                    "Net_Revenue": net_revenue,
                                    "Units_Sold": units,
                                    "Order_Count": orders,
                                    "Target": target,
                                    "COGS": cogs,
                                    "Gross_Margin": gross_margin,
                                    "Discount_Amount": discount,
                                    "Returns_Units": returns,
                                    "Marketing_Spend": marketing,
                                    "Freight_Cost": freight,
                                    "Unit_Price": unit_price,
                                    "In_Stock_Rate": stock_rate,
                                }
                                rows.append(row)
                                totals["revenue"] += revenue
                                totals["rows"] += 1

                                if (
                                    region == "South"
                                    and state == "Tamil Nadu"
                                    and city == "Chennai"
                                    and cat == "Beverages"
                                    and ym == "2025-04"
                                    and channel == "Modern Trade"
                                    and brand == "AquaFresh"
                                ):
                                    spot = revenue

    path = DATA / "retailco_sales_analytic.csv"
    fields = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    south_total = sum(r["Revenue"] for r in rows if r["Region"] == "South")
    totals["south"] = south_total
    return totals, spot, len(set(r["Product_SKU"] for r in rows)), len(set(r["City"] for r in rows))


def generate_planning(sales_rows):
    agg = {}
    for r in sales_rows:
        ym = r["Date"][:7]
        key = (r["Region"], r["Product_Category"], r["Channel"], ym)
        agg[key] = agg.get(key, 0) + int(r["Revenue"])

    rows = []
    for (region, cat, channel, ym), gross in sorted(agg.items()):
        for acct, acct_type, pct in PLANNING_ACCOUNTS:
            amount = gross if acct == "Gross_Sales" else round(gross * pct)
            rows.append({
                "Account": acct,
                "Account_Type": acct_type,
                "Region": region,
                "Product_Category": cat,
                "Channel": channel,
                "Month": ym,
                "Version": "Actual",
                "Amount": amount,
            })

    path = DATA / "retailco_planning_seed.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def generate_hr():
    rows = []
    opening = {r: dict(HR_BASE[r]) for r in REGIONS}

    for ym, _, _ in MONTHLY:
        for region in REGIONS:
            for dept in HR_DEPARTMENTS:
                op = opening[region][dept]
                hires = 2 if region == "South" and dept == "Sales" else 1
                term = 1 if ym in ("2025-06", "2026-01") and dept != "Admin" else 0
                closing = op + hires - term
                salary = {"Sales": 45000, "Warehouse": 29000, "Admin": 56000, "Field_Marketing": 38000, "Customer_Support": 32000}[dept]
                rows.append({
                    "Month": ym,
                    "Region": region,
                    "Department": dept,
                    "Cost_Center": f"RC-{region[:2].upper()}-{dept[:3].upper()}",
                    "Opening": op,
                    "Hires": hires,
                    "Terminations": term,
                    "Closing": closing,
                    "Salary_per_Employee": salary,
                    "Benefits_per_Employee": round(salary * 0.12),
                    "Total_Salary_Cost": closing * salary,
                    "Total_Compensation": round(closing * salary * 1.12),
                })
                opening[region][dept] = closing

    path = DATA / "retailco_hr_headcount.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def generate_product_master():
    rows = []
    for cat, catmeta in CATEGORIES.items():
        for brand, sku, pack in catmeta["brands"]:
            rows.append({
                "Product_SKU": sku,
                "Brand": brand,
                "Product_Category": cat,
                "Pack_Size": pack,
                "Unit_of_Measure": "Case" if "L" in pack or "ML" in pack else "Unit",
                "Launch_Year": "2021" if brand.startswith(("Aqua", "Crunchy", "Glow")) else "2023",
                "Is_Active": "Yes",
                "MSRP_INR": 55 + len(pack) * 3,
                "Category_Manager": "Priya" if cat == "Beverages" else ("Rahul" if cat == "Snacks" else "Anita"),
            })
    path = DATA / "retailco_product_master.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def generate_distributor_master(sales_rows):
    seen = {}
    for r in sales_rows:
        did = r["Distributor_ID"]
        if did not in seen:
            seen[did] = {
                "Distributor_ID": did,
                "Distributor_Name": r["Distributor_Name"],
                "Region": r["Region"],
                "State": r["State"],
                "City": r["City"],
                "Primary_Channel": r["Channel"],
                "Credit_Terms_Days": 30 if r["Channel"] == "Modern Trade" else 45,
                "Active": "Yes",
            }
    rows = list(seen.values())
    path = DATA / "retailco_distributor_master.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def main():
    DATA.mkdir(parents=True, exist_ok=True)
    totals, spot, sku_count, city_count = generate_sales()
    sales_rows = list(csv.DictReader((DATA / "retailco_sales_analytic.csv").open(encoding="utf-8")))
    plan_rows = generate_planning(sales_rows)
    hr_rows = generate_hr()
    prod_rows = generate_product_master()
    dist_rows = generate_distributor_master(sales_rows)

    meta = {
        "sales_row_count": totals["rows"],
        "total_revenue": totals["revenue"],
        "total_revenue_fmt": fmt_inr(totals["revenue"]),
        "south_total": totals["south"],
        "south_total_fmt": fmt_inr(totals["south"]),
        "spot_chennai_april_beverages": spot,
        "spot_fmt": fmt_inr(spot) if spot else "",
        "unique_skus": sku_count,
        "unique_cities": city_count,
        "planning_rows": plan_rows,
        "hr_rows": hr_rows,
        "product_master_rows": prod_rows,
        "distributor_master_rows": dist_rows,
        "sales_columns": len(sales_rows[0]) if sales_rows else 0,
    }
    (DATA / "retailco_validation.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
