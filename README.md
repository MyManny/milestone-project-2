# Wander List - Your Travel Companion

## Inspiration

We Believe that travel is more than just reaching your destination; it's about the journey and all the experiences along the way. The inspiration of Wander List comes from the desire to not only simplify the process, but also enhance the excitement of your next adventure.

## How to Run Wander List

<a name="run"></a>

To run Wander List locally, follow these steps:

1. **Fork and Clone the Repository:**
   - Fork the Wander List repository to your GitHub account.
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/your-username/wander-list.git
     ```

2. **Navigate to Client and Server Directories:**
   - Open a terminal window and navigate to the `client` directory:
     ```bash
     cd client
     ```
   - Open a separate terminal window and navigate to the `server` directory:
     ```bash
     cd server
     ```

3. **Run the Server:**
   - In the `server` directory, run the server using nodemon with the following command:
     ```bash
     nodemon
     ```
     This will start the server.

4. **Run the Client:**
   - In the `client` directory, run the application using npm with the following command:
     ```bash
     npm start
     ```
     This will open the Wander List application in your default web browser.

5. **Access Wander List:**
   - With the server and client running, you can access Wander List by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

And you're in! Now you can explore Wander List on your local machine.

## Usage

Wander List is designed to simplify your travel planning process. Follow these steps to get started:

1. **Sign up or Log In**: Create an account or log in to your existing account to access your travel lists.

2. **Create Lists**: Click the "Add List" butto to create a new travel List. Give it a name and start adding items such as destinations, activities, and notes.

3. **Update and Edit**: Easily update or edit your lists at any time. Add new items, remove existing ones, or modify the list name.

4. **Access Anywhere**:  Your travel lists can be accessible from any device with an internet connection. They stay in sync accross all your devices.

5. **Stay Organized**: Keep all your travel ideas and plans neatly organized in one place, making it easy when to refrence when you're on the go.

## Technologies Used

Wander List is built using modern web technologies, making it reliable and user friendly.

- **React**: Powering the frontend user interface.
- **Node.js**: Handling server and backend logic.
- **Express**: Creating a RESTful API for seamless communication.
- **PostgreSQL**: Securely storing and managing user and travel list data.
- **CSS**: Crafting a visually appealing user interface using plain ol' CSS.


## Known Issues

Here are the current issues we're aware of:

- [Issue 1]: The deployed version of our app currently is experiencing a login bug where users aren't able to login to their accounts. It is for that reason that we will not be providing a link to our deployed app at this time. However, users can still access the Wander List by forking and cloning this repo and running it on their local machine. To learn how to, please refer back to the [How to Run Wander List](#run) section.

- [Issue 2]: 

## Contributors

A special thanks to the great group of people who collaborated with me on this project:
 
- [Seth Goodman](https://github.com/sethgoody)
- [Benjamin McConnaughy](https://github.com/MyManny)
- [Brett Kendrick](https://github.com/BrettKendrick)
- [David Vidal](https://github.com/davidvid1)

## Changelog

### Version 1.0.0 (2023-11-07)

- Initial release of Wander List.
- Added core features for travel planning.