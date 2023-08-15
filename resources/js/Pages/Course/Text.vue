<script>
import { h, ref } from 'vue';
import * as TextService from '@/Services/TextService'

const mainText = ref('Carregando...')
const myDictionaryWords = ref(['Tuesday']);

export default {
  props:['text'],
  setup(props) {

    const logDictionary = () => {
        console.log("dictionary", myDictionaryWords.value)
    }

    const textRender = () => {
        var textReplaced = TextService.composeText(props.text.text, myDictionaryWords.value);
        mainText.value = h('div', [...textReplaced]);
    }

    const render = () => {
        return h('div',  [mainText.value, h('button', { onClick: () => { TextService.saveWord(myDictionaryWords.value, textRender); logDictionary() }}, 'add')])
    }

    textRender();
 
    return () => render()
  }
}

</script>