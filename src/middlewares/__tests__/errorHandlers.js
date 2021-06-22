import { routeNotFound } from "../errorHandlers";
import { RestError } from "../../utils/errorHandlers";

test("routeNotFound middleware should return 404 when endpoint not found", function () {
    const method = "GET";
    const originalUrl = "/non/existing/url";

    const req = { method, originalUrl };
    const res = {};
    const next = jest.fn().mockName("next");

    const error = new RestError(
        404,
        "Not Found",
        `Endpoint ${method} ${originalUrl} not found`,
    );

    routeNotFound(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
});
