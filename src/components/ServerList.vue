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
					<v-col cols="12" sm="8">
						<div class="d-sm-flex">
							<div class="d-block d-sm-inline-block pe-5">
								<v-checkbox
									v-model="filter.hide.empty"
									label="Hide Empty"
									density="compact"
									hide-details
								></v-checkbox>
							</div>
							<div class="d-block d-sm-inline-block pe-5">
								<v-checkbox
									v-model="filter.hide.full"
									label="Hide Full"
									density="compact"
									hide-details
								></v-checkbox>
							</div>
							<div class="d-block d-sm-inline-block pe-5">
								<v-checkbox
									v-model="filter.hide.protected"
									label="Hide Protected"
									density="compact"
									hide-details
								></v-checkbox>
							</div>
							<div class="d-block d-sm-inline-block">
								<v-checkbox
									v-model="filter.hide.legacy"
									label="Hide Legacy"
									density="compact"
									hide-details
								></v-checkbox>
							</div>
						</div>
					</v-col>
					<v-col cols="12" sm="4">
						<v-text-field
							label="Search"
							prepend-inner-icon="mdi-magnify"
							variant="solo"
							bg-color="secondary-lighten-1"
							hide-details
							density="compact"
							v-model="filter.search"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row class="mb-5">
					<v-col>
						<v-table>
							<thead>
								<tr>
									<th class="text-left" @click="changeSort('name')">
										Server name
										<v-icon v-if="sort.type === 'name' && sort.desc">mdi-chevron-down</v-icon>
										<v-icon v-else-if="sort.type === 'name' && !sort.desc">mdi-chevron-up</v-icon>
									</th>
									<th class="text-left"></th>
									<th class="text-left" @click="changeSort('clients')">
										Clients
										<v-icon v-if="sort.type === 'clients' && sort.desc">mdi-chevron-down</v-icon>
										<v-icon v-else-if="sort.type === 'clients' && !sort.desc">mdi-chevron-up</v-icon>
									</th>
									<th class="text-left">
										Map
									</th>
									<th class="text-left">
										Gamemode
									</th>
									<th class="text-left">
										Version
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
								<td>{{ server.version }}</td>
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
		hosterUrl: import.meta.env.VITE_HOSTER_URL,
		filter: {
			hide: {
				empty: false,
				full: false,
				protected: false,
				legacy: false
			},
			search: ''
		},
		sort: {
			type: 'clients',
			desc: true
		}
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
		},
		changeSort(type) {
			// at the current state, Vuetify 3 doesn't have data tables yet :c
			let desc = false;
			if(this.sort.type === type) {
				desc = !this.sort.desc;
			}

			this.sort.type = type;
			this.sort.desc = desc;

			console.log(`${this.sort.type} -- ${this.sort.desc}`);
		}
	},
	computed: {
		serverList() {
			const servers = [];

			// filter
			for(const server of this.servers) {
				if(this.filter.hide.empty && server.players.length <= 0) {
					continue;
				}

				if(this.filter.hide.full && server.num_clients === server.max_clients) {
					continue;
				}

				if(this.filter.hide.protected && server.password) {
					continue;
				}

				if(this.filter.hide.legacy && server.tw_version.substring(0, 3) !== '0.7') {
					continue;
				}

				if(this.filter.search && this.filter.search.length > 0) {
					const search = this.filter.search.toLowerCase();
					if(
						!server.name.toLowerCase().includes(search)
						&& !server.map_name.toLowerCase().includes(search)
						&& !server.gamemode_name.toLowerCase().includes(search)
					) {
						continue;
					}
				}

				servers.push(server);
			}

			// sort
			if(this.sort.type === 'name') {
				servers.sort((a, b) => {
					const textA = a.name.toLowerCase();
					const textB = b.name.toLowerCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				});

				if(this.sort.desc) {
					servers.reverse();
				}
			} else if (this.sort.type === 'clients') {
				servers.sort((a, b) => {
					return a.num_clients - b.num_clients;
				});

				if(this.sort.desc) {
					servers.reverse();
				}
			}
			return servers;
		},
		numServers() {
			return this.serverList.length;
		},
		playerList() {
			const playersOfServers = this.serverList.map(x => x.players);
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
