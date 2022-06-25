<template>
	<v-layout>
		<v-app-bar color="secondary-lighten-1"></v-app-bar>
		<v-main class="bg-secondary">
			<v-container>
				<v-row class="mt-5">
					<v-col class="text-center">
						<p class="text-h4 ls-1 my-2">{{ master }}</p>
						<p class="text-h5 ls-1 my-2">Hosting <span class="bg-primary rounded px-1" id="stats-servers">{{ numServers }}</span> servers with <span class="bg-primary rounded px-1" id="stats-players">{{ numPlayers }}</span> players</p>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-layout>
</template>

<script>
import axios from 'redaxios';
import qs from 'qs';

export default {
  	name: 'ServerList',
  	data: () => ({
  		servers: [],
		master: import.meta.env.VITE_MASTER
  	}),
	methods: {
		async requestServerList() {
			try {
				const response = await axios.post(`https://api.status.tw/2.0/master/server/list/`, qs.stringify({
					master: import.meta.env.VITE_MASTER
				}), {
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				});

				if(response && response.data && response.data.servers) {
					this.servers = response.data.servers;
				}
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		numServers() {
			return this.servers.length;
		},
		playerList() {
			const playersOfServers = this.servers.map(x => x.players);
			return playersOfServers.flat();
		},
		numPlayers() {
			return this.playerList.length;
		}
	},
	mounted() {
	  	this.requestServerList();
	}
}
</script>
