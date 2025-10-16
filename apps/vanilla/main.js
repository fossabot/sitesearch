// Replace with your credentials
const applicationId = "betaHAXPMHIMMC";
const apiKey = "8b00405cba281a7d800ccec393e9af24";
const indexName = "algolia_podcast_sample_dataset";
const assistantId = "Y89iGlsnihaU";
const baseAskaiUrl = "https://beta-askai.algolia.com";

// Basic search button + modal
if (window.SiteSearch) {
  window.SiteSearch.init({
    container: "#search",
    applicationId,
    apiKey,
    indexName,
  });
}

// Search with AskAI
if (window.SiteSearchAskAI) {
  window.SiteSearchAskAI.init({
    container: "#askai",
    applicationId,
    apiKey,
    indexName,
    assistantId,
    baseAskaiUrl,
  });
}
