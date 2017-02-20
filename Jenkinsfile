moduleName = 'nav-frontend-moduler'
moduleUrl = 'https://nav.no'
moduleChannel = 'natthauk-ops'

node {
    stage('Checkout') {
        checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default', submoduleCfg: [], userRemoteConfigs: [[url: 'ssh://git@stash.devillo.no:7999/navfront/nav-frontend-moduler.git']]])
    }

    stage('Install') {
        sh "npm run installAfterConfig"
    }

//    stage('Lint') {
//        sh "npm run lint"
//    }

    stage('Test') {
        sh "npm test"
    }

    stage('Build') {
        sh "npm run build"
    }

    stage('Prepare publish') {
        sh "npm run CI:pre"
    }

    stage('Publish') {
        sh "npm run CI:publish"
    }
}

chatmsg = "**[${moduleName}](${moduleUrl}) Bygg OK**"
mattermostSend channel: moduleChannel, color: 'good', message: chatmsg