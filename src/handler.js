const { QueryTypes } = require('sequelize')
const sequelize = require('./db/conn')

const index = async (request, h) =>{
	try {
		const notes = await sequelize.query('SELECT * FROM notes', { 
			type: QueryTypes.SELECT 
		})

		return h.response({
			message : "success showing all data",
			statusCode : 200,
			data : notes
		}).code(200)
	} catch (err){
		console.error(err.message)
	}
}

const show = async (request, h) => {
	try {
		const { id } = request.params
		const notes = await sequelize.query('SELECT * FROM notes WHERE id = :id', { 
			replacements : { id },
			type: QueryTypes.SELECT 
		})

		return h.response({
			message : "success showing data by id",
			statusCode : 200,
			data : notes[0]
		}).code(200)
	} catch (err){
		console.error(err.message)
	}
}

const store = async (request, h) => {
	try {
		const { title, tags, body } = request.payload
		const note = await sequelize.query(
			'INSERT INTO `notes` (`title`, `tags`, `body`) VALUES (:title, :tags, :body);',
			{
				replacements: { title, tags, body },
				type: QueryTypes.INSERT
			})

		return h.response({
			message : "success add new note",
			statusCode : 201,
			data : { title, tags, body }
		}).code(201)
	} catch (err) {
		console.error(err.message)
	}
}

const update = async (request, h) => {
	try {
		const { id } = request.params
		const { title, tags, body } = request.payload
		const sql = "UPDATE `notes` SET `title`= :title,`tags`= :tags,`body`= :body,`updatedAt`=current_timestamp() WHERE `id` = :id"
		const notes = await sequelize.query(sql, { 
			replacements : { id, title, tags, body },
			type: QueryTypes.UPDATE 
		})

		return h.response({
			message : "success updating data",
			statusCode : 201,
			newData : { title, tags, body }
		}).code(201)
	} catch (err){
		console.error(err.message)
	}
}

const deleteById = async (request, h) => {
	try {
		const { id } = request.params
		const note = await sequelize.query('DELETE FROM `notes` WHERE `notes`.`id` = :id', {
			replacements : { id },
			type: QueryTypes.DELETE
		})

		return h.response({
			message : "success deleting data",
			statusCode : 200
		}).code(200)
	} catch (err) {
		console.log(err.message)
	}
}

module.exports = { index, show, store, update, deleteById }