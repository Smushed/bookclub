$(`.updateFirstname`).on(`click`, async () => {
    const updatedName = await Swal.fire({
        title: `Enter Updated First Name`,
        input: `text`,
        showCancelButton: true,
        inputValidator: (value) => {
            return !value && `Please Enter a Value`
        }
    });

    const updatedUser = {
        userID: $(`.userID`).val(),
        firstname: updatedName.value,
        request: `firstname`
    };

    //If the user enters a first name then the ajax request is fired off
    //TODO Add a success function or something to either reload the page or update it in React
    if (updatedUser.firstname) {
        $.ajax({
            url: `/api/updateuser`,
            method: `PUT`,
            data: updatedUser
        });
    };
});

$(`.updateLastname`).on(`click`, () => {
    console.log($(`.userID`).val())
});

$(`.updateZip`).on(`click`, () => {
    console.log($(`.userID`).val())
});

$(`.updateEmail`).on(`click`, () => {
    console.log($(`.userID`).val())
});