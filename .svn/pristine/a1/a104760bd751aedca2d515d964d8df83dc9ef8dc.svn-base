import React, {Component} from 'react';
import {Table, Space, Pagination, Input, Modal, Button, message, Tree,Checkbox, Collapse } from 'antd';
import { ExclamationCircleOutlined ,CaretRightOutlined} from '@ant-design/icons';
import Axios from 'axios';
import './roleList.scss';
const {Column} = Table;
const { TextArea } = Input;  const { confirm } = Modal;   const { Panel } = Collapse;
class RoleList extends Component {
    constructor(props){
        super(props);
        this.buttonBtn = "";  this.menuBtn = "";  this.addBtn = "";  this.changeBtn = "";  this.deleteBtn = "";
        this.roleIds = "";
        this.state = {
            dataSource: [],
            pageTotle: 0,
            currentPage: 1,
            pageSize: 10,
            name: '',
            msg: '',
            visible: false,
            nameModal: '',
            flag: 0,
            id: '',
            info: '',
            visibleLimit: false,
            treeDataTree: [],  defaultCheckedKeys: [],
            treeSelectAll: [],  treeSelectHalf: [],
            btnLimit: false,
            treeKeyId: '',
            checkedList: [],
            childrenList: []
        }
    }
    render() {
        return(
            <div id={"roleList"}>
                <div className={"roleList"}>
                    <div className="placeSearch">
                        <span>角色名称</span>
                        <Input className="input1" allowClear onChange={(e)=>{this.setState({name: e.target.value})}}/>
                        <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                    </div>
                    <div className="bg">
                        <button className="searchs" onClick={this.add.bind(this)}
                                style={this.addBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                        >新增</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{index+1}</span>
                            )}/>
                            <Column title="角色名称" dataIndex="name" key="name" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records"
                                render={(text, record) => (
                                    <Space size="large">
                                        <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes"
                                              style={this.changeBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >编辑</span>
                                        <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes"
                                              style={this.deleteBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >删除</span>
                                        <span key={"rolelist"} onClick={this.jurisdic.bind(this, record)} className="jurisdiction"
                                              style={this.menuBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >菜单权限</span>
                                        <span key={"rolelist"} onClick={this.btnLimited.bind(this, record)} className="jurisdiction"
                                              style={this.buttonBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                        >按钮权限</span>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotle} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotle} showSizeChanger={false}/>
                    </div>
                    <Modal title={this.state.msg} footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className={"div3"}>
                                <span className={"span1"}>*角色名称</span>
                                <Input allowClear onChange={(e)=>{this.setState({nameModal: e.target.value})}} value={this.state.nameModal} className={"input3"}/>
                            </div>
                            <div className={"div3 div4"}>
                                <span className={"span1"}>角色介绍</span>
                                <TextArea allowClear onChange={(e)=>{this.setState({info: e.target.value})}} value={this.state.info} className={"input3"}/>
                            </div>
                        </div>
                        <div style={{textAlign: "center", paddingTop: '20px'}}>
                            <Button type="danger" style={{marginRight: '10%'}} onClick={()=>{this.setState({visible: false})}}>取消</Button>
                            <Button type="primary" style={{marginLeft: '10%'}} onClick={this.handleOk.bind(this)}>确定</Button>
                        </div>
                    </Modal>
                    {/*菜单权限*/}
                    <Modal title="权限配置" footer={null} getContainer={false} closable={false}  visible={this.state.visibleLimit} centered={true}>
                        <div className="modal2">
                            {
                                this.state.treeDataTree && this.state.treeDataTree.length ? (
                                    <div>
                                        <Tree
                                            checkable
                                            defaultCheckedKeys={this.state.defaultCheckedKeys}
                                            onCheck={this.onCheckTree.bind(this)}
                                            treeData={this.state.treeDataTree}
                                        />
                                    </div>
                                ):(
                                    <div></div>
                                )
                            }

                        </div>
                        <div style={{textAlign: "center", paddingTop: '20px'}}>
                            <Button type="danger" style={{marginRight: '10%'}} onClick={()=>{this.setState({visibleLimit: false,defaultCheckedKeys: [],
                                treeDataTree: []})}}>取消</Button>
                            <Button type="primary" style={{marginLeft: '10%'}} onClick={this.handleOkLimited.bind(this)}>确定</Button>
                        </div>
                    </Modal>
                    {/*按钮权限*/}
                    <Modal title="按钮权限配置" width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.btnLimit} centered={true}>
                        <div className="modal2">
                            <div className="modlaLeft">
                                <Collapse
                                    bordered={false}
                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                    className="site-collapse-custom-collapse"
                                >
                                    {
                                        this.state.childrenList.map((item, index)=>{
                                            return(
                                                <Panel header={item.name} key={index} className="site-collapse-custom-panel">
                                                    {
                                                        item.children.map((middleItem, middleIndex)=>{
                                                            return(
                                                                <Collapse bordered={false} expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                                                                    <Panel header={middleItem.name} key={middleIndex} className="site-collapse-custom-panel">
                                                                        <div className="placeChecked">
                                                                            {
                                                                                middleItem.menuButtons.map((innerItem, innerIndex)=>{
                                                                                    return(
                                                                                        <Checkbox key={innerIndex} onChange={(e)=>{
                                                                                            if(this.state.childrenList && this.state.childrenList.length) {
                                                                                                this.state.childrenList.forEach((itemOut)=>{
                                                                                                    if(itemOut.children && itemOut.children.length) {
                                                                                                        itemOut.children.forEach((itemMiddle)=>{
                                                                                                            if(itemMiddle.menuButtons && itemMiddle.menuButtons.length) {
                                                                                                                itemMiddle.menuButtons.forEach((itemInner)=>{
                                                                                                                    if(itemInner.buttonId == innerItem.buttonId) {
                                                                                                                        itemInner.flag = e.target.checked;
                                                                                                                        this.setState({
                                                                                                                            itemInner: {
                                                                                                                                flag: e.target.checked
                                                                                                                            }
                                                                                                                        })
                                                                                                                    }
                                                                                                                })
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        }} checked={innerItem.flag}> {innerItem.name} </Checkbox>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </Panel>
                                                                </Collapse>
                                                            )
                                                        })
                                                    }
                                                </Panel>
                                            )
                                        })
                                    }

                                </Collapse>
                            </div>
                        </div>
                        <div style={{textAlign: "center", paddingTop: '20px'}}>
                            <Button type="danger" style={{marginRight: '10%'}} onClick={()=>{this.setState({btnLimit: false})}}>取消</Button>
                            <Button type="primary" style={{marginLeft: '10%'}} onClick={this.handleBtnLimited.bind(this)}>确定</Button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }

    initData(currentPage) {
        let params = {
            pageSize: this.state.pageSize,
            currentPage
        };
        Axios.post('/self/erp/role/queryRoles', params).then((res)=>{
            if(res.data.success) {
                res.data.data.roleList.forEach((item)=>{
                    item.key = item.id;
                });
                this.setState({
                    dataSource: res.data.data.roleList,
                    pageTotle: res.data.data.roleList.length
                })
            }else{
                this.setState({
                    dataSource: []
                })
            }
        })
    }
    searchMethods() {
        this.initData(1);
        this.setState({
            currentPage: 1
        })
    }
    add() {
        this.setState({
            visible: true,
            msg: '新增',
            nameModal: '',  info: '',
            flag: 1
        })
    }
    changes(row) {
        this.setState({
            visible: true,
            msg: '修改',
            nameModal: row.name,
            info: row.intro,
            flag: 0,
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
                    roleId: row.id
                };
                Axios.post('/self/erp/role/deleteRole', params).then((res)=>{
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
    jurisdic(row) {
        this.setState({
            visibleLimit: true,
            roleID: row.id
        });
        this.initSelectTree(row.id);
    }
    btnLimited(row) {  // 按钮权限
        this.setState({
            btnLimit: true
        });
        this.btnList(row.id);
        this.roleIds = row.id;
    }
    // 按钮权限的数据
    btnList(roleId) {
        this.setState({
            childrenList: []
        });
        Axios.post('/self/erp/authority/queryRoleMenu', {roleId}).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                if(res.data.data.menuList && res.data.data.menuList.length) {
                    res.data.data.menuList.forEach((item)=>{
                        if(item.children && item.children.length) {
                            item.children.forEach((middleItem)=>{
                                if(middleItem.menuButtons && middleItem.menuButtons.length) {
                                    middleItem.menuButtons.forEach((innerItem)=>{
                                        innerItem.name = innerItem.buttonName;
                                        innerItem.flag = innerItem.flag == 1? true : false;
                                    })
                                }
                            })
                        }
                    })
                };
                console.log(res.data.data.menuList);
                this.setState({
                    childrenList: res.data.data.menuList
                })
            }else{
                this.setState({
                    childrenList: []
                })
            }
        })
    }
    handleBtnLimited() { // 按钮权限配置
        let roleId = [];
        if(this.state.childrenList && this.state.childrenList.length) {
            this.state.childrenList.forEach((outItem)=>{
                if(outItem.children && outItem.children.length) {
                    outItem.children.forEach((middleItem)=>{
                        if(middleItem.menuButtons && middleItem.menuButtons.length) {
                            middleItem.menuButtons.forEach((innerItem)=>{
                                if(innerItem.flag) {
                                    roleId.push(innerItem.buttonId);
                                }
                            })
                        }
                    })
                }
            })
        }
        let params= {
            roleId: this.roleIds,
            buttonIds: roleId
        };
        Axios.post('/self/erp/authority/updateRoleButtonAuthority', params).then((res)=>{
            if(res.data.success) {
                message.success("成功");
                this.setState({
                    btnLimit: false
                })
            }else{
                message.warning(res.data.message);
            }
        })
    }
    // tree的点击设置

    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    handleOk() {
        if(!this.state.nameModal) {
            message.warning("数据填写不完整");
            return false;
        }
        let params = {
            name: this.state.nameModal,
            intro: this.state.info
        };
        if(this.state.flag == 1) {   // 新增
            Axios.post('/self/erp/role/addRole', params).then((res)=>{
                if(res.data.success) {
                    message.success("添加成功");
                    this.initData(this.state.currentPage);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{  // 修改
            params.id = this.state.id;
            Axios.post('/self/erp/role/updateRole', params).then((res)=>{
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
    initTree() {
        this.setState({
            treeDataTree: []
        });
        Axios.post('/self/erp/authority/queryMenu').then((res)=>{
            if(res.data.success) {
            	let array = res.data.data.menuList;
            	if(array && array.length) {
					array.forEach((item)=>{
						if(item.children && item.children.length) {
							item.title = item.name;
							item.key = item.id;
							if(item.children && item.children.length) {
								item.children.forEach((innerItem)=>{
									innerItem.title = innerItem.name;
									innerItem.key = innerItem.id;
								})
							}
						}else{
							item.title = item.name;
							item.key = item.id;
						}
					})
				}
            	this.setState({
                    treeDataTree: array
                })
            }else{
                this.setState({
                    treeDataTree: []
                })
            }
        })
    }
    initSelectTree(roleId) {
        let params = {
            roleId
        };
        Axios.post('/self/erp/authority/queryRoleMenuAuthority', params).then((res)=>{
            if(res.data.success) {
                let defaultCheckedKeys = [];
                if(res.data.data.roleMenuAuthorityList && res.data.data.roleMenuAuthorityList.length) {
                    res.data.data.roleMenuAuthorityList.forEach((item)=>{
                        defaultCheckedKeys.push(Number(item.id));
                    })
                }
                this.setState({
                    defaultCheckedKeys
                })
                this.initTree();
            }else{
                this.setState({
                    defaultCheckedKeys: []
                })
            }
        });
    }
    handleOkLimited() {
        if(this.state.treeSelectAll.length == 0) {
            message.warning("您没有修改权限树");
            return false
        }
        let params = {
            roleId: this.state.roleID,
            allCheck: this.state.treeSelectAll,
            halfCheck: this.state.treeSelectHalf,
        };
        Axios.post('/self/erp/authority/addRoleMenuAuthority', params).then(res=>{
            if(res.data.success) {
                message.success("成功");
                this.setState({
                    visibleLimit: false,
                    defaultCheckedKeys: [],
                    treeDataTree: []
                })
            }else{
                message.warning(res.data.message);
            }
        })
    }
    onCheckTree(checkedKeys, info) {
        this.setState({
            treeSelectAll: checkedKeys,
            treeSelectHalf: info.halfCheckedKeys
        })
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }

    componentWillMount() {
        let buttonList = JSON.parse(sessionStorage.getItem("buttonList"));
        console.log(buttonList);
        if(buttonList && buttonList.length) {
            buttonList.forEach((item)=>{
                if(item.localIndex == "8-5-1") {
                    this.addBtn = item.flag;
                }
                if(item.localIndex == "8-5-2") {
                    this.changeBtn = item.flag;
                }
                if(item.localIndex == "8-5-3") {
                    this.deleteBtn = item.flag;
                }
                if(item.localIndex == "8-5-4") {
                    this.menuBtn = item.flag;
                }
                if(item.localIndex == "8-5-5") {
                    this.buttonBtn = item.flag;
                }
            })
        }
    }
}
export default RoleList;
