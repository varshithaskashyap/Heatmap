utils = {
    methods: {
        colorCoding: function (score) {
            let color = "success";
            if (score <= 1)
                color = 'danger';
            else if (score <= 3)
                color = 'warning';
            return color;
        },

        calculateAggrigate(data) {
            let meanObj = {};
            for(let row of data) {

                for(let [key, value] of Object.entries(row)) {
                    if(key === "manager" || key === "_cellVariants"){
                        continue;
                    }
                    if(!meanObj[key]) {
                        meanObj[key] = 0;
                    }
                    meanObj[key] += parseInt(value);
                }
            }

            meanObj["manager"] = "Aggrigate";
            meanObj["_rowVariant"] = 'secondary';
            return meanObj
        }
    }
}