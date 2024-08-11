import { object, string, number, date } from "yup";

const validator = {
    registrationSchema: object({
        username: string().required(),
        password: string().required(),
        email: string().email(),
        phone: string().required(),
    }),
    updateSchema: object({
        username: string().required(),
        password: string(),
        email: string().email(),
        phone: string().required(),
    }),
    loginSchema: object({
        password: string().required(),
        email: string().email(),
    }),
};

export default validator;
