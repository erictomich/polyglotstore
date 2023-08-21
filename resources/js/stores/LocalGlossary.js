import { defineStore } from 'pinia'

export const useLocalGlossaryStore = defineStore('LocalGlossary', {
    state: () => ({
        terms: []
    }),
    getters: {

    },
    actions: {
        addItem(term) {
            this.terms.push(term)
        }, removeItem() {
            this.terms.pop()
        }, slice(index) {
            this.terms = this.terms.slice(0,index+1)
          }
    }
})