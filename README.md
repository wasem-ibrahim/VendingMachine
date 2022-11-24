# VendingMachine
An almost ideal solution to the Snacks Vending Machine assignment provided by Freightos company.

## Setup the environemt:
- First of all, you need to install dependinces using the following command:
`npm install`

- To run the code, you first need to use 
`npm install -D typescript`
`npm install -D ts-node`

- After that you can run the directly by navigating to the "src" file and running the "Main.ts" file as in the following commands:
`cd src/`
`ts-node Main.ts`

## Alternative ways:

* In case you are having any problems with the above commands, you might want to install "ts-node" globally on your machine using the following command:
`sudo npm i typescript ts-node -g`

* If you feel like compiling the TS files to JS files and taking a loot at them, then you can do that by running:
`tsc`
in the main directory which will create a new file called "JSFiles", in which you can navigate to using 
`cd JSFiles/`
then running the code using 
`node Main.js`

## To run the test cases:
* You just need to run the following script which is:
`npm test`
and all of the tests will run directly in the terminal




