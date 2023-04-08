const { addBookHandler, getAllBookHandler, getOneBookHandler, editBookHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getOneBookHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookHandler,
    },
];

module.exports = routes;