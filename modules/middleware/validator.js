import _ from "lodash";

const errorParser = (errors) =>
    errors.inner.map((e) => ({
        type: e.type,
        stack: e.path.split("."),
        message: e.message
    }));

export const CONTEXT = {
    QUERY: "query",
    PATH: "params",
    BODY: "body"
};

export const validate =
    (schema, payloadKey = CONTEXT.BODY, options = {}) =>
        async (req, res, next) => {
            const data = req[payloadKey];
            options = { abortEarly: false, ...options };
            try {
                let fieldKeys = [];
                for (const s of [schema].flat()) {
                    fieldKeys = [...fieldKeys, ...Object.keys(s.fields)];
                    await s.validate(data, options);
                }
                req[payloadKey] = _.pick(data, fieldKeys);
                next();
            } catch (error) {
                const errors = errorParser(error);
                return res.status(422).json({ errors });
            }
        };
