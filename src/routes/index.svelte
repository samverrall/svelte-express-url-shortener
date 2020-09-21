<script>
  import axios from "axios";
  import { slide } from "svelte/transition";

  let url = "";
  let addedRedirect = null;
  let allAddedRedirects = [];
  let error;

  async function shortenURL(e) {
    e.preventDefault();

    error = null;
    addedRedirect = null;

    if (!url) {
      error = "Please enter a URL.";
      return;
    }

    if (!isValidUrl(url)) {
      error = "Please enter a valid URL";
      return;
    }

    axios
      .post("/api/redirect", {
        url
      })
      .then(function(response) {
        addedRedirect = response.data;
        allAddedRedirects = [...allAddedRedirects, addedRedirect];

        url = "";
        console.log(addedRedirect);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function removeAdded(e, i) {
    e.preventDefault();

    allAddedRedirects.splice(i, 1);
    allAddedRedirects = allAddedRedirects;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
    } catch (err) {
      return false;
    }

    return true;
  }
</script>

<style>
  .wrapper {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #241c40;
    color: #ecf1f7;
    font-family: sans-serif;
    letter-spacing: 2px;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
  }

  label {
    text-transform: uppercase;
  }

  input {
    padding: 5px 15px;
    border: none;
    border-bottom: 1px solid #fff;
    border-radius: 4px;
    background: #ecf1f7;
    color: #241c40;
    font-size: 1.5em;
    margin-top: 5px;
  }

  input::placeholder {
    color: #241c40;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 600px;
  }

  h1 {
    font-weight: 600;
    color: #ecf1f7;
  }

  button {
    color: #241c40;
    background: #ecf1f7;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-weight: 600;
    font-size: 1.2em;
    transition: 0.3s ease-in;
    cursor: pointer;
  }

  button:hover {
    transform: scale(1.01);
  }

  .added-redirect {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
    color: #241c40;
    font-size: 14px;
    margin: 10px 0;
    width: 580px;
  }

  .added-redirect__header {
    display: flex;
    justify-content: flex-end;
  }

  .added-redirect__header > button {
    cursor: pointer;
    font-size: 1em;
  }
</style>

<div class="wrapper">
  <form on:submit={shortenURL}>
    <div class="input-field">
      <label>Enter URL</label>
      <input
        placeholder="Enter a URL to shorten..."
        type="text"
        name="url"
        bind:value={url} />
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button>Add direct</button>
  </form>

  {#each allAddedRedirects as redirect, i}
    <div class="added-redirect" transition:slide|local>
      <div class="added-redirect__header">
        <button class="added-redirect__close" on:click={e => removeAdded(e, i)}>
          x
        </button>
      </div>
      URL:
      <h2>
        <a target="_blank" href={redirect.url}>{redirect.url}</a>
      </h2>
      SHORTENED:
      <h2>
        <a target="_blank" href="localhost:3000/s/{redirect.shortHand}">
          localhost:3000/s/{redirect.shortHand}
        </a>
      </h2>
    </div>
  {/each}
</div>

<svelte:head>
  <title>URL Shortener</title>
</svelte:head>
