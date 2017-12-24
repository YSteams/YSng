// 测试gulp是否成功安装
// var gulp = require('gulp');
// gulp.task('default',function(){
//     console.log('hello world');
// });

 // 引入 gulp
 var gulp = require('gulp'); 

// // 引入组件
var jshint = require('gulp-jshint'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');  
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
var spritesmith=require('gulp.spritesmith');//雪碧图
var connect = require('gulp-connect');
var pkg =  require('./package.json');

 console.log(pkg.name);
 
// 合并、压缩、重命名css
gulp.task('minifycss', function() {
  return gulp.src('./'+pkg.name+'/dev/css/*.css')
    .pipe(concat('global.css'))
    .pipe(gulp.dest('./'+pkg.name+'/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./'+pkg.name+'/css'));
});


// // 检查脚本
gulp.task('lint', function() {
    gulp.src('./'+pkg.name+'/dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});



// // 合并，压缩js文件
gulp.task('scripts', function() {
    gulp.src('./'+pkg.name+'/dev/js/*.js')
        .pipe(concat('global.js'))
        .pipe(gulp.dest('./'+pkg.name+'/js'))
        .pipe(rename('global.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'+pkg.name+'/js'));
});




//图片合并
gulp.task('spritesmith', function() {
     return gulp.src('./'+pkg.name+'/dev/sprites/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:5   //合并时两个图片的间距 
        }))
        .pipe(gulp.dest('./'+pkg.name+'/images'));
});

//图片压缩
gulp.task('imagemin', function () {
    return gulp.src('./'+pkg.name+'/dev/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('./'+pkg.name+'/images'));
});

//开启服务
gulp.task('webserver', function() { 
    connect.server({root: pkg.name}); 
});


// // 默认任务
gulp.task('default', function(){
    gulp.run('lint','scripts','minifycss','imagemin',"spritesmith",'webserver');

    // 监听文件变化js变化
    gulp.watch('./'+pkg.name+'/dev/js/*.js', function(){
        livereload.listen();
        gulp.run('lint', 'scripts');
    });

    // 监听文件变化css变化
    gulp.watch('./'+pkg.name+'/dev/css/*.css', function(){
        livereload.listen();
        gulp.run('minifycss');
    });
});
