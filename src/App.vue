<template>
  	<v-app>
		<ServerList />
  	</v-app>
</template>

<script>
import ServerList from './components/ServerList.vue'

export default {
  	name: 'App',
  	components: {
  		ServerList,
  	},
}
</script>
