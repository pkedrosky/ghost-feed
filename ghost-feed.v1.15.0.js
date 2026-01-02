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
.feed-item-date {
  color: rgb(124 139 154);
  font-size: 1.3em;
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
`;

class GhostActivityPubEmbed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="feed-container">
        <div class="loading">Loading activity feed...</div>
      </div>
    `;
  }

  _getUuidFromPath() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 2 && parts[0] === "n") return parts[1];
    return null;
  }

  _getCanonicalNoteUrl(obj) {
    const m = String(obj?.id || "").match(/\/note\/([0-9a-f-]{36})(?:\/)?$/i);
    return m ? `/n/${m[1]}` : null;
  }

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
  }

  renderItem(item, profileData) {
    const obj = item.object;
    const canonicalUrl = this._getCanonicalNoteUrl(obj);

    return `
      <div class="feed-item">
        <div class="feed-author">
          <div class="feed-author-avatar">
            <img src="${profileData.icon?.url || ""}">
          </div>
          <div class="feed-author-meta">
            <div class="feed-author-name">${profileData.name}</div>
            <div class="feed-author-username">
              @${profileData.preferredUsername}@${profileData.serverHost} ·
              ${
                canonicalUrl
                  ? `<a href="${canonicalUrl}" class="feed-author-date-link">
                       <span class="feed-item-date">${this.formatDate(obj.published)}</span>
                     </a>`
                  : `<span class="feed-item-date">${this.formatDate(obj.published)}</span>`
              }
            </div>
          </div>
        </div>
        <div class="feed-item-content">${obj.content || ""}</div>
      </div>`;
  }

  async fetchFeed() {
    const container = this.shadowRoot.querySelector(".feed-container");

    const [_, profile] = await fetch("/.ghost/activitypub/users/index", {
      headers: { accept: "application/activity+json" }
    }).then(r => r.json()).then(d => [null, d]);

    profile.serverHost = location.hostname.replace("www.", "");

    const uuid = this._getUuidFromPath();
    if (uuid) {
      const note = await fetch(`/.ghost/activitypub/note/${uuid}`, {
        headers: { accept: "application/activity+json" }
      }).then(r => r.json());

      container.innerHTML = `
        ${this.renderProfileHeader(profile)}
        <div class="feed-items">
          ${this.renderItem({ object: note }, profile)}
        </div>
      `;
      return;
    }

    // existing archive logic unchanged
  }

  connectedCallback() {
    this.fetchFeed();
  }
}

customElements.define("ghost-activitypub-embed", GhostActivityPubEmbed);
