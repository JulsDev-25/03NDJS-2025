export const addition = (a, b) => a + b

export const soustraction = (a, b) => a - b

export const multiplication = (a, b) =>  a * b

export const division = (a, b) => {
    if (b === 0) {
        return "Erreur, entrez un diviseur non null"
    }
    return a/b
}

