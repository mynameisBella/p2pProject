//引入gulp模块
var gulp = require("gulp");

//引入路径模块
var path = require("path");

//引入less编译模块
var less = require("gulp-less");

//引入sass模块
var sass = require("gulp-sass");

//引入资源地图模块
var sourcemaps = require('gulp-sourcemaps');

//引入热刷新模块
var liveReload = require("gulp-livereload");

//引入串行任务管理模块
var sequence = require("run-sequence"); 

//引入重命名文件插件
var rename = require("gulp-rename");

//引入压缩css文件插件
var cleanCss = require("gulp-clean-css");

//定义less编译任务
gulp.task("lessTask",function(){
    gulp.src("src/less/*.less")
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/css/"))
    .pipe(liveReload())
});

//定义sass编译任务
gulp.task("sassTask",function(){
	gulp.src("src/sass/*.scss")
	.pipe(sourcemaps.init({loadMaps:true}))
	.pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write("../maps"))
	.pipe(gulp.dest("dist/css/"))
	.pipe(liveReload())
});

//定义观察者任务：less+sass
gulp.task("watch",function(){
	liveReload.listen();//开启监听
	gulp.watch("src/**/*",["lessTask","sassTask"])
})

//定义压缩css及修改文件名任务
gulp.task("cleanCss",function(){
	gulp.src("dist/css/*.css")
	.pipe(cleanCss())
	.pipe(rename({
		suffix:".min"
	}))
	.pipe(gulp.dest("dist/css/"))
});

//定义删除任务
gulp.task("delTempTask",function(){
	gulp.src("template").then(function(){
		console.log("垃圾文件删除成功");
	})
});

//串行发布任务,发布时才执行
gulp.task("publishTask",function(){
	sequence("cssClean","delTempTask");
});






