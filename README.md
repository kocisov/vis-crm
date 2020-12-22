# VIS Projekt - CRM pro Digitální Agenturu

## Instalace

### PostgreSQL Server

```bash
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
$ sudo service postgresql start
$ sudo -u postgres
$ createdb vis
$ psql vis
> ALTER USER postgres WITH PASSWORD 'test';
\q
$ exit
```

### Webová aplikace a Node.js Console

```bash
$ git clone https://github.com/Kocisov/vis-crm.git
$ cd vis-crm
$ yarn # nebo npm install

# Web
$ yarn build # nebo npm run build
$ yarn start # nebo npm start

# Console
$ yarn start:console # nebo npm run start:console
```

### Seed

```bash
# Po instalaci a spuštění Webové aplikace se Seeder se nachází na API vrstvě
$ curl http://localhost:3000/api/seed/full

# count určuje počet záznamů v každé tabulce seederu = count: 50 (default) => 200 záznamů (4 tabulky)
# curl http://localhost:3000/api/seed/full?count=250
```

<!-- ## API Struktura

```
/api
  /seed <http://localhost:3000/api/seed/full>
    /full (vytvoří tabulky a naplní je daty)
    /drop (vymaže data a tabulky)
    /data (naplní tabulky daty)
    /tables (vytvoří tabulky)
```
-->
