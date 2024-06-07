# Welcome to `Pryaniky` pet project

Simple application represents table with data from the server and an 
authorization page. This application is capable of storing data in 
a convenient table, as well as deleting, adding and editing existing 
data. When adding and editing data, temporary storage is used, so 
in case you are experiencing a poor Internet connection, you will see
the current state of the data.

This project has been created using **webpack-cli**. All available 
scripts you can find at the bottom of this page.

### This project uses: 
* React | React Routes
* State managment - Redux | RTK 
* Typescript
* Material UI
* Universal cookie


### Gh-pages:

https://L1ghT0.github.io/Pryaniky

### To login:

login: `user{id}` (where id - any number)\
password: `password`

Example:\
login: `user123`\
password: `password`

#### The application consists of:
- Login page
- Table with data received from the server (The table supports CRUD operations)



#### Available scripts:
```
npm run build
```

or

```
npm run build:prod
```

to bundle your application in production 

```
npm run build:dev
```

to bundle your application in development

```
npm run watch
```
turns on watch mode. This means that after the initial build, 
webpack will continue to watch for changes in any of the resolved 
files.

```
npm run serve
```

runs webpack-dev-server. 
