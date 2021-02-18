import React, {Component} from 'react';
import {Button, Table, Space, Pagination, Modal, Input, message} from 'antd';
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './customerGroups.scss';
const {Column} = Table;
const {TextArea} = Input;
const {confirm} = Modal;
class CustomerGroups extends Component{
    constructor(props){
        super(props);
        this.addBtn = "";  this.changeBtn = "";  this.deleteBtn = "";
        this.state = {
            dataSource: [],
            currentPage: 1  , pageSize: 10,   pageTotle: 0,
            msg: '',
            flag: 1,
            visible: false,
            name: '',
            info: '',
            id: ''
        }
    }
    render() {
        return(
            <div id="customerGroups">
                <div className="customerGroups">
                    <div className="bg">
                        <button className="searchs" onClick={this.add.bind(this)}
                            style={this.addBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                        >新增</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize + index+1}</span>
                            )}/>
                            <Column title="分组名称" dataIndex="groupName" key="groupName" align="center"/>
                            <Column title="分组介绍" dataIndex="intro" key="intro" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records"
                                render={(text, record) => (
                                    <Space size="large">
                                        <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes"
                                              style={this.changeBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >编辑</span>
                                        <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes"
                                              style={this.deleteBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >删除</span>
                                        <span key={"details"} onClick={this.details.bind(this, record)} className="details span11">详情</span>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotle} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotle} showSizeChanger={false}/>
                    </div>
                    <Modal title={this.state.msg} width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li3 li1">
                                        <span className="span1">*名称</span>
                                        <Input allowClear onChange={(e)=>{this.setState({name: e.target.value})}} value={this.state.name} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1 li3">
                                        <span className="span1">*介绍</span>
                                        <TextArea rows={4} onChange={(e)=>{this.setState({info: e.target.value})}} value={this.state.info} className={"input3"}
                                                  disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="div4">
                            <li className="li4">
                                <Button className="btn4" type="danger" onClick={()=>{this.setState({visible: false})}}>取消</Button>
                            </li>
                            <li className="li4" style={this.state.flag==3?{display: "none"}:{display: 'block'}}>
                                <Button className="btn4" type="primary" onClick={this.handleOk.bind(this)}>确定</Button>
                            </li>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
    componentWillMount() {
        let buttonList = JSON.parse(sessionStorage.getItem("buttonList"));
        // console.log(buttonList);
        if(buttonList && buttonList.length) {
            buttonList.forEach((item)=>{
                if(item.localIndex == "2-6-1") {
                    this.addBtn = item.flag;
                }
                if(item.localIndex == "2-6-2") {
                    this.changeBtn = item.flag;
                }
                if(item.localIndex == "2-6-3") {
                    this.deleteBtn = item.flag;
                }
            })
        }
    }

    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize
        };
        Axios.post('/self/erp/baseinfo/queryClientGroup', params).then((res)=>{
            if(res.data.success) {
                res.data.data.clientGroups.forEach((item)=>{
                    item.key = item.id;
                });
                this.setState({
                    dataSource: res.data.data.clientGroups
                })
            }else{
                this.setState({
                    dataSource: []
                })
            }
        })
    }
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    add() {
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            name: '',  info: ''
        })
    }
    changes(row) {
        this.setState({
            visible: true,
            flag: 0,
            msg: '修改',
            name: row.groupName,  info: row.intro,
            id: row.id
        })
    }
    details(row) {
        this.setState({
            visible: true,
            flag: 3,
            msg: '详情',
            name: row.groupName,  info: row.intro,
            id: row.id
        })
    }
    deletes(row) {
        let that = this;
        confirm({
            title: '你确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                let params = {
                    id: row.id
                };
                Axios.post('/self/erp/baseinfo/deleteClientGroup', params).then((res)=>{
                    if(res.data.success) {
                        message.success("删除成功");
                        that.initData(that.state.currentPage);
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        });
    }
    handleOk() {
        let params = {
            groupName: this.state.name,
            intro: this.state.info
        };
        if(this.state.flag == 1) {  // 新增
            Axios.post('/self/erp/baseinfo/addClientGroup', params).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.initData(this.state.currentPage);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{
            params.id = this.state.id;
            Axios.post('/self/erp/baseinfo/updateClientGroup', params).then((res)=>{
                if(res.data.success) {
                    message.success("修改成功");
                    this.initData(this.state.currentPage);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default CustomerGroups;