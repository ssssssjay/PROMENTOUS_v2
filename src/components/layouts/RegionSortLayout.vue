<template>
  <div>
    <section class="d-inline-block">
      <div class="d-flex">
        <LargeRegionSort
          class="region lgRegion"
          placeholder="지역선택"
          v-model="selectedLargeCity"
          @select="transLargeCity"
          @change="test"
          :options="largeCityData"
          @clear="clearLarge" />
        <RestRegionSort
          class="region restRegion"
          placeholder="지역선택"
          noOptionsText="대도시를 선택하세요!"
          v-model="selectedRestCity"
          @select="transRestCity"
          :options="restCityData"
          :disabled="selectedLargeCity === 'ON'"
          @clear="clearRest" />
      </div>
    </section>
  </div>
</template>
<script>
import LargeRegionSort from "@vueform/multiselect";
import RestRegionSort from "@vueform/multiselect";
export default {
  props: {
    onlineSort: Object
  },
  components: {
    LargeRegionSort,
    RestRegionSort
  },
  data() {
    return {
      selectedLargeCity: "",
      selectedRestCity: "",
      largeCityData: [],
      restCityData: []
    };
  },
  setup() {},
  created() {
    if (this.onlineSort !== undefined) {
      this.largeCityData.push(this.onlineSort);
    }
    this.getLargeCityData();
  },
  mounted() {},
  unmounted() {},
  methods: {
    test() {
      this.restCityData = [];
      this.selectedRestCity = "";
    },
    clearLarge() {
      this.selectedLargeCity = "";
      this.selectedRestCity = "";
      this.restCityData = [];
      this.$emit("send-LargeCity", this.selectedLargeCity);
      this.$emit("send-RestCity", this.selectedRestCity);
    },
    clearRest() {
      this.selectedRestCity = "";
      this.$emit("send-RestCity", this.selectedRestCity);
    },
    transLargeCity() {
      this.$emit("send-LargeCity", this.selectedLargeCity);
      this.getRestCityData();
    },
    transRestCity() {
      this.$emit("send-RestCity", this.selectedRestCity);
    },
    async getLargeCityData() {
      const response = await this.$get(`http://localhost:3000/common/mainArea`);
      for (let i = 0; i < response.length; i++) {
        let data = {
          value: response[i].code_data_name,
          label: response[i].code_data_desc
        };
        this.largeCityData.push(data);
      }
    },
    async getRestCityData() {
      const target = this.largeCityData.find(
        (item) => item.value === this.selectedLargeCity
      );
      const response = await this.$get(
        `http://localhost:3000/common/subArea?main=${target.value}` // target.value {value: 'M01', label: '경기도'}
      );
      for (let i = 0; i < response.length; i++) {
        let data = {
          value: response[i].code_data_name,
          label: response[i].code_data_desc
        };
        this.restCityData.push(data);
      }
    }
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
.regionSort {
  display: inline-block;
}
.d-flex {
  column-gap: 12px;
}
.region {
  width: 180px;
  margin: 0;
}
</style>
