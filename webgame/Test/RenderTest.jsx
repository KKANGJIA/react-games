//렌더링이 얼마나 발생하는 지 어떻게 렌더링을 조절하는 지 테스트 코드
import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter: 0,
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.counter !== nextProps.counter) {
            return true;
        }
        return false;
    }
    // 리액트는 상태변화가 일어났는 지 아닌지 잘 모름... 
    // 언제 렌더링이 발생하는 지 적어줘야 리액트가 렌더링을 아무데나 막하지 않음

    onClick = () {
        this.setState({});
    }
    // setState가 발생하면 counter가 바뀌지 않아도 렌더링이 계속 발생함
    // 성능에 악영향을 미칠 수 있음 렌더링이 계속 일어날 수록 하이라이트로 표시한 부분이 붉어짐
    // 리액트나 컴포넌트 부분에서 톱니바퀴를 눌러 하이라이트 표시를 선택하면 확인가능
    
    render() {
        //render안에 setState 사용하면 error발생하니까 절대 사용하지 않기!!!
        // 비구조화할당이나 콘솔을 사용하는 곳
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;