<template>
  <div class="profileComponent">
    <b>Profile</b>
    <table>
      <tr v-for="(index, prof) in profile" :key="prof">
        <td v-if="prof === 'sub'">Elixir ID</td>
        <td v-else>{{ prof }}</td>

        <td v-if="prof === 'email'">
          <span v-for="(key, i) in index" :key="i">
            <span v-if="typeof key !== 'boolean'" style="padding-right: 10px">{{
              key
            }}</span>
            <b-tag v-else-if="key" type="is-success">Verified</b-tag>
            <b-tag v-else type="is-danger">Unverified</b-tag>
          </span>
        </td>
        <td v-else-if="prof === 'Bona fide status'">
          <b-tag v-if="index === 'Verified'" type="is-success">Verified</b-tag>
          <b-tag v-else type="is-danger">Unverified</b-tag>
        </td>
        <td v-else-if="typeof index === 'string' || typeof index === 'boolean'">
          {{ index }}
        </td>
        <div class="datasetAccess" v-else v-for="(key, i) in index" :key="i">
          {{ key }}
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { profile: "", accountInfo: process.env.VUE_APP_ACCOUNT_INFO };
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
    getProfile: function () {
      axios
        .get(this.accountInfo, {
          withCredentials: true,
        })
        .then((response) => {
          this.profile = response.data;
        })
        .catch((error) => {
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
  padding-left: 5px;
}
</style>
