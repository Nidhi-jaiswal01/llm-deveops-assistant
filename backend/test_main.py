from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "LLM DevOps Assistant is running"}

def test_analyze_returns_200():
    mock_response = MagicMock()
    mock_response.choices[0].message.content = "1) Root cause: missing module\n2) Fix: pip install requests"
    
    with patch("main.client.chat.completions.create", return_value=mock_response):
        response = client.post("/analyze", json={"log": "ERROR: ModuleNotFoundError"})
        assert response.status_code == 200
        assert "analysis" in response.json()

def test_analyze_empty_log():
    mock_response = MagicMock()
    mock_response.choices[0].message.content = "No log provided"
    
    with patch("main.client.chat.completions.create", return_value=mock_response):
        response = client.post("/analyze", json={"log": ""})
        assert response.status_code == 200

def test_analyze_missing_field():
    response = client.post("/analyze", json={})
    assert response.status_code == 422