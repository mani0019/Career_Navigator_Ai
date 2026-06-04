const rateLimit = require("express-rate-limit")

const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { message: "AI generation limit reached. Please wait before generating again." }
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { message: "Too many auth attempts, please try again later." }
})

module.exports = { aiLimiter, authLimiter }