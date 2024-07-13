# Docker Dev Environment Installation

Dieser Ordner / diese Anleitung zeigt dir, wie man mittels Docker eine Umgebung schafft, in der das Projekt **sicher** (=isoliert)
ausgeführt werden kann. Aktuell ist das Setup für Docker auf einem **RaspberrPi 4/5**. Es kann aber auch jedes andere Linux (bspw. Ubuntu Server) verwendet werden.

## Setup
### Raspberry Pi 4
 
- Es reicht ein raspbian lite (headless image / ohne Desktop).
- Dazu den SD-Konfigurator verwenden und schon einen User mit Passwort anlegen.  

#### 1. System updaten
```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install git
```

#### 2. Docker und Docker-Compose installieren (Juli24)

```bash
# Installations-Script downloaden
curl -fsSL https://get.docker.com -o get-docker.sh

# Installations-Script ausführen
sh ./get-docker.sh

# Gruppe erstellen 
sudo groupadd docker

# Benutzer der Gruppe hinzufügen
sudo usermod -aG docker $USER  

# docker-compose downloaden
sudo curl -SL https://github.com/docker/compose/releases/download/v2.28.1/docker-compose-linux-armv7 -o /usr/bin/docker-compose

# ausführbar machen
sudo chmod +x /usr/bin/docker-compose

# Die binary der Gruppe docker hinzufügen
sudo chgrp docker /usr/bin/docker-compose

# Benutzerrechte
# sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
# sudo chmod g+rwx "$HOME/.docker" -R

# Gruppenrichtlinie neu laden
newgrp docker
```

### Repo ziehen

```bash
# In den eigenen Home-Ordner wechseln
cd ~/

# Das Repo ziehen
git clone git@github.com:bogi-hw/hebewerk-starter.git

# In den Ordner wechseln
# würde dann lauten: /home/pi/hebewerk-starter, wenn user pi verwendet wird
cd hebewerk-starter 
```

# Konfigurieren
`.env`-file bearbeiten (ist nicht im Repo)

```bash
cd dev
cp .env.example .env
```

## Development

### Container starten

- Mit dem Start des `docker-compose-dev.yml` wird ein `npm run dev` ausgeführt.  
- Der Webserver ist dann erreichbar unter: `http://RASPBERRYPIHOSTNAMEORIP:3000`

```bash
# ohne  console (detached)
docker-compose -f docker-compose-dev.yml up -d

# mit console
docker-compose -f docker-compose-dev.yml up
```

### Container silent starten
Führt kein `npm run dev` aus.
```bash
# ohne  console (detached)
docker-compose -f docker-compose-dev-silent.yml up -d
```

### App starten
wenn silent
```bash
# In den container gehen
docker exec -it hebewerk-starter_server /bin/sh 

# App starten
npm run dev
```
#### oder:

```bash
# dev
docker exec -it hebewerk-starter_server /bin/sh -c "npm run dev"

# production
docker exec -it hebewerk-starter_server /bin/sh -c "npm run start"

# clean
docker exec -it hebewerk-starter_server /bin/sh -c "npm run clean"

# build
docker exec -it hebewerk-starter_server /bin/sh -c "npm run build"
```

#### npm Modul installieren
Im silent mode
```bash
# reingehen in den container:
docker exec -it hebewerk-starter_server /bin/sh

# und danach
npm install ...

# oder vom Docker-Host direkt ausführen:
docker exec -it hebewerk-starter_server /bin/sh -c "npm install ..."
```

Danach sich das neue `package.json` und `package-lock.json` vom Raspberry auf den IDE-Rechner ziehen (damit es im Repo ist)

## Production
### Image bauen
```bash
docker-compose build --no-cache
```

### Starten
```bash
# silent ohne netzwerk und mounts, nur für build
docker-compose up -d

# mit compose file
docker-compose -f docker-compose-prod.yml up -d
````

### Frontend Build
```bash
# silent ohne netzwerk und mounts, nur für build
docker exec -it hebewerk-starter_server /bin/sh -c "npm run build"
```

### ...
```bash
```


## Workflow
- das Repository lokal auf dem Rechner mit IDE auschecken
- einen (SFTP-)Sync auf die Files, die bei lokaler Änderung automatisch auf dem Raspberry Pi geschoben werden
- lokal ein `npm install` machen (für IDE)
- immer das lokale Repo committen - nicht das vom Raspberry Pi
- `package.json` und `package-lock.json` vom Raspberry ziehen, wenn geändert
- am besten im silent Modus arbeiten und entweder mit der Shell im Container oder vom Docker-Host mit `docker exec`

