#!/bin/bash

echo "#################################"
echo "###                           ###"
echo "###    Install LazyDocker     ###"
echo "###                           ###"
echo "#################################"

echo "Let's go ?"
read -r answer

echo "Download GO library"
wget https://go.dev/dl/go1.19.4.linux-amd64.tar.gz

echo "Unpack Go"
sudo tar -zxvf go1.19.4.linux-amd64.tar.gz

echo "Move go to /usr/local"
sudo mv go /usr/local/

echo "Add env to bashrc shell profile"
echo "# For go installation" >> .bashrc
echo export GOROOT=/usr/local/go >> .bashrc
echo export GOPATH='$HOME'/go >> .bashrc
echo export PATH='$GOPATH'/bin:'$GOROOT'/bin:'$PATH' >> .bashrc

echo "Update shel profile"
source .bashrc

echo "Install LazyDocker"
go install github.com/jesseduffield/lazydocker@latest

exit 0