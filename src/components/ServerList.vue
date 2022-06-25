<template>
	<v-layout>
		<v-app-bar color="secondary-lighten-1">
			<v-app-bar-title class="text-uppercase ls-1">{{ master }}</v-app-bar-title>
			<template v-slot:append>
				<a class="text-uppercase ls-1" href="https://status.tw">Statistics by status.tw</a>
			</template>
		</v-app-bar>
		<v-main class="bg-secondary">
			<v-container>
				<v-row class="my-5">
					<v-col class="text-center">
						<p class="text-h5 ls-1 my-2">Hosting <span class="bg-primary rounded px-1" id="stats-servers">{{ numServers }}</span> servers with <span class="bg-primary rounded px-1" id="stats-players">{{ numPlayers }}</span> players</p>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-table>
							<thead>
								<tr>
									<th class="text-left">
										Server name
									</th>
									<th class="text-left"></th>
									<th class="text-left">
										Clients
									</th>
									<th class="text-left">
										Map
									</th>
									<th class="text-left">
										Gamemode
									</th>
								</tr>
							</thead>
							<tbody>
							<tr
								v-for="server in serverList"
								:key="server.server_pk"
							>
								<td>{{ server.name }}</td>
								<td>
									<v-tooltip
										v-if="server.password"
										location="top"
									>
										<template v-slot:activator="{ props }">
											<v-icon v-bind="props">mdi-lock</v-icon>
										</template>
										<span>Password protected</span>
									</v-tooltip>
								</td>
								<td><span class="font-weight-bold">{{ server.num_clients }}</span> / {{ server.max_clients }}</td>
								<td>{{ server.map_name }}</td>
								<td>{{ server.gamemode_name }}</td>
							</tr>
							</tbody>
						</v-table>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-footer
			app
			class="bg-secondary-lighten-1 text-center d-flex flex-column"
		>
			<p class="text-h6 mt-3">{{ master }}</p>
			<a class="mb-3" :href="hosterUrl">Hosted by {{ hosterName }}</a>
		</v-footer>
	</v-layout>
</template>

<script>
import axios from 'redaxios';
import qs from 'qs';

export default {
  	name: 'ServerList',
  	data: () => ({
  		servers: [],
		master: import.meta.env.VITE_MASTER,
		hosterName: import.meta.env.VITE_HOSTER_NAME,
		hosterUrl: import.meta.env.VITE_HOSTER_URL
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
		serverList() {
			return this.servers;
		},
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
