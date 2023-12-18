import ForumDAO from "../../dao/forumDAO.js"

const createMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;
		const { message } = req.body;
		const newMessage = await ForumDAO.createForum(id, userId, message);
		if (newMessage) {
			const populatedMessage = await ForumDAO.populateMessage(newMessage._id);
			//req.io.to(id).emit('new message', populatedMessage)
			return res.status(200).json(populatedMessage);
		} else {
			return res.status(500).json({ msg: "Internal Server Error" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
}

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await ForumDAO.getMessages(id);
    if (messages) {
      return res.status(200).json(messages);
    } else {
      return res.status(404).json({ msg: "No messages found for the specified ID" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


export {
	createMessage,
	getMessages
}