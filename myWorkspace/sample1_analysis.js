//对应sample1的分析文件
(function (sandbox) {

    var branches = {};

    function MyAnalysis() {

        this.conditional = function (iid, result) {
            var id = J$.getGlobalIID(iid);
            
            if(branches[id] == undefined) {
                branches[id] = {trueCounter : 0, falseCounter : 0};
            }
            if(result) {
                branches[id].trueCounter ++;
            } else {
                branches[id].falseCounter ++;
            }
        };

        this.endExecution = function () {
            for (const id in branches) {
                if (Object.hasOwnProperty.call(branches, id)) {
                    const element = branches[id];
                    console.log("at location : " + J$.iidToLocation(id) + 
                    "; trueCount : " + branches[id].trueCounter + 
                    "; falseCount : " + branches[id].falseCounter
                    );
                }
            }
        };
    }
    sandbox.analysis = new MyAnalysis();
}(J$))