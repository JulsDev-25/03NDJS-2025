const logger = (req, res, next) => {
    const date = new Date().toISOString()
    console.log(`[${date}] ${req.method} ${req.url}`);
    next(); // passe à la route suivante
}

export default logger;