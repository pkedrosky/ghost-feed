const styles = `
:host {
  display: block;
}
.feed-container {
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
.feed-container :where(*:not(dialog)) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
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
.profile-image-placeholder {
  height: 100px;
}
.profile-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}
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

.feed-author-date-link {
  color: inherit;
  text-decoration: none;
}
.feed-author-date-link:hover {
  text-decoration: underline;
}

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
.feed-item-content {
  margin: 0.5em 0;
  padding-left: calc(var(--icon-size) + 1em);
  font-size: 1.4em;
  color: rgb(57, 64, 71);
}
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
.feed-item-date {
  color: rgb(124 139 154);
  font-size: 1.3em;
}
.feed-item .feed-item-image {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  margin-top: 0.5rem;
  border-radius: 4px;
}
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

/* infinite scroll sentinel */
.ghap-sentinel { height: 1px; }
`;

class GhostActivityPubEmbed extends HTMLElement {
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

  static get observedAttributes() {
    return ["url", "proxy", "include-posts", "maxitems", "infinite"];
  }

  _profileData = null;

  // Pagination buffer (prevents skipping)
  _pageItems = [];
  _pageIndex = 0;
  _nextPageUrl = null;

  // Dedupe + loop protection
  _seenIds = new Set();
  _seenPageUrls = new Set();

  // Batch sizing
  _batchSize = 10;       // maxitems
  _targetCount = 0;      // render up to this many items total
  _renderedCount = 0;

  // Infinite + gating
  _isInfinite = false;
  _observer = null;
  _isLoading = false;

  // Prevent auto-draining when sentinel is visible
  _scrollArmed = false;
  _lastScrollY = 0;
  _onScroll = null;

  // Dialog
  dialogInitiated = false;
  dialog = null;
  dialogContent = null;

  // ====== CHANGE 1: strict uuid parsing for /n/<uuid> ======
  _getUuidFromPath() {
    const m = location.pathname.match(/^\/n\/([0-9a-f-]{36})\/?$/i);
    return m ? m[1] : null;
  }

  // ====== CHANGE 2: derive canonical URL /n/<uuid> from ActivityPub id ======
  _getCanonicalNoteUrl(obj) {
    const m = String(obj?.id || "").match(/\/note\/([0-9a-f-]{36})(?:\/)?$/i);
    return m ? `/n/${m[1]}` : null;
  }

