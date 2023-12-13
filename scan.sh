export SONAR_HOST=172.17.0.2:9000
export SONAR_TOKEN=4be685c939a1a8ca0184c6b09281881521ecdd86
export PROJECT_KEY=apidocker
export REPO=$(pwd)
export CONFIG_FILE=$(pwd)/sonar-project.properties

docker run \
    --rm \
    -e SONAR_HOST_URL="http://${SONAR_HOST}" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${PROJECT_KEY}" \
    -e SONAR_LOGIN="${SONAR_TOKEN}" \
    -v "${REPO}:/usr/src" \
    -v $CONFIG_FILE:/opt/sonar-scanner/conf/sonar-scanner.properties \
    sonarsource/sonar-scanner-cli