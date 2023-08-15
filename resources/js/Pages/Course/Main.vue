<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps(['course', 'texts']);
console.log(props.course)
console.log(props.texts)
</script>
<template> 
    <AppLayout title="Course">
        <p>{{ props.course.subject }}</p>
        
        <ul>
            <li v-for="text in props.texts">{{ text.title }}</li>
        </ul>
    </AppLayout>
    
</template>