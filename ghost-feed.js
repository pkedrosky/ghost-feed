/**
 * GhostActivityPubEmbed - A Web Component for embedding ActivityPub feeds from Ghost publications
 *
 * This component fetches and displays federated social content from a Ghost blog's
 * ActivityPub endpoints, supporting infinite scroll, pagination, and theming.
 *
 * Usage:
 *   <ghost-activitypub-embed
 *     url="https://example.ghost.io"
 *     proxy="https://proxy.example.com"
 *     include-posts
 *     maxitems="10"
 *     infinite>
 *   </ghost-activitypub-embed>
 *
 * Attributes:
 *   - url: The Ghost site URL to fetch ActivityPub data from
 *   - proxy: Optional proxy server for cross-origin requests
 *   - include-posts: Include Article types in addition to Notes
 *   - maxitems: Number of items per batch (default: 10)
 *   - infinite: Enable infinite scrolling
 *
 * CSS Custom Properties (theming):
 *   --ghap-background-color, --ghap-text-color, --ghap-padding,
 *   --ghap-font-family, --ghap-font-size, --ghap-border-color,
 *   --ghap-border-radius, --ghap-border-width, --ghap-feed-vertical-gap
 */

// =============================================================================
// STYLES
// =============================================================================

const styles = `
/* -----------------------------------------------------------------------------
   Host & Container Styles
   ----------------------------------------------------------------------------- */
:host {
  display: block;
}
.feed-container {
  /* CSS custom properties for theming - fallback to sensible defaults */
  --background-color: var(--ghap-background-color, #fff);
  --text-color: var(--ghap-text-color, #000);
  --padding: var(--ghap-padding, 1rem);
  --font-family: var(--ghap-font-family, var(--gh-font-body, Inter -apple-system BlinkMacSystemFont 'avenir next' avenir 'helvetica neue' helvetica ubuntu roboto noto 'segoe ui' arial sans-serif));
  --font-size: var(--ghap-font-size, 10px);
  --border-color: var(--ghap-border-color, rgb(229, 233, 235));

  font-family: var(--font-family);
  font-size: var(--font-size);
  max-width: 100%;
  border-radius: var(--ghap-border-radius, 10px);
  border-color: var(--border-color);
  border-style: solid;
  border-width: var(--ghap-border-width, 1px);
  overflow: hidden;
}

/* Reset styles for all elements except dialog */
.feed-container :where(*:not(dialog)) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* -----------------------------------------------------------------------------
   Profile Header Styles
   ----------------------------------------------------------------------------- */
.profile-header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--padding);
}
.profile-info-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-inline: var(--padding);
}
.profile-info-header .ghap-follow-button {
  border: none;
  padding: 10px 16px;
  background-color: var(--text-color);
  color: var(--background-color);
  border-radius: 7px;
  cursor: pointer;
  font-family: var(--font-family);
}

/* Profile banner image and placeholder */
.profile-image-placeholder {
  height: 100px;
}
.profile-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

/* Profile avatar icon - positioned to overlap the banner */
.profile-icon,
.profile-icon-placeholder {
  --icon-size: var(--profile-icon-size, 90px);
  --icon-border-size: var(--profile-icon-border-size, 5px);
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 50%;
  border: var(--icon-border-size) solid var(--ghap-background-color);
  margin-top: calc((var(--icon-size) / -2) - var(--icon-border-size));
  background-color: #fff;
  outline: #15171a1a;
}

/* Profile text content */
.profile-name {
  font-size: 2.2em;
  padding-inline: var(--padding);
}
.profile-username,
.profile-description {
  font-size: 1.5em;
  padding-inline: var(--padding);
}
.profile-username {
  display: flex;
  gap: 5px;
}
.profile-username a {
  color: var(--ghap-text-color);
  text-decoration: none;
}
.profile-username pre {
  font-family: monospace;
}

/* Copy handle button - allows users to copy the ActivityPub handle */
.profile-username .copy-handle {
  color: var(--ghap-text-color);
  opacity: 0.5;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;
  transition: opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.profile-username .copy-handle:hover {
  opacity: 1;
}
.profile-username .copy-handle svg {
  stroke-width: 1.5px;
}
.profile-username .copy-handle .lucide-check {
  display: none;
}
.profile-username .copy-handle-success {
  opacity: 0;
  color: green;
  transition: opacity 0.2s ease;
}

/* Copied state - shows checkmark and success message */
.copy-handle.copied + .copy-handle-success {
  opacity: 1;
}
.copy-handle.copied .lucide-copy {
  display: none;
}
.copy-handle.copied .lucide-check {
  color: green;
  display: inline-flex;
}

/* -----------------------------------------------------------------------------
   Feed Item Styles
   ----------------------------------------------------------------------------- */
.feed-item {
  --icon-size: var(--ghap-feed-item-icon-size, 40px);
  display: flex;
  flex-direction: column;
  padding: var(--ghap-feed-vertical-gap, 1rem);
  border-bottom: 1px solid var(--border-color);
}
.feed-item:last-child {
  border-bottom: none;
}

/* Feed item author section */
.feed-author {
  display: flex;
  gap: 1rem;
}
.feed-author .feed-author-avatar {
  width: var(--icon-size);
}
.feed-author .feed-author-avatar img {
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 50%;
}
.feed-author .feed-author-meta {
  display: flex;
  flex-direction: column;
}
.feed-author .feed-author-meta .feed-author-name {
  font-weight: 600;
  font-size: 1.4em;
  color: rgb(21, 23, 26);
}
.feed-author .feed-author-meta .feed-author-username {
  color: rgb(124 139 154);
  font-size: 1.3em;
}

/* Feed item content area */
.feed-item-content {
  margin: 0.5em 0;
  padding-left: calc(var(--icon-size) + 1em);
  font-size: 1.4em;
  color: rgb(57, 64, 71);
}

/* Article preview card (for Article type posts) */
.feed-item-article-preview {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  border: solid 1px var(--border-color);
  border-radius: 7px;
}
.feed-item-article-preview:hover {
  background-color: var(--border-color);
}
.feed-item-article-preview h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.2em;
}
.feed-item-article-preview p {
  margin: 0;
  color: rgb(124 139 154);
}

/* Feed item date/timestamp */
.feed-item-date,
a.feed-item-date {
  font: inherit;
  color: rgb(124 139 154);
  text-decoration: none;
}

a.feed-item-date:hover {
  text-decoration: underline;
}

/* Feed item image attachments */
.feed-item .feed-item-image {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  margin-top: 0.5rem;
  border-radius: 4px;
}

/* -----------------------------------------------------------------------------
   Loading & Error States
   ----------------------------------------------------------------------------- */
.loading {
  padding: 1rem;
  text-align: center;
  color: #666;
}
.error {
  padding: 1rem;
  color: #e53935;
  border: 1px solid #e53935;
  border-radius: 4px;
}

/* -----------------------------------------------------------------------------
   Dialog / Modal Styles (for image lightbox and follow modal)
   ----------------------------------------------------------------------------- */
dialog {
  border: none;
  padding: 0;
  background: transparent;
  width: 100%;
}
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
dialog .close-dialog {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;
  background-color: rgba(21, 23, 26, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
}
dialog .feed-item-image {
  display: block;
  margin: auto;
  max-width: 100vw;
  max-height: 100vh;
}

/* Follow modal - displays instructions for following via ActivityPub */
.follow-modal {
  background-color: white;
  padding: 15px;
  max-width: 400px;
  border-radius: 15px;
  font-size: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  margin: 0 auto;
}
.follow-modal .profile-username-container {
  color: rgb(2, 18, 217);
  border-color: rgba(2, 18, 217, 0.2);
  background: linear-gradient(to right top, rgba(2, 18, 217, 0.04), rgba(2, 18, 217, 0.16));
  padding: 10px;
  text-align: center;
  border-radius: 9999px;
}
.follow-modal .profile-username {
  font-size: 1rem;
  display: inline-flex;
}

/* -----------------------------------------------------------------------------
   Infinite Scroll Sentinel
   ----------------------------------------------------------------------------- */
/* Invisible element observed by IntersectionObserver to trigger loading more items */
.ghap-sentinel { height: 1px; }
`;

