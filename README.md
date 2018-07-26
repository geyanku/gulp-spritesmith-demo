# test-sprite-smith

> 一个使用gulp-spritesmith自定义模板功能实现的demo。gulp-spritesmith支持1倍图和2倍图的自动适配，但前提是需要同时提供这两种尺寸的图片。这对一些要求快速迭代的小公司来说是不能接受的。因此，本demo忽视2倍图对dpr为1的设备屏幕的视觉损失，通过修改自定义模板默认拼接二倍图并产出1倍尺寸的css样式。



## 相关路径
模板路径：<code>gulp_templates/</code>  
图片输出路径： <code>src/assets/**/gulp_sprite/sprite.png</code>

scss文件输出路径：<code>src/theme/sprites/**/sprite.scss</code>

## 使用方式

递归生成sprite
<pre>
  gulp sprite [dir]
</pre>

清除sprite
<pre>
  gulp clearSprite
</pre>

## 引入

在vue文件的style标签中
```
<style lang="scss" scoped>
  @import 'src/theme/sprites/{yourdir}/sprite.scss';

  .img-class-name {
    @include sprite($imgname)
  }

  // ***
</style>
```
将`img-class-name`引入到指定标签下即可。这里注意，$imgname是不含后缀的文件名，前面的`$`不可省略
