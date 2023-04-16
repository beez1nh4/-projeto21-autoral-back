import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createActivity,
  createUser,
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import dayjs from "dayjs";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activity", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activity");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activity").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activity").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and empty list when user has not an activity ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/activity").set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual([]);
      expect(response.status).toEqual(httpStatus.OK);
      
    });

    it("should respond with status 200 when user has an activity ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const activity = await createActivity(user.id);

      const response = await server.get("/activity").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([{
        id: activity.id,
        name: activity.name,
        daysArray: activity.daysArray,
        userId: user.id,
        startsAt: activity.startsAt.toISOString(),
        endsAt: activity.endsAt.toISOString(),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }]);
    });
  });
});

async function createValidBody(userId: number) {
  return {
    name: faker.name.firstName(), 
    userId,
    daysArray: "[1,3]",
    startsAt: dayjs().toDate(), 
    endsAt: dayjs().add(1, "hours").toDate(), 
  };
}

describe("POST /activity", () => {
  it("should respond with status 401 if no token is given", async () => {
    const validBody = await createValidBody(1);
    const response = await server.post("/activity").send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const validBody = await createValidBody(1);
    const response = await server.post("/activity").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const validBody = await createValidBody(userWithoutSession.id);
    const response = await server.post("/activity").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 with a valid body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const validBody = await createValidBody(user.id);
      const response = await server.post("/activity").set("Authorization", `Bearer ${token}`).send(validBody);

      expect(response.status).toEqual(httpStatus.OK);
    });
    
});
  
  });

  describe("PUT /activity/:activityId", () => {
    it("should respond with status 401 if no token is given", async () => {
      const user = await createUser();
      const validBody = await createValidBody(user.id);
      const response = await server.put("/activity/1").send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
      const user = await createUser();
      const validBody = await createValidBody(user.id);
      const response = await server.put("/activity/1").set("Authorization", `Bearer ${token}`).send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
      const validBody = await createValidBody(userWithoutSession.id);
      const response = await server.put("/activity/1").set("Authorization", `Bearer ${token}`).send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
      it("should respond with status 200 with a valid body", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
  
        const activity = await createActivity(user.id);
        const validBody = await createValidBody(user.id);
  
        const response = await server.put(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`).send(validBody);
  
        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          {
            id: activity.id,
            name: validBody.name,
            daysArray: validBody.daysArray,
            userId: user.id,
            startsAt: validBody.startsAt.toISOString(),
            endsAt: validBody.endsAt.toISOString(),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }
        );
      });
  
      it("should respond with status 400 with invalid activityId", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        
        const validBody = await createValidBody(user.id);
  
        const response = await server.put("/activity/0").set("Authorization", `Bearer ${token}`).send(validBody);
  
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
      });
      
    }); 
  
  });
    

describe("GET /activity/:activityId", () => {
    it("should respond with status 401 if no token is given", async () => {
      const user = await createUser();
      const response = await server.get("/activity/1");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
      const user = await createUser();
      const response = await server.get("/activity/1").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
      const response = await server.get("/activity/1").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
      it("should respond with status 200 with a valid body", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
  
        const activity = await createActivity(user.id);
  
        const response = await server.get(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          {
            id: activity.id,
            name: activity.name,
            daysArray: activity.daysArray,
            userId: user.id,
            startsAt: activity.startsAt.toISOString(),
            endsAt: activity.endsAt.toISOString(),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }
        );
      });
  
      it("should respond with status 400 with invalid activityId", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
          
        const response = await server.get("/activity/0").set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
      });
      
    }); 
  
  });
  

    describe("DELETE /activity/:activityId", () => {
      it("should respond with status 401 if no token is given", async () => {
        const user = await createUser();
        const response = await server.delete("/activity/1");
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
      it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const user = await createUser();
        const response = await server.delete("/activity/1").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
      it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.delete("/activity/1").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
      describe("when token is valid", () => {
        it("should respond with status 200 with a valid body", async () => {
          const user = await createUser();
          const token = await generateValidToken(user);
    
          const activity = await createActivity(user.id);
    
          const response = await server.delete(`/activity/${activity.id}`).set("Authorization", `Bearer ${token}`);
    
          expect(response.status).toEqual(httpStatus.OK);
          expect(response.body).toEqual(
            {
              id: activity.id,
              name: activity.name,
              daysArray: activity.daysArray,
              userId: user.id,
              startsAt: activity.startsAt.toISOString(),
              endsAt: activity.endsAt.toISOString(),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }
          );
        });
    
        it("should respond with status 400 with invalid activityId", async () => {
          const user = await createUser();
          const token = await generateValidToken(user);
            
          const response = await server.delete("/activity/0").set("Authorization", `Bearer ${token}`);
    
          expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });
        
      });
    
    });
     