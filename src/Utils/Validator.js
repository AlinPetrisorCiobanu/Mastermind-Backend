// Validador con Regex

export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z ]{2,100}$/;
    return nameRegex.test(name);
};

export const validateLastName = (lastName) => {
    const lastNameRegex = /^[a-zA-Z ]{3,100}$/;
    return lastNameRegex.test(lastName);
};

export const validateDate = (date) => {
    const dateRegex = /^[a-zA-Z0-9 ]{3,20}$/;
    return dateRegex.test(date);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{6,15}$/;
    return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/;
    return emailRegex.test(email);
};

export const validateNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return nicknameRegex.test(nickname);
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{6,15}$/;
    return passwordRegex.test(password);
};