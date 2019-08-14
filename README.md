# React Fronted App

* Create React App with FIXED top nav bar, customizable side menu and main page.
* Supports browsers HTML5 history API with react-router-dom browser history.
* Search for pages using the search button in top nav bar and some refactoring

![Dashboard](https://i.ibb.co/p1YRq4g/Screen-Shot-2019-08-14-at-12-13-52-PM.png)
![LightMode](https://i.ibb.co/p0vQmcV/Screen-Shot-2019-08-14-at-12-14-05-PM.png")
![Search Page](https://i.ibb.co/5v1gqPk/Screen-Shot-2019-08-14-at-12-14-17-PM.png")

## Built with

- React typescript starter kit
- Blueprintjs
- CSS Grid for layout management

Just add your page component `./src/pages/MyPage.tsx` and add it to the sidebar menu here:
`./src/pages/Pages.tsx`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Basic Files

To get a basic dashboard layout up and running, please use create react app (with
typescript support) to create a new app and then copy the following files to get started.

Basic files to get a fixed top nav bar, fixed side menu and a main page layout

- `./src/index.css`: blueprint css file and `./src/Dashboard.css` css files included
- `./src/css/dashboard.css`: css added for dashboard page
- `./src/css/login.css`: css added for login page
- `./src/pages/Dashboard.tsx`: Main dashboard page which displays top nav bar, side menu and a main page based on route
- `./src/pages/Pages.tsx`: Lists all pages of the dashboard app in one place for side menu and main page
- `./src/pages/Login.tsx`: Login page layout
- `./src/pages/React.tsx`: Basic react page
- `./src/components/TopNavBar.tsx`: Top nav bar
- `./src/components/SideMenu.tsx`: Side menu bar with links to all pages in the app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
