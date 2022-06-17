# Workable Assignment
### Project created by [@kSiasios](https://github.com/kSiasios)
*The purpose of this project is to test the PPM tool hosted at [https://node-fs-app.herokuapp.com/](https://node-fs-app.herokuapp.com/)*

#### Instructions on how to execute the automated tests
1. Clone this repository [*Instructions here*](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Go to your local directory where you cloned the repository and install required packages using `npm install`
3. Install Cypress using the command `npm install cypress --save-dev`
4. Run project using command `npx cypress open`
5. Cypress Configuration: 
E2E Testing
![Screenshot_20220617_112830](https://user-images.githubusercontent.com/76401229/174259394-8fb17675-5992-45d5-9eb7-a94ef240a648.png)
Select your preferred browser and press Start E2E Testing button
![Screenshot_20220617_112850](https://user-images.githubusercontent.com/76401229/174259558-3e9737ec-a8fb-41e1-9ee2-b7748c23563b.png)
6. On The new window click on the spec.cy.js file and the testing process should start.
![Screenshot_20220617_112904](https://user-images.githubusercontent.com/76401229/174259609-f2ba3736-ac9a-40c2-89ea-6d0ceb3aa70f.png)

If all test were successful there should be no red assertions!
![Screenshot_20220617_120121](https://user-images.githubusercontent.com/76401229/174265505-ae63e1a4-6d2f-4828-ad18-13432dde6125.png)

*Note that after the first run, any tests that sign up will fail to sign up since the email was used in the previous run. The test itself will not fail and will log in successfully.*
