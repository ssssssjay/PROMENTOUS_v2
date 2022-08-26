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
    /* AXIOS function*/
    async $get(url) {
      return (
        await axios.get(url).catch((e) => {
          console.log(e);
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
    },
    /* common function */
    $setStatusText(status_code) {
      if (status_code === "REC") {
        return "모집중";
      } else if (status_code === "FIN") {
        return "모집완료";
      }
    },
    goToMenu(path) {
      this.$router.push({ path: path });
      /**/
    },
    $formatDate(datetime) {
      // TODO: 예외처리 코드 보완 필요
      if (!datetime) {
        // console.log("datetime undefined error 처리 필요");
        return "";
      }
      return datetime.substr(0, 10);
    }
  }
};
