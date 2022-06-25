<template>
  	<v-app>
    	<v-main>
      		<ServerList />
    	</v-main>
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
