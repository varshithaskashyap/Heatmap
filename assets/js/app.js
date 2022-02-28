var store = new Vuex.Store({
	state: {
        displayRawData : [],
	},
	mutations: {
        updatedisplayRawData (state,data) {
            state.displayRawData = [];
			data.rawData.data.map(item => {
				for (let header of data.uniqueHeader) {
					if (item.parameter === header) {
						state.displayRawData.push(item);
					}
				}
			});
        }
    },
	getters: {}
});


new Vue({
    el: '#app',
    store,
    template: `<main-component></main-component>`,
});