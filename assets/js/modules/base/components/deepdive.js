Vue.component("deep-dive", {
    props:{
        rawData:[],
    },
	data() {
		return {
			indexValue: null,
			indexOptions: [
				{ value: null, text: 'Select an Index', disabled : true },
			],
			topicValue: null,
			topicOptions: [
				{ value: null, text: 'Select an topic', disabled : true },
			],
			topicDisabled: true,
		};
	},

	watch: {
		indexValue: function (val) {
			this.topicDisabled = false;
			this.topicOptions.splice(1);
			this.topicValue = null;

			let uniqueTopics = [];
			this.rawData.definitions.map(item => {
				if (item.index === val) {
					this.topicOptions.push({ value: item.topic, text: item.topic });
					uniqueTopics.push(item.topic);
				}
			});
            this.$root.$refs.mainComponent.updateStoredisplayRawData(uniqueTopics);
		},
		topicValue: function (val) {
			if(val === null) 
				return;

			let uniqueSubtopics = [];
			this.rawData.definitions.map(item => {
				if (item.topic === val)
					uniqueSubtopics.push(item.subTopic);
			});
            this.$root.$refs.mainComponent.updateStoredisplayRawData(uniqueSubtopics);
		}
	},
	created: function () {
        this.$root.$refs.DeepDiveComponent = this;
	},

	methods: {

		updateIndex(rawData) {

			let uniqueHeaders = []
			rawData.definitions.map(item => {
				if (!uniqueHeaders.includes(item.index)) {
					this.indexOptions.push({ value: item.index, text: item.index });
					uniqueHeaders.push(item.index);
				}
			});
            this.$root.$refs.mainComponent.updateStoredisplayRawData(uniqueHeaders);
		},
	},
	template:
	`
		  <div class="d-flex flex-row ">
			 <div class="m-2">
				<b-form-select class="form-select m-2" v-model="indexValue" :options="indexOptions"></b-form-select>
			 </div>
			 <div class="m-2">
				<b-form-select class="form-select m-2" v-model="topicValue" :options="topicOptions" :disabled="topicDisabled"></b-form-select>
			 </div>
		  </div>
   	`,
})
