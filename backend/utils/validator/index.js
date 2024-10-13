import yup from "yup"

const signup = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ),
    fullName: yup.string().required(),
    username: yup.string().required(),
});

const login = yup.object().shape({
    username: yup.string().required(),
    password: yup
        .string()
        .required()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ),
});


const updateProfile = yup.object().shape({
    fullName: yup.string(),
    username: yup.string(),
    email: yup.string().email(),
    bio: yup.string(),
    link: yup.string(),
    currentPassword: yup
        .string()
        .min(8, 'Current Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Current Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ),
    newPassword: yup
        .string()
        .min(8, 'New Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'New Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ),
});



const schemas = {
    'signup': signup,
    'login': login,
    'updateProfile': updateProfile
};


const validator = (schemaName) => {

    if (!schemas[schemaName]) throw new Error(`Unknown validator schema ${schemaName}`);

    const schema = schemas[schemaName];

    return (body) => {
        return schema.validate(body, { abortEarly: false, strict: true });
    };

};

export default validator


