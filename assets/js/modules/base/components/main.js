Vue.component("main-component", {
	data() {
		return {
			rawData: [],
			displayRawData: [],
		};
	},

	created: function () {
		this.$root.$refs.mainComponent = this;
		axios.get('https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000').then(
			response => {
				this.rawData = response.data;
				this.$root.$refs.DeepDiveComponent.updateIndex(this.rawData);
			}
		);
	},

	methods: {
		updateStoredisplayRawData(uniqueHeader){
			let data = {
				uniqueHeader,
				rawData: this.rawData,
			}
			this.$store.commit('updatedisplayRawData',data);
		}
	},

	template:
	`
		<div class="main-container ">
			<h1 class="text-muted text-center">My HeatMap</h1>
			<div class="">
			<div class="border p-2 m-5">
				<div class="col-12">
					<deep-dive :rawData="rawData"></deep-dive>
				</div>
				<div class="main-container">
					<table-view></table-view>
				</div>
			</div>
			</div>
		</div>
   	`,
})