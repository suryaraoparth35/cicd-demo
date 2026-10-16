pipeline {
    agent any

    environment {
        IMAGE_NAME = 'prthxd/cicd-demo'
        IMAGE_TAG  = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t "$IMAGE_NAME:$IMAGE_TAG" .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''printf '%s' "$DH_PASS" | docker login --username "$DH_USER" --password-stdin'''
                    sh 'docker push "$IMAGE_NAME:$IMAGE_TAG"'
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh 'sed "s|IMAGE_PLACEHOLDER|$IMAGE_NAME:$IMAGE_TAG|" k8s/deployment.yaml | kubectl apply -f -'
                sh 'kubectl apply -f k8s/service.yaml'
                sh 'kubectl rollout status deployment/cicd-demo --timeout=120s'
            }
        }

        stage('Verify') {
            steps {
                sh 'kubectl get pods'
                sh 'kubectl get deployment cicd-demo'
                sh 'kubectl get svc cicd-demo-service'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}