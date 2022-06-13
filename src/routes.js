const { 
	index, 
	show, 
	store, 
	update,
	deleteById
} = require('./handler')

const routes = [
{
	method : "GET",
	path : "/",
	handler : (request, h) => {
		return h.response({
			statusCode : 200,
			message : "Hello World"
		})
	}
},
{
	method : "GET",
	path : "/notes",
	handler : index
},
{
	method : "GET",
	path : "/notes/{id}",
	handler : show,
},
{
	method : "POST",
	path : "/notes",
	handler : store,
},
{
	method : "PUT",
	path : "/notes/{id}",
	handler : update
},
{
	method : "DELETE",
	path : "/notes/{id}",
	handler : deleteById
}
]

module.exports = routes