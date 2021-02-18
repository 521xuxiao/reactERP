import React, {Component} from 'react'
import LeakageEvaluation from '../leakageEvaluation/leakageEvaluation';
import Misreading from '../misreading/misreading';

import './exception.scss'

class Exception extends Component{
    constructor(props) {
        super(props);
        this.state = {
            liList: [{name: '漏评',key: 0}, {name: '漏读', key:1}],
            currentIndex: 0
        }
    }
    render() {

        return(
            <div id="exception">
                <div className="exception">
                    <ul className="ul1">
                        {
                            this.state.liList.map((item, index)=>{
                                return(
                                    <li key={item.key} className={this.state.currentIndex==item.key ?"li1 active":"li1"} onClick={this.handleClick.bind(this,index, item)}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                    { this.switchs() }
                </div>
            </div>
        )
    }
    handleClick(i, item) {
        this.setState({
            currentIndex: item.key
        })
    }
    switchs() {
        if(this.state.currentIndex ==0) {
            return(
                <>
                    <LeakageEvaluation/>
                </>
            )
        }else{
            return(
                <>
                    <Misreading/>
                </>
            )
        }
    }
}
export default Exception;