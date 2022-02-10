const progressiveCipher = (string) => {
    let result = "";
    for(let i = 0; i < string.length; i++) {
        const shift = i + 1;

        result += String.fromCharCode(string.charCodeAt(i) + shift);
    }
    return result;
}

console.log(progressiveCipher("I love cryptography!"));