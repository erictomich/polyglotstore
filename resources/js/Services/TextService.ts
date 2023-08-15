import { h } from 'vue'

export const removeExpressions = (words: string[]) => {
    return words.filter((word) => {
        return word.split(" ").length == 1
    });
}

export const wrapWordsWithTag = (text: string, words: string[]) => {

    words = removeExpressions(words);
    if(words.length > 0) {
        // não permite iniciar ou finalizar com um caractere após as palavras selecionadas
        const regex = new RegExp(`(?<=^|[^\\w])(${words.join("|")})(?!\\w)`, "giu");
        return text.replace(regex, "<word>$&</word>");
    }
    return text;
}

export const actionClickWord = (e: MouseEvent, word:string) => {
    e.preventDefault()
    console.log(word);
}

export const replaceTagsByComponents = (text: string) => {
    const regex = /(<word>.+?<\/word>)/g;
    const textArray = text.split(regex).reduce((acc, curr, index, arr) => {
        if (index % 2 === 0) {
            return acc.concat(curr);
        }
        if (curr !== arr[index - 1]) {
            return acc.concat(curr);
        }
        return acc;
    }, []);

    const newArray = textArray.map((item) => {
        if (regex.test(item)) {
            const word = item.match(/<word>(.+?)<\/word>/)[1];
            return h('a', { class: 'term_selected', href: '#', onClick: (e: MouseEvent) => { actionClickWord(e, word) } }, word);
        } else { 
            return h('span', { innerHTML: item });
        }
    });

    return newArray;
} 

export const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

export const saveWord = (words: string[], callback: Function) => {
        let selectedText = getSelectedText().trim();
        words.push(selectedText);
        callback()
}

export const composeText = (text: string, words: string[]) => {
    var textWithTags = wrapWordsWithTag(text, words);
    var textReplaced = replaceTagsByComponents(textWithTags);
    return textReplaced;
}