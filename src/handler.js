const { nanoid } = require("nanoid");
const books = require("./books");

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

  const id = nanoid(16);
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    createdAt,
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

const getAllBookHandler = (request, h) => {
    const bukuBaru = books.map(({ id, name, publisher }) => {
        return { id, name, publisher };
    });
    const { reading, finished, name } = request.query;
    const isReading = books.find((book) => book.reading === true);
    const unReading = books.find((book) => book.reading === false);
    const isFinished = books.find((book) => book.finished === true);
    const unFinished = books.find((book) => book.finished === false);
    const dataNama = books.filter((book) => {
        let namaBuku = `${book.name}`.toLowerCase();
        let queryBuku = `${name}`.toLowerCase();
        return namaBuku.includes(queryBuku); 
    });

    if (reading === '1') {
        return{
            status: 'success',
            data: {
                isReading
            }, 
        };
    } else if (reading === '0') {
        return {
            status: 'success',
            data: {
                unReading
            },
        };
    }

    if (finished === '1') {
        return {
            status: 'success',
            data: {
                isFinished
            },
        };
    } else if (finished === '0') {
        return {
            status: 'success',
            data: {
                unFinished
            },
        };
    }

    if (name !== undefined ) {
        return {
            status: 'success',
            data:{
                dataNama
            },
        };
    }

    return {
        status: 'success',
        data: {
            books: bukuBaru
        }
    }
}

const getOneBookHandler = (request, h) => {
    const { id } = request.params;
  
    const book = books.filter((n) => n.id === id)[0];
  
    if (note !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };
module.exports = { addBookHandler, getAllBookHandler, getOneBookHandler };