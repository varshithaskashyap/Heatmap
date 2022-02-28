Vue.component("table-view", {
    mixins: [utils],

	computed: {
		displayRawData: function () {
			return this.$store.state.displayRawData;
		},

		tableData: function () {
			let tabledata = [];

			//Sort data by manager_name
			let managers = {};
			for (let data of this.displayRawData) {
				if (data.manager in managers) 
					managers[data.manager].push(data);
				else 
				 	managers[data.manager] = [data];
			}
			//Add managerAttributes and color variants for heatmap
			for (const [managerName, managerValue] of Object.entries(managers)) {
				let row = {
					manager: managerName,
				}
				let colorVariant = {};
				for (let item of managerValue) {
					row[item.parameter] = item.score;
					colorVariant[item.parameter] = this.colorCoding(item.score);
					row._cellVariants = colorVariant;
				}
				tabledata.push(row);
			}

			//Calculate Aggrigate
			tabledata.push(this.calculateAggrigate(tabledata));
			return tabledata;
		}
	},
	template:
		`
		<div class="main-container">
			<b-table class="table-bordered table" :items="tableData"></b-table>
	    </div>
   `,
})
