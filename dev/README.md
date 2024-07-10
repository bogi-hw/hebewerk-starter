# docker / docker-dompose development setup

Aktuell ist das Setup für Docker auf einem RaspberrPi 4/5. Es kann aber auch jedes andere Linux (bspw. Ubuntu Server) verwendet werden.
Arbeitsordner ist: `/home/username/hebewerk-starter`. Von dort wird das Docker-Image gebaut.

## Setup

### Raspberry Pi 4
 
Es reicht ein raspbian lite (headless image). Dazu den SD-Konfigurator verwenden und schon einen User mit Passwort anlegen.  

#### 1.
```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install git
```

#### 2.
```bash
# In den eigenen Home-Ordner wechseln
cd ~/

# Das Repo ziehen
git clone git@github.com:bogi-hw/hebewerk-starter.git

# In den Ordner wechseln
# würde dann lauten: /home/pi/hebewerk-starter, wenn user pi verwendet wird
cd hebewerk-starter 
```

#### 3.
```bash
# In den dev-Ordner gehen
cd dev

# Datei ausführbar machen 
chmod +x ./setup.sh

# Setup-Script ausführen
./setup.sh
```

- installiert docker und docker-compose
- erstellt docker volumes für das Projekt
- erstellt docker netzwerk für das Projekt
- erstellt das docker image (build)

## Development
### Image erstellen
```bash
# mit cache
docker-compose -f docker-compose-dev.yml build

# ohne cache
docker-compose -f docker-compose-dev.yml build --no-cache
```

### Starten

#### Container
```bash
# ohne  console (detached)
docker-compose -f docker-compose-dev.yml up -d

# mit console
docker-compose -f docker-compose-dev.yml up
```

#### App
```bash
# In den container gehen
docker exec -it heberk-starter /bin/sh 

# App starten
npm run dev

# ODER:

# dev
docker exec heberk-starter /bin/sh -c "npm run dev"

# production
docker exec heberk-starter /bin/sh -c "npm run start"

# clean
docker exec heberk-starter /bin/sh -c "npm run clean"

# build
docker exec heberk-starter /bin/sh -c "npm run build"

```

## Production
### Konfigurieren
- `.env`-file bearbeiten

### Image bauen
```bash
docker-compose build --no-cache
```

### Starten
```bash
docker-compose up -d
```


