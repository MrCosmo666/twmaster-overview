<template>
	<v-dialog
		:model-value="isActive"
		width="70%"
		height="400px"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card height="100%">
			<v-card-item>
				<v-card-title class="font-weight-bold">{{ serverData.name }}</v-card-title>
			</v-card-item>
			<v-card-text>
				<v-row>
					<v-col cols="6">
						<v-row>
							<v-col>
								<table class="server-info-table">
									<tbody>
									<tr>
										<td>Clients</td>
										<td><span class="font-weight-bold">{{ serverData.numClients }}</span> / {{ serverData.maxClients }}</td>
									</tr>
									<tr>
										<td>Address</td>
										<td>{{ serverData.ip }}:{{ serverData.port }}</td>
									</tr>
									<tr>
										<td>Gamemode</td>
										<td>{{ serverData.gameType.name }}</td>
									</tr>
									<tr>
										<td>Map name</td>
										<td>{{ serverData.map.name }}</td>
									</tr>
									<tr>
										<td>Password</td>
										<td>{{ serverData.hasPassword ? 'Protected' : 'None' }}</td>
									</tr>
									<tr>
										<td>Version</td>
										<td>{{ serverData.version.version }}</td>
									</tr>
									</tbody>
								</table>
							</v-col>
						</v-row>
						<v-row class="mt-6">
							<v-col class="text-center">
								<v-btn class="connect-button" :href="`steam://run/380840//teeworlds:${serverData.ip}:${serverData.port}/`" block>Connect</v-btn>
							</v-col>
						</v-row>
					</v-col>
					<v-col>
						<v-table height="270px">
							<thead>
								<th>Name</th>
								<th>Clan</th>
								<th>Score</th>
							</thead>
							<tbody>
								<tr
									v-if="serverData.clients.length > 0"
									v-for="player in serverData.clients"
									:key="player.name"
								>
									<td>{{ player.name }}</td>
									<td>{{ player.clan.name }}</td>
									<td>{{ player.score }}</td>
								</tr>
								<tr v-else class="text-center">
									<td colspan="3">No players</td>
								</tr>
							</tbody>
						</v-table>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['isActive', 'serverData'],
	name: 'ServerInfoDialog',
	methods: {
		close() {
			this.$emit('close');
		}
	}
}
</script>

<style scoped>

</style>
