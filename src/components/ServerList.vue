<template>
	<v-layout>
		<v-app-bar color="secondary-lighten-1"></v-app-bar>
		<v-main class="bg-secondary">
			<v-container>
				<v-row class="mt-5">
					<v-col class="text-center">
						<p class="text-h4 ls-1 my-2">{{ master }}</p>
						<p class="text-h5 ls-1 my-2">Hosting <span class="bg-primary rounded px-1" id="stats-servers">66</span> servers with <span class="bg-primary rounded px-1" id="stats-players">123</span> players</p>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-layout>
</template>

<script>
export default {
  	name: 'ServerList',
  	data: () => ({
  		servers: [],
		master: import.meta.env.VITE_MASTER
  	})
}
</script>