// =============================================================================
// COMPONENT CLASS
// =============================================================================

class GhostActivityPubEmbed extends HTMLElement {
  /**
   * Constructor - sets up Shadow DOM with initial loading state
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="feed-container" part="container">
        <div class="loading">Loading activity feed...</div>
      </div>
    `;
  }

  /**
   * Defines which attributes trigger attributeChangedCallback when modified
   */
  static get observedAttributes() {
    return ["url", "proxy", "include-posts", "maxitems", "infinite"];
  }

  // ---------------------------------------------------------------------------
  // Instance Properties
  // ---------------------------------------------------------------------------

  /** Cached profile data from the ActivityPub users endpoint */
  _profileData = null;

  // Pagination buffer - stores items from current page to prevent skipping
  _pageItems = []; // Items from the current ActivityPub page
  _pageIndex = 0; // Current position within _pageItems
  _nextPageUrl = null; // URL for the next page of results

  // Deduplication and loop protection
  _seenIds = new Set(); // Track seen item IDs to prevent duplicates
  _seenPageUrls = new Set(); // Track fetched page URLs to prevent infinite loops

  // Batch sizing configuration
  _batchSize = 10; // Number of items to load per batch (from maxitems attribute)
  _targetCount = 0; // Total number of items to render
  _renderedCount = 0; // Number of items currently rendered

