// Was receiving errors for stubbing the methods and couldn't get the tests to work even with debugging from ChatGPT

import { expect } from "chai";
import sinon from "sinon";

import { loginController } from "../controllers/login.controller.js";
import * as loginService from "../services/login.service.js";

describe("loginController tests", () => {
  let req, res, loginServiceStub, jsonSpy;

  beforeEach(() => {
    req = {};
    res = {
      json: () => {},
    };

    jsonSpy = sinon.spy(res, "json");

    loginServiceStub = sinon.stub(loginService, "login");
  });

  afterEach(() => {
    loginServiceStub.restore();
    jsonSpy.restore();
  });

  it("should call login from the controller", async () => {
    loginServiceStub.resolves({});

    await loginController(req, res);

    expect(loginServiceStub.calledOnce).to.be.true;
  });

  it("should call loginController and res.json with the result of login call", async () => {
    const mockUser = {
      email: "Ben@email.com",
      password: "BenPassword",
    };

    loginServiceStub.resolves(mockUser);

    await loginController(req, res);

    expect(jsonSpy.calledOnceWith(mockUser)).to.be.true;
  });
});
