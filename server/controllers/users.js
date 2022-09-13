import bcrypt from 'bcrypt.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.state(404).json({ message: "User donsen't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "비밀번호가 틀립니다" })


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })



    } catch (error) {
        res.status(500).json({ message: "어떠한 에러가 나타났습니다." })

    }
}



export const sighup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "user already exist" })

        if (password !== confirmPassword) return res.status(400).json({ message: "password not match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
        res.status(200).json({ result: result, token })

    } catch (error) {
        res.status(500).json({ message: "어떠한 에러가 나타났습니다." })

    }

}

