import wordBank from "../../../resources/full_wordlist.txt"


export const generateWordSet = async () => {

    let wordSet;
    let secretWord;

    await fetch(wordBank).then((response) =>
        response.text()).then((result) => {
        const wordArray = result.split("\n");

        secretWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        wordSet = new Set(wordArray);
    });

    return { wordSet, secretWord };
};
