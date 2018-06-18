<template>
  <canvas id='mat' class="row">
  </canvas>
</template>

<script>
export default {
  mounted() {
    this.m = document.getElementById("mat");
    this.ctx = this.m.getContext("2d");

    this.m.width = this.width;
    this.m.height = this.height;

    this.columns = Math.floor(this.m.width / this.font_size);
    this.columns += 30;
    this.drops = new Array(this.columns).join(1).split("");

    this.int = setInterval(this.draw, 30);
  },
  data() {
    return {
      int: undefined,
      m: null,
      ctx: null,
      width: window.innerWidth,
      height: window.innerHeight,
      letters: "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split(
        ""
      ),
      columns: undefined,
      drops: [],
      font_size: 10
    };
  },
  destroyed() {
    clearInterval(this.int);
  },
  methods: {
    
//       var canvas = document.body.appendChild( document.createElement( 'canvas' ) ),
//     context = canvas.getContext( '2d' );
// context.globalCompositeOperation = 'lighter';
// canvas.width = 1500;
// canvas.height = 800;
// draw();

// var textStrip = ['j', 'o', 's', 'i', 'f', 'p', 'i', 'c', 'k', 'e', 't', 'i', 'n', 'a'];

// var stripCount = 60, stripX = new Array(), stripY = new Array(), dY = new Array(), stripFontSize = new Array();

  
// for (var i = 0; i < stripCount; i++) {
//     stripX[i] = Math.floor(Math.random()*1265);
//     stripY[i] = -100;
//     dY[i] = Math.floor(Math.random()*7)+3;
//     stripFontSize[i] = Math.floor(Math.random()*16)+8;
// }

// var theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];

// var elem, context, timer;

// function drawStrip(x, y) {
//     for (var k = 0; k <= 20; k++) {
//         var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
//         if (context.fillText) {
//             switch (k) {
//             case 0:
//                 context.fillStyle = theColors[0]; break;
//             case 1:
//                 context.fillStyle = theColors[1]; break;
//             case 3:
//                 context.fillStyle = theColors[2]; break;
//             case 7:
//                 context.fillStyle = theColors[3]; break;
//             case 13:
//                 context.fillStyle = theColors[4]; break;
//             case 17:
//                 context.fillStyle = theColors[5]; break;
//             }
//             context.fillText(randChar, x, y);
//         }
//         y -= stripFontSize[k];
//     }
// }

// function draw() {
//     // clear the canvas and set the properties
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.shadowOffsetX = context.shadowOffsetY = 0;
//     context.shadowBlur = 8;
//     context.shadowColor = '#94f475';
    
//     for (var j = 0; j < stripCount; j++) {
//         context.font = stripFontSize[j]+'px MatrixCode';
//         context.textBaseline = 'top';
//         context.textAlign = 'center';
        
//         if (stripY[j] > 1358) {
//             stripX[j] = Math.floor(Math.random()*canvas.width);
//             stripY[j] = -100;
//             dY[j] = Math.floor(Math.random()*7)+3;
//             stripFontSize[j] = Math.floor(Math.random()*16)+8;
//             drawStrip(stripX[j], stripY[j]);
//         } else drawStrip(stripX[j], stripY[j]);
        
//         stripY[j] += dY[j];
//     }
//   setTimeout(draw, 70);
// }




    draw() {
      this.ctx.fillStyle = "rgba(0,0,0,0.05)";
      this.ctx.fillRect = (0, 0, this.m.width, this.m.height);
      this.ctx.fillStyle = "#0f0";
      this.ctx.font = this.font_size + "px arial";

      this.drops.map((drop, index) => {
        let txt = this.letters[Math.floor(Math.random() * this.letters.length)];

        this.ctx.fillText(txt, index * this.font_size, drop * this.font_size);

        if (this.drops[index] > this.height) {
          this.drops[index] = 0;
          clearInterval(this.int);
        } else this.drops[index]++;
      });
    }
  }
};
</script>


<style scoped>
#mat {
  background-color: black;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>


