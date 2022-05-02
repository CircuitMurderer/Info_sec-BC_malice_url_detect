//测试文件
var testObject = {name : "luo", age:13};
var testArray = [1,2,"uo"];
if(testObject.hobby == undefined) {
    console.log("no  testObject.hobby");
}
if(testArray[2]) {
    console.log("testArray[2] : " + testArray[2]);
}

if(testArray[3]) {
    console.log("testArray[3] : " + testArray[3]);
} else {
    console.log("no testArray[3]");
}
function foo(message) {
    console.log("hello + " + message);
}
var foo_back = foo;
var eval_back = eval;
//这里的函数比较结果是true
console.log(foo === foo);
console.log(eval_back === eval);

foo("world  ");
eval_back("console.log(\"hello\")");

var executedStr = ["hello", 123];
executedStr.push([123,"run"]);
console.log(executedStr);
console.log(eval_back.toString());
document.write("asdad");