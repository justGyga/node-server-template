import * as yup from 'yup';

export const idMarkDto = yup.object().shape({
    commentId: yup.number().required().min(1)
});