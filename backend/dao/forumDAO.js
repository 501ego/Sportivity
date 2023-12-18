import Forum from "../models/Forum.js"

class ForumDAO {
	static async getMessages(id) {
		try {
			return await Forum.find({
				community: id,
			})
				.populate("user")
				.populate("community")
				.sort({ createdAt: 1 })
		} catch (error) {
			return null
		}
	}

	static async createForum(communityId, userId, message) {
		try {
			return await Forum.create({
				community: communityId,
				user: userId,
				message,
			})
		} catch (error) {
			return null
		}
	}

	static async populateMessage(messageId) {
		try {
			return await Forum.findById(messageId)
				.populate("user")
				.populate("community");
		} catch (error) {
			return null;
		}
	}

	static async deleteForum(id) {
		try {
			return await Forum.findByIdAndDelete(id)
		} catch (error) {
			return null
		}
	}
}

export default ForumDAO