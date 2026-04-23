pipeline {
    agent any
    environment {
    GROQ_API_KEY = credentials('GROQ_API_KEY')
}

    stages {
        stage('Clone') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Build Backend') {
    steps {
        echo 'Building backend Docker image...'
        sh 'docker build --no-cache -t llm-devops-backend ./backend'
    }
}

        stage('Build Frontend') {
            steps {
                echo 'Building frontend Docker image...'
                sh 'docker build -t llm-devops-frontend ./frontend'
            }
        }

        stage('Deploy') {
    steps {
        echo 'Deploying containers...'
        sh 'docker stop llm-backend llm-frontend || true'
        sh 'docker rm llm-backend llm-frontend || true'
        sh 'docker run -d --name llm-backend -p 8000:8000 -e GROQ_API_KEY=$GROQ_API_KEY llm-devops-backend uvicorn main:app --host 0.0.0.0 --port 8000'
        sh 'docker run -d --name llm-frontend -p 80:80 llm-devops-frontend'
        sh 'sleep 5'
        sh 'docker exec llm-backend curl -f http://localhost:8000 || (docker logs llm-backend && exit 1)'
    }
}
    }

    post {
    failure {
        echo 'Build failed! Sending logs to AI analyzer...'
        sh '''
            LOGS=$(docker logs llm-backend 2>&1 | tail -20 || echo "Build failed - no container logs")
            python3 -c "
import urllib.request, json
data = json.dumps({'log': '''$LOGS'''}).encode()
req = urllib.request.Request('http://localhost:8000/analyze', data=data, headers={'Content-Type': 'application/json'})
try:
    res = urllib.request.urlopen(req)
    print(res.read().decode())
except Exception as e:
    print('Could not reach analyzer:', e)
"
        '''
    }
    success {
        echo 'Build succeeded!'
    }
}
}