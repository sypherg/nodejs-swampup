node {
    def rtServer = Artifactory.newServer url: ART_URL, credentialsId: CREDENTIALS
    def buildInfo = Artifactory.newBuildInfo()
    buildInfo.env.capture = true
   echo 'npm test'
   stage 'Build'
        git url: 'https://github.com/williammanning/nodejs-swampup.git'
   stage('npm-build') {
        echo 'stage'
        sh 'npm config set registry http://35.188.216.43/artifactory/api/npm/npm-local/'
        sh 'npm config set @npm-local:registry http://35.188.216.43/artifactory/api/npm/npm-local/'
        sh 'npm publish --registry http://35.188.216.43/artifactory/api/npm/npm/'
        withNPM(npmrcConfig:'9d2604b5-413a-4ddf-b9e5-ff9aa76916ab') {
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
