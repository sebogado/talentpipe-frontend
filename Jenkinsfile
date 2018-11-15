node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
      sh 'docker build -t react-test -f Dockerfile.test --no-cache . '
    }
    stage('Docker test'){
      sh 'docker run --rm react-test'
    }
    stage('Clean Docker test'){
      sh 'docker rmi react-test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t talent-pipe-frontend --no-cache .'
        sh 'docker tag talent-pipe-frontend kimosproject/talent-pipe-frontend'
        sh 'docker push kimosproject/talent-pipe-frontend'
        sh 'docker rmi -f talent-pipe-frontend kimosproject/talent-pipe-frontend'
      }
    }
  }
  catch (err) {
    throw err
  }
}
