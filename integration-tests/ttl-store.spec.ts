import request from "supertest";
import { app } from "../src/shared/infra/http/server";

async function postReq(body: any): Promise<request.Response> {
  return request(app)
    .post("/ttl-store")
    .send(body)
    .set("Accept", "application/json");
}

async function getReq(key: string): Promise<request.Response> {
  return request(app).get(`/ttl-store/${key}`);
}

async function deleteReq(key: string): Promise<request.Response> {
  return request(app).delete(`/ttl-store/${key}`);
}

describe("Test TTL Store API endpoints", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to insert new items to the store", async () => {
    const item = {
      key: "name",
      value: "John",
      ttl: 10000,
    };

    const response = await postReq(item);

    expect(response.status).toBe(201);
  });

  it("should be able to get an item from the store", async () => {
    const key = "name";
    const value = "John";

    const item = {
      key,
      value,
    };

    const postResponse = await postReq(item);
    const getResponse = await request(server).get(`/ttl-store/${key}`);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
  });

  it("should be able to delete an item from the store", async () => {
    const key = "name";
    const value = "John";

    const item = {
      key,
      value,
    };

    const postResponse = await postReq(item);

    const getResponse = await getReq(key);

    const deleteResponse = await deleteReq(key);

    const getResponseAfterDeleted = await getReq(key);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
    expect(deleteResponse.status).toBe(200);
    expect(getResponseAfterDeleted.status).toBe(200);
    expect(getResponseAfterDeleted.body).toStrictEqual({});
  });

  it("should not be able to get an item from the store if ttl has expired", async () => {
    const key = "name";
    const value = "John";

    const item = {
      key,
      value,
      ttl: 3000,
    };

    const postResponse = await postReq(item);

    const getResponse = await getReq(key);

    jest.advanceTimersByTime(3100);

    const getResponseAfterTimePassed = await getReq(key);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
    expect(getResponseAfterTimePassed.status).toBe(200);
    expect(getResponseAfterTimePassed.body).toStrictEqual({});
  });

  it("should be able to change a value for a given key", async () => {
    const key = "name";
    const value = "John";
    const value2 = "Doe";

    const item = {
      key,
      value,
    };

    const item2 = {
      key,
      value: value2,
    };

    const postResponse = await postReq(item);
    const getResponse = await getReq(key);

    const postResponse2 = await postReq(item2);
    const getResponseAfterChangingValue = await getReq(key);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
    expect(postResponse2.status).toBe(201);
    expect(getResponseAfterChangingValue.status).toBe(200);
    expect(getResponseAfterChangingValue.body).toStrictEqual({ value: value2 });
  });

  it("should be able to change an item value and also it's ttl ignoring the previous ttl", async () => {
    const key = "name";
    const value = "John";
    const value2 = "Doe";

    const item = {
      key,
      value,
      ttl: 3000,
    };

    const item2 = {
      key,
      value: value2,
      ttl: 5000,
    };

    const postResponse = await postReq(item);
    const getResponse = await getReq(key);
    const postResponse2 = await postReq(item2);

    jest.advanceTimersByTime(3100);

    const getResponseAfterChangingValue = await getReq(key);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
    expect(postResponse2.status).toBe(201);
    expect(getResponseAfterChangingValue.status).toBe(200);
    expect(getResponseAfterChangingValue.body).toStrictEqual({ value: value2 });
  });

  it("should be able to change an item value and remove the ttl ignoring the previous ttl ", async () => {
    const key = "name";
    const value = "John";
    const value2 = "Doe";

    const item = {
      key,
      value,
      ttl: 3000,
    };

    const item2 = {
      key,
      value: value2,
    };

    const postResponse = await postReq(item);
    const getResponse = await getReq(key);
    const postResponse2 = await postReq(item2);

    jest.advanceTimersByTime(3100);

    const getResponseAfterChangingValue = await getReq(key);

    expect(postResponse.status).toBe(201);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toStrictEqual({ value: value });
    expect(postResponse2.status).toBe(201);
    expect(getResponseAfterChangingValue.status).toBe(200);
    expect(getResponseAfterChangingValue.body).toStrictEqual({ value: value2 });
  });
});
