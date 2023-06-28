import * as yup from 'yup';

export const loginDto = yup.object().shape({
    login: yup.string().required().min(2).max(14),
    password: yup.string().required().min(8)
});