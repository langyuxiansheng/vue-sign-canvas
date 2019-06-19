# vue-license-keyboard

## 直接安装使用
```
npm i vue-license-keyboard --save
```
```
import LicenseKeyboard from 'vue-license-keyboard';
import 'vue-license-keyboard/lib/vue-license-keyboard.css';

Vue.use(LicenseKeyboard);
```
### 图片展示 输入带预览
---
车牌汉字输入
![车牌汉字输入](https://github.com/langyuxiansheng/vue-license-keyboard/blob/master/images/l1.png)

车牌数字输入
![车牌数字输入](https://github.com/langyuxiansheng/vue-license-keyboard/blob/master/images/l2.png)

车牌数字输入
![车牌字母输入](https://github.com/langyuxiansheng/vue-license-keyboard/blob/master/images/l2.png)

更多功能正在完善中......
如果您有什么好的建议请留言

你可以这样使用: 

```
<el-input
slot="query-4"
v-model.trim="table.queryData.licenseNumber"
placeholder="车牌号"
>
    <template slot="prepend">
        <LicenseKeyboard v-model="table.queryData.licenseNumber" title="软键盘" />
    </template>
</el-input>
```

直接使用v-model 进行绑定

也可以使用 @confirm="handleInput"  进行回调
```
methods:{
     handleInput(value){
        console.log('您输入的车牌为:',value);
     }
}
```
也可以使用  
```
<LicenseKeyboard v-model="table.queryData.licenseNumber" title="软键盘" > 
    这里是你的自定义图标或者内容
</LicenseKeyboard>
```
---

```
## 二次开发 下载项目

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
