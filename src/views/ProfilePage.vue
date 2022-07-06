<template>
  <div class="profileComponent">
    <b>Profile</b>
    <div v-if="isLoading" class="loading-indicator spinner">
      <Loading></Loading>
    </div>
    <div v-if="errorMSG">
      A error ocurred or you have not logged in. Please return to front page and
      try loggin in.
    </div>

    <table>
      <tr v-for="(index, prof) in profile" :key="prof">
        <td v-if="prof === 'sub'">Elixir ID</td>
        <td v-else>{{ prof }}</td>

        <td v-if="typeof index === 'string' || typeof index === 'boolean'">
          {{ index }}
        </td>
        <div class="datasetAccess" v-else v-for="(key, i) in index" :key="i">
          {{ key }}
        </div>
      </tr>
      <td v-if="!isLoading">Bona fide status</td>
      <td v-if="!isLoading">
        <b-tag type="is-danger">Unverified</b-tag> Not yet implemented
      </td>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-material-design-icons/Loading.vue";
import { Buffer } from "buffer";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      profile: "",
      accountInfo: process.env.VUE_APP_ACCOUNT_INFO,
      isLoading: true,
      errorMSG: false,
    };
  },
  methods: {
    indexToString: function (value) {
      if (typeof value == "boolean") {
        if (value) {
          return "True";
        } else {
          return "False";
        }
      }
      if (typeof value == "object") {
        return value[0] + value[1];
      }
      return value;
    },
    getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          this.profile = JSON.parse(c.substring(name.length, c.length));
        }
      }
    },
    cutLongString: function (string) {
      if (string.length > 50) {
        return string.substring(0, 52);
      }
      return "";
    },
    endOfString: function (obj) {
      if (typeof obj === "string") {
        if (obj.length > 50) {
          return obj.substring(50, obj.length);
        }
        return obj;
      } else {
        if (obj[0].length > 50) {
          return obj[0].substring(50, obj[0].length);
        }
        return obj[0];
      }
    },
    processResponse: function (response) {
      delete response.given_name;
      delete response.family_name;

      var visas = response.ga4gh_passport_v1;
      var accessGrants = [];

      visas.forEach((visa) => {
        var splitVisas = visa.split(".");
        var decoded = JSON.parse(
          Buffer.from(splitVisas[1], "base64").toString("utf8")
        );
        if (decoded.ga4gh_visa_v1.type == "ControlledAccessGrants") {
          accessGrants.push(decoded.ga4gh_visa_v1.value);
        }
      });
      delete response.ga4gh_passport_v1;
      response.Dataset_access = accessGrants;
    },
    getProfile: function () {
      axios
        .get(this.accountInfo, {
          withCredentials: true,
        })
        .then((response) => {
          this.isLoading = false;
          var processedResponse = this.processResponse(response.data);
          this.profile = response.data;
        })
        .catch((error) => {
          this.errorMSG = true;
          console.log(this.$props, error);
        });
    },
  },
  beforeMount() {
    this.getProfile();
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
}
th,
td {
  padding: 5px;
  white-space: pre;
}
.response_value {
  width: 1200px;
  margin: auto;
  white-space: pre;
}
.profileValue {
  overflow: hidden;
}
.responseArray {
  white-space: initial;
}
.profileComponent {
  margin: auto;
  padding: 5px;
}
.datasetAccess {
  padding: 5px;
}
.loading-indicator {
  text-align: center;
}
.spinner {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
b-tag {
  padding: 5px;
}
</style>
