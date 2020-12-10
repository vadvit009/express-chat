const {User} = require('../../models');

const register = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;

    const isExist = await User.findOne({email: email});
    if (isExist) return res.status(400).json({error: true, msg: 'User exists'})

    const createdUser = await User.create({
      email,
      password,
      firstName,
      lastName
    })
    res.json({user: createdUser});
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  register
}