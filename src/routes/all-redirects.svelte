<script>
  import axios from "axios";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  onMount(async () => {
    await loadAllRedirects();
  });

  let allAddedRedirects = [];

  async function loadAllRedirects() {
    try {
      const getRedirects = axios
        .get("/api/redirect")
        .then(response => {
          allAddedRedirects = response.data;
        })
        .catch(err => {
          allAddedRedirects = [];
          console.error(err);
        });
    } catch (err) {
      allAddedRedirects = [];
    }
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
        <a target="_blank" href="localhost:3000/s/{redirect.shortcode}">
          localhost:3000/s/{redirect.shortcode}
        </a>
      </h2>
    </div>
  {/each}
</div>
