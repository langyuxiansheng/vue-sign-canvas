<template>
    <div id="app">
        {{ value }}
        <SignCanvas v-model="value"/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value: null
        }
    }
}
</script>
