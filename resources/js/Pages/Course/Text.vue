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

const idButton = 'addTerm';

const btnCloseModal = (e) => {
    e.preventDefault();
    ModalDictionaryStore.close(); 
}

const texto = { text: "the text must be higher text, thinking tidy up the kitchen." }

const saveTerm = async () => {
      await TextService.saveWord(LocalGlossaryStore.terms, ModalDictionaryStore); 
      ModalDictionaryStore.renderMainText();
      TextService.clearSelection(idButton)
}

</script>
<template>
  <AppLayout title="Text" @mouseup="(e) => { TextService.selectWord(e, idButton) }">
    <ModalDictionary >
      <div @mouseup="(e) => { TextService.selectWord(e, idButton) }">
        <a href="#" @click="(e) => { btnCloseModal(e); }">fechar</a>
          Teste
          Termo atual: {{ ModalDictionaryStore.actualTerm }}
            <br><br>
            Breadcrumb: {{ ModalDictionaryStore.terms }} 
            <br><br>
            <div>
              <TextModalComponent  :text="{'text':'testing the use of components variety, how many others must be testing'}" />
            </div>
            
      </div>

    </ModalDictionary>
    <TextComponent :text="props.text"   />
    <TextComponent :text="texto" />
    <TextGlossary />
    <a href="#" @click="window.alert('teste')">teste</a>
    <div class="divAddTerm" :id="idButton">
      <button class="text-black font-bold py-1 px-3 border-b-3 border-blue-700 hover:border-blue-500 rounded" @click="saveTerm">Save +</button>
    </div>
    
  </AppLayout>
  
</template>
<style>
.divAddTerm {
    position:fixed;
    overflow:hidden;
    padding: 5px 10px;
    border: 1px solid #00c95d;
    background-color: #b5ffaa;
    font-size: 14px;
    box-shadow: 1px 1px 5px #d1d1d1;
    border-radius: 10px;
    color: #006e33;
    z-index: 500;
}

.divAddTerm button {
    font-weight: 500;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
}
</style>
