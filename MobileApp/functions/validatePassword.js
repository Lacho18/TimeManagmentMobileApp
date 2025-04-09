export function validatePassword(passwordInput) {
    console.log(passwordInput === "");
    //Checks if password field is empty
    if (passwordInput === "") {
        return "You have to insert password in order to continue!";
    }

    //Checks if password is at least 7 symbols
    if (passwordInput.length < 7) {
        return "Password should be at least 7 symbols!";
    }

    //Checks if password is not just numbers
    if (/^[0-9]+$/.test(passwordInput)) {
        return "The password should not contains just numbers!";
    }

    //Checks if password contains at least 1 special symbol
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(passwordInput)) {
        return "The password should contain at least 1 special symbol!";
    }

    return "Success";
}