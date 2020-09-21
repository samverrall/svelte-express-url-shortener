<script>
  export let segment;
</script>

<style>
  nav {
    background: #ecf1f7;
    font-weight: 300;
    padding: 0 1em;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
    font-weight: 600;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: 40%;
    height: 2px;
    background-color: #241c40;
    display: block;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: #241c40;
    font-weight: 400;
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>
    <li>
      <a
        class={segment === 'all-redirects' ? 'selected' : ''}
        href="/all-redirects">
        All redirects
      </a>
    </li>
  </ul>
</nav>
