# TODO excercise app

## Intro
This is a demo/excercise app. Written in node.js with:
- express as html server framework
- postgresql as back-end database (users, content)
- express-session as session management engine (no datastore for sessions yet!)
- no frontend framework (yet!)

## API

### GET /
If session is valid, should return a html for viewing to-do list for logged user. If session is not valid (non-existent or expired), should return a html with a login form

### GET /api/todos
If session valid, should return JSON data with all of user's to-do items

### POST /api/login
Should log in user, if supplied with valid username/password

### POST /api/todos
Add new to-do item for user

### PUT /api/todos
Edit existing to-do item

### DELETE /api/todos
Removes existing to-do item