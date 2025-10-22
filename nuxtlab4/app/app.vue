<template>
  <main class = "flex flex-col gap-4 p-12 justify-center min-h-screen items-center bg-gradient-to-b from-gray-200 to-blue-300 hover:to-red-300 flex-wrap">
    <div class = "flex gap-4">
      <label><input class="mx-2" type="radio" value="Dexter" v-model = "selectedpic">Dexter</label>
      <label><input class="mx-2" type="radio" value="Arthur" v-model = "selectedpic">Arthur</label>
      <label><input class="mx-2" type="radio" value="Walter" v-model = "selectedpic">Walter</label>
    </div>
    <div class="flex flex-row gap-4 flex-wrap">
      <div class = "blockcap" v-if="selectedpic == 'Dexter'" @mouseover="curser=true;pic1.bossy = pic1.imager(curser, pic1.gif, pic1.image)" @mouseleave="curser=false;pic1.bossy = pic1.imager(curser, pic1.gif, pic1.image)">
        <img :src="pic1.bossy" class="w-60 h-68 pt-2">
        <p class = "text-black text-xl">{{pic1.name}}</p>
      </div>
      <div class = "blockcap" v-if="selectedpic == 'Arthur'" @mouseover="curser=true;pic2.bossy = pic2.imager(curser, pic2.gif, pic2.image)" @mouseleave="curser=false;pic2.bossy = pic2.imager(curser, pic2.gif, pic2.image)">
        <img :src="pic2.bossy" class="w-60 h-68 pt-2">
        <p class = "text-black text-xl">{{pic2.name}}</p>
      </div>
      <div class = "blockcap" v-if="selectedpic == 'Walter'" @mouseover="curser=true;pic3.bossy = pic3.imager(curser,pic3.gif, pic3.image)" @mouseleave="curser=false;pic3.bossy = pic3.imager(curser, pic3.gif, pic3.image)">
        <img :src="pic3.bossy" class="w-60 h-68 pt-2">
        <p class = "text-black text-xl">{{pic3.name}}</p>
      </div>      
    </div>
    <div class="flex flex-row gap-4 flex-row " >
        <div class="blockfor" v-for="(pic, index) in genpic" :key="index"  @mouseover="curser=false;pic.bossy = pic.imager(curser,pic.image,pic.gif)" @mouseleave="curser=true;pic.bossy = pic.imager(curser,pic.image,pic.gif)">
          <img :src="pic.bossy" class="w-60 h-68 pt-2">
          <p class="tex-black text-xl">{{ pic.name }}</p>
        </div>
      </div>
  </main> 
</template>

<script setup lang = "ts">
 import { reactive } from 'vue';
 import { ref } from 'vue';

 const curser = ref<boolean>(false);

 class stking{
    constructor(asd:string, qwe:string, bbl:string){
      this.name = asd;
      this.image = qwe;
      this.gif = bbl;
      this.bossy = qwe;
    }
    name:string = '';
    image:string = ''; 
    gif:string = '';
    bossy:string = '';
    imager(imagee:boolean,image1:string,image2:string): string {
      return imagee ? image1 : image2;
    }
 } 

 const pic1 = reactive<stking>(new stking('Dexter','/img/dexter.jpg','/img/DexterMorgan.gif'));
 const pic2 = reactive<stking>(new stking('Arthur','/img/ArthurMorgan.jpg','/img/ArthurMorgantea.gif'));
 const pic3 = reactive<stking>(new stking('Walter','/img/WalterWhite.jpg','/img/WalterWhiteFalling.gif'));

 const genpic = reactive<stking[]>([
   new stking('John','/img/JohnMarston.jpg','/img/JohnMarstonEvil.gif'),
   new stking('Gustavo','/img/GusFring.jpg','/img/Gustavo.gif'),
   new stking('Kanye','/img/KanyeWest.jpg','/img/KanyeMeme.gif')
 ]);
 const selectedpic = ref<string>('');

</script>

<style scoped>

.blockcap {
  @apply flex flex-col gap-2 border-blue-500 border bg-blue-300 w-72 h-auto items-center hover:border-red-500 hover:border-4 hover:bg-red-300 rounded-xl;
}
.blockfor {
  @apply flex flex-col gap-2 border-blue-500 border bg-blue-300 w-72 h-auto items-center hover:border-yellow-500 hover:border-4 hover:bg-yellow-300 rounded-xl;
}
</style>