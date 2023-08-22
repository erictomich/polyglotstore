<script>
import { useLocalGlossaryStore } from '@/stores/LocalGlossary'
import { useModalDictionaryStore } from '@/stores/ModalDictionary'
import { h, ref } from 'vue';
import * as TextService from '@/Services/TextService'



export default {
  props:['text'],
  setup(props) {

    const mainText = ref('Carregando...')

    const LocalGlossaryStore = useLocalGlossaryStore()

    const ModalDictionaryStore = useModalDictionaryStore();

    const textRender = () => {
        var textReplaced = TextService.composeModalDictionaryText(props.text.text, LocalGlossaryStore.terms, ModalDictionaryStore);
        mainText.value = h('div', [...textReplaced]);
    }

    const render = () => {
        return [
                h('div',  mainText.value), 
                h('button', { class:"renderClass hide", onClick: async () => { 
                                        textRender();
                                    }}, 'add +')
              ]
    }

    textRender();
 
    return () => render()
  }
}

</script>