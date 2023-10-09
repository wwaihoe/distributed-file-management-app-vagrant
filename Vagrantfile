Vagrant.configure("2") do |config|
  config.vm.boot_timeout = 600

  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/mantic64"
    web.vm.provision "shell", path: "provision/webappsetup.sh", privileged: false
    web.vm.network "private_network", ip: "10.0.2.15"
    web.vm.network "forwarded_port", guest: 8000, host: 8888
  end

  config.vm.define "applogic" do |applogic|
    applogic.vm.box = "ubuntu/mantic64"
    applogic.vm.provision "shell", path: "provision/applogicsetup.sh", privileged: false
    applogic.vm.network "private_network", ip: "10.0.2.20"
  end

  config.vm.define "objectstore" do |objectstore|
    objectstore.vm.box = "ubuntu/mantic64"
    objectstore.vm.provision "shell", path: "provision/miniosetup.sh", privileged: false
    objectstore.vm.network "private_network", ip: "10.0.2.25"
  end
end