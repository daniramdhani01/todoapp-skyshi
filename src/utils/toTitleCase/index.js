export const toTitleCase = (a) => {
    const string = (a.slice(0, 1).toUpperCase() + a.slice(1, a.length)).replace('-',' ')
    return string
}