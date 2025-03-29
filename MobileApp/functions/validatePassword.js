export function validatePassword(passwordInput) {
    if (passwordInput === "") {
        return "You have to insert password in order to continue!";
    }

    if (passwordInput.length < 7) {
        return "Password should be at least 7 symbols!";
    }

    if (/^[0-9]+$/.test(passwordInput)) {
        return "The password should not contains just numbers!";
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(passwordInput)) {
        return "The password should contain at least 1 special symbol!";
    }

    return "Success";
}