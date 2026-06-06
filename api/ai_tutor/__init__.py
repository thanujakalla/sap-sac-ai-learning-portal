import logging
import uuid

import azure.functions as func

from shared.http import get_origin, json_response, options_response


def search_documents(question):
    from shared.rag_service import search_documents as search

    return search(question)


def generate_answer(question, documentation_context, history, learner_context):
    from shared.rag_service import generate_answer as generate

    return generate(
        question,
        documentation_context,
        history=history,
        learner_context=learner_context,
    )


def main(req: func.HttpRequest) -> func.HttpResponse:
    origin = get_origin(req)
    request_id = str(uuid.uuid4())

    if req.method == "OPTIONS":
        return options_response(origin)

    try:
        body = req.get_json()
        if not isinstance(body, dict):
            raise ValueError("JSON object required")
        question = body.get("question")
        if not isinstance(question, str) or not question.strip():
            return json_response(
                {
                    "error": "question_required",
                    "message": "A non-empty question is required.",
                    "requestId": request_id,
                },
                status_code=400,
                origin=origin,
            )

        documentation_context = search_documents(question.strip())
        answer = generate_answer(
            question.strip(),
            documentation_context,
            history=body.get("history") or [],
            learner_context=body.get("context") or {},
        )
        return json_response(
            {
                "answer": answer,
                "citations": [],
                "requestId": request_id,
            },
            origin=origin,
        )
    except ValueError:
        return json_response(
            {
                "error": "invalid_json",
                "message": "Request body must be valid JSON.",
                "requestId": request_id,
            },
            status_code=400,
            origin=origin,
        )
    except Exception:
        logging.exception("AI tutor request failed. request_id=%s", request_id)
        return json_response(
            {
                "error": "ai_tutor_unavailable",
                "message": "The AI tutor is temporarily unavailable.",
                "requestId": request_id,
            },
            status_code=500,
            origin=origin,
        )
