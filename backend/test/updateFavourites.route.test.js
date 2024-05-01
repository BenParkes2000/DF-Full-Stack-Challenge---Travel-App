// Unsure as to why test doesn't work - says "request is not a function" even though its defined - WORKS FOR CREATE USER TEST FILE

import { expect } from "chai";
import * as chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";
import User from "../models/user.model.js";
import testUserArray from "./data/testUsers.js";

const { request } = chai.use(chaiHttp);

describe(`Integration Tests on requests to the /favourite route`, () => {
  const testRouteBase = `/favourite`;

  beforeEach(async () => {
    try {
      await User.deleteMany();
      await User.insertMany(testUserArray);
    } catch (error) {
      console.log(error.message);
    }
  });

  describe(`PUT requests to /favourite`, () => {
    it("should return the updated user", async () => {
      const res = await request(server)
        .put(testRouteBase)
        .send({
          email: "ben@email.com",
          password: "BenPassword",
          favLocations: ["London", "Birmingham", "Manchester", "Dublin"],
        });
      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an(`object`);
      expect(res.body.user.favLocations).to.equal([
        "London",
        "Birmingham",
        "Manchester",
        "Dublin",
      ]);
    });

    it("should return a 400 status", async () => {
      const res = await request(server)
        .put(testRouteBase)
        .send({
          email: "NotInDB@email.com",
          password: "NotPassword",
          favLocations: ["London"],
        });
      console.log(res.body);
      expect(res).to.have.status(400);
    });
  });
});