  // Infinite scroll state
  _isInfinite = false; // Whether infinite scrolling is enabled
  _observer = null; // IntersectionObserver instance for infinite scroll
  _isLoading = false; // Lock to prevent concurrent fetch operations

  // Scroll detection - prevents auto-loading when sentinel is initially visible
  _scrollArmed = false; // True when user has scrolled down, allowing next load
  _lastScrollY = 0; // Last recorded scroll position
  _onScroll = null; // Scroll event handler reference

  // Dialog/modal state
  dialogInitiated = false; // Whether dialog has been initialized
  dialog = null; // Reference to dialog element
  dialogContent = null; // Reference to dialog content container

  // ---------------------------------------------------------------------------
  // HTML Template Methods
  // ---------------------------------------------------------------------------

  /**
   * Generates the copy handle button HTML with clipboard functionality
   * @param {Object} params - Object containing preferredUsername and serverHost
   * @returns {string} HTML string for the copy button
   */
  _copyHandleButton = ({ preferredUsername, serverHost }) => `
    <button class="copy-handle" data-handle="@${preferredUsername}@${serverHost}" title="Copy handle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-copy" aria-hidden="true">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-check">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
    </button>`;

  // ---------------------------------------------------------------------------
  // Utility Methods
  // ---------------------------------------------------------------------------

  /**
   * Extracts the UUID from an ActivityPub object's ID URL
   * @param {Object} obj - ActivityPub object with an id property
   * @returns {string|null} The UUID (last path segment) or null
   */
  getUuidFromObject(obj) {
    if (!obj?.id) return null;
    return obj.id.split("/").pop();
  }

  /**
   * Formats a date string into a human-readable format (e.g., "Jan 15")
   * @param {string} dateStr - ISO date string
   * @returns {string} Formatted date string
   */
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

  // ---------------------------------------------------------------------------
  // Rendering Methods
  // ---------------------------------------------------------------------------

  /**
   * Renders the profile header section with banner, avatar, and user info
   * @param {Object} profileData - ActivityPub actor profile data
   * @returns {string} HTML string for the profile header
   */
  renderProfileHeader(profileData) {
    return `
      <div class="profile-header" part="header">
        ${
          profileData.image?.url
            ? `<img class="profile-image" src="${profileData.image.url}" alt="">`
            : '<div class="profile-image-placeholder"></div>'
        }
        <div class="profile-info">
          <div class="profile-info-header">
            ${
              profileData.icon?.url
                ? `<img class="profile-icon" src="${profileData.icon.url}" alt="">`
                : '<div class="profile-icon-placeholder"></div>'
            }
            <button class="ghap-follow-button">Follow</button>
          </div>
          <h2 class="profile-name">${profileData.name || ""}</h2>
          <p class="profile-username">
            <a href="https://${profileData.serverHost}" target="_blank" rel="noreferrer noopener">
              @${profileData.preferredUsername}@${profileData.serverHost}
            </a>
            ${this._copyHandleButton(profileData)}
            <span class="copy-handle-success">Copied!</span>
          </p>
          <p class="profile-description">${profileData.summary || ""}</p>
        </div>
      </div>`;
  }

