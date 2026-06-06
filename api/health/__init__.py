import azure.functions as func

from shared.http import get_origin, json_response, options_response


def main(req: func.HttpRequest) -> func.HttpResponse:
    origin = get_origin(req)

    if req.method == "OPTIONS":
        return options_response(origin)

    return json_response(
        {
            "status": "ok",
            "service": "sap-sac-learning-api",
            "message": "Azure Functions backend is running.",
        },
        origin=origin,
    )

