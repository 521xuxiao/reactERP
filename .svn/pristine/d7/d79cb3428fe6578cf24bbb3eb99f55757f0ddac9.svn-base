import React, {Component} from 'react';
import {Input, Table, Space, Pagination, Modal, Select, Button, InputNumber, message, Tree} from 'antd';
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './client.scss';
const {Column} = Table;
const {Option} = Select;
const {confirm} = Modal;
class Client extends Component{
    constructor(props) {
        super(props);
        this.addBtn = "";   this.changeBtn = "";  this.deleteBtn = "";
        this.treeId= '';
        this.state = {
            treeList: [],
            currentIndex: 0,
            clientName: '',
            currentPage: 1,
            pageSize: 10,
            pageTotle: 0,
            dataSource: [],
            msg: '',    visible: false,
            clientType: '',    clientTypeList: [{label: '大客户', value: '1'}, {label: '批发商', value: '2'}, {label: '小商户', value: '3'}],   // 客户类型
            clientMonet: '',    clientMonetList: [{label: '现金', value: '1'}, {label: '转账', value: '2'}],    // 支付类型

            clientAddress: '',  // 客户住址
            id: '',
            expandedKeys: [],
            treeData: [],
            parentId: '',  parentCode: null,
            //////
            clientCode: null,   clientname: null,   clientPhone: null,     saleCode: null,
            saleModel: null,    saleModelList: [{label: '内销', value: "内销"}, {label: '外销', value: "外销"}],
            msg2: '',    visible2: false,    flag2: null
        }
    }
    render() {
        return(
            <div id="client">
                <div className="client">
                    <div className="dictionaryLeft">
                        <div className="innerDiv">
                            <div className="dictType" onClick={this.addTree.bind(this)}>客户分组</div>
                            <ul className="ul1">
                                <Tree className="draggable-tree" defaultExpandedKeys={this.state.expandedKeys} blockNode
                                      treeData={this.state.treeData} onSelect={this.selected.bind(this)} showLine/>
                            </ul>
                        </div>
                    </div>
                    <div className="dictionaryRight">
                        <div className="innerRight">
                            <div className="placeSearch">
                                <span>客户名称</span>
                                <Input className="input1" allowClear onChange={(e)=>{this.setState({clientName: e.target.value})}}/>
                                <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                            </div>
                            <div className="bg">
                                <button className="searchs" onClick={this.addGroup.bind(this)}
                                        style={this.addBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                >新增组</button>
                                <button className="searchs" onClick={this.add.bind(this)}
                                    style={this.addBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                >新增客户</button>
                            </div>
                            <div className="placeTable">
                                <Table pagination={false} dataSource={this.state.dataSource}>
                                    <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                        <span>{(this.state.currentPage-1)*this.state.pageSize + index+1}</span>
                                    )}/>
                                    <Column title="客户编码" dataIndex="clientCode" key="clientCode" align="center"/>
                                    <Column title="客户名称" dataIndex="clientName" key="clientName" align="center"/>
                                    <Column title="状态" dataIndex="isValid" key="isValid" align="center" render={(text)=>(
                                        <span>{text==1?"在用":"停用"}</span>
                                    )}/>
                                    <Column title="联系方式" dataIndex="phone" key="phone" align="center"/>
                                    <Column title="销售模式" dataIndex="salesModel" key="salesModel" align="center"/>
                                    <Column title="工号" dataIndex="modifiedUser" key="modifiedUser" align="center"/>
                                    <Column title="操作" align="center" key="records" dataIndex="records"
                                        render={(text, record) => (
                                            <Space size="large">
                                                {/*<span key={"changes"} onClick={this.changes.bind(this, record)} className="changes"*/}
                                                {/*      style={this.changeBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}*/}
                                                {/*>编辑</span>*/}
                                                <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes"
                                                      style={this.deleteBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                                >删除</span>
                                                {/*<span key={"details"} onClick={this.details.bind(this, record)} className="details span11">详情</span>*/}
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
                                            <li className="li1">
                                                <span className="span1">*客户编码</span>
                                                <Input allowClear onChange={(e)=>{this.setState({clientCode: e.target.value})}} value={this.state.clientCode} className={"input3"}
                                                       disabled={this.state.flag==3?true:false}/>
                                            </li>
                                            <li className="li1 li2">
                                                <span className="span1">*客户名称</span>
                                                <Input allowClear onChange={(e)=>{this.setState({clientname: e.target.value})}} value={this.state.clientname} className={"input3"}
                                                       disabled={this.state.flag==3?true:false}/>
                                            </li>
                                        </ul>
                                        <ul className="ul1">
                                            <li className="li1">
                                                <span className="span1">*联系方式</span>
                                                <InputNumber allowClear onChange={(e)=>{this.setState({clientPhone: e})}} value={this.state.clientPhone} className={"input3"}
                                                             disabled={this.state.flag==3?true:false}/>
                                            </li>
                                            <li className="li1 li2">
                                                <span className="span1">*经营编号</span>
                                                <Input allowClear onChange={(e)=>{this.setState({saleCode: e.target.value})}} value={this.state.saleCode} className={"input3"}
                                                       disabled={this.state.flag==3?true:false}/>
                                            </li>
                                        </ul>
                                        <ul className="ul1">
                                            <li className="li1">
                                                <span className="span1">*销售模式</span>
                                                <Select  className={"input3"} allowClear onChange={(e)=>{this.setState({saleModel: e})}} value={this.state.saleModel}
                                                         disabled={this.state.flag==3?true:false}>
                                                    {
                                                        this.state.saleModelList.map((item, index)=>{
                                                            return(
                                                                <Option value={item.value} key={index}>{item.label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="div4">
                                    <li className="li4">
                                        <Button className="btn4" type="danger" onClick={()=>{this.setState({visible: false})}}>取消</Button>
                                    </li>
                                    <li className="li4" style={this.state.flag==3?{display: 'none'}:{display: 'block'}}>
                                        <Button className="btn4" type="primary" onClick={this.handleOk.bind(this)}>确定</Button>
                                    </li>
                                </div>
                            </Modal>

                            <Modal title={this.state.msg2} width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible2} centered={true}>
                                <div className="modal1">
                                    <div className="div3">
                                        <ul className="ul1">
                                            <li className="li1">
                                                <span className="span1">*客户编码</span>
                                                <Input allowClear onChange={(e)=>{this.setState({clientCode: e.target.value})}} value={this.state.clientCode} className={"input3"}
                                                       disabled={this.state.flag==3?true:false}/>
                                            </li>
                                            <li className="li1 li2">
                                                <span className="span1">*客户名称</span>
                                                <Input allowClear onChange={(e)=>{this.setState({clientname: e.target.value})}} value={this.state.clientname} className={"input3"}
                                                       disabled={this.state.flag==3?true:false}/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="div4">
                                    <li className="li4">
                                        <Button className="btn4" type="danger" onClick={()=>{this.setState({visible2: false})}}>取消</Button>
                                    </li>
                                    <li className="li4" style={this.state.flag==3?{display: 'none'}:{display: 'block'}}>
                                        <Button className="btn4" type="primary" onClick={this.handleOk2.bind(this)}>确定</Button>
                                    </li>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount() {
        let buttonList = JSON.parse(sessionStorage.getItem("buttonList"));
        // console.log(buttonList);
        if(buttonList && buttonList.length) {
            buttonList.forEach((item)=>{
                if(item.localIndex == "2-7-1") {
                    this.addBtn = item.flag;
                }
                if(item.localIndex == "2-7-2") {
                    this.changeBtn = item.flag;
                }
                if(item.localIndex == "2-7-3") {
                    this.deleteBtn = item.flag;
                }
            })
        }
    }

    // 左面树的数据
    getTreeList() {
        Axios.post('/self/erp/baseinfo/queryClientGroup', {}).then((res)=>{
            if(res.data.success) {
                this.isAgain(res.data.data.clientGroups);
            }else{
                 this.setState({treeData: []});
            }
        })
    }

    /**
     * 递归处理tree结构
     */
    isAgain(clientList) {
        clientList.forEach((item)=>{
            item.title = item.clientName;
            item.key = item.id;
            if(item.children != undefined) {
                this.isAgain(item.children);
            }
        })
        this.setState({
            treeData: clientList
        })
    }

    /**
     * 点击tree触发的方法
     * @param array
     */
    selected(selectedKeys, e) {
        this.setState({
            parentId: e.node.id,
            parentCode: e.node.clientCode
        })
        setTimeout(()=>{
            this.initData(this.state.currentPage);
        }, 20);
    }

    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            clientGroupId: this.treeId,
            clientName: this.state.clientName,
            id: this.state.parentId
        };
        Axios.post('/self/erp/baseinfo/queryClientByParentId', params).then((res)=>{
            if(res.data.success) {
                res.data.data.clients.forEach((item)=>{
                    item.key = item.id;
                });
                this.setState({
                    dataSource: res.data.data.clients,
                    pageTotle: res.data.data.num
                });
            }else{
                this.setState({
                    dataSource: [],
                    pageTotle: 0
                });
            }
        })
    }
    searchMethods() {
        this.initData(1);
        this.setState({
            currentPage: 1
        })
    }
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    add() {
        if(this.state.parentCode == null) {
            message.warning("请先选择组");
            return false;
        }
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            clientCode : this.state.parentCode+".",
            clientname: null,
            clientPhone: null,
            saleCode: null,
            saleModel: null
        })
    }

    /**
     * 新增客户组
     * @param row
     */
    addGroup() {
        if(this.state.parentCode == null) {
            message.warning("请先选择组");
            return false;
        }
        this.setState({
            clientCode : this.state.parentCode+".",
            clientname: null,
            visible2: true,
            msg2: '新增客户组',
            flag2: 1
        })
    }

    /**
     * 新增根部组
     * @param row
     */
    addTree() {
         this.setState({
             clientCode : null,
             clientname: null,
             visible2: true,
             msg2: '新增客户组',
             flag2: 0
         })
    }

    changes(row) {
        this.setState({
            visible: true,
            flag: 0,
            msg: '修改',
            id: row.id,
            clientname: row.clientName,
            clientType: ''+row.clientType,
            clientMonet: ''+row.payType,
            clientPhone: row.clientPhone,
            clientAddress: row.address,
            clientCode: ''+row.empno
        })
    }
    details(row) {
        this.setState({
            visible: true,
            flag: 3,
            msg: '详情',
            id: row.id,
            clientname: row.clientName,
            clientType: ''+row.clientType,
            clientMonet: ''+row.payType,
            clientPhone: row.clientPhone,
            clientAddress: row.address,
            clientCode: ''+row.empno
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
                Axios.post('/self/erp/baseinfo/deleteClient', params).then((res)=>{
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
            clientName: this.state.clientname,
            clientCode: this.state.clientCode,
            phone: this.state.clientPhone,
            type: "item",
            businessNumber: this.state.saleCode,
            salesModel: this.state.saleModel,
            id: this.state.parentId
        };
        if(this.state.flag == 1) {
            Axios.post('/self/erp/baseinfo/addClient', params).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.setState({
                        visible: false
                    });
                    this.initData(this.state.currentPage);
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{
            params.id = this.state.id;
            Axios.post('/self/erp/baseinfo/updateClient', params).then((res)=>{
                if(res.data.success) {
                    message.success("修改成功");
                    this.setState({
                        visible: false
                    });
                    this.initData(this.state.currentPage);
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    handleOk2() {
        let params = {
            clientName: this.state.clientname,
            clientCode: this.state.clientCode,
            type: "group",
            id: this.state.parentId
        }
        if(this.state.flag2 == 0) {
            params.id = 0;
            Axios.post("/self/erp/baseinfo/addClient", params).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.setState({
                        visible2: false
                    });
                    this.getTreeList();
                }else{
                    message.warning(res.data.message);
                }
            })
        }else if(this.state.flag2 == 1) {
            Axios.post("/self/erp/baseinfo/addClient", params).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.setState({
                        visible2: false
                    });
                    this.getTreeList();
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    // 业务员工号下拉框
    clientCide() {
        Axios.post('self/erp/baseinfo/queryUser').then((res)=>{
            if(res.data.success) {
                this.setState({
                    clientCodeList: res.data.data.users
                })
            }else{
                this.setState({
                    clientCodeList: []
                })
            }
        })
    }
    componentDidMount() {
        this.getTreeList();
        this.clientCide();
    }
}
export default Client;