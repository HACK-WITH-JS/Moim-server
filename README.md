
```sh
# 도커 mysql 시작
docker run --name mysql -e MYSQL_ROOT_PASSWORD=qwer1234 -d mysql

# 도커 mysql 접속
docker exec -it containerID bash
mysql -u root -p

# prisma 스키마 DB에 반영
npx prisma migrate dev
```