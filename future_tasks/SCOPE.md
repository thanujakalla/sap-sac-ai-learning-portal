# SAP SAC Learning Portal — Technical Architecture & Roadmap

**Document Date:** June 6, 2026  
**Author:** Tech Architecture Planning  
**Status:** Active Development Roadmap

---

## 1. CODE REUSABILITY & SIMPLIFICATION ANALYSIS

### Current State Issues

#### 1.1 JavaScript Code Bulk Issues

**Problem Areas:**

| File | Lines | Issue | Impact |
|------|-------|-------|--------|
| `js/beginner-extras.js` | 1198 | Massive inline data structures (STORY_SCENES, GLOSSARY) | Hard to maintain, edit, and search |
| `js/sac-links.js` | 177+ | Static link maps embedded in JS | Impossible to update without redeploying |
| `js/retailco-data.js` | 367+ | Chart/dimension metadata as nested objects | DRY violation, duplicate patterns |
| `js/data-pbi.js` | 251+ | Comparison tables embedded in code | Tightly coupled content logic |
| All `*-v2.js` files | Multiple | Version duplication (v1 + v2) | Maintenance nightmare |

**Root Causes:**
1. **Monolithic data structures** — all content lives in one JS object
2. **No separation of concerns** — data, logic, and presentation mixed
3. **No templating engine** — hard-coded HTML strings instead of reusable templates
4. **Version silos** — v1 and v2 branches mean duplicate logic

---

### 1.2 Python Script Simplification Opportunities

**Current Issues in `generate_retailco_data.py`:**

- **~419 lines** for data generation logic
- **Hardcoded constants** embedded throughout (weights, COGS %, discount rates)
- **Nested generator loops** without helper functions
- **No configuration management** — changes require code edits

**Opportunities:**
- Extract config to JSON/YAML
- Create reusable data generator utilities
- Modularize by data type (sales, planning, master)

---

## 2. RECOMMENDED CODE REFACTORING STRATEGY

### 2.1 Phase 1: Extract Data from JavaScript (Weeks 1–2)

**Goal:** Decouple content from presentation logic

#### Step 1: Create JSON Config Files
Move content from JS into structured JSON:

```
/data/
  content/
    story-scenes.json          # All 14 day scenes
    glossary-by-day.json       # Terms by lesson
    hands-on-steps.json        # Step-by-step guides
    characters.json            # Character metadata
    sac-links-catalog.json     # Resource links

/config/
  data-generation.json         # RetailCo generation params
  portal-settings.json         # Theme, feature flags
```

**Benefits:**
- Edit content without touching code
- Version control for content separately
- Easy to validate with JSON schema
- Can be served from API/database later

#### Step 2: Create JavaScript Module Layer

```javascript
// js/modules/content-loader.js
class ContentLoader {
  static async loadScenes() { /* fetch from /data/content/story-scenes.json */ }
  static async loadGlossary(day) { /* fetch by day */ }
  static renderScene(sceneId, htmlTarget) { /* template rendering */ }
}

// Usage in HTML:
// ContentLoader.loadScenes().then(scenes => renderStoryUI(scenes))
```

**Why:**
- Minimal JS changes needed
- Lazy-load content only when needed
- Cache at browser level
- Simpler to unit test

---

### 2.2 Phase 2: Unify v1 and v2 (Weeks 3–4)

**Current Problem:**
- `sap_sac_beginner_portal.html` (v1)
- `sap_sac_beginner_portal_v2.html` (v2)
- `*-v1.js` and `*-v2.js` duplicate code

**Solution: Single Codebase, Feature Flags**

```
├── sap_sac_beginner_portal.html       # Single unified entry
├── config/
│   └── feature-flags.json             # { "v2_enabled": true, "ai_features": false }
├── js/modules/
│   ├── core/                          # Shared logic
│   │   ├── content-loader.js
│   │   ├── progress-tracker.js
│   │   └── ui-renderer.js
│   ├── features/                      # Feature-specific
│   │   ├── v2-enhanced-navigation.js
│   │   ├── ai-assistant-ui.js
│   │   └── advanced-analytics.js
│   └── legacy/                        # Keep v1 code minimal
│       └── v1-compat.js
```

