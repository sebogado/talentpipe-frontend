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
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app kimosproject/react-app'
        sh 'docker login -u soyseeb -p Palmeras61212'
        sh 'docker push kimosproject/react-app'
        sh 'docker rmi -f react-app kimosproject/react-app'
      }
    }
  }
  catch (err) {
    throw err
  }
}
