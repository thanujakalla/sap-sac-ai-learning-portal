import os
import unittest
from unittest.mock import patch

from shared.http import _cors_headers


class CorsHeadersTest(unittest.TestCase):
    def test_allows_configured_origin(self):
        with patch.dict(
            os.environ,
            {"ALLOWED_ORIGINS": "https://thanujakalla.github.io"},
            clear=False,
        ):
            headers = _cors_headers("https://thanujakalla.github.io")

        self.assertEqual(
            headers["Access-Control-Allow-Origin"],
            "https://thanujakalla.github.io",
        )
        self.assertEqual(headers["Vary"], "Origin")

    def test_does_not_reflect_unknown_origin(self):
        with patch.dict(
            os.environ,
            {"ALLOWED_ORIGINS": "https://thanujakalla.github.io"},
            clear=False,
        ):
            headers = _cors_headers("https://example.com")

        self.assertNotIn("Access-Control-Allow-Origin", headers)


if __name__ == "__main__":
    unittest.main()
