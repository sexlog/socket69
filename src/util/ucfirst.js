export function ucfirst(string, prefix = '') {
    return prefix + string.charAt(0).toUpperCase() + string.substr(1);
}