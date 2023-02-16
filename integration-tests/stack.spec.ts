import request from "supertest";
import { app } from "../src/shared/infra/http/server";

async function postReq(value: any): Promise<request.Response> {
  return request(app)
    .post("/stack")
    .send({ value: value })
    .set("Accept", "application/json");
}

async function getReq(): Promise<request.Response> {
  return request(app).get("/stack/");
}
describe("Test Stack API endpoints", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    //clean the pile
    let res = await getReq();
    while (res.body.value) {
      res = await getReq();
    }
  });

  it("should insert a value on top of the stack", async () => {
    const newValue = "new value";
    const res = await postReq(newValue);

    expect(res.status).toBe(201);
  });

  it("should retrieve the top value from the stack", async () => {
    const newValue = "new value";
    await postReq(newValue);
    const res = await getReq();

    expect(res.body.value).toBe(newValue);
  });

  it("should handle empty stack", async () => {
    const newValue = "new value";
    await postReq(newValue);
    const res1 = await getReq();
    const res2 = await getReq();

    expect(res1.body.value).toBe(newValue);
    expect(res2.body).toEqual({});
  });
});
