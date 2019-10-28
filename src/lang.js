// Ready translated locale messages

const translations = {
  en: {
    message: {
      index: {
        logout: "Log Out"
      },
      search: "Search"
    }
  },
  fi: {
    message: {
      index: {
        logout: "Log Out"
      },
      search: "Hae"
    }
  }
};

export function getLangCookie() {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + "OBJ_UI_LANG" + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : "en";
}

export default translations;
