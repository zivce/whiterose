<template>
 <div class="holder">
  <div id="lander_main" 
  class="row"
  style="display:flex;flex-direction:row;">
    <!-- <h1>
        Follow the white rabbit.
    </h1> -->

    <!-- <main id="inner_buttons"> -->
      <router-link :to="{name:'land_hacker'}">
        <div class="left_half">
          <div class="text_holder">
          <h1 class="h1s_lander">
            Pentester  
          </h1>

          <p>
            Log in to find jobs and other clients
          </p>
        </div>
        </div>
      </router-link>
      
      <router-link :to="{name: 'land_client'}">
        <div class="right_half">
           <div class="text_holder">
          <h1 class="h1s_lander">
            Client  
          </h1>

          <p>
            Log in to get your site tested and find other pentesters.
          </p>

        </div>
      </div>
      </router-link>

 
    <!-- </main> -->
    <a href="#clients">
    <div class="scroll_down_holder">

    </div>
    </a>
    
  </div>
  <div id="clients">
   <div class="clients_left">
    <h2>Clients</h2>
    <h4>Integrated tools</h4>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
   </div>
   <div class="clients_right">
     <div class="clients_right_img_holder">

     </div>
   </div>
  </div>

   <div id="pentesters">
   <div class="pentesters_left">
      <div class="pentesters_left_img_holder">
     </div>
   </div>
   <div class="pentesters_right">
      <h2>Pentesters</h2>
      <h4>Show your skills</h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). </p>
   </div>
   </div>
    <div id="videos_holder">
     <h2>Videos</h2>
      <div class="videos">
        <div class="video_item">
          <iframe width="350" height="350" src="https://www.youtube.com/embed/rpWrtXyEAN0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="video_item">
          <iframe width="350" height="350" src="https://www.youtube.com/embed/rpWrtXyEAN0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>  
        </div>
        <div class="video_item">
          <iframe width="350" height="350" src="https://www.youtube.com/embed/rpWrtXyEAN0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="video_item">
          <iframe width="350" height="350" src="https://www.youtube.com/embed/rpWrtXyEAN0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      </div>
    </div>
   <footer class="flex-rw">
      
      <ul class="footer-list-top">
        <li>
          <h4 class="footer-list-header">About Whiterose</h4></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">GET TO KNOW US</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">PROMOS</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">BECOME A PENTESTER</a></li>

        <li><a href='#' itemprop="significantLink" class="generic-anchor footer-list-anchor">BECOME AN USER</a></li>

        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">EVENTS</a></li>
      </ul>
      <ul class="footer-list-top">
        <li>
          <h4 class="footer-list-header">Additional Info</h4></li>


        <li><a href='#' class="generic-anchor footer-list-anchor">TOOLS</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor">HOME</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor">TERMS</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor">PRIVACY</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" target="_blank">OUR MISSION</a></li>
      </ul>
      <ul class="footer-list-top">
        <li id='help'>
          <h4 class="footer-list-header">Please Help Me</h4></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">CONTACT</a></li>
        <li><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">FAQ</a></li>
        <li id='find-a-store'><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">SERVER LOCATION</a></li>
        <li id='user-registration'><a href='#' class="generic-anchor footer-list-anchor" itemprop="significantLink">NEW USERS</a></li>
        <li id='order-tracking'><a href='#' itemprop="significantLink" class="generic-anchor footer-list-anchor">ORDER STATUS</a></li>
      </ul>
      <section class="footer-social-section flex-rw">
          <span class="footer-social-overlap footer-social-connect">
          CONNECT <span class="footer-social-small">with</span> US
          </span>
          <span class="footer-social-overlap footer-social-icons-wrapper">
          <a href="#" class="generic-anchor" target="_blank" title="Pinterest" itemprop="significantLink"><i class="fa fa-pinterest"></i></a>
          <a href="#" class="generic-anchor" target="_blank" title="Facebook" itemprop="significantLink"><i class="fa fa-facebook"></i></a>
          <a href="#" class="generic-anchor" target="_blank" title="Twitter" itemprop="significantLink"><i class="fa fa-twitter"></i></a>
          <a href="#" class="generic-anchor" target="_blank" title="Instagram" itemprop="significantLink"><i class="fa fa-instagram"></i></a>
          <a href="#" class="generic-anchor" target="_blank" title="Youtube" itemprop="significantLink"><i class="fa fa-youtube"></i></a>
          <a href="#" class="generic-anchor" target="_blank" title="Google Plus" itemprop="significantLink"><i class="fa fa-google-plus"></i></a>
          </span>
      </section>
      <section class="footer-bottom-section flex-rw">
    <div class="footer-bottom-wrapper">   
    <i class="fa fa-copyright" role="copyright">
    
    </i> 2018 WhiteRose in <address class="footer-address" role="company address">Europe</address><span class="footer-bottom-rights"> - All Rights Reserved - </span>
        </div>
        <div class="footer-bottom-wrapper">
        <a href="#" class="generic-anchor" rel="nofollow">Terms</a> | <a href="#" class="generic-anchor" rel="nofollow">Privacy</a>
          </div>
      </section>
    </footer>
  </div>
 
