Node: v18.15.0

npm: v9.5.0

Next.js: v13.2.4


## How to clone, install and run this project.

First, clone this project by following stepes:

```bash
git clone https://github.com/JulioLugo00/eHome.git
```

Second, install all the necessary modules of the project:

```bash
npm install --legacy-peer-deps
```

Third, generate prisma database with the following command:

```bash
npx prisma generate
```

IMPORTANT: It's necessary to add the environment file, since it contains the access keys and sensitive data, it is not included in the repository, it is necessary to create the '.env' file in the main folder.

Finally, run the project with the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cómo obtener las credenciales para el google traductor y google maps

https://www.youtube.com/watch?v=Sjl9ilOpHG8&t=127s  seguir aproximadamente el tutorial hasta minuto 5:00 y después copiar el archivo de quickstart como la variable CREDENTIALS en el .env como se muestra en el minuto 8:44 
https://www.youtube.com/watch?v=iP3DnhCUIsE&t=1509s  Obtener NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, en el video se llama REACT_APP_GOOGLE_MAPS_API_KEY y activar Directions api, places api y maps javascript api, es hasta el minuto 5:18