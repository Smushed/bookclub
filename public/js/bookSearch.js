$(`.submit`).on(`click`, () => {
    const searchedBook = $(`.searchedBook`).val();

    //Post Route as I'm posting a search for the book
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${searchedBook}`, response => {
        console.log(response)
    });
});