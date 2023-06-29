import * as yup from 'yup';

export const addDto = yup.object().shape({
    text: yup.string().required(),
    userId: yup.number().required()
});