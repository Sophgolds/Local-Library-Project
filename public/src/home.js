function getTotalBooksCount(books) {
  // count books
return books.length
};

function getTotalAccountsCount(accounts) {
  // count accounts
return accounts.length
};


function getBooksBorrowedCount(books) {
  // count borrowed books
  let borrowedBooks = 0;
  books.forEach(book =>{
    if (!book.borrows[0].returned) borrowedBooks++;
  })
  return borrowedBooks
}

function getMostCommonGenres(books) {
  // What are the top five most common genres?
  // create a const varible for books that map the genre
  const genres = books.map((book) => book.genre)
  // need an empty array
  const topFive = []
  //map over the GENRES varible 
  genres.map((genre) => {
    // Nees a varible to check each genre to see if it exsists
    const location = topFive.findIndex((element) => element.name === genre);
    // exsists & >= 0 want to increase by 1
    if (location >= 0){
      topFive[location].count = topFive[location].count +1;
      // else want to push a new array and count 1
} else {
  topFive.push({name: genre, count: 1});
      }
    });
  // will sort from lowest to highest
    topFive.sort((a, b) => b.count - a.count);
    if (topFive.length > 5) {
      return topFive.slice(0, 5);
    }
  return topFive;
}

function getMostPopularBooks(books) {
  // create a const with an empty array
  let popular = [];
  //
  const borrows = books.reduce((acc, book) => {
    popular.push({ name: book.title, count: book.borrows.length });
  }, []);

  return mostPopular(popular);
}
// function sorts the popular array
// the slice --> will create a new array with the objects selected
function mostPopular(array) {
  let popularBooks = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => { 
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
 
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;

    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {

      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    return acc;
  }, []);
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  const topFive = sortedAuthorList.slice(0, 5);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
