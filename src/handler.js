const crypto = require('crypto')
const { QueryTypes } = require('sequelize')
const sequelize = require('./db/conn')

const index = async (h) =>{
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
		const { uid } = request.params
		const notes = await sequelize.query('SELECT * FROM notes WHERE uid = :uid', { 
			replacements : { uid },
			type: QueryTypes.SELECT 
		})

		return h.response({
			message : "success showing data by uid",
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
		const uid = crypto.randomUUID()
		await sequelize.query(
			'INSERT INTO `notes` (`uid`, `title`, `tags`, `body`) VALUES (:uid, :title, :tags, :body);', {
				replacements: { uid, title, tags, body },
				type: QueryTypes.INSERT
			})

		return h.response({
			message : "success add new note",
			statusCode : 201,
			data : { uid, title, tags, body }
		}).code(201)
	} catch (err) {
		console.error(err.message)
	}
}

const update = async (request, h) => {
	try {
		const { uid } = request.params
		const { title, tags, body } = request.payload
		const sql = "UPDATE `notes` SET `title`= :title,`tags`= :tags,`body`= :body,`updatedAt`=current_timestamp() WHERE `uid` = :uid"
		await sequelize.query(sql, { 
			replacements : { uid, title, tags, body },
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

const deleteByUID = async (request, h) => {
	try {
		const { uid } = request.params
		await sequelize.query('DELETE FROM `notes` WHERE `notes`.`uid` = :uid', {
			replacements : { uid },
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

module.exports = { index, show, store, update, deleteByUID }