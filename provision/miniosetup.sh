sudo apt update

cd /vagrant/minio
sudo apt install -y nodejs
sudo apt install -y npm
npm install
npm install --save multer

wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20230923034750.0.0_amd64.deb -O minio.deb
sudo dpkg -i minio.deb

groupadd -r minio-user
useradd -M -r -g minio-user minio-user
chown minio-user:minio-user /vagrant/minio

sudo systemctl start minio.service

sudo systemctl status minio.service
journalctl -f -u minio.service

npm install --save minio