</template>


<script>
export default {
  mounted() {
    setTimeout(() => {}, 1000);
  },
  methods: {
    goToHacker() {
      this.$router.push({ name: "land_hacker" });
    }
  },
  data() {
    return {
      isVisibleMatrix: true,

      visible: true
    };
  }
};
</script>


<style scoped>
a {
  text-decoration: none;
}
.left_half p, .right_half p {
  color : white;
}
.left_half:hover {
  transform: scale(1.05);
  cursor: pointer;
  text-decoration: none;
}

.left_half
{
  text-align: center;
 /* background-color: rgba(209, 3, 46, 0.252); */
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
}
.right_half:hover {
  transform: scale(1.05);
  cursor: point;
  text-decoration: none;
}
.right_half
{
  text-align: center;
  /* background-color: rgba(6, 26, 64, 0.285); */
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
}

#hck {
  margin-left: 25%;
}
h1 {
  color: white;
}

#inner_buttons {
  vertical-align: middle;
  height: 7%;
  width: fit-content;
  position: relative;
  margin: auto;
  margin-top: 20px;
}

#lander_main {
    background-image: url('/img/morph.jpg');
    background-repeat: no-repeat;
    background-position: 0% 90%;
    background-size: 101.3%;
    position: relative;
    background-color: transparent;
    width: 100vw;
    height: 100vh;
}

.scroll_down_holder { 
    background-image: url('/img/scroll-down.png');
    width: 120px;
    height: 82px;
    position: absolute;
    top: 85%;
    left: 47.0%;
    transition: all 0.3s;
}
.scroll_down_holder:hover {
        transform: translateY(-10px) scale(1.05);
}

#clients {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    justify-content: space-between;
    padding: 30px;
    background-color: rgb(204, 204, 204);
    color: #3a3232;
}

.clients_left h4 {
    color: #95240c;
}

.clients_left p {
  padding: 20px;
  color: #505050;
}

#pentesters {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    justify-content: space-between;
    padding: 30px;
    background-color: rgb(15, 15, 15);
    color: #f1f1f1;
}
.pentesters_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.pentesters_right h4 {
  color: #4c86a3;
}
.pentesters_right p {
  padding: 20px;
  color: #b1b1b1;
}

.text_holder {
padding: 30px;
border-radius: 30px;
width: 300px;
}

.left_half .text_holder {
  background-color: rgba(216, 48, 12, 0.67);
}

.right_half .text_holder {
  background-color: rgba(97, 177, 216, 0.73);
}

.clients_right_img_holder {
   background-image: url('/img/clients.jpg');
    width: 650px;
    height: 450px;
    background-size: cover; 
    background-repeat: no-repeat;
    box-shadow: 0px 0px 5px 5px #969595;
}