  /**
   * Renders a single feed item (Note or Article)
   * @param {Object} item - ActivityPub activity object (Create type)
   * @param {Object} profileData - Profile data for the author
   * @returns {string} HTML string for the feed item, or empty string if not renderable
   */
  renderItem(item, profileData) {
    // Only render Create activities with Note or Article objects
    if (
      item?.type === "Create" &&
      item.object &&
      (item.object.type === "Note" ||
        (this.hasAttribute("include-posts") && item.object.type === "Article"))
    ) {
      const obj = item.object;
      const published = obj.published;
      const uuid = this.getUuidFromObject(obj);
      const date = this.formatDate(published);

      // Create a link to the post if we have a UUID, otherwise just display the date
      const dateHtml = uuid
        ? `<a href="/n/${uuid}" class="feed-item-date" target="_top" rel="noopener">${date}</a>`
        : `<span class="feed-item-date">${date}</span>`;

      // Handle image attachments - can be object or array
      const att = Array.isArray(obj.attachment)
        ? obj.attachment[0]
        : obj.attachment;
      const attachment =
        att && att.type === "Image" && att.url
          ? `<img class="feed-item-image" src="${att.url}" alt="Attached image">`
          : "";

      return `
        <div class="feed-item" part="feed-item">
          <div class="feed-author" part="feed-author">
            <div class="feed-author-avatar" part="feed-author-avatar">
              <img src="${profileData.icon?.url || ""}" alt="">
            </div>
            <div class="feed-author-meta" part="feed-author-meta">
              <div class="feed-author-name">${profileData.name || ""}</div>
                <div class="feed-author-username">
                  @${profileData.preferredUsername}@${profileData.serverHost} ·
                    ${dateHtml}
                </div>
            </div>
          </div>

          <div class="feed-item-content" part="feed-item-content">
            ${
              obj.type === "Note"
                ? obj.content || ""
                : `
              <a href="${obj.url}" target="_top" class="feed-item-article-preview">
                <h3>${obj.name || ""}</h3>
                <p>${obj.summary || ""}</p>
              </a>`
            }
            ${attachment}
          </div>
        </div>`;
    }

    return ``;
  }

  // ---------------------------------------------------------------------------
  // URL Handling Methods
  // ---------------------------------------------------------------------------

  /**
   * Gets the target Ghost site URL from the url attribute or current location
   * @returns {URL} The site URL
   */
  _getSiteUrl() {
    return new URL(this.getAttribute("url") || document.location.href);
  }

  /**
   * Gets the proxy URL for cross-origin requests
   * @returns {URL} The proxy URL (falls back to site URL if not specified)
   */
  _getProxyUrl() {
    return new URL(this.getAttribute("proxy") || this._getSiteUrl());
  }

  /**
   * Normalizes an ActivityPub endpoint path to a consistent format
   * Handles various input formats:
   *   - "users/index"
   *   - "/.ghost/activitypub/users/index"
   *   - "https://site/.ghost/activitypub/users/index?x=y"
   *
   * @param {string} endpoint - The endpoint path or URL
   * @returns {string} Normalized path without leading slashes
   */
  _normalizeApPath(endpoint) {
    const siteUrl = this._getSiteUrl();
    let u;
    try {
      u = new URL(endpoint, siteUrl.origin);
    } catch {
      return String(endpoint || "").replace(/^\/+/, "");
    }

    // Extract path after the ActivityPub prefix if present
    const prefix = "/.ghost/activitypub/";
    const href = u.href;
    const i = href.indexOf(prefix);
    if (i !== -1) return href.slice(i + prefix.length).replace(/^\/+/, "");

    return String(endpoint || "").replace(/^\/+/, "");
  }

