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
