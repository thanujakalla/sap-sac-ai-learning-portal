import azure.functions as func

from shared.http import get_origin, json_response, options_response


def main(req: func.HttpRequest) -> func.HttpResponse:
    origin = get_origin(req)

    if req.method == "OPTIONS":
        return options_response(origin)

    return json_response(
        {
            "version": "api-placeholder-1",
            "features": {
                "v2_ui_enabled": True,
                "enhanced_navigation": True,
                "geo_enrichment_guide": True,
                "advanced_analytics": False,
                "ai_assistant_beta": False,
                "dark_mode": False,
                "accessibility_enhanced": True,
            },
            "rollout": {
                "v2_percentage": 100,
                "ai_percentage": 0,
                "beta_features_percentage": 0,
            },
            "debug": False,
        },
        origin=origin,
    )

