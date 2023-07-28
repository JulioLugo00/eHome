Node: v18.15.0

npm: v9.5.0

Next.js: v13.2.4

## How to clone, install and run this project.

First, clone this project by following stepes:

```bash
git clone https://github.com/IsmaelOr/eHome.git
```

Second, install all the necessary modules of the project:

```bash
npm install
```

Third, generate prisma database with the following command:

```bash
npx generate prisma
```

IMPORTANT: It's necessary to add the environment file, since it contains the access keys and sensitive data, it is not included in the repository, it is necessary to create the '.env' file in the main folder.

Finally, run the project with the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.