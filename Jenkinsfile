pipeline {
    agent any

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
                echo 'Deploying with docker-compose...'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        failure {
            echo 'Build failed! Sending logs to AI analyzer...'
        }
        success {
            echo 'Build succeeded!'
        }
    }
}