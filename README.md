In 2012, I lost my Father, a great  and knowledgeable man. 
I didn’t have the privilege of knowing him and we had just started building a good relationship the year before he died. 
This has always made me feel sad and I imagine all the things that he would have wanted to tell me or teach before his untimely death. 
This life experience urged me to create something that’ll help people to not feel the irreparable loss that I feel everytime I think of my father. 
I’ve had the idea for a long time and so I started the long and adious journey of building Capsool. 
I didn’t have enough skill and knowledge to execute this idea of mine until I found the ALX school which has taught me a whole lot since I enrolled.

This is my Capsoool project : A mobile app for storing people’s wills electronically or as I like to call them, capsoools.

**The idea is to have a time capsule of one’s life to leave for your family.**

It gives one the opportunity to save videos, images, voice messages and the messages that can be kept and sent to the family members after one’s demise.

**The languages and technical skills that were used are:**


**BACKEND:**

- Python backend
- Flask framework
- bcrpyt
- SQLAlchemy for DB models
- SQLLITE3 DB to be changed to MySQL or PostGress on production


**FRONTEND:**

- Typescript frontend
- React Native with Expo
- Expo router
- Nativewind CSS
- Node package manager



**HOW TO RUN THE APP**
First you need to run the backend from the root folder:
in capsoool_project directory run the command "python3 app.py"

after running that open a different terminal and cd to the frontend folder
in the frontend folder run:

npx expo start
or
npx expo start -c (to clear cache)

Once the frontend is up and runing you can either run the program in ios app using the command: 'i'

or you can run it on web using "w".

from there you can navigate through the app:
- signup to create an account,
- login with the email and pasword you creted
- hit the create button to create a capsoool. all fileds must contain something. write a message you would like to live behid for your family.
- after that you can press and hold down (holding down does not work on web) to delete the entry.
- or you can click it once to edit the entry.



**A default login and password you can use if you do not want to sign up is:**
email: ita@example.com
password: 123456

The database is sqlite and is also contained in the project folder so that you can see changes that are going on as you made them.
The passwords are hashed and not stored directly in string. But functionality for stronger passwords have not yet been added.

In the web app you can view user API's that I created. using "api.localhost:5000". I used a blueprint to create the api route. I made the api a subdomain as I see in most industry standard apps.

The router files for the api is located at "capsoool_project/routes" the models for the database are located in "capsoool_project/models"

I use a basemodel.py file to set certain things that are constant throughout all the database tables such as "id" and "created_at".

The "text.py", "trusted.py" and "user.py" are files that i run to insert default default data in the database for testing purposes. just so the created database has some data.
