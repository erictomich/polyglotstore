<script>
import { useLocalGlossaryStore } from '@/stores/LocalGlossary'
import { useModalDictionaryStore } from '@/stores/ModalDictionary'
import { h, ref, watch } from 'vue';
import * as TextService from '@/Services/TextService'

export default {
  props:['text'],
  setup(props) {
    const LocalGlossaryStore = useLocalGlossaryStore()
    const ModalDictionaryStore = useModalDictionaryStore();

    const mainText = ref('Carregando...')

    const textRender = () => {
        var textReplaced = TextService.composeText(props.text.text, LocalGlossaryStore.terms, ModalDictionaryStore);
        //console.log('render text');
        mainText.value = h('div', [...textReplaced]);
    }

    const render = () => {
        return [
                h('div',  mainText.value), 
              
                h('button', { class: 'renderClass hide', onClick: () => { 
                    textRender() 
                }}, 'render text +')
              ]
    }

    textRender();
    return () => render()
  }
}

</script>
<style>
.term_selected {
  color: #ff0000 !important;

}
.hide {
  display: none !important;
}
</style>