  // ---------------------------------------------------------------------------
  // Data Fetching Methods
  // ---------------------------------------------------------------------------

  /**
   * Fetches data from a Ghost ActivityPub endpoint
   * Supports proxy mode for cross-origin requests
   *
   * @param {string} endpoint - The endpoint path (e.g., "users/index", "outbox/index")
   * @returns {Promise<[Error|null, Object|null]>} Tuple of [error, data]
   */
  async fetchEndpoint(endpoint) {
    const url = this._getSiteUrl();
    const proxy = this._getProxyUrl();
    const proxyMode = proxy.origin !== url.origin;

    const path = this._normalizeApPath(endpoint);
    const baseOrigin = proxyMode ? proxy.origin : url.origin;

    try {
      const response = await fetch(`${baseOrigin}/.ghost/activitypub/${path}`, {
        headers: {
          accept: "application/activity+json",
          // Include x-proxy header when using proxy to indicate the target origin
          ...(proxyMode ? { "x-proxy": url.origin } : {}),
        },
      });

      if (!response.ok)
        return [new Error(`HTTP error! status: ${response.status}`), null];
      return [null, await response.json()];
    } catch (error) {
      return [error, null];
    }
  }

  // ---------------------------------------------------------------------------
  // Infinite Scroll / IntersectionObserver Methods
  // ---------------------------------------------------------------------------

  /**
   * Disconnects and cleans up the IntersectionObserver
   */
  _teardownObserver() {
    if (this._observer) this._observer.disconnect();
    this._observer = null;
  }

