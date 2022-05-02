(function (sandbox) {

    var executedStr = [];

    function MyAnalysis() {
        //每次函数调用时都会先执行这个回调函数
        this.invokeFunPre = function (iid, f, base, args, isConstructor, isMethod, functionIid, functionSid) {
            //打印参数
            console.log("invokeFunPre  args: " + args[0]);
            //如果函数是某个对象的方法，那么会打印这个对象
            console.log("base : " + base);
            //打印函数名，函数的toString()
            console.log("name : " + f.name + " f : " + f.toString());
        };

        //程序结束时调用的回调函数
        this.endExecution = function () {
            console.log("executedStr : " + executedStr);
        };
    }
    sandbox.analysis = new MyAnalysis();
}(J$))