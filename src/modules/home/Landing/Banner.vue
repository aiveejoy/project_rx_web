<template>

	<div class="incre-row">
    <div v-for="(item, index) in settings.page" :key="index" class="cw-banner" :style="{'background': item.background}">
      <div class="image" v-if="item.template === 'left'">
        <img :src="item.image" style="margin-bottom: 5px;" width="100%">
      </div>
      <div class="text" :class="item.textColor">
        <span class="title">
          <h1>{{item.title}}</h1>
        </span>
        <span class="subtitle">
          <h2>{{item.subtitle}}</h2>
        </span>
        <span class="description">
          <h4>
            {{item.description}}
          </h4>
        </span>
        <span class="text-center">
          <a class="" :href="common.appUrl.android" v-if="common.appUrl.android !== null">
           <img class="button img-fluid float-left" alt='Get it on Google Play' :src="require('assets/img/playstore.png')"/>
          </a>
          <a class="" :href="common.appUrl.ios" v-if="common.appUrl.ios !== null">
           <img class="button img-fluid float-left" alt='Get it on App Store' :src="require('assets/img/appstore.png')"/>
          </a>
        </span>
      </div>
      <div class="image" v-if="item.template === 'right'">
        <img :src="item.image" style="margin-bottom: 5px;" width="100%">
      </div>
    </div>
	</div>
</template>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.cw-banner{
  width: 100%;
  float: left;
  height: 600px;
}
.text{
  width: 45%;
  float: left;
  margin-left: 5%;
  margin-top: 150px;
}
.text .title{
  width: 100%;
  float: left;
}
.title h1{
  font-size: 50px;
}
.text .description{
  margin-top: 25px;
  width: 100%;
  float: left;
  text-align: justify;
}
.image{
  width: 40%;
  margin-right: 5%;
  float: left;
  margin-left: 5%;
  display: block;
}
.button{
  position:left;
  width:194px;
}

@media screen and (max-width: 992px){
  .text{
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
  }
  .title{
    text-align: center;
  }

  .image{
    display: none;
  }
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import SETTINGS from 'src/modules/home/settings.js'
import COMMON from 'src/common.js'
export default {
  mounted(){
  },
  data(){
    return {
      settings: SETTINGS,
      common: COMMON
    }
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
