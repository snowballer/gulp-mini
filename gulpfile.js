//引用模块
var gulp = require('gulp');
var rename = require("gulp-rename");
var notify = require('gulp-notify');
var clean = require('gulp-clean');

//合并代码模块（按需使用）
// var concat = require('gulp-concat');

//source maps
var sourcemaps = require('gulp-sourcemaps');

//压缩js代码的包引用
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

//压缩css的包引用
var cleanCSS = require('gulp-clean-css');
//预处理器
const autoprefixer = require('gulp-autoprefixer');

//压缩html
var htmlmin = require('gulp-htmlmin');

//压缩图片的包引用
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

//雪碧图合成
var spriter = require('gulp-css-spriter');

// gulp-uglify  压缩js代码(非模块化js代码)
gulp.task('jsMini', function() {
  //索引js文件下所有js,min.js结尾的不压缩
  gulp.src('src/js/*.js')
  //初始化
    .pipe(sourcemaps.init())
  //ES6
    .pipe(babel({
      presets: ['env']
    }))
  //合并代码（按需使用） ！！！
  //.pipe(concat('bundle.js'))
  //重命名
    .pipe(rename({suffix: '.min'}))
  //压缩代码
    .pipe(uglify())
  //写入
    .pipe(sourcemaps.write())
  //输出文件
    .pipe(gulp.dest('dist/js'))
  //提示压缩成功
    .pipe(notify({ message: 'jsMini-task completed' }));
});

// gulp-clean-css  压缩css代码
gulp.task('cssMini', function() {
  gulp.src('src/css/*.css')
  .pipe(sourcemaps.init())
  //合并代码（按需使用） ！！！
  //.pipe(concat('main.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(cleanCSS({compatibility: 'ie8',keepSpecialComments: '*'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'))
  .pipe(notify({ message: 'cssMini-task completed' }));
});

//gulp-htmlmin  压缩html代码
gulp.task('htmlMini', function() {
  var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
  gulp.src('src/*.html')
  .pipe(htmlmin(options))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});

// gulp-imagemin - 压缩图片(支持gif、jpeg、png、svg)
gulp.task('imgMini', function() {
  gulp.src('src/imgs/*.*').pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [
      {
        removeViewBox: true
      }
    ],
    use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
  })).pipe(gulp.dest('dist/imgs'));
});

// 清理打包后文件夹
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/imgs','dist/index.html'], {read: false})
      .pipe(clean());
});

//一键压缩
gulp.task('default', ['clean'], function() {
  gulp.start('jsMini', 'cssMini', 'htmlMini', 'imgMini');
});

//雪碧图合成
gulp.task('spriteMini', function() {
  gulp.src('src/css/sprite.css')  //需要引入背景图片的样式文件
  .pipe(spriter({
    spriteSheet: './dist/imgs/spritesheet.png',//gulp自动合成的雪碧图
    pathToSpriteSheetFromCSS: '../imgs/spritesheet.png'//css引用的图片路径
  })).pipe(gulp.dest('./dist/css'));
});
