const profileUpdate = async (request) => {
    let shownText = ``;
    switch (request) {
        case `username`:
            shownText = `Enter Updated Username`;
            break;
        case `firstname`:
            shownText = `Enter Updated First Name`;
            break;
        case `lastname`:
            shownText = `Enter Updated Last Name`;
            break;
        case `zip`:
            shownText = `Enter Updated Zip Code`;
            break;
        case `email`:
            shownText = `Enter Updated Email`;
            break;
    }

    let updatedField = {}; //Declaring it outside of the if statement as we want to use it later
    if (request !== `email`) {
        updatedField = await Swal.fire({
            title: shownText,
            input: `text`,
            showCancelButton: true,
            inputValidator: (value) => {
                return !value && `Please Enter a Value`
            }
        });
    } else { //If the user wants to input an email address they get a different modal
        updatedField = await Swal.fire({
            title: 'Input email address',
            input: 'email',
            inputPlaceholder: 'Enter your email address'
        });
    };

    const updatedUser = {
        userID: $(`.userID`).val(),
        value: updatedField.value.trim(),
        request
    };

    //If the user enters a first name then the ajax request is fired off
    //TODO Add a success function or something to either reload the page or update it in React
    if (updatedUser.value) {
        $.ajax({
            url: `/api/updateuser`,
            method: `PUT`,
            data: updatedUser
        });
    };
}

$(`.updateUsername`).on(`click`, () => {
    profileUpdate(`username`);
})

$(`.updateFirstname`).on(`click`, () => {
    profileUpdate(`firstname`);
});

$(`.updateLastname`).on(`click`, () => {
    profileUpdate(`lastname`);
});

$(`.updateZip`).on(`click`, () => {
    profileUpdate(`zip`);
});

$(`.updateEmail`).on(`click`, () => {
    profileUpdate(`email`);
});