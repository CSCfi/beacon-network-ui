// Ready translated locale messages

const textDescriptions = {
  en: {
    message: {
      bnLogo: "ELIXIR Beacon Network logo",
      elixirLoginButton: "Elixir Login button",
      logOut: "Log Out",
      search: {
        action: "Search",
        quickstart: "Quickstart:",
        exampleText: "Example of a mitochondrial variant query",
        advancedSearch: "Advanced Search",
        regexText:
          "Chromosome : Position ReferenceBase > AlternateBase|VariantType"
      },
      returnMain: "Return to main page",
      filter: {
        title: "Filter results",
        public: "Public",
        registered: "Registered",
        controlled: "Controlled",
        hits: "Hits Only",
        table: {
          org: "Beacon Organisation",
          datasetAccess: "Dataset Access",
          access: "Access",
          datasetId: "Dataset ID",
          alleleCount: "Allele Count",
          frequency: "Frequency",
          variants: "Variants Found"
        }
      },
      error: {
        noResult: "No Results found",
        noBeacons: "Could not find any Beacons to display.",
        regexMatch: "Variant search term is malformed, please try again.",
        dataRegistry: "Could not retrieve Beacon data from Registry"
      },
      toast: {
        devMessage:
          "This web page is under development and may exhibit funky behaviour.",
        devMessageOk: "Thanks for understanding!",
        cookies:
          "Beacon Network utilises cookies. By using Beacon Network you accept the use of these cookies," +
          ' more information regarding this can be read from the <a href="/privacy">Privacy Policy</a>.' +
          ' Users are also subject to the <a href="/tos">Terms of Service</a>.',
        cookiesOk: "Cookies are in use!"
      }
    }
  }
};

export default textDescriptions;
