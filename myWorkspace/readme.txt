这个文件夹放在jalangi2的根目录下；
cd myWorkspace;
node ../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis sample2_analysis.js sample2.js


//每个文件说明：
sample1.js 和sample1_analysis.js是官网上/docs/tutorial1.md使用的案例
sample2.js 和sample2_analysis.js是用来实验检测函数执行的文件，检测不到eval；
test.js 是用来测试 
analysisCallbackTemplate.js 是模板，sample1_analysis.js和sample2_analysis.js就是按照它来编写。