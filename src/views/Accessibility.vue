<template>
  <div class="content word-wrap">
    <b-button
      data-testid="returnButton"
      tag="router-link"
      to="/"
      type="is-primary"
    >
      Return to main page
    </b-button>
    <h1>Accessibility Statement</h1>
    <h2>Rationale</h2>
    <p>
      This accessibility statement has been drafted according to
      <a
        href="https://www.gov.uk/guidance/make-your-website-or-app-accessible-and-publish-an-accessibility-statement"
        >UK Government Digital Service recommendations</a
      >
      to satisfy the
      <a
        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2016.327.01.0001.01.ENG"
        >2016/2102 EU Directive on the accessibility of web services</a
      >
      requirements.
    </p>

    <h3>Accessibility Level</h3>
    <p>
      This website has been reviewed with
      <a href="https://www.wuhcag.com/wcag-checklist/">WCAG 2.0 checklist</a>
      and <a href="https://wave.webaim.org/">WAVE Evaluation Tool</a> to satisfy
      WCAG 2.0 level of <b>AA</b>.
    </p>
    <h4>Keyboard Navigation</h4>
    <p>All features on this website are accessible with keyboard-only-use.</p>
    <h4>Screen Reader Friendliness</h4>
    <p>
      Most elements and features on this website have been described for screen
      readers. Semantic HTML elements are used in most features.
    </p>
    <h4>Contrast</h4>
    <p>
      Most text on this website is satisfying a WCAG level AA contrast. We are
      aware, that contrast is lower than desirable on default HTML select
      elements.
    </p>
    <h3>Browser Support</h3>
    <p>
      This website has been tested to function correctly on the latest versions
      of Google Chrome, Mozilla Firefox and Microsoft Edge browsers. (see date
      of last update from bottom of this page)
    </p>
    <h3>Upgrade</h3>
    <p>
      This accessibility statement may be reviewed and upgraded to satisfy WCAG
      2.1 level AA if needed.
    </p>
    <h3>Changes to Accessibility Statement</h3>
    <p><br /><i>Last updated: 26 November 2019.</i></p>
    <h3>Contact Us</h3>
    <p>
      Should any questions or suggestions emerge, we urge you to contact us at
      <br /><a href="mailto:bn-contact@elixir-europe.org"
        >bn-contact@elixir-europe.org</a
      ><br />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.word-wrap {
  margin: 0 auto;
  max-width: 80ch;
  padding-bottom: 25px;
  text-align: left;
}
</style>
