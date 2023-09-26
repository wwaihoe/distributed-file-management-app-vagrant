Vagrant.configure("2") do |config|
  config.vm.boot_timeout = 600
  config.vm.provider :virtualbox do |vb|
    vb.gui = true
  end

  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/focal64"
    web.vm.provision "shell", path: "provision/setup.sh", privileged: false
    web.vm.network "forwarded_port", guest: 8080, host: 8000
  end

#  config.vm.define "applogic" do |applogic|
#    applogic.vm.box = "ubuntu/focal64"
#  end

#  config.vm.define "objectstore" do |objectstore|
#    objectstore.vm.box = "ubuntu/focal64"
#  end
end