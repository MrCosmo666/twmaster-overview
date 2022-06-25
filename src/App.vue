<template>
  	<v-app>
		<Header />
		<v-main class="bg-secondary">
			<ServerList />
		</v-main>
		<Footer />
  	</v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ServerList from './components/ServerList.vue';

export default {
  	name: 'App',
  	components: {
		Header,
		Footer,
  		ServerList,
  	},
}
</script>
