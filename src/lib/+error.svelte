<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="prose prose-slate">
	<h1>
		{$page.status}:
		{$page.error?.message} '🫠',
	</h1>
</div>
