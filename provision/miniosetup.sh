sudo usermod -aG sudo vagrant

sudo apt update

cd /vagrant/minioclient
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y systemd

sudo ln -s `which nodejs` /usr/local/bin/node

npm install --no-bin-links
npm config set bin-links false
npm config set strict-ssl false

npm install -g npm@latest

npm install
npm install express
npm install --save minio

wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20230923034750.0.0_amd64.deb -O minio.deb
sudo dpkg -i minio.deb

chown vagrant:vagrant /vagrant/minioclient