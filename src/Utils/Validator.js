// Validador con Regex

export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]{2,100}$/;
    return nameRegex.test(name);
};

export const validateLastName = (lastName) => {
    const lastNameRegex = /^[a-zA-Z ]{3,100}$/;
    return lastNameRegex.test(lastName);
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/;
    return emailRegex.test(email);
};

export const validateNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z0-9]{3,20}$/;
    return nicknameRegex.test(nickname);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{5,15}$/;
    return passwordRegex.test(password);
};