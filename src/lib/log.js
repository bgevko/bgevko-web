const db = require('./db')

export async function getAllLogs() {
	try {
		const logs = await db.pool.query('SELECT * FROM ActivityLog ORDER BY ActivityDate DESC')
		return logs[0]
	} catch (err) {
		console.error("getAll:error: ", err)
		return []
	}
}

export async function getLogById(id) {
	if (!id) {
		console.error("getById:error: invalid argument. Must be a number")
		return null
	}
	try {
		const log = await db.pool.query('SELECT * FROM ActivityLog WHERE ActivityID = ?', [id])
		return log[0][0]
	} catch (err) {
		console.error("getById:error: ", err)
		return null
	}
}

export async function adjustLogById(id, log) {
	if (!id || !log) {
		console.error("adjustById:error: invalid argument. Must be a number and an object")
		return null
	}
	try {
		const query = await db.pool.query('UPDATE ActivityLog SET ? WHERE ActivityID = ?', [log, id])
		return query[0]
	} catch (err) {
		console.error("adjustById:error: ", err)
		return null
	}
}

export async function removeLogById(id) {
	if (!id) {
		console.error("removeById:error: invalid argument. Must be a number")
		return null
	}
	try {
		const query = await db.pool.query('DELETE FROM ActivityLog WHERE ActivityID = ?', [id])
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
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, BlogPostID, URL) VALUES (?, ?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.BlogPostID, log?.URL]
				)
				break
			case 'projects':
				if (log.ActionType !== 'deleted' && !log.ProjectPostID) {
					console.error("addLog:error: Can't add a project log without a ProjectPostID")
					return null
				}
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, ProjectPostID, URL) VALUES (?, ?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.ProjectPostID, log?.URL]
				)
				break
			case 'notes':
				if (log.ActionType !== 'deleted' && !log.NotesPostID) {
					console.error("addLog:error: Can't add a note log without a NotesPostID")
					return null
				}
				query = await db.pool.query(
					`INSERT INTO ActivityLog (ActivityType, ActionType, Description, NotesPostID, URL) VALUES (?, ?, ?, ?, ?)`,
					[log.ActivityType, log.ActionType, log.Description, log?.NotesPostID, log?.URL]
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
		await db.pool.query(
			`DELETE FROM ActivityLog
			WHERE
				(ActivityType = 'blog' AND ActionType != 'deleted' AND (BlogPostID IS NULL OR URL IS NULL))
				OR
				(ActivityType = 'projects' AND ActionType != 'deleted' AND (ProjectPostID IS NULL OR URL IS NULL))
				OR
				(ActivityType = 'notes' AND ActionType != 'deleted' AND (NotesPostID IS NULL OR URL IS NULL))`
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

export async function clearTestLogs() {
	try {
		// Remove all logs with Description starting with 'test'
		const query = await db.pool.query(
		`DELETE FROM ActivityLog WHERE Description LIKE 'test%'`
		)
		return query[0]
	} catch (err) {
		console.error("clearTestLogs:error: ", err)
		return null
	}
}
