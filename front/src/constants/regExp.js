const PASSWORD_REG_EXP = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/;
const LOGIN_REG_EXP = /^[a-z0-9_-]{3,16}$/i;

export { PASSWORD_REG_EXP, LOGIN_REG_EXP };
