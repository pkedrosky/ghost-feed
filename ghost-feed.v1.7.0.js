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

.infinite-scroll-sentinel {
  height: 1px;
}
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
    return ["url", "proxy", "include-posts", "maxitems", "infinite-scroll"];
  }

  _profileData = null;
  _nextPage = null;
  _isLoadingMore = false;
  _infiniteScrollObserver = null;

  /* ==================================================================== */

  liek this?

 /* ==================================================================== */

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

renderProfileHeader(profileData) {
  return `
    <div class="profile-header" part="header">
      ${
        profileData.image?.url
          ? `<img class="profile-image" src="${profileData.image.url}">`
          : `<div class="profile-image-placeholder"></div>`
      }
      <div class="profile-info">
        <div class="profile-info-header">
          ${
            profileData.icon?.url
              ? `<img class="profile-icon" src="${profileData.icon.url}">`
              : `<div class="profile-icon-placeholder"></div>`
          }
          <button class="ghap-follow-button">Follow</button>
        </div>
        <h2 class="profile-name">${profileData.name}</h2>
        <p class="profile-username">
          <a href="https://${profileData.serverHost}" target="_blank">
            @${profileData.preferredUsername}@${profileData.serverHost}
          </a>
        </p>
        <p class="profile-description">${profileData.summary || ""}</p>
      </div>
    </div>
  `;
}


  

