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
                sh 'docker build -t llm-devops-backend ./backend'
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
    }
}
    }

    post {
    failure {
        echo 'Build failed! Sending logs to AI analyzer...'
        sh '''
            LOG=$(cat /var/jenkins_home/workspace/llm-devops-pipeline/build.log 2>/dev/null || echo "Build failed - check Jenkins console")
            curl -s -X POST http://localhost:8000/analyze \
                -H "Content-Type: application/json" \
                -d "{\"log\": \"$LOG\"}" \
                || echo "Could not reach analyzer"
        '''
    }
    success {
        echo 'Build succeeded!'
    }
}
}