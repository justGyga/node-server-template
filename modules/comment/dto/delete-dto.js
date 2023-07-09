import * as yup from "yup";

export const deleteDto = yup.object().shape({
    id: yup.number().required().min(1)
});
