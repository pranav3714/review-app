## Review application built using React Native and ExpressJS

### Notes to run:

1) This repository contains two main folders.  
client-side-react-native => Contains the files and components for building react native android application.  
server-side => Contains the files for server side API calls. 
2) Create a tmdb api key [from here.](https://developers.themoviedb.org/3/getting-started/introduction) (For collecting realtime movie data)
3) Create a sendgrid API key [from here.](https://sendgrid.com/docs/API_Reference/api_getting_started.html) (For sending verification email to the users registering to the the app.)
4) Inside the client-side-react-native/assets/key folder create a file named tmdbKeys.js in the format given below.
```bash
export default apiKey = "create and add your tmdb api key here"
```
5) Inside the server-side folder create a .env file in the following format.
```bash
DB_HOST=your_mongo_db_connection_string_goes_here
JWT_SECRET=random_password_goes_here
SENDGRID_API_KEY=sendgrid_api_key_goes_here
```
### Clone and install dependancy:
1) Clone this repo and change to project direcoriy using the command.
```bash
git clone https://github.com/pranav3714/review-app.git && cd review-app
```
2) Install the dependencies for client.
```bash
cd client-side-react-native && npm i && cd ..
```
3) Install the dependencies for API server.
```bash
cd server-side && npm i && cd ..
```
### How to run? (for development)

We will need two terminals simultaneously one for client-side-react-native and other for server-side
#### Commands for terminal 1(assuming you are in the project root directory):
```bash
cd client-side-react-native
npx react-native run-android && npm start
```
##### Note:  
1) Make sure an android emulator is running or a physical device is connected before running the above commands.
2) For more information on how to run react-native apps [click here.](https://reactnative.dev/docs/environment-setup)

#### Commands for terminal 2(assuming you are in the project root directory):
```bash
cd server-side
node app.js
```
