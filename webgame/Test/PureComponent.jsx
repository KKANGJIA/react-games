// PureComponent는 shouldComponentUpdate의 기능을 가지고 있는 컴포넌트
// return true 인지 false인지 자동으로 구현해놓은 것 
// 필요없거나 과한 렌더링을 방지해준다(class는 pure // hooks는 meme)

import React, { Component } from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
    };
// 자료구조 복잡하게 사용하지 않기, pureComponent가 알지 못할 수도 있음 (배열안에 객체 안에 배열 이렇게...)

    onClick = () => {
        // pureComponent가 변경사항을 알지 못한다(불변성이 필요한 이유)
        // const array = this.state.array; 
        // array.push(5);

        this.setState({
            array: [...this.state.array, 1], //직접 변경하지않고 스프렌드 연산자를 이용해서 새로운 값을 추가해주기
        });
    };

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default Test;