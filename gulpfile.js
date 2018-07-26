const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const fs = require('fs')
const del = require('del')
const process = require('process')
const child_process = require('child_process')

// 防止图片覆盖，新建目录保存
const SPRITEDIR = 'gulp_sprite'

gulp.task('sprite', function () {
  var rootDir = process.argv[3] || 'src/assets'
  readDirSync(rootDir)

  function readDirSync(dir) {
    if(dir.indexOf(SPRITEDIR) !== -1) return

    const scssDir = dir.replace(/\/assets\//, '/theme/sprites/')
    var files = fs.readdirSync(dir)
    var pngs = files.filter(file => /\.png/.test(file))
    if(pngs.length >= 2) {
      var ret1 = gulp.src(`${dir}/*.png`)
        .pipe(spritesmith({
          // retinaSrcFilter: 'src/assets/test_retina/*@2x.png',
          imgName: 'sprite.png',
          // retinaImgName: 'sprite@2x.png',
          cssName: 'sprite.scss',
          // retinaImgPath: '${dir}/${SPRITEDIR}/sprite@2x.png',
          imgPath: `${dir}/${SPRITEDIR}/sprite.png`,
          cssTemplate: 'gulp_templates/scss.2x.template.handlebars',
      })).pipe(gulp.dest(`${dir}/${SPRITEDIR}/`))
      .on('finish', () => {
        // let ret = child_process.execSync(`tree src/assets/`)
        // console.log('---ret: ', ret.toString())
        if(!fs.existsSync(scssDir)) {
          child_process.execSync(`mkdir -p ${scssDir}`)
        }
        child_process.execSync(`mv ${dir}/${SPRITEDIR}/sprite.scss ${scssDir}/`)
      })
    }

    files.forEach(function(ele){
      var curPath = `${dir}/${ele}`
      var info = fs.statSync(curPath)
      if(info.isDirectory()){
        return readDirSync(curPath)
      }else{
        return
      }
    })
  }
});

gulp.task('clearSprite', function () {
  var rootDir = process.argv[3] || 'src/assets/'

  var scssDir = rootDir.replace(/\/assets/, '/theme/sprites') 
  child_process.execSync(`rm -rf ${scssDir}/*`)
  deleteDirSync(rootDir)

  function deleteDirSync(dir) {
    var files = fs.readdirSync(dir)

    files.forEach(function(ele){
      const curPath = `${dir}/${ele}`
      const info = fs.statSync(curPath)
      if(info.isDirectory()){
        if(ele === SPRITEDIR) {
          del(curPath)
        } else {
          return deleteDirSync(curPath)
        }
      }else{
        return
      }
    })
  }
})
