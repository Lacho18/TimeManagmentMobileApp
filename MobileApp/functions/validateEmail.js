export function validateEmail(emailInput) {
    if (emailInput === "") {
        return "You have to insert password in order to continue!";
    }

    if (emailInput.length < 7) {
        return "Too short email!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        return "You have to provide a valid email!";
    }

    return "Success";
}