  /**
   * Sets up the IntersectionObserver for infinite scrolling
   * Observes a sentinel element at the bottom of the feed to trigger loading more items
   */
  _setupObserver() {
    if (!this._isInfinite) return;
    if (this._observer) return;

    const sentinel = this.shadowRoot.querySelector(".ghap-sentinel");
    if (!sentinel) return;

    this._observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (this._isLoading) return;

        // Prevent auto-loading on initial render:
        // After the first batch, require a real downward scroll to arm the next load
        // This prevents loading all content when the sentinel is initially visible
        if (this._renderedCount > 0 && !this._scrollArmed) return;

        // Reset the arm after triggering a load
        if (this._renderedCount > 0) this._scrollArmed = false;

        // Increase target count and drain more items
        this._targetCount += this._batchSize;
        this._drain();
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 },
    );

    this._observer.observe(sentinel);
  }

  // ---------------------------------------------------------------------------
  // Pagination / Buffer Management Methods
  // ---------------------------------------------------------------------------

  /**
   * Renders items from the page buffer to the DOM
   * Continues until we've rendered enough items or exhausted the buffer
   */
  _appendItemsFromBuffer() {
    const container = this.shadowRoot.querySelector(".feed-items");
    if (!container) return;

    while (
      this._pageIndex < this._pageItems.length &&
      this._renderedCount < this._targetCount
    ) {
      const item = this._pageItems[this._pageIndex++];

      // Deduplicate by item ID
      const id = item?.id || item?.object?.id || null;
      if (id && this._seenIds.has(id)) continue;
      if (id) this._seenIds.add(id);

      const html = this.renderItem(item, this._profileData);
      if (html) {
        container.insertAdjacentHTML("beforeend", html);
        this._renderedCount += 1;
      }
    }
  }

  /**
   * Fetches the next page of items if the current buffer is exhausted
   * Includes loop protection by tracking fetched page URLs
   */
  async _fetchNextPageIfNeeded() {
    // Don't fetch if we still have items in the buffer
    if (this._pageIndex < this._pageItems.length) return;
    if (!this._nextPageUrl) return;

    // Loop protection - don't fetch the same page twice
    const key = String(this._nextPageUrl);
    if (this._seenPageUrls.has(key)) {
      this._nextPageUrl = null;
      return;
    }
    this._seenPageUrls.add(key);

    const [err, itemsData] = await this.fetchEndpoint(this._nextPageUrl);
    if (err) {
      const container = this.shadowRoot.querySelector(".feed-container");
      if (container) {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="error">Error loading more: ${err.message}</div>`,
        );
      }
      this._nextPageUrl = null;
      return;
    }

    // Update buffer with new page data
    this._pageItems = Array.isArray(itemsData?.orderedItems)
      ? itemsData.orderedItems
      : [];
    this._pageIndex = 0;
    this._nextPageUrl = itemsData?.next || null;
  }

  /**
   * Main rendering loop - drains items from buffer and fetches more pages as needed
   * Continues until we've rendered enough items or exhausted all pages
   */
  async _drain() {
    // Prevent concurrent drain operations
    if (this._isLoading) return;
    if (!this._profileData) return;

    this._isLoading = true;

    // First, render any items already in the buffer
    this._appendItemsFromBuffer();

    // Keep fetching and rendering until we hit target count or run out of data
    while (
      this._renderedCount < this._targetCount &&
      this._pageIndex >= this._pageItems.length &&
      this._nextPageUrl
    ) {
      await this._fetchNextPageIfNeeded();
      this._appendItemsFromBuffer();
      if (this._pageItems.length === 0) break;
    }

    // Remove loading indicator once we have content
    const loading = this.shadowRoot.querySelector(".loading");
    if (loading) loading.remove();

    // Clean up if we've exhausted all data
    if (!this._nextPageUrl && this._pageIndex >= this._pageItems.length) {
      this._teardownObserver();
      const s = this.shadowRoot.querySelector(".ghap-sentinel");
      if (s) s.remove();
    }

    this._isLoading = false;
  }

  /**
   * Main entry point - fetches profile and feed data, sets up the component
   */
  async fetchFeed() {
    this._teardownObserver();

    // Reset all state for a fresh fetch
    this._profileData = null;
    this._pageItems = [];
    this._pageIndex = 0;
    this._nextPageUrl = null;

    this._seenIds.clear();
    this._seenPageUrls.clear();

    this._isLoading = false;

    // Parse configuration from attributes
    this._batchSize = parseInt(this.getAttribute("maxitems") || "10", 10);
    if (!Number.isFinite(this._batchSize) || this._batchSize < 1)
      this._batchSize = 10;

    this._isInfinite = this.hasAttribute("infinite");

    this._renderedCount = 0;
    this._targetCount = this._batchSize;

    const container = this.shadowRoot.querySelector(".feed-container");
    container.innerHTML = `<div class="loading">Loading activity feed...</div>`;

    const url = this._getSiteUrl();

    try {
      // Fetch profile data from the users endpoint
      const [profileError, profileData] =
        await this.fetchEndpoint("users/index");
      if (profileError) throw profileError;

      this._profileData = profileData;
      this._profileData.serverHost = url.hostname.replace("www.", "");

      const profileHeaderHTML = this.renderProfileHeader(this._profileData);

      // Dialog for image lightbox and follow modal
      const attachmentModal = `
        <dialog>
          <button class="close-dialog">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          <div class="dialog-content"></div>
        </dialog>`;

      // Render the main structure
      container.innerHTML = `
        ${attachmentModal}
        ${profileHeaderHTML}
        <div class="feed-items"></div>
        ${this._isInfinite ? `<div class="ghap-sentinel"></div>` : ``}
      `;

      // Fetch the outbox to get feed items
      const [error, outboxData] = await this.fetchEndpoint("outbox/index");
      if (error) throw error;

      if (outboxData?.totalItems > 0) {
        if (!outboxData.first)
          throw new Error('Invalid feed format: missing "first" property');

        // Fetch the first page of items
        const [firstError, itemsData] = await this.fetchEndpoint(
          outboxData.first,
        );
        if (firstError) throw firstError;

        if (!Array.isArray(itemsData?.orderedItems)) {
          throw new Error('Invalid feed format: missing "orderedItems" array');
        }

        // Initialize the pagination buffer
        this._pageItems = itemsData.orderedItems;
        this._pageIndex = 0;
        this._nextPageUrl = itemsData.next || null;
      }

      // Start observing for infinite scroll and render initial items
      this._setupObserver();
      await this._drain();
    } catch (error) {
      container.innerHTML = `<div class="error">Error loading feed: ${error.message}</div>`;
      this._teardownObserver();
    }
  }

  // ---------------------------------------------------------------------------
  // Dialog / Modal Methods
  // ---------------------------------------------------------------------------

  /**
   * Initializes the dialog element and its close button
   * Only runs once per component instance
   */
  initDialog() {
    if (this.dialogInitiated) return;

    this.dialog = this.shadowRoot.querySelector("dialog");
    this.dialogContent = this.dialog.querySelector(".dialog-content");
    const dialogCloser = this.dialog.querySelector(".close-dialog");

    dialogCloser.addEventListener("click", () => this.dialog.close());
    this.dialogInitiated = true;
  }

  /**
   * Shows the dialog with the given node's HTML content
   * @param {HTMLElement} node - Element whose outerHTML will be displayed in the dialog
   */
  showDialog(node) {
    this.initDialog();
    this.dialogContent.innerHTML = node.outerHTML;
    this.dialog.showModal();
  }

  // ---------------------------------------------------------------------------
  // Web Component Lifecycle Methods
  // ---------------------------------------------------------------------------

  /**
   * Called when the element is added to the DOM
   * Sets up scroll detection and event listeners
   */
  connectedCallback() {
    // Set up scroll detection to arm infinite scroll loads
    // This prevents auto-loading when the sentinel is visible on initial render
    this._lastScrollY = window.scrollY || 0;
    this._scrollArmed = false;

    this._onScroll = () => {
      const y = window.scrollY || 0;
      // Arm the loader when user scrolls down by at least 8px
      if (y > this._lastScrollY + 8) this._scrollArmed = true;
      this._lastScrollY = y;
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });

    // Start fetching the feed
    this.fetchFeed();

    // Set up delegated event listeners for interactive elements
    this.shadowRoot.addEventListener("click", (event) => {
      // Image lightbox - show full-size image in dialog
      if (event.target.matches(".feed-item .feed-item-image")) {
        this.showDialog(event.target);
        return;
      }

      // Copy handle button - copy ActivityPub handle to clipboard
      if (event.target.closest(".copy-handle")) {
        const btn = event.target.closest(".copy-handle");
        navigator.clipboard.writeText(btn.getAttribute("data-handle"));
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 2000);
        return;
      }

      // Follow button - show follow instructions modal
      if (event.target.matches(".ghap-follow-button")) {
        const followModalContent = document.createElement("div");
        followModalContent.innerHTML = `
          <h2>Follow me</h2>
          <p>Available on Ghost, Flipboard, Threads, Bluesky, Mastodon, or wherever you get your social web feeds.</p>
          <p>Copy the handle below and search it on your platform to follow me.</p>
          <div class="profile-username-container">
            <div class="profile-username">
              <pre>@${this._profileData.preferredUsername}@${this._profileData.serverHost}</pre>
              ${this._copyHandleButton(this._profileData)}
            </div>
          </div>
        `;
        followModalContent.classList.add("follow-modal");
        this.showDialog(followModalContent);
      }
    });
  }

  /**
   * Called when the element is removed from the DOM
   * Cleans up observers and event listeners
   */
  disconnectedCallback() {
    this._teardownObserver();
    if (this._onScroll) window.removeEventListener("scroll", this._onScroll);
  }

  /**
   * Called when an observed attribute changes
   * Triggers a feed refresh when configuration attributes are modified
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (
      ["url", "proxy", "include-posts", "maxitems", "infinite"].includes(name)
    ) {
      this.fetchFeed();
    }
  }
}

// =============================================================================
// CUSTOM ELEMENT REGISTRATION
// =============================================================================

// Register the custom element with the browser
customElements.define("ghost-activitypub-embed", GhostActivityPubEmbed);
