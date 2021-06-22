import { routeNotFound, displayErrors } from "../errorHandlers";
import { RestError } from "../../utils/errorHandlers";

test("routeNotFound middleware returns 404 when endpoint not found", function () {
    const method = "GET";
    const originalUrl = "/non/existing/url";

    const req = { method, originalUrl };
    const res = {
        status: jest.fn(() => res).mockName("status"),
        json: jest.fn(() => res).mockName("json"),
    };
    const next = jest.fn().mockName("next");

    const error = new RestError(
        404,
        "Not Found",
        `Endpoint ${method} ${originalUrl} not found`,
    );

    routeNotFound(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
});

describe("displayErrors middleware:", function () {
    test("responds with defaults when nothing else provided", function () {
        const req = {};
        const res = {
            status: jest.fn(() => res).mockName("status"),
            json: jest.fn(() => res).mockName("json"),
        };
        const next = jest.fn().mockName("next");

        const error = {};

        displayErrors(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "details": Object {},
    "message": "An Error Occured",
    "name": "Unexpected Error",
    "success": false,
  },
]
`);
        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("responds with 404 if NotFound error occured", function () {
        const req = {};
        const res = {
            status: jest.fn(() => res).mockName("status"),
            json: jest.fn(() => res).mockName("json"),
        };
        const next = jest.fn().mockName("next");
        const error = new RestError(404, "Not Found", "ID not found", {
            id: "123",
        });

        displayErrors(error, req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
Array [
  Object {
    "details": Object {
      "id": "123",
    },
    "message": "ID not found",
    "name": "Not Found",
    "success": false,
  },
]
`);
        expect(res.status).toHaveBeenCalledTimes(1);
    });
});
