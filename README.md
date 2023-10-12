# NWLab_DS_bot

## Install
Cloning
```bash
git clone git@github.com:Wikimaru/NWLab_DS_bot.git
```

Install npm
```bash
npm install
```

### If u don't have docker and mysql
install Docker
```bash
curl https://get.docker.com | sh && sudo systemctl --now enable docker
```
pull MySQL image
```bash
docker pull mysql:latest
```
launch MySQL container
```bash
docker run --name mysql -p 3306:3306 -v mysql_volume:/var/lib/mysql/ -d -e "MYSQL_ROOT_PASSWORD=temp123" mysql
```
access MySQL through docker container
```bash
docker exec -it <CONTAINER_ID>  mysql -uroot -p
```
create MySQL user
```
CREATE USER 'nilu'@'172.17.0.1' IDENTIFIED BY 'password';
```
```
GRANT ALL PRIVILEGES ON *.* TO 'nilu'@'172.17.0.1' WITH GRANT OPTION;
```
```
flush privileges;
```
```
exit
```
### Setting
```bash
cd NWLab_DS_bot
```
```bash
nano .env.example
```
- create discord bot => put bot token and client_id to .env \
- create role in discord server and put to editer_role \
- set mysql Host username password \
```
TOKEN=discord_bot_TOKEN
CLIENT_ID=discord_bot_CLIENT_ID
EDITER_ROLE=editer_role_name

HOST=localhost
USER=mysql_username
PASSWORD=mysql_user_password
```
after finish setting
- ctrl+x
- y
- change file name to .env
- y
### Run bot
frist run 
```bash
node .
```
run with pm2
```bash
pm2 start index.js
```
If u don't have pm2
```bash
npm install pm2 -g
```