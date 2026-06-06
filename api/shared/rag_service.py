import logging
import os
from typing import Any, Dict, Iterable, List

from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from openai import OpenAI


SYSTEM_PROMPT = """You are an SAP Analytics Cloud assistant.
Answer only from the provided documentation context.
Use plain language suitable for beginners.
If the documentation does not support an answer, say that clearly.
"""


def get_search_client() -> SearchClient:
    logging.info("Creating Azure AI Search client")
    return SearchClient(
        endpoint=os.environ["AZURE_SEARCH_ENDPOINT"],
        index_name=os.environ["AZURE_SEARCH_INDEX"],
        credential=AzureKeyCredential(os.environ["AZURE_SEARCH_KEY"]),
    )


def search_documents(question: str) -> str:
    """Retrieve documentation using the repository's current keyword search."""
    logging.info("Searching documentation. Question length=%s", len(question))
    results = get_search_client().search(search_text=question, top=5)
    chunks = [doc.get("chunk", "") for doc in results if doc.get("chunk")]
    context = "\n\n".join(chunks)
    logging.info(
        "Retrieved %s chunks. Context length=%s",
        len(chunks),
        len(context),
    )
    return context


def get_openai_client() -> OpenAI:
    logging.info("Creating Azure OpenAI client")
    return OpenAI(
        base_url=os.environ["AZURE_OPENAI_ENDPOINT"],
        api_key=os.environ["AZURE_OPENAI_KEY"],
    )


def generate_answer(
    question: str,
    documentation_context: str,
    history: Iterable[Dict[str, Any]] = (),
    learner_context: Dict[str, Any] | None = None,
) -> str:
    messages: List[Dict[str, str]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
    ]

    for item in list(history)[-8:]:
        role = item.get("role")
        content = item.get("content")
        if role in {"user", "assistant"} and isinstance(content, str):
            messages.append({"role": role, "content": content})

    context_lines = []
    for key in ("day", "lessonTitle", "view", "portalVersion"):
        value = (learner_context or {}).get(key)
        if value not in (None, ""):
            context_lines.append(f"{key}: {value}")

    learner_summary = "\n".join(context_lines) or "Not provided"
    messages.append(
        {
            "role": "user",
            "content": (
                f"Documentation context:\n{documentation_context}\n\n"
                f"Learner context:\n{learner_summary}\n\n"
                f"Question:\n{question}"
            ),
        }
    )

    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    logging.info(
        "Generating answer. Deployment=%s question_length=%s context_length=%s",
        deployment_name,
        len(question),
        len(documentation_context),
    )
    response = get_openai_client().chat.completions.create(
        model=deployment_name,
        messages=messages,
    )
    return response.choices[0].message.content or ""
