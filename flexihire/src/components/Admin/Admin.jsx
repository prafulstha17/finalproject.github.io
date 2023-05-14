import "./Admin.css";

function Admin() {
  return (
    <div className="admin-panel">
      <header class="page-header">
        <nav>
          <ul class="admin-menu">
            <li class="menu-heading">
              <h3>Admin</h3>
            </li>
            <li>
              <a href="#0">
                <i class="fa-regular fa-browsers"></i>
                <span>Pages</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-user"></i>
                <span>Users</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-regular fa-chart-mixed"></i>
                <span>Trends</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-option"></i>
                <span>Collection</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-regular fa-message-captions"></i>
                <span>Comments</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-brush"></i>
                <span>Appearance</span>
              </a>
            </li>
            <li class="menu-heading">
              <h3>Settings</h3>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-bars"></i>
                <span>Options</span>
              </a>
            </li>
            <li>
              <a href="#0">
                <i class="fa-solid fa-bars"></i>
                <span>Charts</span>
              </a>
            </li>
            <li>
              <div class="switch">
                <input type="checkbox" id="mode" checked />
                <label for="mode">
                  <span></span>
                  <span>Dark</span>
                </label>
              </div>
              <button
                class="collapse-btn"
                aria-expanded="true"
                aria-label="collapse menu"
              >
                <i class="fa-solid fa-arrow-left"></i>
                <span>Collapse</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <section class="page-content">
        <section class="search-and-user">
          <form>
            <input type="search" placeholder="Search Pages..." />
            <button type="submit" aria-label="submit form">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div class="admin-profile">
            <span class="greeting">Hello admin</span>
            <div class="notifications">
              <span class="badge">1</span>

              <i class="fa-solid fa-user"></i>
            </div>
          </div>
        </section>
        <section class="grid">
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
          <article></article>
        </section>
      </section>
    </div>
  );
}

export default Admin;
