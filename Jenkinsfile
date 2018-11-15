#!/usr/bin/env groovy

pipeline {
    agent {
        docker {
            image 'node:8-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }

    stages {
        stage('checkout') {
                checkout scm
            }
        stage('Prepare') {
            steps {
                sh "npm install -g yarn"
                sh "yarn install"
            } }

        stage('Build') {
            steps {
                sh "yarn build"
                dir('build') { stash name: 'www', includes: 'www/**' }

            }
        }
        stage('Deploy - Testing') {
            steps {
                unstash 'www'
                sh "ls -lart /media/DeployAngular/Testing"
                sh "rm -rf /media/DeployAngular/Testing/prestaciones/"
                sh "mkdir -p /media/DeployAngular/Testing/prestaciones/"
                sh "cp -r www /media/DeployAngular/Testing/prestaciones"
                sh "ls -lart /media/DeployAngular/Testing"
                sh "ls -lart /media/DeployAngular/Testing/prestaciones"
            }
        }
    }
}
