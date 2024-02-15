
// not found
export const notFound = (req, res, next) => {
    const error = new Error(`not found: ${req.originalUrl}`);
    res.status(404);
    next(error)
}

// error handler

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err?.message,
        stack: err?.stack,
    })

}