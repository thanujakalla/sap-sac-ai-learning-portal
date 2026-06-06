#!/usr/bin/env python3
"""
RetailCo Data Generator — Unified Entry Point

Generates all CSV files used by the SAP Analytics Cloud learning portal.

Default (portal-compatible, 31-column schema):
    python scripts/generate.py

Experimental modular pipeline (different schema — not used by the portal UI):
    python scripts/generate.py --experimental
"""

import argparse
import subprocess
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from scripts.lib import ConfigLoader, RetailCoDataGenerator, DataValidator, CSVWriter


def run_portal_generators(verbose: bool = False) -> int:
    """Run legacy generators that match portal lesson schemas."""
    root = Path(__file__).parent.parent
    scripts = [
        root / "scripts" / "generate_retailco_data.py",
        root / "scripts" / "generate_retailco_us_data.py",
    ]
    for script in scripts:
        print(f"\n▶ Running {script.name}...")
        result = subprocess.run(
            [sys.executable, str(script)],
            cwd=str(root),
            check=False,
        )
        if result.returncode != 0:
            print(f"✗ {script.name} failed with exit code {result.returncode}")
            return result.returncode
        if verbose:
            print(f"   ✓ {script.name} complete")
    print("\n✓ All portal CSV files generated in data/")
    return 0


def run_experimental_generator(args) -> int:
    """Experimental lib/ pipeline — not portal-compatible."""
    print('=' * 60)
    print('RetailCo Data Generator (experimental)')
    print('=' * 60)

    try:
        start_date = date.fromisoformat(args.start_date)
        end_date = date.fromisoformat(args.end_date)

        if start_date > end_date:
            print("ERROR: Start date cannot be after end date")
            return 1

        print(f"\n📅 Date range: {start_date} to {end_date}")

        print("\n⚙️  Loading configuration...")
        config = ConfigLoader()
        print(f"   ✓ Regions: {len(config.load_regions())}")
        print(f"   ✓ Channels: {len(config.load_channels())}")
        print(f"   ✓ Categories: {len(config.load_categories())}")

        if args.seed:
            print(f"\n🌱 Using seed: {args.seed}")

        print("\n🏭 Generating sales data...")
        gen = RetailCoDataGenerator(config, seed=args.seed)
        sales = gen.generate_sales(start_date, end_date)
        print(f"   ✓ Generated {len(sales):,} sales transactions")

        print("\n📊 Aggregating planning data...")
        planning = gen.generate_planning(sales)
        print(f"   ✓ Aggregated to {len(planning):,} planning records")

        print("\n✅ Validating sales data...")
        sales_valid, sales_errors = DataValidator.validate_sales(sales)
        if not sales_valid:
            print("   ✗ Sales validation failed:")
            for error in sales_errors[:10]:
                print(f"     - {error}")
            return 1
        print("   ✓ Sales validation passed")

        print("\n✅ Validating planning data...")
        planning_valid, planning_errors = DataValidator.validate_planning(planning)
        if not planning_valid:
            print("   ✗ Planning validation failed:")
            for error in planning_errors[:10]:
                print(f"     - {error}")
            return 1
        print("   ✓ Planning validation passed")

        print("\n✅ Validating consistency...")
        consistency_valid, consistency_errors = DataValidator.validate_consistency(sales, planning)
        if not consistency_valid:
            print("   ✗ Consistency validation failed:")
            for error in consistency_errors[:10]:
                print(f"     - {error}")
            return 1
        print("   ✓ Consistency validation passed")

        if args.validate_only:
            print("\n✓ Validation complete (no output files written)")
            print('=' * 60)
            return 0

        print("\n💾 Writing output files...")
        output_dir = Path(args.output_dir) if args.output_dir else None
        writer = CSVWriter(output_dir=output_dir)
        sales_path, planning_path = writer.write_all(sales, planning)
        print(f"   ✓ Sales: {sales_path}")
        print(f"   ✓ Planning: {planning_path}")

        total_revenue = sum(r['Net_Revenue'] for r in sales)
        total_units = sum(r['Units_Sold'] for r in sales)
        total_margin = sum(r['Gross_Margin'] for r in sales)
        print("\n📈 Summary:")
        print(f"   Total Revenue: ₹{total_revenue:,}")
        print(f"   Total Units: {total_units:,}")
        print(f"   Total Margin: ₹{total_margin:,}")
        print(f"   Avg Margin %: {(total_margin / total_revenue * 100):.1f}%")

        print("\n✓ Generation complete!")
        print('=' * 60)
        return 0

    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        print('=' * 60)
        return 1


def main():
    parser = argparse.ArgumentParser(
        description='Generate RetailCo practice data for SAP Analytics Cloud'
    )
    parser.add_argument(
        '--experimental',
        action='store_true',
        help='Use experimental lib/ pipeline (different schema — not portal-compatible)'
    )
    parser.add_argument('--seed', type=int, default=None, help='Random seed for reproducibility')
    parser.add_argument('--start-date', type=str, default='2025-04-01', help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', type=str, default='2026-03-31', help='End date (YYYY-MM-DD)')
    parser.add_argument('--output-dir', type=str, default=None, help='Output directory (defaults to data/)')
    parser.add_argument('--validate-only', action='store_true', help='Only validate, do not generate')
    parser.add_argument('--verbose', action='store_true', help='Verbose output')

    args = parser.parse_args()

    if not args.experimental:
        return run_portal_generators(verbose=args.verbose)

    return run_experimental_generator(args)


if __name__ == '__main__':
    sys.exit(main())
