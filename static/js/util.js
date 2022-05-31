function getUniqueList(data, key) {
    return [...new Set(data.map(item => item[key]))];
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
