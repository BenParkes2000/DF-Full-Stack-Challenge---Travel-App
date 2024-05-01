import { expect } from "chai";
import * as chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";
import User from "../models/user.model.js";
import testUserArray from "./data/testUsers.js";

const { request } = chai.use(chaiHttp);

describe(`Integration Tests on requests to the /create route`, () => {
  const testRouteBase = `/create`;

  beforeEach(async () => {
    try {
      await User.deleteMany();
      await User.insertMany(testUserArray);
    } catch (error) {
      console.log(error.message);
    }
  });

  describe(`POST requests to /create`, () => {
    it("should add the new user", async () => {
      const res = await request(server).post(testRouteBase).send({
        name: "Martyn Clow",
        email: "martyn@email.com",
        password: "MartynPassword",
      });
      console.log(res.body);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an(`object`);
      expect(res.body.password).to.equal("MartynPassword");
    });
  });
});