renderProfileHeader(profileData) {
  return `
    <div class="profile-header" part="header">
      ${
        profileData.image?.url
          ? `<img class="profile-image" src="${profileData.image.url}">`
          : `<div class="profile-image-placeholder"></div>`
      }
      <div class="profile-info">
        <div class="profile-info-header">
          ${
            profileData.icon?.url
              ? `<img class="profile-icon" src="${profileData.icon.url}">`
              : `<div class="profile-icon-placeholder"></div>`
          }
          <button class="ghap-follow-button">Follow</button>
        </div>
        <h2 class="profile-name">${profileData.name}</h2>
        <p class="profile-username">
          <a href="https://${profileData.serverHost}" target="_blank">
            @${profileData.preferredUsername}@${profileData.serverHost}
          </a>
        </p>
        <p class="profile-description">${profileData.summary || ""}</p>
      </div>
    </div>
  `;
}


  
  /* ==================================================================== */

  async fetchEndpoint(endpoint) {
    const url = new URL(this.getAttribute("url") || document.location.href);
    const proxy = new URL(this.getAttribute("proxy") || url);
    const proxyMode = proxy.hostname !== url.hostname;

    const path = endpoint
      .replace("www.", "")
      .replace(`${url.origin}/.ghost/activitypub/`, "");

    const baseUrl = proxyMode ? proxy.origin : url.origin;

    try {
      const response = await fetch(`${baseUrl}/.ghost/activitypub/${path}`, {
        headers: {
          accept: "application/activity+json",
          ...(proxyMode ? { "x-proxy": url.origin } : {}),
        },
      });

      if (!response.ok) {
        return [new Error(`HTTP error ${response.status}`), null];
      }

      return [null, await response.json()];
    } catch (err) {
      return [err, null];
    }
  }

  /* ==================================================================== */

  renderItem(item, profileData) {
    if (
      item.type === "Create" &&
      item.object &&
      (item.object.type === "Note" ||
        (this.hasAttribute("include-posts") &&
          item.object.type === "Article"))
    ) {
      const note = item.object;
      const published = note.published;

      const attachment =
        note.attachment && note.attachment.type === "Image"
          ? `<img class="feed-item-image" src="${note.attachment.url}">`
          : "";

      return `
        <div class="feed-item">
          <div class="feed-author">
            <div class="feed-author-avatar">
              <img src="${profileData.icon?.url}">
            </div>
            <div class="feed-author-meta">
              <div class="feed-author-name">${profileData.name}</div>
              <div class="feed-author-username">
                @${profileData.preferredUsername}@${profileData.serverHost} ·
                <span>${this.formatDate(published)}</span>
              </div>
            </div>
          </div>
          <div class="feed-item-content">
            ${
              note.type === "Note"
                ? note.content
                : `
                <a href="${note.url}" target="_top"
                   class="feed-item-article-preview">
                  <h3>${note.name}</h3>
                  <p>${note.summary || ""}</p>
                </a>`
            }
            ${attachment}
          </div>
        </div>
      `;
    }

    return "";
  }

  /* ==================================================================== */

  async fetchFeed() {
    try {
      const url = new URL(this.getAttribute("url") || document.location.href);

      const [profileErr, profileData] =
        await this.fetchEndpoint("users/index");
      if (profileErr) throw profileErr;

      this._profileData = profileData;
      this._profileData.serverHost = url.hostname.replace("www.", "");

      const [outboxErr, outbox] =
        await this.fetchEndpoint("outbox/index");
      if (outboxErr) throw outboxErr;

      if (!outbox.first) {
        throw new Error("Invalid outbox: missing first");
      }

      const [pageErr, page] =
        await this.fetchEndpoint(outbox.first);
      if (pageErr) throw pageErr;

      const items = page.orderedItems || [];

      // FIX: pagination MUST follow prev only
      this._nextPage = page.prev || null;

      let html = "";
      items.forEach((item) => {
        html += this.renderItem(item, this._profileData);
      });

      const sentinel =
        this.hasAttribute("infinite-scroll") && this._nextPage
          ? `<div class="infinite-scroll-sentinel"></div>`
          : "";

      this.shadowRoot.querySelector(".feed-container").innerHTML = `
        ${this.renderProfileHeader(this._profileData)}
        <div class="feed-items">${html}</div>
        ${sentinel}
      `;

      this.setupInfiniteScroll();
    } catch (err) {
      this.shadowRoot.querySelector(".feed-container").innerHTML =
        `<div class="error">${err.message}</div>`;
    }
  }

  /* ==================================================================== */

  setupInfiniteScroll() {
    this.teardownInfiniteScroll();

    if (!this.hasAttribute("infinite-scroll") || !this._nextPage) return;

    const sentinel =
      this.shadowRoot.querySelector(".infinite-scroll-sentinel");
    if (!sentinel) return;

    this._infiniteScrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.loadMoreItems();
        });
      },
      {
        root: null,               // viewport scrolling is correct
        rootMargin: "0px 0px 300px 0px",
      }
    );

    this._infiniteScrollObserver.observe(sentinel);
  }

  teardownInfiniteScroll() {
    if (this._infiniteScrollObserver) {
      this._infiniteScrollObserver.disconnect();
      this._infiniteScrollObserver = null;
    }
  }

  /* ==================================================================== */

  async loadMoreItems() {
    if (!this._nextPage || this._isLoadingMore) return;
    this._isLoadingMore = true;

    const [err, page] = await this.fetchEndpoint(this._nextPage);
    if (err) {
      this._isLoadingMore = false;
      return;
    }

    // FIX: prev only
    this._nextPage = page.prev || null;

    const container = this.shadowRoot.querySelector(".feed-items");
    const items = page.orderedItems || [];

    let appended = 0;
    items.forEach((item) => {
      const html = this.renderItem(item, this._profileData);
      if (html) {
        container.insertAdjacentHTML("beforeend", html);
        appended++;
      }
    });

    // FIX: skip empty pages, but safely
    if (appended === 0 && this._nextPage) {
      this._isLoadingMore = false;
      this.loadMoreItems();
      return;
    }

    // FIX: move sentinel to bottom and re-observe
    const old = this.shadowRoot.querySelector(".infinite-scroll-sentinel");
    if (old) old.remove();

    if (this._nextPage) {
      container.insertAdjacentHTML(
        "afterend",
        `<div class="infinite-scroll-sentinel"></div>`
      );
      this.setupInfiniteScroll();
    } else {
      this.teardownInfiniteScroll();
    }

    this._isLoadingMore = false;
  }

  /* ==================================================================== */

  connectedCallback() {
    this.fetchFeed();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal && (name === "url" || name === "infinite-scroll")) {
      this.fetchFeed();
    }
  }
}

customElements.define(
  "ghost-activitypub-embed",
  GhostActivityPubEmbed
);
