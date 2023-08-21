import { defineStore } from 'pinia'

export const useModalDictionaryStore = defineStore('ModalDictionary', {
    state: () => ({
        isOpenGlobal: false,
        showModalDictionaryLang: 'en',
        contentModal_en: '... :: english :: ...',
        contentModal_pt: '... :: português :: ...',
        terms: [],
        actualTerm: '',
        renderMainTextValue: 0
    }),
    actions: {
      open() {
        this.terms = [this.actualTerm]
        this.isOpenGlobal = true
      },
      close() {
        this.isOpenGlobal = false
      }, 
      showTranslateEn() {
        this.showModalDictionaryLang = 'en'
      },
      showTranslatePt() {
        this.showModalDictionaryLang = 'pt'
      },
      setActualTerm(term) {
        if(term != '') 
            this.terms.push(term) 
        this.actualTerm = term
      },
      renderMainText() {

        // chama o botão para renderização dentro do TextComponent
        const elements = document.querySelectorAll('.renderClass');
        
        elements.forEach(element => {
            element.click();
        });
      }

    }
  })