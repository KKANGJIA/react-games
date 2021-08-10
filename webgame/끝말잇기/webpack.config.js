const path = require('path'); //노드에서 경로 쉽게 조작하도록 줌 

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게 하겠다는 의미
    resolve: {
        extensions: ['.js', '.jsx'],
        //웹팩이 알아서 확장자를 찾아주는 extension
    },

    entry: {
        app: ['./client'], 
        //배열로 묶어주기
        //client파일에서 이미 wordRelay파일을 불러오고 있기 때문에 따로 써줄 필요 x
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/, // Rex: js와 jsx파일에 규칙을 적용하겠다
            loader: 'babel-loader', // babel을 적용하여 구문법을 신문법으로 적용하겠다
            options: { //바벨의 옵션을 적용하는 곳
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }], // 규칙은 여러개를 적용하니까 배열로 묶어주기
    },

    output:{
        path: path.join(__dirname, 'dist'), 
        //path.join하면 경로를 알아서 합쳐주고 현재 폴더안에 dist폴더를 의미 
        //C:\users\...\vscode\lecture\dist경로를 path.join으로 알아서 찾아서 지정
        filename: 'app.js'
    }, //출력
};