  _copyHandleButton = ({ preferredUsername, serverHost }) => `
    <button class="copy-handle" data-handle="@${preferredUsername}@${serverHost}" title="Copy handle">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy" aria-hidden="true">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
    </button>`;

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
  }

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

  renderItem(item, profileData) {
    if (
      item?.type === "Create" &&
      item.object &&
      (item.object.type === "Note" ||
        (this.hasAttribute("include-posts") && item.object.type === "Article"))
    ) {
      const obj = item.object;
      const published = obj.published;

      // attachment can be object or array
      const att = Array.isArray(obj.attachment) ? obj.attachment[0] : obj.attachment;
      const attachment =
        att && att.type === "Image" && att.url
          ? `<img class="feed-item-image" src="${att.url}" alt="Attached image">`
          : "";

      // ====== CHANGE 3: wrap only the date in canonical link (/n/<uuid>) ======
      const canonicalUrl = this._getCanonicalNoteUrl(obj);
      const dateHtml = canonicalUrl
        ? `<a class="feed-author-date-link" href="${canonicalUrl}" target="_top" rel="noopener noreferrer">
             <span class="feed-author-date">${this.formatDate(published)}</span>
           </a>`
        : `<span class="feed-author-date">${this.formatDate(published)}</span>`;

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
                ? (obj.content || "")
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

  _getSiteUrl() {
    return new URL(this.getAttribute("url") || document.location.href);
  }

  _getProxyUrl() {
    return new URL(this.getAttribute("proxy") || this._getSiteUrl());
  }

  _normalizeApPath(endpoint) {
    // Handles:
    // - "users/index"
    // - "/.ghost/activitypub/users/index"
    // - "https://site/.ghost/activitypub/users/index?x=y"
    const siteUrl = this._getSiteUrl();
    let u;
    try {
      u = new URL(endpoint, siteUrl.origin);
    } catch {
      return String(endpoint || "").replace(/^\/+/, "");
    }

    const prefix = "/.ghost/activitypub/";
    const href = u.href;
    const i = href.indexOf(prefix);
    if (i !== -1) return href.slice(i + prefix.length).replace(/^\/+/, "");

    return String(endpoint || "").replace(/^\/+/, "");
  }

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
          ...(proxyMode ? { "x-proxy": url.origin } : {}),
        },
      });

      if (!response.ok) return [new Error(`HTTP error! status: ${response.status}`), null];
      return [null, await response.json()];
    } catch (error) {
      return [error, null];
    }
  }

  _teardownObserver() {
    if (this._observer) this._observer.disconnect();
    this._observer = null;
  }

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

        // Prevent auto-draining:
        // after initial batch, require a real downward scroll to arm the next load
        if (this._renderedCount > 0 && !this._scrollArmed) return;

        if (this._renderedCount > 0) this._scrollArmed = false;

        this._targetCount += this._batchSize;
        this._drain();
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );

    this._observer.observe(sentinel);
  }

  _appendItemsFromBuffer() {
    const container = this.shadowRoot.querySelector(".feed-items");
    if (!container) return;

    while (this._pageIndex < this._pageItems.length && this._renderedCount < this._targetCount) {
      const item = this._pageItems[this._pageIndex++];

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

  async _fetchNextPageIfNeeded() {
    if (this._pageIndex < this._pageItems.length) return;
    if (!this._nextPageUrl) return;

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
        container.insertAdjacentHTML("beforeend", `<div class="error">Error loading more: ${err.message}</div>`);
      }
      this._nextPageUrl = null;
      return;
    }

    this._pageItems = Array.isArray(itemsData?.orderedItems) ? itemsData.orderedItems : [];
    this._pageIndex = 0;
    this._nextPageUrl = itemsData?.next || null;
  }

  async _drain() {
    if (this._isLoading) return;
    if (!this._profileData) return;

    this._isLoading = true;

    this._appendItemsFromBuffer();

    while (
      this._renderedCount < this._targetCount &&
      this._pageIndex >= this._pageItems.length &&
      this._nextPageUrl
    ) {
      await this._fetchNextPageIfNeeded();
      this._appendItemsFromBuffer();
      if (this._pageItems.length === 0) break;
    }

    const loading = this.shadowRoot.querySelector(".loading");
    if (loading) loading.remove();

    // Exhausted
    if (!this._nextPageUrl && this._pageIndex >= this._pageItems.length) {
      this._teardownObserver();
      const s = this.shadowRoot.querySelector(".ghap-sentinel");
      if (s) s.remove();
    }

    this._isLoading = false;
  }

  async fetchFeed() {
    this._teardownObserver();

    // reset
    this._profileData = null;
    this._pageItems = [];
    this._pageIndex = 0;
    this._nextPageUrl = null;

    this._seenIds.clear();
    this._seenPageUrls.clear();

    this._isLoading = false;

    this._batchSize = parseInt(this.getAttribute("maxitems") || "10", 10);
    if (!Number.isFinite(this._batchSize) || this._batchSize < 1) this._batchSize = 10;

    this._isInfinite = this.hasAttribute("infinite");

    this._renderedCount = 0;
    this._targetCount = this._batchSize;

    const container = this.shadowRoot.querySelector(".feed-container");
    container.innerHTML = `<div class="loading">Loading activity feed...</div>`;

    const url = this._getSiteUrl();

    try {
      const [profileError, profileData] = await this.fetchEndpoint("users/index");
      if (profileError) throw profileError;

      this._profileData = profileData;
      this._profileData.serverHost = url.hostname.replace("www.", "");

      const profileHeaderHTML = this.renderProfileHeader(this._profileData);

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

      container.innerHTML = `
        ${attachmentModal}
        ${profileHeaderHTML}
        <div class="feed-items"></div>
        ${this._isInfinite ? `<div class="ghap-sentinel"></div>` : ``}
      `;

      // ====== CHANGE 4: on /n/<uuid>, treat feed as exactly one Create(Note) item ======
      const uuid = this._getUuidFromPath();
      if (uuid) {
        const [noteErr, note] = await this.fetchEndpoint(`note/${uuid}`);
        if (noteErr) throw noteErr;

        this._pageItems = [{ type: "Create", object: note }];
        this._pageIndex = 0;
        this._nextPageUrl = null;

        // No infinite paging needed; sentinel will be removed by _drain exhaustion logic
        this._setupObserver();
        await this._drain();
        return;
      }

      const [error, outboxData] = await this.fetchEndpoint("outbox/index");
      if (error) throw error;

      if (outboxData?.totalItems > 0) {
        if (!outboxData.first) throw new Error('Invalid feed format: missing "first" property');

        const [firstError, itemsData] = await this.fetchEndpoint(outboxData.first);
        if (firstError) throw firstError;

        if (!Array.isArray(itemsData?.orderedItems)) {
          throw new Error('Invalid feed format: missing "orderedItems" array');
        }

        this._pageItems = itemsData.orderedItems;
        this._pageIndex = 0;
        this._nextPageUrl = itemsData.next || null;
      }

      this._setupObserver();
      await this._drain();
    } catch (error) {
      container.innerHTML = `<div class="error">Error loading feed: ${error.message}</div>`;
      this._teardownObserver();
    }
  }

  initDialog() {
    if (this.dialogInitiated) return;

    this.dialog = this.shadowRoot.querySelector("dialog");
    this.dialogContent = this.dialog.querySelector(".dialog-content");
    const dialogCloser = this.dialog.querySelector(".close-dialog");

    dialogCloser.addEventListener("click", () => this.dialog.close());
    this.dialogInitiated = true;
  }

  showDialog(node) {
    this.initDialog();
    this.dialogContent.innerHTML = node.outerHTML;
    this.dialog.showModal();
  }

  connectedCallback() {
    // arm infinite loads only after user scrolls downward
    this._lastScrollY = window.scrollY || 0;
    this._scrollArmed = false;

    this._onScroll = () => {
      const y = window.scrollY || 0;
      if (y > this._lastScrollY + 8) this._scrollArmed = true;
      this._lastScrollY = y;
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });

    this.fetchFeed();

    this.shadowRoot.addEventListener("click", (event) => {
      if (event.target.matches(".feed-item .feed-item-image")) {
        this.showDialog(event.target);
        return;
      }

      if (event.target.closest(".copy-handle")) {
        const btn = event.target.closest(".copy-handle");
        navigator.clipboard.writeText(btn.getAttribute("data-handle"));
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 2000);
        return;
      }

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

  disconnectedCallback() {
    this._teardownObserver();
    if (this._onScroll) window.removeEventListener("scroll", this._onScroll);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (["url", "proxy", "include-posts", "maxitems", "infinite"].includes(name)) {
      this.fetchFeed();
    }
  }
}

customElements.define("ghost-activitypub-embed", GhostActivityPubEmbed);
