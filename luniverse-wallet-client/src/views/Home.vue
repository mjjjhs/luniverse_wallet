<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="handleClickLogoBtn">
    <HelloWorld v-if="myInfo" :info="myInfo" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {axiosInstance} from '../assets/axios';
import {alertErr} from '../helper/util';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      myInfo: null
    }
  },
  created() {
    (async () => {
      await this.handleClickLogoBtn();
    })();
  },

  methods: {
    async handleClickLogoBtn(e) {
      try {
        const info = localStorage.getItem('info');
        if(!info) {
            this.$router.replace('/login');
            return;
        }
        const {email, token} = JSON.parse(info);
        const reqUrl = `/auth/myinfo`;
        const headers = {
          Authorization: `Bearer ${token}`
        };
        const res = await axiosInstance.get(
            reqUrl,
            {
              headers
            }
        );

        if (!res) {
          return;
        }
        this.myInfo = res.data;
      } catch(e) {
        alertErr(e);
      }
    }
  }

}
</script>
