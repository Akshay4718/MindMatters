import jwt from "jsonwebtoken"

const authPsychiatrist = async (req, res, next) => {
    try {
        const { ptoken } = req.headers
        if (!ptoken) {
            return res.json({ success: false, message: 'Not authorized' })
        }
        const token_decode = jwt.verify(ptoken, process.env.JWT_SECRET)
        req.body.psyId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authPsychiatrist
