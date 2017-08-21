# gulp-mini

> 利用gulp和webpack压缩代码和图片的一款工具

## 技术栈

- **gulp**：自动化构建工具
- **webpack**：模块化打包工具

## 启动项目

```bash
#git clone
https://github.com/snowballer/gulp-mini.git

# install dependencies
npm install

# minify
gulp or webpack
```

## 项目说明

- **工具由来**：采用webpack构建的脚手架应用打包文件非常方便，倘若没采用脚手架应用可能打包需要自己配置环境，本工具可以省去环境配置时间，仅需要下载下来安装依赖包就可以实现打包

- **工具功能**：本工具实现了对html、css、js、img进行单独压缩功能，除此之外，实现了生成css精灵图、一键压缩、一键清除、模块化打包js以及打包并拼接的功能

- **工具命令**：
  - gulp

  &emsp;&emsp;&emsp;一键压缩html、css、js和img

  - gulp htmlMini

  &emsp;&emsp;&emsp;压缩html

  - gulp jsMini

  &emsp;&emsp;&emsp;压缩js

  - gulp cssMini

  &emsp;&emsp;&emsp;压缩css

  - gulp jsMini

  &emsp;&emsp;&emsp;压缩js

  - gulp spriteMini

  &emsp;&emsp;&emsp;合成css精灵图

  - gulp clean

  &emsp;&emsp;&emsp;清除dist文件内文件

  - webpack

  &emsp;&emsp;&emsp;模块化打包js

- **工具说明**：

  - 全面支持ES6

  - 打包文件放置在src文件内，文件夹名称请勿修改

  - 打包后的文件放置在dist文件夹内

  - webpack的打包需要在webpack.config.js进行配置

  - 拼接代码需要在gulpfile.js启用，拼接顺序最好自己手动配置
