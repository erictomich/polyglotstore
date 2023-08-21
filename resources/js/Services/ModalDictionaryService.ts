

export const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

export const addTerm = async (words: string[], callback: Function, ModalStore: any) => {
        let selectedText = getSelectedText().trim();
        ModalStore.setActualTerm(selectedText);
        words.push(selectedText);
        console.log("dictionary", words)
        callback()
}