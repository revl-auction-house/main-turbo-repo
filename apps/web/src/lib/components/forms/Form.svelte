<script lang="ts">
	import '$lib/styles/forms.scss';
</script>

<form on:submit|preventDefault class="form-root form-reset typography">
	<slot />
</form>
