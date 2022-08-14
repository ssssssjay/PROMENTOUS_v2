import axios from "axios";

/*AXIOS base URL - vue파일에서 짧게치기위해! */
/* eslint-disable */
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

export default {
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    toTop() {},
    functionA() {
      //     console.log("AXIOS에서 호출함");
    },
    functionAA(param) {
      //      console.log("axiosparam");
      console.log(param);
    },
    /**************************/
    /**AXIOS 용 **/
    /** */
    /**************************/
    async $get(url) {
      //   console.log("get url ");
      return (
        await axios.get(url).catch((e) => {
          //      console.log("get url ");
          //      console.log(e);
        })
      ).data;
    },

    async $post(url, data) {
      return await axios.post(url, data).catch((e) => {
        console.log(e);
      });
    },
    async $put(url, data) {
      return await axios.put(url, data).catch((e) => {
        console.log(e);
      });
    },
    async $delete(url) {
      return await axios.delete(url).catch((e) => {
        console.log(e);
      });
    },
    async $patch(url, data) {
      return await axios.patch(url, data).catch((e) => {
        console.log(e);
      });
    }
    /**************************/
    /** XXXXXXXXX    용 **/
    /**************************/
  }
};
