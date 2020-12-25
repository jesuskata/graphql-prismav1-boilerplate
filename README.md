# GraphQL Prisma v1 Boilerplate

This is a boilerplate for creating a GraphQL project with Prisma v1 and NodeJS.

- [GraphQL Prisma v1 Boilerplate](#graphql-prisma-v1-boilerplate)
  - [Basic steps to run the project](#basic-steps-to-run-the-project)
    - [Config folder](#config-folder)

## Basic steps to run the project

### Config folder

1. Create a `.config` folder in the root
2. There must be created three files: dev.env, prod.env and test.env
3. Create a `docker-compose.yml` file inside the prisma folder with the following instructions and filling the corresponding inputs according with the db you're gonna use

```yml
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.34
    restart: always
    ports:
    - "4466:4466"
    environment:
      PRISMA_CONFIG: |
        port: 4466
        # uncomment the next line and provide the env var PRISMA_MANAGEMENT_API_SECRET=my-secret to activate cluster security
        # managementApiSecret: my-secret
        databases:
          default:
            connector:
            host:
            database:
            user:
            password:
            ssl:
            rawAccess:
            port:'
            migrations:
```

4. Inside each file you mut provide the following variables:

```env
PRISMA_ENDPOINT=http://localhost:4466/my_project/dev
PRISMA_SECRET=your_secret_password
JWT_SECRET=your_secret_word
```

5. Deploy prisma dev and test environments

```bash
cd prisma
prisma deploy -e ../config/dev.env
prisma deploy -e ../config/test.env
```

6. Install node project

```bash
cd ..
npm i
```

7. Get schema

Change the `.graphqlconfig` file with the env variable

```json
{
    "projects": {
        "prisma": {
            "schemaPath": "src/generated/prisma.graphql",
            "extensions": {
                "prisma": "prisma/prisma.yml",
                "endpoints": {
                    "default": "http://localhost:4466/my_project/dev"
                }
            }
        }
    }
}
```

Run the script to get-schema

```bash
npm run get-schema
```

8. Run the tests

```bash
npm run test
```

9. Run the dev environment

```bash
npm run dev
```

10. Run the prod environment

With prisma cloud you need to create a new server and service, once you've done that, you need to put the new url into the `/config/prod.env`

```env
PRISMA_ENDPOINT=prisma-service-url
```

Now you can deploy the prod environment

```bash
cd prisma
prisma deploy -e ../config/prod.env
```

11. Deploy the node application to Heroku

```bash
cd ..
heroku login
heroku create
```

Copy the url created and now, create the heroku env variables

```bash
heroku config:set PRISMA_ENDPOINT=prisma-service-url PRISMA_SECRET=your_secret_password JWT_SECRET=your_secret_word
# verify the config is ok
heroku config
# commit changes
git add .
npx git-cz
# verify the heroku remote
git remote -v
# push the local changes to prod
git push heroku master
```
