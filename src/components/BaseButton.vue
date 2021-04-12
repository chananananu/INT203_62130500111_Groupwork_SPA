<template>
    <div>
        <button class="focus:outline-none w-60 py-2 mt-5 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100" :class="[buttonColor, txtColor]">{{ buttonLabel }}</button>
    </div>
</template>
<script>
 export default {
     props: {
         buttonColor: {
             type: String,
             required: false
         },
         txtColor: {
             type: String,
             required: false,
             default: 'text-black'
         },
         buttonLabel: {
             type: String,
             required: true
         }
     }
 }
 </script>