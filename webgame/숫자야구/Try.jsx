// porps를 변경하는 것은 부모의 역할이어서 직접 변경하면 안돼요
// 하지만 굳이 여기서 바꿔야한다면 state를 사용해서 바꿀 수 있다
// import React, { memo } from 'react';

// const Try = memo(({ tryInfo }) => {
//     // 방법순서 1. state를 만든다(변경할 props를 state로 만들어주는 과정)
//     const [result, setResult] = useState(tryInfo.result);

//     // 2. state를 변경하는 메서드를 만든다
//     onClick = () => {
//         setResult('1');
//     } 

//     return (
//         <li>
//             <div>{tryInfo.try}</div> 
//             <div onClick={onClick}>{result}</div> 
//         </li>
//     )
// });

// export default Try;


/****************************************************************************************************/

// ★★★★★★★pure랑 memo를 사용해주면 성능 최적화에 도움이 되니 많이 사용해보장★★★★★★★★
// momo - hooks일 때 렌더링 방지용으로 사용할 수 있는 것
import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div> 
            <div>{tryInfo.result}</div> 
        </li>
    )
});

export default Try;


/****************************************************************************************************/

// ★★★★★★★pure랑 memo를 사용해주면 성능 최적화에 도움이 되니 많이 사용해보장★★★★★★★★
// PureComponent - class일 때 렌더링 방지용으로 사용할 수 있는 것
// import React, { PureComponent } from 'react';

// class Try extends PureComponent {
//     render() {
//         const { tryInfo } = this.props; 
//         //'비구조화 할당'을 이용해서 
//         //this.props.tryInfo를 간단하게 적어주기
//         return (
//             <li>
//                 <div>{tryInfo.try}</div> 
//                 <div>{tryInfo.result}</div> 
//             </li>
//         );
//     }
// }

// export default Try;
//pureComponent로 바꿔주면 얘네는 계쏙 렌더링되지 않고 input만 입력할 때마다 렌더링되서 성능이 좋아짐
//컴포넌트를 잘게 쪼개서 렌더링이 필요없는 부분은 pureComponent로 바꿔주면 렌더링이 적어져서 성능에 도움이 됨
//컴포넌트가 길어지면 pure를 사용할 수 없을 수도 있는데 이럴때는 shouldComponentUpdate메서드를 사용해서 과한 렌더링을 방지하기


/****************************************************************************************************/


//class 컴포넌트
// import React, { Component } from 'react';

// class Try extends Component {
//     render() {
//         const { tryInfo } = this.props; 
//         //'비구조화 할당'을 이용해서 
//         //this.props.tryInfo를 간단하게 적어주기
//         return (
//             <li>
//                 <div>{tryInfo.try}</div> 
//                 <div>{tryInfo.result}</div> 
//             </li>
//         );
//     }
// }

// export default Try;


/****************************************************************************************************/


//함수형 컴포넌트, hooks로 변형하기
// import React from 'react';

// const Try = ({ tryInfo }) => {
//     return (
//         <li>
//             <div>{tryInfo.try}</div> 
//             <div>{tryInfo.result}</div> 
//         </li>
//     );
// };

// export default Try;