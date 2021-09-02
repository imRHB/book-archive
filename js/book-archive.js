const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');

const searchBook = () => {
    const searchText = searchField.value;
    const searchUrl = `https://openlibrary.org/search.json?q=${searchText}`;
    // fetch('https://openlibrary.org/search.json?q=javascript')
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displayBooks(data));

    // console.log('Total results: ', data.docs.numFound);

    searchField.value = '';
};

const coverImage = coverImgId => {
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverImgId}-M.jpg`;
    console.log(coverUrl)
};

// searchBook();
const displayBooks = booksObj => {
    console.log(booksObj);
    console.log(booksObj.docs.slice(0, 6));
    console.log(booksObj.docs[0].title);
    console.log(booksObj.docs[0].subject[0]);
    console.log(booksObj.docs[0].cover_i);
    console.log('Total results: ', booksObj.numFound);
    coverImage(booksObj.docs[0].cover_i);
};