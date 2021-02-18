import React, {Component} from 'react';
import { message, Modal, Input, Button, Tree } from 'antd';
import { DownOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';
import './branch.scss'
const { confirm } = Modal;
class Branch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            deptname: '',
            treeSeletor: {},
            msg: "",
            visibleChecked: false
        }
    }
    render() {
        return(
            <div id="branch">
                <div className="Branch">
                    <div className="dictionaryLeft">
                        <div className="innerDiv">
                            <div className="dictType">部门列表</div>
                            <Tree showLine switcherIcon={<DownOutlined />} defaultExpandedKeys={[]} onSelect={this.onSelect.bind(this)} treeData={this.state.treeData}/>
                        </div>
                    </div>
                    <div className="dictionaryRight">
                        <div className="innerRight">
                            <ul className="ul1">
                                <li className="li1">
                                    <span className="span1">部门名称</span>
                                    <Input value={this.state.deptname} className="input1" allowClear onChange={(e)=>{this.setState({deptname:e.target.value})}}/>
                                </li>
                            </ul>
                            <div className="div4">
                                <li className="li4">
                                    <Button className="btn4" type="primary" onClick={this.changes.bind(this)}>修改</Button>
                                </li>
                                <li className="li4">
                                    <Button className="btn4" type="primary" onClick={this.add.bind(this)}>新增部门</Button>
                                </li>
                                <li className="li4">
                                    <Button className="btn4" type="danger" onClick={this.deletes.bind(this)}>删除</Button>
                                </li>
                                <li className="li4">
                                    <Button className="btn4" type="danger" onClick={this.cancle.bind(this)}>重置</Button>
                                </li>
                            </div>
                        </div>
                    </div>
                    <Modal title={this.state.msg} width="50%" footer={null} getContainer={false} closable={false}  visible={this.state.visibleChecked} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*部门名称</span>
                                        <Input className="input1 input3" allowClear value={this.state.deptname} onChange={(e)=>{this.setState({deptname: e.target.value})}}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="div4">
                            <li className="li4">
                                <Button className="btn4" type="danger" onClick={()=>{this.setState({visibleChecked: false})}}>取消</Button>
                            </li>
                            <li className="li4">
                                <Button className="btn4" type="primary" onClick={this.checkedPass.bind(this)}>确定</Button>
                            </li>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
    initTreeList() {   //左侧的tree结构列表
        Axios.post('/self/erp/dept/queryDept').then((res)=>{
            console.log(res.data); //  deptList   title   key
            if(res.data.success) {
                this.treeSetData(res.data.data.deptList);
            }else{
                this.treeSetData([]);
            }
        })
    }
    // 处理树状结构的数据
    treeSetData(arr) {
        if(arr && arr.length) {
            arr.forEach((item)=>{
                item.title = item.deptName;
                item.key = item.deptId;
                if(item.children && item.children.length) {
                    this.treeSetData(item.children);
                }
            })
        }
        this.setState({
            treeData: arr
        })
    }

    onSelect(selectedKeys, info) {
        this.setState({
            treeSeletor: info,
            deptname: info.node.deptName
        })
    }
    changes() {
        this.setState({
            visibleChecked: true,
            msg: '修改',
            flag: 0
        })
    }
    add() {
        this.setState({
            visibleChecked: true,
            msg: '新增',
            flag: 1
        })
    }
    deletes() {
        if(this.state.treeSeletor.node == undefined) {
            message.warning('请选择部门再删除');
            return false;
        }
        let that = this;
        confirm({
            title: '你确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                let params = {
                    deptId: that.state.treeSeletor.node.deptId
                };
                Axios.post('/self/erp/dept/deleteDept', params).then((res)=>{
                    if(res.data.success) {
                        message.success("删除成功");
                        that.initTreeList();
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        });
    }
    cancle() {
        this.setState({
            deptname: ''
        })
    }
    checkedPass() {
        if(this.state.flag == 1) {  // 新增
            let parentId = this.state.treeSeletor.node == undefined ? "0" : this.state.treeSeletor.node.deptId;
            let params = {
                name: this.state.deptname,
                parentId
            };
            Axios.post('/self/erp/dept/addDept', params).then((res)=>{
                if(res.data.success){
                    message.success("新增成功");
                    this.setState({
                        visibleChecked: false
                    });
                    this.initTreeList();
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{  // 修改
            if(this.state.treeSeletor.node == undefined) {
                message.warning("请选择部门列表");
                return false;
            }
            let params = {
                id: this.state.treeSeletor.node.deptId,
                name: this.state.deptname,
                parentId: this.state.treeSeletor.node.parentId,
            };
            Axios.post('/self/erp/dept/updateDept', params).then((res)=>{
                if(res.data.success) {
                    message.success("修改成功");
                    this.setState({
                        visibleChecked: false
                    });
                    this.initTreeList();
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    componentDidMount() {
        this.initTreeList();
    }
}
export default Branch;
