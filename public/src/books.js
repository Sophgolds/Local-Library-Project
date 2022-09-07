function findAuthorById(authors, id) {
  // whats to FIND by author
  const authorById = authors.find((authors) => authors.id === id)
  return authorById;
}

function findBookById(books, id) {
  // Want to FIND by book ID
  const bookById = books.find((books) => books.id === id)
  return bookById;
}

function partitionBooksByBorrowedStatus(books) {
  // What is the book status?
  // was the book returned?
  const returned = books.filter((book) => book.borrows[0].returned)
  // was the book brought back?
  const borrowed = books.filter((book) => !book.borrows[0].returned);
  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) {
  // want to know who is borrowing the book
    const { borrows } = book;
  // need the account id to know who has the potenial book out
    const renters = borrows.map(({ id, returned })=> {
      // account needs to match account id
      const account = accounts.find(account => account.id === id);
      return {
        ...account,
        returned,
      };
    });
    return renters
      .sort((borrowA, borrowB) => {
        const companyA = borrowA.company;
        const companyB = borrowB.company;
        return companyA.localeCompare(companyB);
      })
      .slice(0, 10);
}
                            
  


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
