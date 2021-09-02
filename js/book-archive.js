const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const displayResultContainer = document.getElementById('display-search-results');
const displayResultCount = document.getElementById('result-count');

const searchBook = () => {
    const searchText = searchField.value;
    const searchUrl = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displayBooks(data));

    searchField.value = '';
};

/* const coverImage = coverImgId => {
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverImgId}-M.jpg`;
    return coverUrl;
    // console.log(coverUrl)
};
 */

const displayBooks = booksObj => {
    const books = booksObj.docs.slice(0, 30);
    const totalResultsDiv = document.createElement('div');
    displayResultCount.textContent = '';
    totalResultsDiv.innerHTML = `
        <h3>Total Results: ${booksObj.numFound}</h3>
    `;
    displayResultContainer.textContent = '';
    // const imageUrl = coverImage(coverUrl);
    books.forEach(book => {
        console.log(book);
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col');
        bookDiv.innerHTML = `
            <div class="card h-100">
                <img src="${coverUrl}" class="card-img-top" alt="no image available">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                </div>
            </div>
        `;
        displayResultCount.appendChild(totalResultsDiv);
        displayResultContainer.appendChild(bookDiv);

        // console.log(book);
    });


    console.log(booksObj);
    console.log(booksObj.docs.slice(0, 6));
    console.log(booksObj.docs[0].title);
    console.log(booksObj.docs[0].subject[0]);
    console.log(booksObj.docs[0].cover_i);
    console.log('Total results: ', booksObj.numFound);
};