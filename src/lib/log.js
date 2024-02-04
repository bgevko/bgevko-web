const db = require('./db')

export async function getAll() {
	try {
		const logs = await db.pool.query('SELECT * FROM ActivityLog ORDER BY ActivityDate DESC')
		return logs[0]
	} catch (err) {
		console.error("getAll:error: ", err)
		return []
	}
}

export async function getById(id) {
	if (!id) {
		console.error("getById:error: invalid argument. Must be a number")
		return null
	}
	try {
		const log = await db.pool.query('SELECT * FROM ActivityLog WHERE ID = ?', [id])
		return log[0][0]
	} catch (err) {
		console.error("getById:error: ", err)
		return null
	}
}

export async function adjustById(id, log) {
	if (!id || !log) {
		console.error("adjustById:error: invalid argument. Must be a number and an object")
		return null
	}
	try {
		const query = await db.pool.query('UPDATE ActivityLog SET ? WHERE ID = ?', [log, id])
		return query[0]
	} catch (err) {
		console.error("adjustById:error: ", err)
		return null
	}
}

export async function removeByLogId(id) {
	if (!id) {
		console.error("removeById:error: invalid argument. Must be a number")
		return null
	}
	try {
		const query = await db.pool.query('DELETE FROM ActivityLog WHERE ID = ?', [id])
		return query[0]
	} catch (err) {
		console.error("removeById:error: ", err)
		return null
	}
}

export async function addLog(log) {
	if (!log || !log.ActivityType || !log.ActionType || !log.Description) {
		console.error("addLog:error: invalid argument. Must be an object with activity, action, and description")
		console.error("arguments: ", log)
		return null
	}

	let query;
	try {
		switch (log.ActivityType) {
			case 'blog':
				if (log.ActionType !== 'deleted' && !log.BlogPostID) {
					console.error("addLog:error: Can't add a blog log without a BlogPostID")
					return null
				}
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, BlogPostID) VALUES (?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.BlogPostID]
				)
				break
			case 'projects':
				if (log.ActionType !== 'deleted' && !log.ProjectPostID) {
					console.error("addLog:error: Can't add a project log without a ProjectPostID")
					return null
				}
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, ProjectPostID) VALUES (?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.ProjectPostID]
				)
				break
			case 'notes':
				if (log.ActionType !== 'deleted' && !log.NotesPostID) {
					console.error("addLog:error: Can't add a note log without a NoteID")
					return null
				}
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, NotesPostID) VALUES (?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.NotesPostID]
				)
				break
			case 'features':
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description) VALUES (?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description]
				)
				break
			case 'general':
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description) VALUES (?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description]
				)
				break
			default:
				console.error("addLog:error: invalid activity type, type: ", log.ActivityType)
				break
		}
		return query[0]
	} catch (err) {
		console.error("addLog:error: ", err)
		return null
	}
}

export async function sanitizeLog() {
	try {
		// Remove all project logs without a ProjectPostID
		const projectLogs = await db.pool.query(
		`DELETE FROM ActivityLog WHERE ActivityType = 'projects'
		AND ActionType != 'deleted'
		AND ProjectPostID IS NULL`
		)

		// Remove all blog logs without a BlogPostID
		const blogLogs = await db.pool.query(
		`DELETE FROM ActivityLog WHERE ActivityType = 'blog'
		AND ActionType != 'deleted'
		AND BlogPostID IS NULL`
		)

		// Remove all note logs without a NotesPostID
		const noteLogs = await db.pool.query(
		`DELETE FROM ActivityLog WHERE ActivityType = 'notes'
		AND ActionType != 'deleted'
		AND NotesPostID IS NULL`
		)

	} catch (err) {
		console.error("sanitizeLog:error: ", err)
		return null
	}
}

export async function purgeDeletedTypeLogs() {
	try {
		// Remove all logs with ActionType 'deleted'
		const query = await db.pool.query(
		`DELETE FROM ActivityLog WHERE ActionType = 'deleted'`
		)
		return query[0]
	} catch (err) {
		console.error("purgeDeletedTypeLogs:error: ", err)
		return null
	}
}
