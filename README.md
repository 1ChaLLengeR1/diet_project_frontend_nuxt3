# EN
# Project Diet - Nuxt
### This is my sixth full stack project based on Nuxt - Golang - Auth0 API

### Project Diet
<img align="left" alt="photo" src="https://github.com/1ChaLLengeR1/1ChaLLengeR1/blob/main/images/diet.png" /> 

- link to the page: 
- similar information: https://arturscibor.pl/projects/project/f0faa618-7e9a-446a-849f-374c976d9524

# Project idea:
###### The idea for this project emerged right after completing my unpaid internship. I realized that aside from the knowledge and experience I gained, I had nothing tangible to showcase beyond a LinkedIn post. To address this, I decided to build a comprehensive application based on a previous project that helped me manage my diet. Over three months, I developed a minimalist app that records daily diet statistics and photos, providing weekly summaries and progress tracking. This project serves as a demonstration of my practical skills and experience gained during my internship, highlighting my ability to apply what I've learned in a meaningful way.

## Login Panel:
#### Login: guest@gmail.com
#### Password: test123@

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
- Biblioteka Gin
- Biblioteka SQL
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
