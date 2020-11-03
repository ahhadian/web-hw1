# web-hw1
## Quick start
You should first install nginx web server
## Nginx Installation

### For Ubuntu Server:

```
sudo apt-get update
sudo apt-get install nginx
sudo apt-get install ufw
sudo ufw app list
```
You should see this output:

```
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

```
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'OpenSSH'
sudo ufw status
```
You should see this output:
```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```
```
sudo systemctl restart ufw
```

Now you should check if Nginx is running: 
```
sudo systemctl status nginx
```
You should see this output:
```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```
### For Centos:

```
sudo yum install epel-release
sudo yum install nginx
sudo systemctl start nginx
sudo yum install firewalld
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --permanent --zone=public --add-service=ssh
sudo firewall-cmd --reload
```
Now you should check if Nginx is running: 
```
sudo systemctl status nginx
```
You should see this output:
```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```
## Server Deployment
### Golang Installation
You should first download golang from https://golang.org/doc/install
After downloading execute these commands:
```
tar -C /usr/local -xzf go1.15.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version
```
If you saw version of go in the terminal, it means golang has installed porperly

### Nodejs Installation
Execute the following commands:
```
sudo apt-get upate
sudo apt-get install nodejs
sudo apt install npm
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
node -v
npm -v
yarn --version
```
If you saw version of node, npm, and yarn it means nodejs, npm and yarn has installed properly

### Cloning the Repository
After installing go and node, clone our repository in your home directory with the following command
```
git clone [LINK-OF-OUR-REPO]
```
### Nodejs Server Deployment
You should install some modules for nodejs by following commands:
```
cd ~/web-hw1/nodejs
yarn add express
yarn add cors
yarn add nthline
```
Now you should create a systemd unit file in order to run nodejs server with it:
```
sudo nano /lib/systemd/system/nodeweb.service
```
Copy and paste following lines in this file and save it
```
[Unit]
Description=goweb

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/usr/bin/node /home/kasra/hw1/web-hw1/nodejs/index.js

[Install]
WantedBy=multi-user.target
```
Now start and enable your new service by the following commands:
```
sudo systemctl start nodeweb.service
sudo systemctl enable nodeweb.service
sudo systemctl status nodeweb.service
```
You should see the following output if your service is working properly:
```
● nodeweb.service - goweb
     Loaded: loaded (/lib/systemd/system/nodeweb.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-11-03 15:45:19 UTC; 1h 15min ago
   Main PID: 22099 (node)
      Tasks: 7 (limit: 4587)
     Memory: 16.3M
     CGroup: /system.slice/nodeweb.service
             └─22099 /usr/bin/node /home/kasra/hw1/web-hw1/nodejs/index.js

Nov 03 15:45:19 server1 systemd[1]: nodeweb.service: Scheduled restart job, restart counter is at 1.
Nov 03 15:45:19 server1 systemd[1]: Stopped goweb.
Nov 03 15:45:19 server1 systemd[1]: Started goweb.
Nov 03 15:45:20 server1 node[22099]: App listening at http://127.0.0.1:9991
```
