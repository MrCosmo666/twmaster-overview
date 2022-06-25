<template>
	<v-footer
		class="bg-secondary-lighten-1 text-center d-flex flex-column"
	>
		<p class="text-h6 mt-3">{{ master }}</p>
		<a class="mb-3" :href="hosterUrl">Hosted by {{ hosterName }}</a>
	</v-footer>
</template>

<script>
export default {
	name: 'Footer',
	data: () => ({
		master: import.meta.env.VITE_MASTER,
		hosterName: import.meta.env.VITE_HOSTER_NAME,
		hosterUrl: import.meta.env.VITE_HOSTER_URL,
	}),
}
</script>

<style scoped>

</style>
