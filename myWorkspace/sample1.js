//这个文件是官网上的getting-start,用来检测分支发生的时候结果是true和false的次数
function foo() {
    console.log("foo");
}
function bar() {
    console.log("bar");
}
for (var index = 0; index < 10; index++) {
    if(index%2==0) {
        foo();
    } else {
        bar();
    }
}
console.log("done");
eval("foo()");