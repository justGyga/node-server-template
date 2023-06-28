import _ from "lodash";
import Yup from "yup";

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
            } catch (ex) {
                const errors = errorParser(ex);
                return res.status(422).json({ errors });
            }
        };