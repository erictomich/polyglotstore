<script setup>
    import { ref } from 'vue'
    const props = defineProps(['text']);

    // colocao texto geral em um ref
    const textGeneral = ref(props.text.text)

    const removeExpressions = (palavras) => {
        return palavras.filter((palavra) => {
            return palavra.split(" ").length == 1
        });
    }


    const envolverPalavrasComTag = (texto, palavra) => {
        
        palavra = removeExpressions(palavra);
        if(palavra.length > 0) {
            // não permite iniciar ou finalizar com um caractere após as palavras selecionadas
            const regex = new RegExp(`(?<=^|[^\\w])(${palavra.join("|")})(?!\\w)`, "giu");
            return texto.replace(regex, "<word>$&</word>");
        }
        return texto;
    }

    const repText = (texto) => {

            const regex = /(<word>.+?<\/word>)/g;

            const textArray = texto.split(regex).reduce((acc, curr, index, arr) => {
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
                  
                   return '<a href="#" @click="clicaNaPalavra(word)">'+word+'</a>';
                   
                    
                } else { 
                    return '<span>'+item+'</span>';
                }
            });

        return newArray.join('');
        }
   

    const words = ['Tuesday']



    setTimeout(() => {
        textGeneral.value = repText(envolverPalavrasComTag(textGeneral.value, words));
    },2000)

</script>
<template>
    {{ props.text.title }}
    <br><br>
    <div :innerHTML="textGeneral"></div>
    <a href="#" onclick="clicaNaPalavra('teste')">OPAA</a>
</template>