**Benefits:**
- 40% reduction in duplicate code
- Easy A/B testing between versions
- Gradual deprecation of v1

---

### 2.3 Phase 3: Python Modularization (Weeks 1–2, parallel)

**Extract from `generate_retailco_data.py`:**

```
/scripts/
├── config/
│   ├── retailco_schema.json           # Field definitions
│   ├── regions.json                   # Region/state/city data
│   ├── channels.json                  # Channel definitions
│   └── categories.json                # Category/brand/SKU data
├── lib/
│   ├── data_generator.py              # Core logic
│   ├── aggregators.py                 # Sales → Planning aggregations
│   └── validators.py                  # Data quality checks
└── generate.py                        # Main orchestrator
```

**New `lib/data_generator.py`:**
```python
class RetailCoDataGenerator:
    def __init__(self, config_path):
        self.config = self.load_config(config_path)
    
    def generate_sales(self, start_date, end_date):
        # Clean, testable logic
        pass
    
    def generate_planning(self, sales_rows):
        # Separate aggregation step
        pass
    
    def generate_validation_report(self):
        # Quality checks
        pass
```

**Benefits:**
- Reusable as library (import by API server later)
- Testable with pytest
- Easy to extend for AI-generated data

---

## 3. REPOSITORY RESTRUCTURING

### 3.1 Proposed Directory Layout

```
SAP_SAC/
├── README.md                          # Main documentation
├── package.json                       # JS dependencies (if using npm)
│
├── public/                            # Static assets served to browser
│   ├── index.html
│   ├── sap_sac_beginner_portal.html
│   ├── css/
│   │   ├── core.css                   # Base styles
│   │   ├── theme-light.css
│   │   └── theme-dark.css
│   ├── js/
│   │   ├── main.js                    # Entry point
│   │   ├── modules/
│   │   │   ├── core/
│   │   │   ├── features/
│   │   │   └── utils/
│   │   └── vendors/                   # Third-party libs
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── fonts/
│
├── data/                              # Data layer
│   ├── raw/                           # Generated CSVs
│   │   ├── retailco_sales_analytic.csv
│   │   └── retailco_planning_seed.csv
│   ├── config/                        # Generation configs
│   │   ├── regions.json
│   │   ├── channels.json
│   │   └── categories.json
│   └── content/                       # Portal content (new)
│       ├── story-scenes.json
│       ├── glossary-by-day.json
│       └── hands-on-steps.json
│
├── backend/                           # Python backend (new, future)
│   ├── app.py                         # Flask/FastAPI entry
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings.py
│   │   └── ai_config.py
│   ├── services/
│   │   ├── data_generation/
│   │   ├── ai_agent/
│   │   └── progress_tracking/
│   ├── models/
│   │   ├── user_progress.py
│   │   └── ai_conversations.py
│   └── tests/
│       └── test_*.py
│
├── scripts/                           # Data generation scripts
│   ├── lib/                           # Refactored modules
│   │   ├── data_generator.py
│   │   ├── aggregators.py
│   │   └── validators.py
│   └── generate.py                    # Main entry
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── tests/                             # All tests
│   ├── js/                            # Jest tests
│   ├── py/                            # pytest
│   └── integration/
│
├── .github/
│   ├── workflows/
│   │   ├── test.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
│
├── .env.example
├── .gitignore
├── docker-compose.yml                 # For local dev
└── future_tasks/
    ├── SCOPE.md                       # This file
    ├── PHASE_1_CHECKLIST.md
    └── AI_INTEGRATION_ROADMAP.md

```

### 3.2 Migration Path (Non-Breaking)

