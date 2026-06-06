import azure.functions as func

from shared.http import get_origin, json_response, options_response


def main(req: func.HttpRequest) -> func.HttpResponse:
    origin = get_origin(req)

    if req.method == "OPTIONS":
        return options_response(origin)

    if req.method == "GET":
        return json_response(
            {
                "source": "placeholder",
                "message": "Progress API is ready. Add database storage next.",
                "progress": None,
            },
            origin=origin,
        )

    try:
        body = req.get_json()
    except ValueError:
        body = {}

    return json_response(
        {
            "source": "placeholder",
            "message": "Progress received but not saved yet.",
            "received": body,
        },
        status_code=202,
        origin=origin,
    )

