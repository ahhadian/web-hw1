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

- `sudo yum install epel-release`
- `sudo yum install nginx`
- `sudo systemctl start nginx`
- `sudo yum install firewalld`
- `sudo systemctl enable firewalld`
- `sudo systemctl start firewalld`
- `sudo firewall-cmd --permanent --zone=public --add-service=http `
- `sudo firewall-cmd --permanent --zone=public --add-service=https`
- `sudo firewall-cmd --permanent --zone=public --add-service=ssh`
- `sudo firewall-cmd --reload`
