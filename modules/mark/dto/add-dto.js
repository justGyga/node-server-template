import * as yup from 'yup';

export const putMarkDto = yup.object().shape({
    // like: yup.boolean().required(),
    commentId: yup.number().required()
});