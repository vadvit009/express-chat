const {MessageModel} = require('../../models');

const getMsg = async (req, res) => {
  try {
    const msg = await MessageModel.find()
    res.json(msg)
  } catch (e) {
    console.error(e)
  }
};

module.exports = {
  getMsg,
}