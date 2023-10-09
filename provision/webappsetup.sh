sudo usermod -aG sudo vagrant

sudo apt update

cd /vagrant/webapp
sudo apt install -y nodejs
sudo apt install -y npm

sudo ln -s `which nodejs` /usr/local/bin/node

npm install --no-bin-links
npm config set bin-links false
npm config set strict-ssl false

sudo npm install -g npm@latest

npm install
npm install express
