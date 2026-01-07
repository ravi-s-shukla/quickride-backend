export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next); //it will call global error handler middleware is any async function throw error 
};