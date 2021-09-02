const searchField = document.getElementById('search-field');
const searchButton = document.getElementById('search-button');
const displayResultContainer = document.getElementById('display-search-results');
const displayResultCount = document.getElementById('result-count');
const displayBookDetails = document.getElementById('book-details');
const errorMsgContainer = document.getElementById('error-message');
const spinner = document.getElementById('spinner');
const noInput = document.getElementById('no-input');
const noResult = document.getElementById('no-result');

const searchBook = () => {
    let searchText = searchField.value;
    const searchUrl = `https://openlibrary.org/search.json?q=${searchText}`;

    if (searchField.value === '') {
        displayBookDetails.textContent = '';
        displayResultCount.textContent = '';
        displayResultContainer.textContent = '';
        noInput.style.display = 'block';
        noResult.style.display = 'none';
    }

    else {
        displayBookDetails.textContent = '';
        errorMsgContainer.textContent = '';
        displayResultCount.textContent = '';
        displayResultContainer.textContent = '';
        spinner.style.display = 'block';
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => displayBooks(data));

        searchField.value = '';
    }
    // searchField.value = '';
};

const coverImage = coverImgId => {
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverImgId}-M.jpg`;
    return coverUrl;
};

const displayBooks = booksObj => {
    if (booksObj.numFound === 0) {
        noInput.style.display = 'none';
        noResult.style.display = 'block';
    }
    else {
        spinner.style.display = 'none';
        const books = booksObj.docs.slice(0, 30);
        const totalResultsDiv = document.createElement('div');
        displayResultCount.textContent = '';
        totalResultsDiv.innerHTML = `
        <h3><b>Total Results:</b> ${booksObj.numFound}</h3>
    `;
        displayResultContainer.textContent = '';
        books.forEach(book => {
            console.log(book);
            // const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const coverUrl = coverImage(book.cover_i)
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML = `
            <div class="card h-100">
                <img src="${coverUrl}" onclick='bookDetails(${JSON.stringify(book)})' class="card-img-top" alt="no image available">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                </div>
            </div>
        `;
            displayResultCount.appendChild(totalResultsDiv);
            displayResultContainer.appendChild(bookDiv);
        });
    }
};

const bookDetails = book => {
    const coverUrl = coverImage(book.cover_i)
    const bookDetailsDiv = document.createElement('div');
    bookDetailsDiv.classList.add('row');
    displayBookDetails.textContent = '';
    bookDetailsDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${coverUrl}" class="img-fluid h-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><b>Author:</b> ${book.author_name[0]}</p>
                <p class="card-text"><b>Publisher:</b> ${book.publisher[0]}</p>
                <p class="card-text"><b>First Published:</b> ${book.first_publish_year}</p>
            </div>
        </div>
    `;
    displayBookDetails.appendChild(bookDetailsDiv);
};
