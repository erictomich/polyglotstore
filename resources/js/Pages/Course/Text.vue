<script setup>
import { ref } from 'vue'
import TextComponent from '@/Components/TextComponent.vue'
import TextModalComponent from '@/Components/TextModalComponent.vue'
import TextGlossary from '@/Components/TextGlossary.vue'
import ModalDictionary from '@/Components/ModalDictionary.vue'
import * as TextService from '@/Services/TextService'
import { useLocalGlossaryStore } from '@/stores/LocalGlossary'
import { useModalDictionaryStore } from '@/stores/ModalDictionary'



const ModalDictionaryStore = useModalDictionaryStore()

const LocalGlossaryStore = useLocalGlossaryStore()

const varRendering = ref(0)
const props = defineProps(['text']);


const btnCloseModal = (e) => {
    e.preventDefault();
   // ModalDictionaryStore.renderMainText(); 
    ModalDictionaryStore.close(); 
}

const texto = { text: "the text must be higher text, thinking tidy up the kitchen." }

const saveTerm = async () => {
      await TextService.saveWord(LocalGlossaryStore.terms, ModalDictionaryStore); 
      ModalDictionaryStore.renderMainText()
}

</script>
<template>
  <AppLayout title="Text">
    <ModalDictionary>
      <a href="#" @click="(e) => { btnCloseModal(e); }">fechar</a>
      Teste
       Termo atual: {{ ModalDictionaryStore.actualTerm }}
        <br><br>
        Breadcrumb: {{ ModalDictionaryStore.terms }} 
        <br><br>
        <TextModalComponent :text="{'text':'testing the use of components variety, how many others must be testing'}" />

    </ModalDictionary>
    <TextComponent :text="props.text"  />
    <TextComponent :text="texto" />
    <TextGlossary />
    <button @click="saveTerm">Save +</button>
  </AppLayout>
  
</template>
