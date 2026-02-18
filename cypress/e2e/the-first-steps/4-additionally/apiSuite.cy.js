import Ajv from "ajv";

const swagger = "https://petstore.swagger.io/v2/";
const rabbit = {
  name: "Jasper",
  photoUrls: [
    "https://img.freepik.com/free-photo/furry-cute-rabbit-isolated_78492-3950.jpg",
  ],
};

const booksSource = "https://api.itbook.store/1.0/search";
const bookPage = "";
const bookQuery = "quality";

const postmanEcho = "https://postman-echo.com/";
const httpBin = "https://httpbin.org";

const postman = {
  name: rabbit.name,
  email: "test@example.com",
  password: "password",
};

const authToken = {
  Authorization: "Basic cG9zdG1hbjpwYXNzd29yZA==",
};

const credential = Buffer.from("postman:password").toString("base64");
const authTokenBasic64 = {
  Authorization: "Basic " + credential,
};

const sourceNasa = "https://api.nasa.gov/";
const nasaKey = "xkQWv4DmUYsNdCh52vwFYhnfVhuJfZdkEKgFhrl3";

describe("Cypress API Suite Examples", () => {
  it("Get request to IT book store with query in URL", () => {
    cy.request(`${booksSource}/${bookQuery}/${bookPage}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(Number(response.body.total)).to.eq(350);
    });
  });

  it("Get request with auth header token", () => {
    cy.request({
      method: "GET",
      url: postmanEcho + "basic-auth",
      headers: authToken,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });

  it("Get request with credential data and Basic 64 encoding auth", () => {
    cy.request({
      method: "GET",
      url: postmanEcho + "basic-auth",
      headers: authTokenBasic64,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
      expect(response.requestHeaders.Authorization).to.eq(
        authTokenBasic64.Authorization,
      );
    });
  });

  it("Post request verify create pet", () => {
    cy.request({
      method: "POST",
      url: swagger + "pet",
      body: rabbit,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 200) {
        expect(response.body.name).to.eq(rabbit.name);
      } else {
        expect(response.status).to.eq(403);
      }
    });
  });

  it("Post request verify creating user with form data", () => {
    cy.request({
      method: "POST",
      url: postmanEcho + "post",
      form: true,
      body: postman,
    }).then((response) => {
      expect(response.status).to.eq(200);
      Object.keys(postman).forEach((key) => {
        expect(response.body.form[key]).to.eq(postman[key]);
      });
    });
  });

  it("Sets cookie(s) as provided by the query string and redirects to cookie list.", () => {
    const cookies = { name: "theHighTower", value: "theRedBird" };

    cy.request({
      method: "GET",
      url: `${httpBin}/cookies/set?${cookies.name}=${cookies.value}`,
      followRedirect: false,
    }).then((response) => {
      expect(response.status).to.eq(302);
      expect(response.headers.location).to.eq("/cookies");
      expect(response.headers["set-cookie"][0]).to.include(
        `${cookies.name}=${cookies.value}`,
      );
    });
  });

  it("check If-Modified-Since or If-None-Match header", () => {
    cy.request({
      method: "GET",
      url: httpBin + "/cache",
      headers: {
        "If-Modified-Since": "friday, 31 december 2000",
        "If-None-Match": "778855",
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (
        response.requestHeaders["If-Modified-Since"] ||
        response.requestHeaders["If-None-Match"]
      ) {
        expect(response.status).to.eq(304);
      } else {
        expect(response.status).to.eq(200);
      }
    });
  });

  it("validate json response with schema", () => {
    const ajv = new Ajv({
      strict: true,
      strictSchema: true,
      strictNumbers: true,
      strictTypes: true,
      strictTuples: true,
      strictRequired: true,
      $data: true,
      logger: console,
      allErrors: true,
      verbose: true,
    });

    const schema = {
      type: "object",
      properties: {
        status: { type: "integer", minimum: 100, maximum: 600 },
        title: { type: "string" },
      },
      required: ["status"],
      additionalProperties: true,
    };

    cy.request({
      method: "GET",
      url: `${sourceNasa}planetary/apod?api_key=${nasaKey}`,
      failOnStatusCode: false,
    }).then((response) => {
      const valid = ajv.validate(schema, response);
      console.log(ajv.errors);
      expect(valid).to.eq(true);
      expect([200, 403]).to.include(response.status);
    });
  });
});
