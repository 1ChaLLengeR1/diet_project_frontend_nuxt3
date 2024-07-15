# EN
# Project Diet - Nuxt
### This is my sixth full stack project based on Nuxt - Golang - Auth0 API

### Project Diet
<img align="left" alt="photo" src="https://github.com/1ChaLLengeR1/1ChaLLengeR1/blob/main/images/diet.png" /> 

- link to the page: https://projektdieta.strona.arturscibor.pl/
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

# PL
# Projekt Dieta - Nuxt
### To jest mój szósty full stack projekt oparty na Nuxt - Golang - Auth0 API

### Projekt Dieta
<img align="left" alt="photo" src="https://github.com/1ChaLLengeR1/1ChaLLengeR1/blob/main/images/diet.png" /> 

- link do strony: https://projektdieta.strona.arturscibor.pl/
- podobne informacje: https://arturscibor.pl/projects/project/f0faa618-7e9a-446a-849f-374c976d9524

# Pomysł na projekt:
###### Pomysł na ten projekt pojawił się zaraz po zakończeniu mojego bezpłatnego stażu. Zauważyłem, że oprócz wiedzy i doświadczenia, które zdobyłem, nie miałem nic konkretnego do pokazania poza wpisem na LinkedIn. Postanowiłem więc zbudować kompleksową aplikację opartą na wcześniejszym projekcie, który pomagał mi zarządzać dietą. W ciągu trzech miesięcy stworzyłem minimalistyczną aplikację, która zapisuje codzienne statystyki diety i zdjęcia, oferując tygodniowe podsumowania i śledzenie postępów. Ten projekt jest demonstracją moich praktycznych umiejętności i doświadczenia zdobytego podczas stażu, podkreślając moją zdolność do stosowania zdobytej wiedzy w praktyce.

## Panel Logowania:
#### Login: guest@gmail.com
#### Hasło: test123@

###### Możesz zalogować się, aby uzyskać dostęp do panelu administracyjnego. Każda funkcja jest ograniczona w zależności od roli użytkownika przypisanej do konta. Ze względów bezpieczeństwa, niektóre funkcje są wyłączone.

# Technologie:
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

# Instalacja Frontendu
```bash
    git clone https://github.com/1ChaLLengeR1/diet_project_frontend_nuxt3.git
    cd diet_project_frontend_nuxt3
    yarn install
    yarn dev
```
### Jeśli wystąpi problem z uruchomieniem, usuń yarn.lock i powtórz kroki uruchomienia.

# Uruchamianie Testów
``` bash 
    yarn test:cypress-dev -> launch the developer window
    yarn test:cypress -> It runs tests under the hood, but you need to run the live application: yarn dev and run the backend
```

# Instalacja Backend
```bash
    git clone https://github.com/1ChaLLengeR1/diet_project_server_golang.git
    cd diet_project_server_golang
    go install
    go run main.go
```

# Implementacja tabel diet na localhost
``` bash
    up: migrate -path consumer/database/migration/ -database "postgresql://postgres:password_and_databaseName_and_port/diet?sslmode=disable" -verbose up
    down: migrate -path consumer/database/migration/ -database "postgresql://postgres:password_and_databaseName_and_port/diet?sslmode=disable" -verbose down
```
## Artykuł pomocny w migracji tabeli do bazy danych
### link: https://www.freecodecamp.org/news/database-migration-golang-migrate/

# Uruchamianie Testów
``` bash 
   go test ./... 
```


