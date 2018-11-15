#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        sh "java -version"
    }

    stage('quality analysis') {
        withSonarQubeEnv('sonar-qube') {
        }
    }

   def dockerImage
       stage('build docker') {
           sh "cp -R src/main/docker build/"
           sh "cp build/* build/docker/"
           dockerImage = docker.build('kimosproject/talent-pipe-frontend', 'build/docker')
        }

    stage('publish docker') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-login') {
            dockerImage.push 'latest'
        }
    }
}
