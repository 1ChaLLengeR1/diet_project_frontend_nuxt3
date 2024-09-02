# EN
# Project Diet - Nuxt
### This is my sixth full stack project based on Nuxt - Golang - Auth0 API

### Project Diet
<img align="left" alt="photo" src="https://github.com/1ChaLLengeR1/1ChaLLengeR1/blob/main/images/diet.png" /> 

- link to the page: https://projektdieta.strona.arturscibor.pl/
- similar information: https://arturscibor.pl/projects/project/702853f2-1f00-4b2f-bbe3-6d5c642936b2

# Project idea:
###### The idea for this project emerged right after completing my unpaid internship. I realized that aside from the knowledge and experience I gained, I had nothing tangible to showcase beyond a LinkedIn post. To address this, I decided to build a comprehensive application based on a previous project that helped me manage my diet. Over three months, I developed a minimalist app that records daily diet statistics and photos, providing weekly summaries and progress tracking. This project serves as a demonstration of my practical skills and experience gained during my internship, highlighting my ability to apply what I've learned in a meaningful way.

# What the project presents:
The project is used by myself on a daily basis to record my diet progress. The project is used for everyday work because it records my every day. The idea behind this is the daily motivation that I have to make progress, because I can later see what I looked like several months ago and how much my figure has changed. It's really just a powerhouse for itself.

## Login Panel:
#### Login: guest@gmail.com
#### Password: test123@
If you want to see what the user panel looks like, you can log in as a guest. This is a completely completed panel for viewing by anyone interested.
### Why is there no "register"?
There is no registration method available because it is disabled for security reasons, as the registration option for "intrusive" users is not possible. Of course, access is possible, but you have to inform me and then access to your own account is possible without any problems.

###### You can log in to access the admin panel. Each function is restricted based on the user's role assigned to the account. For security reasons, certain functions are disabled.

# Technologies:
### Frontend:
- Nuxt
- Pinia
- Vue Router
- Vuetify
- i18N
- VueForm
- Cypress
- TailWindCSS
- Auth0 API
### Backend
- Golang
- Library Gin
- Library SQL
- Auth0 API
- PostgreSql
### DevOps
- Nginx
- My VPS for hosting -> hosting: ovh.pl
- Linux

# Installation Frontend
```bash
    git clone https://github.com/1ChaLLengeR1/diet_project_frontend_nuxt3.git
    cd diet_project_frontend_nuxt3
    yarn install
    yarn dev
```
### If there is a problem with startup, remove yarn.lock and repeat the startup methods again.
### Alternative run
```
docker compose up --build -d   
```

# Run Tests
``` bash 
    yarn test:cypress-dev -> launch the developer window
    yarn test:cypress -> It runs tests under the hood, but you need to run the live application: yarn dev and run the backend
```

# Installation Backend
```bash
    git clone https://github.com/1ChaLLengeR1/diet_project_server_golang.git
    cd diet_project_server_golang
    go install
    go run main.go
```

# Implement diet tables in loclhost
``` bash
    up: migrate -path consumer/database/migration/ -database "postgresql://postgres:password_and_databaseName_and_port/diet?sslmode=disable" -verbose up
    down: migrate -path consumer/database/migration/ -database "postgresql://postgres:password_and_databaseName_and_port/diet?sslmode=disable" -verbose down
```
## article helpful in migrating a table to a database
### link: https://www.freecodecamp.org/news/database-migration-golang-migrate/

# Run Tests
``` bash 
   go test ./... 
```
---
