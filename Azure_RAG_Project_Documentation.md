# Azure AI Search + Azure AI Foundry RAG Setup Documentation

## Objective

Build a Retrieval-Augmented Generation (RAG) pipeline for SAP Analytics Cloud documentation using:

- Azure Blob Storage
- Azure AI Search
- Azure AI Foundry
- text-embedding-3-small embeddings
- Hybrid Search (Vector + Semantic Search)

---

# Architecture

```text
SAP PDF
   ↓
Azure Blob Storage (sap-notes)
   ↓
Azure AI Search Indexer
   ↓
SplitSkill (Chunking)
   ↓
Azure OpenAI Embedding Skill
   ↓
text-embedding-3-small
   ↓
Vector Index (text_vector)
   ↓
Hybrid Search
   ↓
Relevant Chunks
```

---

# Resources Created

## Resource Group

```text
sap_sac
```

## Blob Storage

Container:

```text
sap-notes
```

Uploaded file:

```text
SAC_Feature_Scope_Description.pdf
```

Approximate size:

```text
473 KB
44 pages
```

## Azure AI Search

Objects created:

```text
sap-rag-index
sap-rag-index-indexer
sap-rag-index-datasource
sap-rag-index-skillset
```

## Azure AI Foundry

Resource:

```text
sap-sac-foundry
```

Project:

```text
sap-sac-foundry
```

Region:

```text
Central India
```

---

# RAG Wizard Configuration

## Scenario Selected

```text
RAG
```

Not selected:

```text
Keyword Search
Multimodal RAG
```

Reason:

The PDF was text-based and intended for document question answering.

---

# Embedding Model

Selected:

```text
text-embedding-3-small
```

Reason:

- Low cost
- Designed for vector search
- Recommended for RAG systems
- Sufficient for SAP documentation

Deployment type:

```text
GlobalStandard
```

Deployment state:

```text
Succeeded
```

---

# Initial Problem Encountered

Error:

```text
Could not execute skill because the Web Api request failed
TooManyRequests
RateLimitReached
```

Detailed message:

```text
Your requests to text-embedding-3-small exceeded the call rate limit.
```

Root cause:

The deployment was configured with:

```text
TPM = 1000
RPM = 6
```

The PDF was split into many chunks and Azure AI Search attempted multiple embedding requests.

The embedding endpoint throttled requests.

---

# Resolution

Changed:

```text
TPM = 15000
```

After increasing throughput:

```text
Indexer Status = Success
Duration ≈ 1 minute
Documents succeeded = 1
```

---

# Skillset Created

## SplitSkill

```json
maximumPageLength = 2000
pageOverlapLength = 500
```

Purpose:

- Split document into chunks
- Preserve context between chunks

## AzureOpenAIEmbeddingSkill

Model:

```text
text-embedding-3-small
```

Output field:

```text
text_vector
```

Dimensions:

```text
1536
```

---

# Indexing Results

Original PDF:

```text
1 document
```

Chunks created:

```text
54 chunks
```

Search Explorer showed:

```json
"@odata.count": 54
```

This confirmed successful chunking and indexing.

---

# Search Verification

Query:

```text
What are the capabilities of SAP Analytics Cloud?
```

Returned:

- User Management
- SSO & Authentication
- Role Management
- Data Access Control
- Audit Logs
- System Monitoring

Result quality:

Relevant and document-grounded.

---

# Vector Search Verification

Test 1

Query:

```text
Monte Carlo simulation
```

Returned:

```text
Compass
```

---

Test 2

Query:

```text
estimating uncertain business outcomes
```

Returned:

```text
Compass
```

Even though wording differed from the source document.

---

# Proof That Vector Search Was Executed

Search payload contained:

```json
"vectorQueries": [
  {
    "fields": "text_vector",
    "text": "estimating uncertain business outcomes"
  }
]
```

This proves:

1. Query embedding was generated.
2. Search executed against text_vector.
3. Vector retrieval was used.

---

# Retrieval Mode Confirmed

The query used:

```json
"queryType": "semantic"
```

and

```json
"vectorQueries": [...]
```

Therefore retrieval mode is:

```text
Hybrid Search
=
Keyword Search
+
Vector Search
+
Semantic Reranking
```

This is Microsoft's recommended RAG retrieval strategy.

---

# Costs Discussion

## Blob Storage

Very low cost for learning projects.

## Embeddings

text-embedding-3-small is inexpensive.

Typical SAP documentation indexing costs only a few cents.

## AI Search

Primary service to monitor for costs.

## Student Subscription

Subscription:

```text
Azure for Students
```

Remaining credits:

```text
~$50
```

Suitable for experimentation and learning.

---

# Troubleshooting Guide

## Indexer stuck in progress

Check:

```text
Indexer Execution History
```

Look for:

```text
TooManyRequests
RateLimitReached
```

Solution:

Increase TPM.

---

## Document count remains zero

Verify:

```text
Blob file exists
Indexer status
Embedding deployment status
```

---

## Embedding deployment unavailable

Possible cause:

```text
Region compatibility issue
```

Solution:

Use a supported Azure OpenAI / Foundry region.

---

## Skill execution failure

Inspect:

```text
Web Api response details
```

Most useful diagnostic location.

---

# Current Status

Completed:

- Blob Storage setup
- AI Search setup
- Foundry setup
- Embedding deployment
- Chunking
- Vector indexing
- Semantic search
- Vector search validation
- Hybrid retrieval validation

---

# Recommended Next Steps

## Option 1 (Recommended)

Deploy a chat model:

```text
GPT-4o Mini
Phi
GPT-4o
```

Then build:

```text
Question
   ↓
Azure AI Search
   ↓
Relevant Chunks
   ↓
Chat Model
   ↓
Final Answer
```

This becomes a complete SAP RAG chatbot.

## Option 2

Add more SAP documentation:

- SAP Notes
- Implementation Guides
- User Manuals
- Help Documentation

## Option 3

Build an application:

```text
React Frontend
      ↓
API Layer
      ↓
Azure AI Search
      ↓
Azure OpenAI
```

---

# Final Outcome

A fully functioning Azure-based RAG retrieval system was successfully built and validated using:

- Azure Blob Storage
- Azure AI Search
- Azure AI Foundry
- text-embedding-3-small
- Hybrid Search (Vector + Semantic)

The system successfully retrieves relevant SAP Analytics Cloud content using semantic meaning rather than exact keyword matching.
