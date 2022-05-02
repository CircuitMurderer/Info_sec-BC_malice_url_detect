//用来检测函数调用的测试文件，检测不到eval，其他都能检测到

function foo() {
    console.log("hello world!");
}
function bar() {
    eval("console.log(\"hi ,bar!\");");
}
var command = "foo()";

function myeval(str){
    eval(str);
};
myeval(command);
bar();
var document = new Document();  //会报错：Document is not defined
document.write("dasd");
/*
for (var index = 0; index < 5; index++) {
    eval("console.log(index)");
}
*/