"""
Tests for RetailCo Data Generation Library

Run with: python3 -m unittest discover -s scripts/tests -p 'test_*.py' -v
Or:       pytest scripts/tests/  (if pytest is installed)
"""

import unittest
from datetime import date
from pathlib import Path
import tempfile
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from scripts.lib import ConfigLoader, RetailCoDataGenerator, DataValidator, CSVWriter


class TestConfigLoader(unittest.TestCase):
    """Test configuration loading."""

    def test_load_regions(self):
        """Test loading regions configuration."""
        config = ConfigLoader()
        regions = config.load_regions()
        
        assert regions is not None
        assert len(regions) > 0
        assert 'North' in regions
        assert regions['North'].get('weight') is not None

    def test_load_channels(self):
        """Test loading channels configuration."""
        config = ConfigLoader()
        channels = config.load_channels()
        
        assert channels is not None
        assert len(channels) > 0
        assert 'Modern Trade' in channels or 'General Trade' in channels

    def test_load_categories(self):
        """Test loading categories configuration."""
        config = ConfigLoader()
        categories = config.load_categories()
        
        assert categories is not None
        assert len(categories) > 0
        assert 'Beverages' in categories or 'Snacks' in categories

    def test_config_caching(self):
        """Test that configuration is cached."""
        config = ConfigLoader()
        regions1 = config.load_regions()
        regions2 = config.load_regions()
        
        # Should be same object (cached)
        assert regions1 is regions2

    def test_cache_clear(self):
        """Test clearing configuration cache."""
        config = ConfigLoader()
        config.load_regions()
        config.clear_cache()
        
        # Should have no cached items
        assert len(config._cache) == 0


class TestRetailCoDataGenerator(unittest.TestCase):
    """Test data generation."""

    def test_generate_sales(self):
        """Test generating sales data."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config, seed=42)
        
        start = date(2025, 4, 1)
        end = date(2025, 4, 7)  # 1 week
        
        sales = gen.generate_sales(start, end)
        
        assert len(sales) > 0
        assert all(s['Date'] >= start.isoformat() for s in sales)
        assert all(s['Date'] <= end.isoformat() for s in sales)

    def test_sales_row_structure(self):
        """Test that sales rows have required fields."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        
        required_fields = [
            'Date', 'Region', 'Channel', 'Product_Category',
            'Net_Revenue', 'COGS', 'Gross_Margin', 'Units_Sold'
        ]
        
        for row in sales:
            for field in required_fields:
                assert field in row, f"Missing field: {field}"

    def test_sales_values_positive(self):
        """Test that sales values are positive."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        
        for row in sales:
            assert row['Net_Revenue'] > 0, "Net revenue must be positive"
            assert row['Units_Sold'] >= 1, "Units must be >= 1"

    def test_generate_planning(self):
        """Test planning aggregation."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config, seed=42)
        
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 7))
        planning = gen.generate_planning(sales)
        
        assert len(planning) > 0
        assert len(planning) < len(sales)  # Aggregated

    def test_planning_aggregation_math(self):
        """Test that planning math is correct."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        planning = gen.generate_planning(sales)
        
        for row in planning:
            expected = row['Net_Sales'] - row['COGS']
            actual = row['Gross_Profit']
            assert abs(expected - actual) <= 1, \
                f"Math mismatch: {row['Net_Sales']} - {row['COGS']} ≠ {actual}"

    def test_reproducibility_with_seed(self):
        """Test that same seed produces same results."""
        config = ConfigLoader()
        
        gen1 = RetailCoDataGenerator(config, seed=42)
        sales1 = gen1.generate_sales(date(2025, 4, 1), date(2025, 4, 2))
        
        gen2 = RetailCoDataGenerator(config, seed=42)
        sales2 = gen2.generate_sales(date(2025, 4, 1), date(2025, 4, 2))
        
        # Should have same revenue values
        for s1, s2 in zip(sales1, sales2):
            assert s1['Net_Revenue'] == s2['Net_Revenue']


class TestDataValidator(unittest.TestCase):
    """Test data validation."""

    def test_validate_sales_empty(self):
        """Test validation of empty sales data."""
        is_valid, errors = DataValidator.validate_sales([])
        assert not is_valid
        assert len(errors) > 0

    def test_validate_sales_valid(self):
        """Test validation of valid sales data."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        
        is_valid, errors = DataValidator.validate_sales(sales)
        assert is_valid, f"Validation failed: {errors}"

    def test_validate_planning_empty(self):
        """Test validation of empty planning data."""
        is_valid, errors = DataValidator.validate_planning([])
        assert not is_valid

    def test_validate_planning_valid(self):
        """Test validation of valid planning data."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        planning = gen.generate_planning(sales)
        
        is_valid, errors = DataValidator.validate_planning(planning)
        assert is_valid, f"Validation failed: {errors}"

    def test_validate_consistency(self):
        """Test consistency validation between sales and planning."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        planning = gen.generate_planning(sales)
        
        is_valid, errors = DataValidator.validate_consistency(sales, planning)
        assert is_valid, f"Consistency check failed: {errors}"


class TestCSVWriter(unittest.TestCase):
    """Test CSV output."""

    def test_write_sales(self):
        """Test writing sales CSV."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        
        with tempfile.TemporaryDirectory() as tmpdir:
            writer = CSVWriter(Path(tmpdir))
            output_path = writer.write_sales(sales, 'test_sales.csv')
            
            assert output_path.exists()
            assert output_path.suffix == '.csv'
            
            # Verify header
            with open(output_path) as f:
                header = f.readline()
                assert 'Date' in header
                assert 'Revenue' in header or 'Net_Revenue' in header

    def test_write_all(self):
        """Test writing both sales and planning."""
        config = ConfigLoader()
        gen = RetailCoDataGenerator(config)
        sales = gen.generate_sales(date(2025, 4, 1), date(2025, 4, 1))
        planning = gen.generate_planning(sales)
        
        with tempfile.TemporaryDirectory() as tmpdir:
            writer = CSVWriter(Path(tmpdir))
            sales_path, planning_path = writer.write_all(sales, planning, 'test_sales.csv', 'test_planning.csv')
            
            assert sales_path.exists()
            assert planning_path.exists()


if __name__ == '__main__':
    unittest.main(verbosity=2)
