import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createSubject,
  createUser,
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /subject", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/subject");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/subject").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/subject").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and empty list when user has not an activity ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/subject").set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual([]);
      expect(response.status).toEqual(httpStatus.OK);
      
    });

    it("should respond with status 200 when user has an activity ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const subject = await createSubject(user.id);

      const response = await server.get("/subject").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([{
        id: subject.id,
        name: subject.name,
        userId: subject.userId,
        linkUrl: subject.linkUrl,
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
    linkUrl: faker.internet.url()
  };
}

describe("POST /subject", () => {
  it("should respond with status 401 if no token is given", async () => {
    const validBody = await createValidBody(1);
    const response = await server.post("/subject").send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const validBody = await createValidBody(1);
    const response = await server.post("/subject").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const validBody = await createValidBody(userWithoutSession.id);
    const response = await server.post("/subject").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 with a valid body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const validBody = await createValidBody(user.id);
      const response = await server.post("/subject").set("Authorization", `Bearer ${token}`).send(validBody);

      expect(response.status).toEqual(httpStatus.OK);
    });
    
});
  
  });

  describe("PUT /subject/:subjectId", () => {
    it("should respond with status 401 if no token is given", async () => {
      const user = await createUser();
      const validBody = await createValidBody(user.id);
      const response = await server.put("/subject/1").send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
      const user = await createUser();
      const validBody = await createValidBody(user.id);
      const response = await server.put("/subject/1").set("Authorization", `Bearer ${token}`).send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
      const validBody = await createValidBody(userWithoutSession.id);
      const response = await server.put("/subject/1").set("Authorization", `Bearer ${token}`).send(validBody);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
      it("should respond with status 200 with a valid body", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
  
        const subject = await createSubject(user.id);
        const validBody = await createValidBody(user.id);
  
        const response = await server.put(`/subject/${subject.id}`).set("Authorization", `Bearer ${token}`).send(validBody);
  
        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          {
            id: subject.id,
            name: validBody.name,
            userId: user.id,
            linkUrl: validBody.linkUrl,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }
        );
      });
  
      it("should respond with status 400 with invalid subjectId", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        
        const validBody = await createValidBody(user.id);
  
        const response = await server.put("/subject/0").set("Authorization", `Bearer ${token}`).send(validBody);
  
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
      });
      
    }); 
  
  });
    

describe("GET /subject/:subjectId", () => {
    it("should respond with status 401 if no token is given", async () => {
      const user = await createUser();
      const response = await server.get("/subject/1");
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();
      const user = await createUser();
      const response = await server.get("/subject/1").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  
    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
      const response = await server.get("/subject/1").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
      it("should respond with status 200 with a valid body", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
  
        const subject = await createSubject(user.id);
  
        const response = await server.get(`/subject/${subject.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          {
            id: subject.id,
            name: subject.name,
            userId: user.id,
            linkUrl: subject.linkUrl,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }
        );
      });
  
      it("should respond with status 400 with invalid subjectId", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
          
        const response = await server.get("/subject/0").set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
      });
      
    }); 
  
  });
  

    describe("DELETE /subject/:subjectId", () => {
      it("should respond with status 401 if no token is given", async () => {
        const user = await createUser();
        const response = await server.delete("/subject/1");
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
      it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const user = await createUser();
        const response = await server.delete("/subject/1").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
      it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.delete("/subject/1").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
      describe("when token is valid", () => {
        it("should respond with status 200 with a valid body", async () => {
          const user = await createUser();
          const token = await generateValidToken(user);
    
          const subject = await createSubject(user.id);
    
          const response = await server.delete(`/subject/${subject.id}`).set("Authorization", `Bearer ${token}`);
    
          expect(response.status).toEqual(httpStatus.OK);
          expect(response.body).toEqual(
            {
              id: subject.id,
              name: subject.name,
              userId: user.id,
              linkUrl: subject.linkUrl,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }
          );
        });
    
        it("should respond with status 400 with invalid subjectId", async () => {
          const user = await createUser();
          const token = await generateValidToken(user);
            
          const response = await server.delete("/subject/0").set("Authorization", `Bearer ${token}`);
    
          expect(response.status).toEqual(httpStatus.BAD_REQUEST);
        });
        
      });
    
    });
     