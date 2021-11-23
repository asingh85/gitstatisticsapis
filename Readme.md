1. Create a new folder. You could use the following commands to create a new folder. Once the folder is created navigate to the folder using the cd command.

mkdir <folder_name>

cd <folder_name>

2. While you are inside the folder, create a new package.json file, using the command given below.

## npm init -y

This above command generates a package.json file, no questions asked. You could use the below command to generate the file by manually providing all the information.
## npm init
It asks for these few details at the time of creation.

a. package name (name for your app)
b. version (1.0.0 - initially)
c. description (a small description for your app)
d. entry point (entry point for the module)
e. test (any test command)
f. author (author of the app)
g. git (git repository url and type)
h. license (MIT/ ISC etc.)
Once the package.json file is created, go ahead and create a 'src' folder. This is where our code will live.

3. Now use the touch command to generate these two files:

## touch index.html - (the page which is rendered and visible to the user)

## touch index.js - (the entry point for our application)

4. Setup an index.html file with the below code and save it.

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>React with Webpack and Babel</title>
    </head>
    <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
            <!-- This div is where our app will run -->
        </div>
    </body>
</html>

Note: The file should look like the screenshot below.
Leave the index.js as it is for now. We will configure it after installing all the required packages.

index.html

5. Now let's add Webpack to our project.
Install these packages through npm or yarn, whichever you prefer.

## npm install webpack webpack-cli webpack-dev-server --save-dev

webpack allows us to configure our app, webpack-cli helps us to use webpack on command line, webpack-dev-server is used to live reload the webpage so that we can view our changes without refreshing the page manually.

6. Once those packages have been installed, the packages should be visible in the devDependencies section like below.

## package.json

P.S: You may want to remove the caret(ˆ) from the version of the packages, as we don't know whether the new updates might bring breaking changes or not. It's always better to manually update the versions.

7. It's time to add a new file again. Use the touch command as you did above to add the webpack.config.js. It should be installed at the root directory.

## touch webpack.config.js

Let's go ahead and install the path package as a devDependency since we need to work with paths in our app. We wouldn't want to inject the index.js file inside the HTML file. Go ahead and install the html-webpack-plugin to help us do that automatically.

## npm install path html-webpack-plugin --save-dev

Replace the contents of index.js with the below content.

<script>
 (function helloWorld() {
      console.log('Hello World');
 }());
</script>

8. Once this is done, let's run webpack and see what happens. Use the command provided below.

## npm run webpack

Webpack will automatically take the src/index.js file, compile it and output it to dist/main.js
and minify the code.

9. We can now go ahead and run the npm start command to run the app.
## npm start

Naviage to localhost:8080 and you should be able to see a screen just like below.

localhost initial

localhost started on the default browser

To stop the server press, Ctrl + C on Windows and Command + C on Mac.

10. Copy the code below and paste it in the webpack.config.js file.
<script>
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
    devServer: { contentBase: path.join(__dirname, "src") },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};
</script>

11. Let's go over the various components in the file.

a. entry and output: tells our server what has to be compiled and from where. Also tells the server where the compiled version should be outputted.

b. mode: this is the mode of our output, which is set to ‘development’ for now. Should be changed to 'production' when the app is build for production.

c. resolve: used so that we can import anything from the src folder in relative paths rather than the absolute ones, same goes for node_modules as well.

d. devServer: this tells the webpack-dev-server what files are needed to be served. Everything from our src folder needs to be served (outputted) in the browser.

e. plugins: here we set what plugins we need in our app. As of this moment we only need the html-webpack-plugin which tells the server that the index.bundle.js should be injected (or added if you will) to our index.html file

If we now run the earlier command, we will see some differences.
## npm run webpack

build folder with index.build.js and index.html

If you start the app now, using the npm start command, you would see a blank screen on the browser, without any content.
## npm start
Open the developer tools on your browser and you should be able to see the entire code of the index.html file in the Elements tab. Check the Console tab to see Hello World logged over there. The webpack-dev-server took everything from the src folder and outputted it to our browser.

12. We have configured the app to build everything from the src folder and output it to the browser. It's time to add React and spice things up a little.

Follow the following steps to add React and Babel to the project. Run the following command to add
react and react-dom to the project.

Add react and react-dom as normal dependencies.
 ## npm install react react-dom --save
At this moment in our development, if we were to add React code inside our JS file, Webpack will give us an error. It doesn’t know how to compile React inside the bundle.js file.

13. Modify the index.js file as follows:
import React from 'react';
import ReactDOM from 'react-dom';

const HelloWorld = () => {
    return (
        <h1>
            Hello World
        </h1>
    );
}

ReactDOM.render(<HelloWorld />, document.getElementById("root"));

14. Let's start the server now and see what is rendered.
## npm start

webpack error for not having **appropriate loaders for react**

This is where Babel comes to our aid. Babel will tell Webpack how to compile our React code.

15. Let’s add a bunch of Babel packages to our app as devDependencies.
##  npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/preset-react babel-loader
Some two pointers about these packages.

a. @babel /core: used to compile ES6 and above to ES5.

b. @babel /preset-env: determines which transformations or plugins to use and polyfills (i.e it provides modern functionality on older browsers that do not natively support it) based on the browser matrix you want to support.

c. @babel /preset-react: compiles the React code into ES5 code.

d. babel-loader: a Webpack helper that transforms your JavaScript dependencies with Babel (i.e. will transform the import statements into require ones)

You will probably need to add some styles to the project, as well as have the ability to display images on the webpage.

16. Go ahead and add these few packages as devDependencies. (Remove the sass-loader and node-sass if know you won't be working with SCSS files).
## npm install style-loader css-loader sass-loader node-sass image-webpack-loader --save-dev 
a. style-loader: will add styles to the DOM (injects a style tag inside the HTML file).

b. css-loader: lets us import CSS files in our project.

c. sass-loader: lets us import SCSS files in our project.

d. node-sass: compiles SCSS files into normal CSS files.

e. image-webpack-loader: lets us load images in our project.

17. Next thing to do is add a configuration file for Babel. For this we need to create a file named .babelrc in which we will configure Babel. Create this file in the root directory.
## touch .babelrc
Add these lines to let babel-loader know what to use to compile the code.
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}

18. After these steps, we will need to add something to our project so we can import all sorts of files such as images. We will also need to add a plugin that will let us work with classes and much more. Let us add class properties in our classes. Basically, it will let us work with Object Oriented Programming.
## npm install file-loader @babel/plugin-proposal-class-properties --save-dev
Once that is done, we need to make some changes inside webpack.config.js so that Webpack will now use Babel. We’ll also configure Webpack to listen for style files and we are going to change the require statements to import ones.

## Change your webpack.config.js to the below code:
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: process.env.NODE_ENV || "development",
    resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
    devServer: { contentBase: path.join(__dirname, "src") },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: ["babel-loader"] 
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            { 
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"] 
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};

19. Another thing that we will have to still add is the @babel /plugin-proposal-class-properties to the .babelrc file. Babel will know how to deal with class properties.
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
We have reached the end of this tutorial. Now let's run the previous commands and they shouldn't give us any error.
## npm run webpack

## npm start