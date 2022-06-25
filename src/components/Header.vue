<template>
	<v-app-bar color="secondary-lighten-1" absolute>
		<v-app-bar-title class="text-uppercase ls-1">{{ master }}</v-app-bar-title>
		<template v-slot:append>
			<a class="text-uppercase ls-1" href="https://status.tw">Statistics by status.tw</a>
		</template>
	</v-app-bar>
</template>

<script>
export default {
	name: 'Header',
	data: () => ({
		master: import.meta.env.VITE_MASTER,
	}),
}
</script>

<style scoped>

</style>
