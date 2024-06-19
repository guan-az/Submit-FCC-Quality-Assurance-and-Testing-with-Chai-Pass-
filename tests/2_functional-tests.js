const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, 'Cristoforo')
          assert.equal(res.body.surname, 'Colombo')

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: "da Verrazzano" })
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, 'Giovanni')
          assert.equal(res.body.surname, 'da Verrazzano')
          done();
        })
    });
  });
});

const Browser = require('zombie');


Browser.site = '0.0.0.0:3000'; // Your URL here



suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  // Simulate Actions Using a Headless Browser
  const browser = new Browser(
    //{waitDuration: 50000}
  );
  suiteSetup(function (done) {
    return browser.visit('/', done());
  });
  // Simulate Actions Using a Headless Browser


  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {

      // browser.visit('/', () => {
      //   // ##### From hint ##### camperbot ##### modified to pass #####
      //   //https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-run-functional-tests-using-a-headless-browser-ii/301594
      //   browser.fill('surname', 'Colombo')
      //     browser.pressButton('submit', function () {
      //     browser.assert.success();
      //     browser.assert.text('span#name', 'Cristoforo');
      //     browser.assert.text('span#surname', 'Colombo');
      //     browser.assert.elements('span#dates', 1);
      //     done(); // It's an async test, so we have to call 'done()''
      //   });
      //   // ####
      // }

      console.log(`
        ########################################################
        Guan-az:

        The site setting at line 72 need to be Browser.site = '0.0.0.0:3000'; to work
        Other url http://.... won't work on 2_functional-tests.js #5 and #6
        I use vscode local to do it
        Tested in gitpod with freecodecam boilerplate as works    
    
        #######################################################
        `
      );

      browser.visit('/', () => {
        browser.fill("surname", "Colombo").then(() => {
          browser.pressButton('submit', () => {
            browser.assert.success();
            browser.assert.text('span#name', 'Cristoforo');
            browser.assert.text('span#surname', 'Colombo');
            browser.assert.elements('span#dates', 1);
            done();
          });
        });
      }
      )

    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {

      browser.visit('/', () => {
        browser.fill("surname", "Vespucci").then(() => {
          browser.pressButton('submit', () => {
            browser.assert.success();
            browser.assert.text('span#name', 'Amerigo');
            browser.assert.text('span#surname', 'Vespucci');
            browser.assert.elements('span#dates', 1);
            done();
          });
        });
      }
      )
      //assert.fail();

      //done();
    });
  });
});