**Week 1:**
1. Create `/data/content/` and move JSON files (don't break existing JS yet)
2. Create `/backend/` skeleton (empty app)
3. Create `/scripts/lib/` and refactor Python gradually

**Week 2:**
1. Create new content-loader.js that tries JSON first, falls back to hardcoded
2. Gradually move JS modules to `/js/modules/`
3. No changes to HTML files (still works)

**Week 3+:**
1. Switch HTML to use new module system
2. Deprecate old JS files
3. Remove v1/v2 duplication

---

## 4. AI INTEGRATION ARCHITECTURE

### 4.1 Vision: Custom AI Agent Integration

**Goal:** Build a custom AI agent trained on RetailCo data + SAC knowledge that:
- Answers learner questions in natural language
- Generates personalized scenarios
- Suggests next lessons based on progress
- Auto-generates quiz questions
- Provides real-time code hints

---

### 4.2 Architecture Options

#### Option A: Azure AI Foundry (Recommended for Enterprise)

**Why Azure?**
- Native integration with SAP ecosystem
- Data residency in India (if needed)
- Compliance: SOC2, HIPAA, FedRAMP
- Direct integration with Azure OpenAI, Azure Cosmos DB

**Architecture:**

```
┌─────────────────────────────────────────┐
│         Frontend (JS Portal)             │
│  (WebSocket → /api/chat)                 │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼─────────┐
        │  FastAPI Backend  │
        │  (Python)         │
        └────────┬──────────┘
                 │
    ┌────────────┼─────────────────┐
    │            │                 │
    ▼            ▼                 ▼
┌─────────────────────┐      ┌─────────────┐
│ Azure AI Foundry    │      │ Azure       │
│ • Model Management  │      │ Cosmos DB   │
│ • RAG Pipeline      │      │ (Chat       │
│ • Fine-tuning       │      │  History)   │
│ • Eval Framework    │      └─────────────┘
└─────────┬───────────┘
          │
    ┌─────▼──────┐
    │ Azure Open │
    │ AI (GPT-4) │
    └────────────┘
```

**Deployment:**
```yaml
Resource Group: sap-sac-ai-prod
- App Service: Portal + Backend
- AI Hub: Foundry models
- Cosmos DB: User sessions
- Storage: Embeddings, training data
- KeyVault: Secrets, API keys
```

**Cost Estimate (Monthly):**
- App Service (Premium tier): ~$100
- Azure OpenAI (1M tokens/month): ~$10
- Cosmos DB: ~$50
- Storage: ~$5
- **Total: ~$165/month**

---

#### Option B: Open-Source + Hugging Face (Budget-Friendly)

**Why Open Source?**
- Full control
- Lower costs
- No vendor lock-in
- Can self-host

**Stack:**
- **LLM:** LLaMA 2 (13B) or Mistral-7B (fast, accurate)
- **Embedding:** MiniLM or BGE-small
- **Vector DB:** Pinecone (cloud) or Weaviate (self-hosted)
- **Backend:** FastAPI + LangChain
- **Hosting:** Railway or Hugging Face Spaces

**Architecture:**
```
Frontend → FastAPI → LangChain → LLaMA (GPU server)
                        ↓
                    Pinecone (RAG)
```

**Cost Estimate:**
- Pinecone (starter): $0-10
- GPU server (RunPod/Lambda): ~$5/hour (use on-demand)
- FastAPI hosting (Railway): ~$20/month
- **Total: ~$30-50/month** (vs. $165 with Azure)

---

#### Option C: Hybrid (Best of Both)

**Approach:**
- Use **Azure AI Foundry** for:
  - GPT-4 for complex reasoning (rare, expensive queries)
  - Fine-tuning on your custom data
  - Enterprise compliance
  
- Use **Open-Source** for:
  - Day-to-day chat (LLaMA/Mistral)
  - Embeddings (faster, cheaper)
  - Local data processing

**When to route to which:**
```python
if query_complexity == "simple":
    use_open_source_llm()  # LLaMA
elif query_needs_gpt4:
    use_azure_openai()      # GPT-4
else:
    use_open_source_embeddings_for_rag()
```

**Cost:** ~$60-80/month

---

### 4.3 Detailed Implementation Roadmap

#### Phase 1: Knowledge Base Setup (Weeks 1–3)

**Goal:** Create AI-trainable data layer

```
├── data/ai/
│   ├── training_data/
│   │   ├── sac_lessons.txt              # 14 days of content
│   │   ├── glossary_full.json           # 50+ SAC terms
│   │   ├── qa_pairs.json                # 200 Q&A from forum
│   │   ├── retailco_case_study.md       # Business context
│   │   └── error_recovery_guide.md      # Common mistakes
│   ├── embeddings/
│   │   └── sac-knowledge-base.pkl       # Embedded vectors
│   └── config/
│       ├── rag_config.json              # Retrieval settings
│       └── agent_system_prompt.txt      # Personality

```

**Extraction Tasks:**
1. Convert `js/beginner-extras.js` STORY_SCENES → `training_data/sac_lessons.txt`
2. Extract GLOSSARY → structured `glossary_full.json`
3. Create 200 Q&A pairs from `hands-on-steps.json`
4. Document RetailCo scenario as markdown

**Tools:**
```bash
# Generate embeddings locally
pip install sentence-transformers
python scripts/generate_embeddings.py --input data/ai/training_data --output data/ai/embeddings
```

---

#### Phase 2: RAG Pipeline (Weeks 4–6)

**Goal:** Retrieval-Augmented Generation for accurate answers

```python
# backend/services/ai_agent/rag_pipeline.py
class SACKnowledgeRAG:
    def __init__(self):
        self.embeddings = load_embeddings("data/ai/embeddings/")
        self.vectorstore = PineconeVectorStore(index_name="sac-kb")
    
    def retrieve_context(self, query: str, top_k=5):
        # Find similar lessons/glossary items
        results = self.vectorstore.similarity_search(query, k=top_k)
        return results
    
    def generate_answer(self, query: str, llm_provider="openai"):
        context = self.retrieve_context(query)
        prompt = build_rag_prompt(query, context)
        answer = llm_provider.generate(prompt)
        return answer

# API endpoint
@app.post("/api/ai/ask")
async def ask_ai(message: str, user_id: str):
    rag = SACKnowledgeRAG()
    answer = rag.generate_answer(message)
    save_conversation(user_id, message, answer)
    return {"answer": answer, "confidence": 0.95}
```

**Integration Points:**
1. Frontend: WebSocket endpoint for real-time chat
2. Progress tracking: Link questions to lesson stage
3. Database: Store Q&A for continuous learning

---

#### Phase 3: Custom Fine-Tuning (Weeks 7–10)

**Goal:** Adapt model to RetailCo + SAC domain

**Option A: Azure AI Foundry Fine-Tuning**
```python
# backend/services/ai_agent/fine_tune.py
from azure.ai.ml.entities import Model
from azureml.core import Workspace

# Upload training data to Azure
trainer = AzureMLFinetuner(
    model="gpt-3.5-turbo",
    training_data="data/ai/training_data/",
    hyperparams={"epochs": 3, "batch_size": 16}
)

fine_tuned_model = trainer.run()  # Returns new model ID
```

**Option B: LLaMA Fine-Tuning (Local + HuggingFace)**
```python
# Use LoRA for efficient fine-tuning
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-13b")
config = LoraConfig(r=8, lora_alpha=16)
model = get_peft_model(model, config)

# Train on RetailCo + SAC data
trainer = Trainer(model, training_args, train_dataset)
trainer.train()
```

**Training Data Format:**
```json
[
  {
    "instruction": "What is a SAC Story?",
    "input": "I'm new to SAC",
    "output": "A Story is the presentation layer in SAC..."
  },
  {
    "instruction": "Generate a RetailCo scenario",
    "input": "South region, Q3",
    "output": "RetailCo's South region in Q3 shows..."
  }
]
```

---

#### Phase 4: Agentic Features (Weeks 11–14)

**Goal:** Multi-step reasoning, planning

```python
# backend/services/ai_agent/agent_orchestrator.py
from langchain.agents import AgentExecutor, Tool
from langchain.agents import initialize_agent

tools = [
    Tool(
        name="search_glossary",
        func=rag.search_glossary,
        description="Find SAC terms and definitions"
    ),
    Tool(
        name="generate_scenario",
        func=scenario_generator.create,
        description="Generate RetailCo business scenario"
    ),
    Tool(
        name="create_quiz",
        func=quiz_generator.create,
        description="Auto-generate quiz questions"
    ),
    Tool(
        name="fetch_progress",
        func=progress_tracker.get_user_progress,
        description="Get user's current lesson stage"
    )
]

agent = initialize_agent(
    tools,
    llm=OpenAI(model="gpt-4"),
    agent="zero-shot-react-description"
)

# Agent can now plan multi-step interactions:
# Query: "I'm stuck on Day 5, can you help me build a KPI dashboard?"
# Agent reasoning:
# 1. Fetch user progress (Day 5)
# 2. Search glossary for "KPI"
# 3. Generate RetailCo example
# 4. Create step-by-step guide
# 5. Return structured answer
```

---

### 4.4 Frontend Integration (WebSocket Chat UI)

```javascript
// public/js/modules/features/ai-assistant.js
class SACAssistant {
    constructor() {
        this.ws = new WebSocket('ws://localhost:8000/api/ai/ws');
        this.conversationHistory = [];
    }
    
    async askQuestion(message) {
        this.ws.send(JSON.stringify({
            type: 'chat',
            message,
            user_id: getCurrentUserId(),
            lesson_stage: getCurrentLessonStage()
        }));
    }
    
    onMessageReceived(event) {
        const response = JSON.parse(event.data);
        // Stream response text like ChatGPT
        this.renderStreamingResponse(response.answer);
        // Store for progress tracking
        this.conversationHistory.push({ role: 'assistant', content: response.answer });
    }
    
    renderStreamingResponse(text) {
        // Character-by-character streaming animation
        let idx = 0;
        const interval = setInterval(() => {
            document.getElementById('chat-output').innerHTML += text[idx++];
            if (idx >= text.length) clearInterval(interval);
        }, 15);
    }
}

// UI Component (HTML)
/*
<div class="ai-assistant-panel">
  <div class="chat-history" id="chatHistory"></div>
  <div class="input-area">
    <textarea id="queryInput" placeholder="Ask me about SAC..."></textarea>
    <button onclick="assistant.askQuestion(queryInput.value)">Send</button>
  </div>
  <div class="suggested-prompts">
    <button onclick="assistant.askQuestion('What is a Story?')">What is a Story?</button>
    <button onclick="assistant.askQuestion('Help me with Day 5')">Help me with Day 5</button>
  </div>
</div>
*/
```

---

### 4.5 Data Governance & Privacy

**Considerations:**

| Aspect | Approach |
|--------|----------|
| **User Data** | Encrypt conversations, store only with explicit consent |
| **Model Training** | Use only anonymized lesson interactions |
| **Regional Compliance** | If India hosting needed: Azure India Central, comply with MEITY |
| **Audit Trail** | Log all AI responses with timestamps, user context |
| **Model Updates** | Version all models, test before production rollout |

**Implementation:**
```python
# backend/services/ai_agent/privacy.py
class ConversationEncryption:
    def encrypt_conversation(self, user_id, messages):
        cipher = Fernet(self.get_user_key(user_id))
        encrypted = cipher.encrypt(json.dumps(messages).encode())
        return encrypted
    
    def log_ai_response(self, user_id, query, response, metadata):
        # Audit log for compliance
        audit_log.write({
            'timestamp': datetime.now(),
            'user_id': hash(user_id),  # Don't store raw ID
            'query_hash': hash(query),
            'model_version': '1.0.0',
            'metadata': metadata
        })
```

---

### 4.6 Alternative Services Comparison

| Service | Best For | Cost | Setup |
|---------|----------|------|-------|
| **Azure AI Foundry** | Enterprise, compliance, GPT-4 | $165/mo | 2 weeks |
| **OpenAI API + Pinecone** | Quick MVP, GPT-3.5 | $30–50/mo | 1 week |
| **Hugging Face Spaces** | Prototyping, no cost | Free (limited) | 3 days |
| **Google Vertex AI** | GCP ecosystem, Gemini | $150/mo | 2 weeks |
| **AWS Bedrock** | AWS ecosystem | $100/mo | 2 weeks |
| **Self-hosted LLaMA** | Full control, offline | $50/mo (GPU) | 3 weeks |

**Recommendation for Your Use Case:**
- **Start:** OpenAI API + Pinecone (1 week, cheapest proof of concept)
- **Scale:** Migrate to Azure AI Foundry (enterprise-grade, compliance)
- **Long-term:** Consider self-hosted if budget increases or compliance needs change

---

## 5. IMPLEMENTATION TIMELINE

### Month 1: Foundation (Weeks 1–4)

| Week | Task | Owner | Deliverable |
|------|------|-------|-------------|
| 1 | Extract content JSON | JS Dev | `/data/content/*.json` |
| 1 | Refactor Python scripts | Python Dev | `/scripts/lib/*.py` |
| 2 | Create content-loader.js | JS Dev | Working loader with fallback |
| 2–3 | Build FastAPI skeleton | Python Dev | `/backend/app.py` endpoint |
| 4 | Unify v1/v2 HTML | Frontend | Single HTML entry point |

### Month 2: Knowledge Base (Weeks 5–8)

| Week | Task | Owner | Deliverable |
|------|------|-------|-------------|
| 5–6 | Prepare training data | Data Eng | `training_data/` folder |
| 6–7 | Generate embeddings | ML Eng | `embeddings/` vectors |
| 7–8 | Build RAG pipeline | Python Dev | `/backend/services/rag/` |

### Month 3: AI Integration (Weeks 9–12)

| Week | Task | Owner | Deliverable |
|------|------|-------|-------------|
| 9–10 | Fine-tune model | ML Eng | Custom model in Azure/HF |
| 10–11 | Build chat UI | Frontend | WebSocket component |
| 11–12 | Integration testing | QA | Prod-ready AI agent |

---

## 6. RISK MITIGATION

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| JS module migration breaks existing portal | High | Critical | Feature flags + fallback to old code |
| Python refactoring causes data inconsistency | Medium | High | Unit tests, data validation |
| AI responses hallucinate/give wrong info | High | Medium | RAG pipeline, human review, feedback loop |
| Azure costs exceed budget | Medium | Medium | Start with OpenAI API, set alerts |
| Training data leaks sensitive RetailCo info | Low | High | Anonymize, encrypt, audit logs |

---

## 7. SUCCESS METRICS

### Code Quality
- Reduce `beginner-extras.js` from 1198 → 400 lines
- Eliminate 100% of v1/v2 duplication
- Achieve 80%+ test coverage on Python modules

### Performance
- Page load time: < 2s (with AI features)
- API response time (chat): < 1s average
- Embedding search: < 200ms

### AI Quality
- AI response accuracy: > 85% (user satisfaction)
- Reduced learner support tickets by 40%
- 60%+ engagement on AI features

---

## 8. DEPENDENCIES & PREREQUISITES

### Skills Required
- **Frontend:** JavaScript ES6+, WebSockets, CSS Grid
- **Backend:** Python 3.9+, FastAPI, LangChain
- **AI/ML:** Vector databases, embedding models, LLM fine-tuning
- **DevOps:** Docker, Azure (or alternative cloud)
- **Database:** PostgreSQL, Cosmos DB

### Tools to Setup
```bash
# Python
pip install fastapi uvicorn langchain pinecone-client pandas numpy

# Node (if using JS bundler)
npm install webpack typescript

# Azure CLI (if using Azure)
az login
az extension add --name ml

# Testing
pip install pytest playwright
npm install jest
```

---

## 9. QUICK WINS (Start Here!)

If you want to start immediately, do these in order:

1. **Week 1:** Extract all hardcoded data from JS to JSON files
   - Time: 4 hours
   - Tools: VS Code, JSON validator
   - Payoff: 50% easier to maintain

2. **Week 1:** Refactor Python constants to config files
   - Time: 2 hours
   - Tools: Python pathlib
   - Payoff: Can now generate data without code edits

3. **Week 2:** Create `/backend/api.py` skeleton with one endpoint
   - Time: 3 hours
   - Tools: FastAPI
   - Payoff: Path to AI integration ready

4. **Week 2–3:** Set up Azure AI Foundry free tier + test OpenAI API
   - Time: 3 hours
   - Tools: Azure portal, Postman
   - Payoff: Ready to build AI features

---

## 10. NEXT STEPS

1. **Read & Review:** Share this document with team
2. **Prioritize:** Which phase matters most? (Code cleanliness vs. AI features?)
3. **Pick Tech Stack:** Azure vs. OpenAI vs. Self-hosted?
4. **Assign Owners:** Who does what?
5. **Create Sprints:** Break into 2-week sprints
6. **Start Phase 1:** Week 1 = Extract content JSON

---

**Questions? Issues?**  
Create a GitHub issue or discussion linking to this document.

**Last Updated:** June 6, 2026  
**Next Review:** After Phase 1 completion
