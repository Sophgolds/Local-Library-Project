function findAccountById(accounts, id) {
  // need to find the account by id
  return accounts.find(accounts => accounts.id === id)
}

function sortAccountsByLastName(accounts) {
  // need to sort accounts by last name
  accounts.sort((nameA, nameB) => (nameA.name.last > nameB.name.last ? 1:-1))
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  // Need to get total of borrowed books
  return books.reduce((total, book) => {
    const idCount = book.borrows.filter(borrows => borrows.id === account.id).length
    return total + idCount
  }, 0)
  
}

function getBooksPossessedByAccount(account, books, authors) {
  const { id } = account
  let filteredBooks = books.filter(book => {
    return book.borrows.some(borrow => borrow.id === id && !borrow.returned)
  })

  return filteredBooks.map(book => {
    book.author = authors.find(author => author.id === book.authorId)
    return book
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
