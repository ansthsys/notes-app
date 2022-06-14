const { 
	index, 
	show, 
	store, 
	update,
	deleteByUID
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
	path : "/notes/{uid}",
	handler : show,
},
{
	method : "POST",
	path : "/notes",
	handler : store,
},
{
	method : "PUT",
	path : "/notes/{uid}",
	handler : update
},
{
	method : "DELETE",
	path : "/notes/{uid}",
	handler : deleteByUID
}
]

module.exports = routes