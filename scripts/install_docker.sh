#!/bin/bash

echo "########################################################"
echo "###                                                  ###"
echo "### This script install Docker CE and Docker-Compose ###"
echo "###                                                  ###"
echo "### Warning : Due to the newgrp command, this script ###"
echo "### auto relog you for the first installation (only).###"
echo "###                                                  ###"
echo "########################################################"


echo "Let's go ?"
read -r answer

echo " "
echo "Install Dependency packages"
sudo apt -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common

echo "Add Docker's Official GPG Key"
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker-archive-keyring.gpg

echo "Add Docker repository"
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

echo "Update source list"
sudo apt update

echo "Install Docker CE and CLI"
sudo apt install docker-ce docker-ce-cli containerd.io -y

echo "Add his user account to docker group"
sudo usermod -aG docker $USER
newgrp docker << END

echo "Download last compose"
curl -s https://api.github.com/repos/docker/compose/releases/latest | grep browser_download_url  | grep docker-compose-linux-x86_64 | cut -d '"' -f 4 | wget -qi -

echo "Make binary executable"
chmod +x docker-compose-linux-x86_64

echo "Move compose to the PATH"
sudo mv docker-compose-linux-x86_64 /usr/local/bin/docker-compose

END

sudo su $USER

echo "############################"
echo " "
docker version
docker-compose version

exit 0