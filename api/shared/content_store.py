from pathlib import Path
from typing import Any, Dict


REPO_ROOT = Path(__file__).resolve().parents[2]
DATA_ROOT = REPO_ROOT / "data"


def get_content_summary() -> Dict[str, Any]:
    """Placeholder content response.

    Later this can read from Blob Storage, Cosmos DB, or a CMS.
    """
    return {
        "source": "placeholder",
        "message": "Content API is ready. Wire this to lesson JSON or a database next.",
        "availableContentFiles": [
            "data/content/story-scenes.json",
            "data/content/glossary-by-day.json",
            "data/content/characters.json",
        ],
    }


def get_retailco_summary() -> Dict[str, Any]:
    """Placeholder RetailCo response.

    Later this can return filtered CSV metadata, signed download URLs, or data
    from Azure Storage.
    """
    csv_files = sorted(path.name for path in DATA_ROOT.glob("retailco_*.csv"))
    return {
        "source": "repo-data-folder",
        "message": "RetailCo API is ready. Add filtering or storage-backed reads next.",
        "files": csv_files,
    }

