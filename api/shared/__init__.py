"""Shared package for the SAP SAC Azure Functions API.

Keep package initialization lightweight. Individual functions import only the
service modules they need, so health and content endpoints do not initialize
Azure AI clients during cold start.
"""
