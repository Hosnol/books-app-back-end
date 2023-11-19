const { nanoid } = require("nanoid");
const books = require("./books");

// Add book
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Check if required fields are provided
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  // Check if readPage is valid
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// Get All books
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = [...books];

  // Filter by name
  if (name) {
    const lowerCaseName = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(lowerCaseName)
    );
  }

  // Filter by reading status
  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  // Filter by finished status
  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  if (filteredBooks.length > 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: [],
    },
  });
  response.code(200);
  return response;
};


// Get book by id
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book: {
          id: book.id,
          name: book.name,
          year: book.year,
          author: book.author,
          summary: book.summary,
          publisher: book.publisher,
          pageCount: book.pageCount,
          readPage: book.readPage,
          finished: book.finished,
          reading: book.reading,
          insertedAt: book.insertedAt,
          updatedAt: book.updatedAt,
        },
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Edit book by id
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  // Check if required fields are provided
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  // Check if readPage is valid
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  // Check if book with given ID exists
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Delete book by id
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
