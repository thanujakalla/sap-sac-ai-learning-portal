import json
import os
from typing import Any, Dict, Optional

import azure.functions as func


def json_response(
    body: Dict[str, Any],
    status_code: int = 200,
    origin: Optional[str] = None,
) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps(body, ensure_ascii=False),
        status_code=status_code,
        mimetype="application/json",
        headers=_cors_headers(origin),
    )


def options_response(origin: Optional[str] = None) -> func.HttpResponse:
    return func.HttpResponse(
        "",
        status_code=204,
        headers=_cors_headers(origin),
    )


def get_origin(req: func.HttpRequest) -> Optional[str]:
    return req.headers.get("origin")


def _cors_headers(origin: Optional[str]) -> Dict[str, str]:
    allowed = _allowed_origins()
    headers = {
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Vary": "Origin",
    }
    if origin and origin in allowed:
        headers["Access-Control-Allow-Origin"] = origin
    return headers


def _allowed_origins() -> set:
    raw = os.environ.get("ALLOWED_ORIGINS", "")
    return {item.strip() for item in raw.split(",") if item.strip()}
