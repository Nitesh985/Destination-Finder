export const asyncHandler = (fn) => (req, res, next) => {
    Promise
    .resolve(fn(req, res, next))
    .catch(error=>{res.status(error?.statusCode || 500).send({
        status:error?.statusCode || 500,
        message:error?.message || "Something went wrong, please try again later"
    })})
}
