from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "LLM DevOps Assistant is running"}

def test_analyze_returns_200():
    response = client.post("/analyze", json={"log": "ERROR: ModuleNotFoundError: No module named requests"})
    assert response.status_code == 200
    assert "analysis" in response.json()

def test_analyze_empty_log():
    response = client.post("/analyze", json={"log": ""})
    assert response.status_code == 200

def test_analyze_missing_field():
    response = client.post("/analyze", json={})
    assert response.status_code == 422