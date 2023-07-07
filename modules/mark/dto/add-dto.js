import * as yup from 'yup';

export const addDto = yup.object().shape({
    like: yup.boolean().required(),
    commentId: yup.number().required()
});