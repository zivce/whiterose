<template>
  <canvas id='m' class="row">
<!-- http://cssdeck.com/labs/the-matrix -->
  </canvas>
</template>

<script>
import logger from "../utils/groupLogger";

export default {
  mounted() {
    logger(["this", this], "MatrixLoader.vue");
   
    this.m = document.getElementById("m")
    this.ctx = this.m.getContext("2d");

    this.m.width = this.width;
    this.m.height = this.height;

    this.columns = Math.floor(this.m.width/this.font_size);
    this.columns += 20;
    this.drops = new Array(this.columns).join(1).split("");
    


    this.int = setInterval(this.draw,30);
  },
  data() {
    return {
        int:undefined,
        m : null,
        ctx: null,
        width : window.innerWidth,
        height: window.innerHeight,
        letters : "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split(""),
        columns : undefined,
        drops : [],
        font_size : 9

    };
  },
  destroyed() {
      clearInterval(this.int);
  },
  methods: {
    draw(){
        
        
        
        this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
        
        this.ctx.fillRect = (0,0,this.m.width,this.m.height);

        this.ctx.fillStyle = "#0f0";
        this.ctx.font = this.font_size + "px arial";

        this.drops.map((drop,index)=>{
          let txt = this.letters[Math.floor(Math.random()* this.letters.length)];
          
          this.ctx.fillText(txt,index*this.font_size,drop * this.font_size);
          
          if(this.drops[index]  > this.height && Math.random() > 0.975)
            this.drops[index] = 0;
          else 
            this.drops[index]++;
        
        })
        
    }

  }
};
</script>


<style scoped>
#m{
  background-color: black;
}

</style>
