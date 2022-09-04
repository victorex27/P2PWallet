export default interface ErrorWithStatusCode extends Error {
    code: number | 500,
}