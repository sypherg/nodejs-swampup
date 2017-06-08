node {
    println ART_URL
    println CREDENTIALS
    def rtServer = Artifactory.newServer url: ART_URL, credentialsId: CREDENTIALS
    def buildInfo = Artifactory.newBuildInfo()
    buildInfo.env.capture = true
   echo 'npm test'
   stage 'Build'
        git url: 'https://github.com/williammanning/nodejs-swampup.git'
   stage('npm-build') {
        echo 'stage'
        sh 'npm whoami'
        sh 'npm config set registry http://35.188.216.43/artifactory/api/npm/npm-local/'
        sh 'npm config set @npm-local:registry http://35.188.216.43/artifactory/api/npm/npm-local/'
        sh 'npm publish --registry http://35.188.216.43/artifactory/api/npm/npm/'
        println NPMRC_REF
        withNPM(npmrcConfig: NPMRC_REF) {
            echo "Performing npm build..."
            sh 'npm install'
        }

        def uploadSpec = """{
                         "files": [
                          {
                           "pattern": "package.json",
                           "target": "npm-local",
                           "flat":"true"
                          }
                          ]
                        }"""
        rtServer.upload(uploadSpec, buildInfo)
        println "what"
        println buildInfo
        println "hey"
        rtServer.publishBuildInfo(buildInfo)
   }
}
