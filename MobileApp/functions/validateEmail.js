export function validateEmail(emailInput) {
    console.log("Are de");
    //Checks if email field is empty
    if (emailInput === "") {
        return "You have to insert password in order to continue!";
    }

    //Checks if email is at least 7 symbols long
    if (emailInput.length < 7) {
        return "Too short email!";
    }

    //Regex for checking whether the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        return "You have to provide a valid email!";
    }

    return "Success";
}