https://rplace.transcendons.fr/


Run le projet :

- Installer docker. Pour cela, je recommande d'installer Docker Desktop directement depuis un navigateur. Bien plus simple et fonctionnel qu'en ligne de commandes.
- Lancer docker desktop
- git clone git@github.com:il94/r-Place.git && cd r-Place
- Remplir les 3 fichiers d'environnements .env (obligatoire car 3 containers). Le premier se trouve a la racine du projet, les deux autres sont respectivement a la racine du dossier front et du dossier back.
  Des .env-exemples sont a votre disposition, mais en cas de doute, je donne des modeles plus bas qu'il n'y aura qu'a copier coller.

- Une fois les 3 fichiers remplis : docker-compose up --build

Une fois les conteneurs lances, vous pourrez y acceder aux urls fournis. (Dans mes modeles, le front tourne sur localhost:5173 et le back loacalhost:3000.


MODELES :


===================
.env racine (docker-compose)

POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database
POSTGRES_PORT=5432
DATABASE_URL=`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB}:${POSTGRES_PORT}/database?schema=public`





===================
.env front

VITE_IP_BACK=localhost
VITE_PORT_BACK=3000

VITE_URL_BACK=`http://$VITE_IP_BACK:$VITE_PORT_BACK`




===================
.env back


POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database
POSTGRES_PORT=5432

DATABASE_URL=`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB}:${POSTGRES_PORT}/database?schema=public`

JWT_SECRET=fd047b28ab00ae07db724823cf0e55d0f122a2f1c179b6be175ff7d35b8ef5e6
JWT_REFRESH_SECRET=fd047b28ab00ae07db724823cf0e55d0f122a2f1c179b6be175ff7d35b8ef5e6

IP_FRONT=localhost
IP_BACK=localhost
PORT_FRONT=5173
PORT=3000

URL_FRONT=http://{IP_FRONT}:{PORT_FRONT}
URL_BACK=http://{IP_BACK}:{PORT_BACK}
