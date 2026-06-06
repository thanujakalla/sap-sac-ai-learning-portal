# SAP SAC Learning API

This folder is the beginner-friendly Azure Functions backend for the portal.

It uses the Python v1 Azure Functions model:

- each endpoint has its own folder
- `function.json` describes the HTTP trigger
- `__init__.py` contains the Python function
- `main(req)` is the function Azure runs

Microsoft documents this model as the Python v1 programming model, where each
function is a global, stateless `main()` method in `__init__.py`.

## Folder Map

```text
api/
├── host.json
├── local.settings.json.example
├── requirements.txt
├── shared/
│   ├── http.py
│   └── content_store.py
├── health/
├── feature_flags/
├── content/
├── retailco_data/
├── progress/
└── ai_tutor/
```

## What Each File Means

`host.json`

Global settings for the whole Function App.

`local.settings.json`

Local-only secrets and settings. Do not commit the real file. Copy
`local.settings.json.example` to `local.settings.json` when running locally.

`requirements.txt`

Python packages Azure installs for Functions, Azure AI Search, Azure OpenAI,
and Azure Identity.

`function.json`

Tells Azure:

- this is an HTTP trigger
- which HTTP methods are allowed
- what URL route to use
- which Python file to run

`__init__.py`

The Python code for that endpoint.

## Current Placeholder Endpoints

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Check backend is running |
| `/api/feature-flags` | GET | Return portal feature flags |
| `/api/content` | GET | Placeholder for lesson/content API |
| `/api/retailco-data` | GET | Placeholder for RetailCo data API |
| `/api/progress` | GET/POST | Placeholder for learner progress |
| `/api/chat` | POST/OPTIONS | RAG-backed SAC AI tutor |

## Run Locally

Install Azure Functions Core Tools first, then:

```bash
cd /Users/surajreddy/Desktop/SAP_SAC/api
cp local.settings.json.example local.settings.json
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
func start
```

Then test:

```bash
curl http://localhost:7071/api/health
curl http://localhost:7071/api/feature-flags
```

Test the AI placeholder:

```bash
curl -X POST http://localhost:7071/api/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"Explain SAC stories like I am a beginner"}'
```

## Beginner Mental Model

Think of each endpoint like a small door into your backend:

1. Browser calls `/api/chat`.
2. Azure checks `ai_tutor/function.json`.
3. Azure sees `scriptFile` is `__init__.py`.
4. Azure runs `main(req)`.
5. Your Python returns JSON back to the browser.

## GitHub Pages Integration

Set `chatbot.apiUrl` in `config/app-config.json` to the deployed Function URL:

```json
{
  "chatbot": {
    "enabled": true,
    "apiUrl": "https://YOUR_FUNCTION_APP.azurewebsites.net/api/chat"
  }
}
```

Set `ALLOWED_ORIGINS` in the Function App settings to the exact GitHub Pages
origin, for example `https://thanujakalla.github.io`.
