export default class NewsApiParams {
    constructor() {
        this.q = "";               // Keywords
        this.qInTitle = "";        // Keywords in title
        this.sources = "";         // Specific sources
        this.domains = "";         // Specific domains
        this.excludeDomains = "";  // Domains to exclude
        this.from = "";            // Start date
        this.to = "";              // End date
        this.language = "en";      // Language
        this.sortBy = "publishedAt"; // Sorting order
        this.pageSize = 10;        // Results per page
        this.page = 1;             // Page number
    }
}
export  function buildQueryString(params) {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== "" && value != null)
    );
    const query = new URLSearchParams(filteredParams);
    return query.toString();
}