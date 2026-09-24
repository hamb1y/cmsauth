<script lang="ts">
  import { onMount } from 'svelte';
  let sites: any[] = []; let label = ''; let repo = ''; let branch = 'main'; let message = '';
  async function load() { sites = (await (await fetch('/api/admin/sites')).json()).sites ?? []; }
  async function add() { message = ''; const response = await fetch('/api/admin/sites', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ label, repo, branch }) }); const result = await response.json(); if (!response.ok) { message = result.error; return; } label = ''; repo = ''; await load(); }
  onMount(load);
</script>
<main><a href="/admin">← Admin</a><h1>Sites</h1><p>One deployment, many tenant-scoped Git sites.</p>
  <form onsubmit={(event) => { event.preventDefault(); add(); }}><input bind:value={label} placeholder="Site label" required /><input bind:value={repo} placeholder="owner/repository" pattern="[^/]+/[^/]+" required /><input bind:value={branch} placeholder="branch" required /><button>Add site</button></form>
  {#if message}<p class="error">{message}</p>{/if}<table><thead><tr><th>Label</th><th>Repository</th><th>API root</th><th>Status</th></tr></thead><tbody>{#each sites as site}<tr><td>{site.label}</td><td>{site.repo}</td><td><code>{site.apiRoot}</code></td><td>{site.enabled ? 'enabled' : 'disabled'}</td></tr>{/each}</tbody></table>
</main><style>main{max-width:1100px;margin:3rem auto;font:16px system-ui}a{color:#1261a0}form{display:flex;gap:.5rem;margin:1.5rem 0;flex-wrap:wrap}input,button{padding:.65rem;border:1px solid #ccd3da;border-radius:6px}button{background:#1261a0;color:white}table{width:100%;border-collapse:collapse}td,th{text-align:left;border-bottom:1px solid #e5e7eb;padding:.75rem}.error{color:#b42318}code{font-size:12px}</style>
