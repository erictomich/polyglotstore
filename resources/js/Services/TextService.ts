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

export const actionClickWord = (e: MouseEvent, word:string, ModalStore: any) => {
    e.preventDefault()
    ModalStore.setActualTerm(word)
    ModalStore.open()
    console.log(word);
}

export const actionClickWordOnModalDictionary = (e: MouseEvent, word:string, ModalStore: any) => {
    e.preventDefault()
    ModalStore.setActualTerm(word)
    console.log(word);
}


export const replaceTagsByComponents = (text: string, ModalStore: any) => {
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

    const newArray = [];

    textArray.forEach(item => {
    if (regex.test(item)) {
        const word = item.match(/<word>(.+?)<\/word>/)[1];
        newArray.push(
        h('a', {
            class: 'term_selected',
            href: '#',
            onClick: (e: MouseEvent) => {
                actionClickWord(e, word, ModalStore);
            }
        }, word)
        );
    } else {
        newArray.push(
        h('span', {
            innerHTML: item
        })
        );
    }
    });

    return newArray;
} 

export const replaceTagsByComponentsOnModalDictionary = (text: string, ModalStore: any) => {
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

    const newArray = [];

    textArray.forEach(item => {
    if (regex.test(item)) {
        const word = item.match(/<word>(.+?)<\/word>/)[1];
        newArray.push(
        h('a', {
            class: 'term_selected',
            href: '#',
            onClick: (e: MouseEvent) => {
                actionClickWordOnModalDictionary(e, word, ModalStore);
            }
        }, word)
        );
    } else {
        newArray.push(
        h('span', {
            innerHTML: item
        })
        );
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

export const saveWord = async (words: string[], ModalStore: any) => {
        let selectedText = getSelectedText().trim();
        if(selectedText != '') {
            words.push(selectedText);
            ModalStore.setActualTerm(selectedText);
        }

}

export const composeText = (text: string, words: string[], ModalStore: any) => {
    var textWithTags = wrapWordsWithTag(text, words);
    var textReplaced = replaceTagsByComponents(textWithTags, ModalStore);
    return textReplaced;
}

export const composeModalDictionaryText = (text: string, words: string[], ModalStore: any) => {
    var textWithTags = wrapWordsWithTag(text, words);
    var textReplaced = replaceTagsByComponentsOnModalDictionary(textWithTags, ModalStore);
    return textReplaced;
}

export const selectWord = (e: MouseEvent, idButton: string) => {
    var addButton = document.getElementById(idButton)
    var selection = getSelectedText();
    let chars = ['.', '?', '!', '+', ',', ':', '。']

    if (chars.some((char) => selection.includes(char)) || selection.trim() == "") {
      addButton.style.display = 'none';
    } else {
        var x = e.clientX,
            y = e.clientY;
            addButton.style.top = (y - 50) + 'px';
            addButton.style.left = (x + 5) + 'px';
            addButton.style.display = 'block';
            
    }
}


export function clearSelection(idButton: string) {
    document.getElementById(idButton).style.display = 'none'

    var sel = window.getSelection ? window.getSelection() : document.selection;
    if (sel) {
        if (sel.removeAllRanges) {
            sel.removeAllRanges();
        } else if (sel.empty) {
            sel.empty();
        }
    }
}