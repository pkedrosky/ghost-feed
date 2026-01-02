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
    return ["include-posts", "maxitems", "infinite"];
  }

  _profileData = null;

  _pageItems = [];
  _pageIndex = 0;
  _nextPageUrl = null;

  _seenIds = new Set();
  _seenPageUrls = new Set();

  _batchSize = 10;
  _targetCount = 0;
  _renderedCount = 0;

  _isInfinite = false;
  _observer = null;
  _isLoading = false;

  dialogInitiated = false;
  dialog = null;
  dialogContent = null;

  _siteOrigin() {
    return document.location.origin;
  }

  _getNoteUuidFromQuery() {
    return new URLSearchParams(location.search).get("id");
  }

  async fetchEndpoint(endpoint) {
    try {
      const r = await fetch(`${this._siteOrigin()}/.ghost/activitypub/${endpoint}`, {
        headers: { accept: "application/activity+json" }
      });
      if (!r.ok) return [new Error(r.status), null];
      return [null, await r.json()];
    } catch (e) {
      return [e, null];
    }
  }

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric"
    }).format(d);
  }

  renderProfileHeader(profileData) {
    return `
      <div class="profile-header">
        ${profileData.image?.url ? `<img class="profile-image" src="${profileData.image.url}">` : ``}
        <div class="profile-info">
          <div class="profile-info-header">
            ${profileData.icon?.url ? `<img class="profile-icon" src="${profileData.icon.url}">` : ``}
            <button class="ghap-follow-button">Follow</button>
          </div>
          <h2 class="profile-name">${profileData.name}</h2>
          <p class="profile-username">
            <a href="https://${profileData.serverHost}" target="_blank">
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
    if (item?.type !== "Create" || item.object?.type !== "Note") return ``;

    const note = item.object;
    const uuid = note.id?.split("/").pop();
    const canonical = `/n/?id=${uuid}`;

    return `
      <div class="feed-item">
        <div class="feed-author">
          <div class="feed-author-avatar">
            <img src="${profileData.icon.url}">
          </div>
          <div class="feed-author-meta">
            <div class="feed-author-name">${profileData.name}</div>
            <div class="feed-author-username">
              @${profileData.preferredUsername}@${profileData.serverHost} ·
              <a href="${canonical}" class="feed-author-date">
                ${this.formatDate(note.published)}
              </a>
            </div>
          </div>
        </div>

        <div class="feed-item-content">
          ${note.content || ""}
        </div>
      </div>`;
  }

  async fetchFeed() {
    const container = this.shadowRoot.querySelector(".feed-container");
    container.innerHTML = `<div class="loading">Loading…</div>`;

    const uuid = this._getNoteUuidFromQuery();

    const [profileErr, profile] = await this.fetchEndpoint("users/index");
    if (profileErr) {
      container.innerHTML = `<div class="error">Profile load failed</div>`;
      return;
    }

    profile.serverHost = location.hostname.replace("www.", "");
    this._profileData = profile;

    container.innerHTML = `
      ${this.renderProfileHeader(profile)}
      <div class="feed-items"></div>
    `;

    const feed = this.shadowRoot.querySelector(".feed-items");

    // ===== SINGLE NOTE MODE =====
    if (uuid) {
      const [noteErr, note] = await this.fetchEndpoint(`note/${uuid}`);
      if (noteErr) {
        feed.innerHTML = `<div class="error">Note not found</div>`;
        return;
      }

      const item = { type: "Create", object: note };
      feed.innerHTML = this.renderItem(item, profile);
      return;
    }

    // ===== FEED MODE (unchanged) =====
    const [outboxErr, outbox] = await this.fetchEndpoint("outbox/index");
    if (outboxErr || !outbox.first) {
      feed.innerHTML = `<div class="error">Feed unavailable</div>`;
      return;
    }

    const [itemsErr, page] = await this.fetchEndpoint(outbox.first);
    if (itemsErr) {
      feed.innerHTML = `<div class="error">Feed load failed</div>`;
      return;
    }

    page.orderedItems.forEach(item => {
      feed.insertAdjacentHTML("beforeend", this.renderItem(item, profile));
    });
  }

  connectedCallback() {
    this.fetchFeed();

    this.shadowRoot.addEventListener("click", e => {
      if (e.target.closest(".copy-handle")) {
        const btn = e.target.closest(".copy-handle");
        navigator.clipboard.writeText(btn.dataset.handle);
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 2000);
      }

      if (e.target.matches(".ghap-follow-button")) {
        const modal = document.createElement("div");
        modal.className = "follow-modal";
        modal.innerHTML = `
          <h2>Follow me</h2>
          <div class="profile-username">
            <pre>@${this._profileData.preferredUsername}@${this._profileData.serverHost}</pre>
          </div>
        `;
        this.showDialog(modal);
      }
    });
  }

  initDialog() {
    if (this.dialogInitiated) return;

    this.dialog = document.createElement("dialog");
    this.dialogContent = document.createElement("div");
    this.dialog.appendChild(this.dialogContent);
    document.body.appendChild(this.dialog);
    this.dialogInitiated = true;
  }

  showDialog(node) {
    this.initDialog();
    this.dialogContent.innerHTML = "";
    this.dialogContent.appendChild(node);
    this.dialog.showModal();
  }
}

customElements.define("ghost-activitypub-embed", GhostActivityPubEmbed);
