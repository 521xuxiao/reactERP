import {createStore} from 'redux';
import Reducer from './reducer.js';
export default createStore(Reducer);


// 使用的demo：
//     存： store.dispatch(action.setTokenModal(this.state.datas));  // 前提 把store和action引进来
//     取： store.getState()