.pentesters_left_img_holder {
   background-image: url('/img/pentesters.jpg');
   width: 650px;
   height: 350px;
   box-shadow: 0px 0px 5px 5px #4e4c4c;
}
#videos_holder {
    background: #000000;
    padding: 30px 0 70px 0px;
}
.videos {
    display: flex;
    justify-content: space-around;
}

#videos_holder h2 {
    text-align: center;
    padding: 30px;
    color: #efefef;
}

/* footer styles */

footer {
  background: #000000;
  margin-top: auto;
  width: 100%;
}

.footer-list-top {
  width: 33.333%;
}

.footer-list-top > li {
  text-align: center;
  padding-bottom: 10px;
}

.footer-list-header {
  padding: 10px 0 5px 0;
  color: #fff;
}



.footer-social-section {
  width: 100%;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin-top: 5px;
}

.footer-social-section::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 10px;
  border-top: 1px solid #ccc;
  width: calc(100% - 20px);
}

.footer-social-overlap {
  position: relative;
  z-index: 2;
  background: #000000;
  padding: 0 20px;
}

.footer-social-connect {
  display: flex;
  align-items: center;
  font: 3.5em "Oswald", sans-serif;
  color: #fff;
}

.footer-social-small {
  font-size: 0.6em;
  padding: 0px 20px;
}

.footer-social-overlap > a {
  font-size: 3em;
}

.footer-social-overlap > a:not(:first-child) {
  margin-left: 0.38em;
}

.footer-bottom-section {
  width: 100%;
  padding: 10px;
  border-top: 1px solid #ccc;
  margin-top: 10px;
}

.footer-bottom-section > div:first-child {
  margin-right: auto;
}

.footer-bottom-wrapper {
  font-size: 1.5em;
  color: #fff;
}

.footer-address {
  display: inline;
  font-style: normal;
}

@media only screen and (max-width: 768px) {
  .footer-list-header {
    font-size: 2em;
  }

  .footer-list-anchor {
    font-size: 1.1em;
  }

  .footer-social-connect {
    font-size: 2.5em;
  }

  .footer-social-overlap > a {
    font-size: 2.24em;
  }

  .footer-bottom-wrapper {
    font-size: 1.3em;
  }
}
@media only screen and (max-width: 568px) {
  main {
    font-size: 5em;
  }

  .footer-list-top {
    width: 100%;
  }

  .footer-list-header {
    font-size: 3em;
  }

  .footer-list-anchor {
    font-size: 1.5em;
  }

  .footer-social-section {
    justify-content: center;
  }

  .footer-social-section::after {
    top: 25%;
  }

  .footer-social-connect {
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .footer-social-overlap {
    display: flex;
    justify-content: center;
  }

  .footer-social-icons-wrapper {
    width: 100%;
    padding: 0;
  }

  .footer-social-overlap > a:not(:first-child) {
    margin-left: 20px;
  }

  .footer-bottom-section {
    padding: 0 5px 10px 5px;
  }

  .footer-bottom-wrapper {
    text-align: center;
    width: 100%;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 480px) {
  .footer-social-overlap > a {
    margin: auto;
  }

  .footer-social-overlap > a:not(:first-child) {
    margin-left: 0;
  }

  .footer-bottom-rights {
    display: block;
  }
}
@media only screen and (max-width: 320px) {
  .footer-list-header {
    font-size: 2.2em;
  }

  .footer-list-anchor {
    font-size: 1.2em;
  }

  .footer-social-connect {
    font-size: 2.4em;
  }

  .footer-social-overlap > a {
    font-size: 2.24em;
  }

  .footer-bottom-wrapper {
    font-size: 1.3em;
  }
}

a {
  text-decoration: none;
}

.generic-anchor {
     color: #949494;
}
.generic-anchor:visited {
    color: #949494;
}
.generic-anchor:hover {
  color: #949494;
}

.flex-rw {
  display: flex;
  flex-flow: row wrap;
}

ul {
  list-style: none;
}



</style>
