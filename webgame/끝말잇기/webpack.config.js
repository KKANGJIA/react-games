const path = require('path'); //노드에서 경로 쉽게 조작하도록 줌 
const webpack = require('webpack'); //웹팩 불러오기
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
        rules: [{ // 규칙은 여러개를 적용하니까 배열로 묶어주기
            test: /\.jsx?/, // Rex: js와 jsx파일에 규칙을 적용하겠다
            loader: 'babel-loader', // babel을 적용하여 구문법을 신문법으로 적용하겠다
            options: {//바벨의 옵션을 적용하는 곳
                presets: [
                ['@babel/preset-env',{
                    targets: {
                    browsers: ['> 5% in KR', 'last 2 chrome versions'],
                    // 한국에서 5% 이상이 사용하는 브라우저 
                    // 최신 크롬의 두가지 버전을 제외한 구버전의 브라우저는 지원하지 않겠다는 설정
                    },
                    debug: true,
                }],
                '@babel/preset-react',
                ],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        new reactRefreshWebpackPlugin()
    ],
    output:{
        path: path.join(__dirname, 'dist'), 
        //path.join하면 경로를 알아서 합쳐주고 현재 폴더안에 dist폴더를 의미 
        //C:\users\...\vscode\lecture\dist경로를 path.join으로 알아서 찾아서 지정
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        publicPath: '/dist/',
        hot: true,
        //웹팩 데브 서버의 역할: 웹팩으로 빌드한 결과물을 dist폴더에 저장해서
        //index.html을 실행하면 결과물을 제공
        //핫 리로딩 기능: 변경점이 생기면 변경된 부분을 찾아 결과물을 수정해줌
        
        port: 3000, 
        // 포트 지정 포트 충돌로 인한 Error: listen EACCES: permission denied 127.0.0.1:8080 발생 
        //다른 포트 번호 지정해서 충돌해결
    }
};