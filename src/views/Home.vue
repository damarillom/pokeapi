<template>
	<v-card>
		<v-tabs
			v-model="tab"
			bg-color="transparent"
			color="basil"
			grow
		>
			<v-tab :value="1">PokeApi</v-tab>
			<v-tab :value="2">Coupons</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item :value="1">
				<PokeApi />
			</v-window-item>
			<v-window-item :value="2">
				<Coupons />
			</v-window-item>
		</v-window>
	</v-card>

	
</template>

<script setup>
	import PokeApi from '@/components/PokeApi.vue';
	import Coupons from '@/components/Coupons.vue';
</script>
<script>
	export default {
    	data () {
      		return {
				tab: null,
      		}
    	},
  	}
</script>
