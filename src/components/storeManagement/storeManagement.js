import React, {Component} from 'react';
import { Tree, Input, Select, Checkbox, Button, message,Modal,Table, Pagination, Space } from 'antd';
import Axios from 'axios';
import {DownOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import './storeManagement.scss';
const {Option} = Select;
const {confirm} = Modal;
const {Column} = Table;
class StoreManagement extends Component{
    constructor(props) {
        super(props);
        this.group = ""
        this.state = {
            currentIndex: 0,
            treeData: [],
            storeCode: '',
            stroeName: '',
            personId: '', personIdList: [],
            phone: '',
            checkedValue: true,
            treeNodes: '',
            parentInfo: {},
            msg: '', visibleChecked: false, flag: 1,
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,
            dataSource: [],
            warehouseCode: '',
            id: ''
        }
    }
    render() {
        return(
            <div id="storeManagement">
                <div className="storeManagement">
                    <div className="dictionaryLeft">
                        <div className="innerDiv">
                            <div className="dictType" onClick={this.warehouseClick.bind(this)}>仓库列表</div>
                            <Tree showLine defaultExpandedKeys={[]} onSelect={this.onSelect.bind(this)} treeData={this.state.treeData}/>
                        </div>
                    </div>
                    <div className="dictionaryRight">
                        <div className="innerRight">
                            <div className="bg">
                                <button className="searchs" onClick={this.addGroup.bind(this)}>新增库区</button>
                                <button className="searchs" onClick={this.add.bind(this)}>新增仓库</button>
                            </div>
                            <div className="placeTable">
                                <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                                    <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                        <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                                    )}/>
                                    <Column title="仓库" dataIndex="name" key="name" align="center"/>
                                    <Column title="编码" dataIndex="code" key="code" align="center"/>
                                    {/*<Column title="是否在用" dataIndex="isUsing" key="isUsing" align="center" render={(text)=>(*/}
                                    {/*    <span>{text==1?"在用":"停用"}</span>*/}
                                    {/*)}/>*/}
                                    <Column title="操作" align="center" key="records" dataIndex="records" width="240px"
                                        render={(text, record) => (
                                            <Space size="large">
                                                <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes">编辑</span>
                                                <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes">删除</span>
                                                {/*<span key={"details"} onClick={this.details.bind(this, record)} className="details span11">详情</span>*/}
                                            </Space>
                                        )}
                                    />
                                </Table>
                            </div>
                            <div className="placePagination">
                                <Pagination showTotal={()=>`共 ${this.state.pageTotal} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotal} showSizeChanger={false}/>
                            </div>
                        </div>
                    </div>
                    <Modal title={this.state.msg} width="50%" footer={null} getContainer={false} closable={false}  visible={this.state.visibleChecked} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*仓库名</span>
                                        <Input className="input1 input3" allowClear value={this.state.stroeName} onChange={(e)=>{this.setState({stroeName: e.target.value})}}/>
                                    </li>
                                    <li className="li1">
                                        <span className="span1">仓库编码</span>
                                        <Input className="input3" value={this.state.warehouseCode} onChange={(e)=>{
                                            this.setState({
                                                warehouseCode: e.target.value
                                            })
                                        }}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">负责人</span>
                                        <Select className="input1 input3" allowClear onChange={(e)=>{
                                            this.setState({personId: e});
                                            if(e == undefined) {
                                                this.setState({phone: ''})
                                            }else{
                                                this.setState({phone: e.split(",")[1]})
                                            }
                                        }} value={this.state.personId}>
                                            {
                                                this.state.personIdList.map((item, index)=>{
                                                    return(
                                                        <Option value={item.value} key={index}>{item.label}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </li>
                                    <li className="li1">
                                        <span className="span1">联系方式</span>
                                        <Input className="input3" disabled value={this.state.phone}/>
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
    storeTreeList() {
        Axios.post('/self/erp/baseinfo/queryWarehouseGroup').then((res)=>{
            if(res.data.success) {
                this.again(res.data.data.warehouseGroups);
            }else{
                this.setState({
                    treeData: []
                })
            }
        })
    }
    again(array) {
        array.forEach((item)=>{
            item.title = item.fullName;
            item.key = item.id;
            if(item.children != undefined) {
                this.again(item.children);
            }
        })
        this.setState({
            treeData: array
        })
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            id: this.group.id
        }
        Axios.post('/self/erp/baseinfo/queryWarehouseByParentId', params).then((res)=> {
            // console.log(res.data);
            if (res.data.success) {
                res.data.data.warehouses.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.warehouses,
                    pageTotal: res.data.data.num
                })
            } else {
                this.setState({
                    dataSource: [],
                    pageTotal: 0
                })
            }
        })
    }
    warehouseClick() {
        this.setState({
            visibleChecked: true,
            msg: '新增组',
            flag: 4,
            warehouseCode: ""
        });
        this.cancle();
    }
    onSelect(selectedKeys, info) {

        this.group= info.selectedNodes[0]

        this.initData(this.state.currentPage);
    }
    changes(row) {
        if(this.group == undefined || this.group == "") {
            message.warning("请选择仓库列表再操作");
            return false;
        };
        this.setState({
            visibleChecked: true,
            msg: '修改',
            flag: 2,
            warehouseCode: row.code,
            stroeName: row.name,
            personId: row.keeperEmpno+","+row.keeperPhone,
            phone: row.keeperPhone,
            id: row.id
        });
    }
    personList() { // 负责人下拉框列表
        Axios.post('/self/erp/baseinfo/queryUser').then((res)=>{
            if(res.data.success) {
                let personIdList = [];
                if(res.data.data.users && res.data.data.users.length) {
                    res.data.data.users.forEach((item)=>{
                        personIdList.push({label: item.realname, value: item.empno+','+item.phone});
                    })
                }
                this.setState({
                    personIdList
                })
            }else{
                this.setState({
                    personIdList: []
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
        if(this.group == undefined || this.group == "") {
            message.warning("请选择仓库列表再操作");
            return false;
        };
        this.setState({
            visibleChecked: true,
            msg: '新增',
            flag: 1,
            warehouseCode: this.group.code + ".",
        });
        this.cancle();
    }
    addGroup() {
        if(this.group == undefined || this.group == "") {
            message.warning("请选择仓库列表再操作");
            return false;
        };
        this.setState({
            visibleChecked: true,
            msg: '新增组',
            flag: 3,
            warehouseCode: this.group.code + ".",
        });
        this.cancle();
    }
    checkedPass() {
        let paramms = {
            name: this.state.stroeName,
            keeperEmpno: this.state.personId.indexOf(",")!=-1?this.state.personId.split(",")[0]:"",
            checkedValue: this.state.checkedValue ? '1' : '0',
            code: this.state.warehouseCode
        };
        if(this.state.flag == 1) {
            paramms.type= 'item';
            paramms.id = this.group.id;
            Axios.post('/self/erp/baseinfo/addWarehouse', paramms).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.setState({
                        visibleChecked: false,
                    })
                    this.initData(this.state.currentPage);
                }else{
                    message.warning(res.data.message);
                }
            })
        }else if(this.state.flag == 2) {  // 修改
            paramms.id = this.state.id;
            paramms.parentId = this.group.id;
            Axios.post('/self/erp/baseinfo/updateWarehouse', paramms).then((res)=>{
                if(res.data.success) {
                    message.success("修改成功");
                    this.setState({
                        visibleChecked: false
                    })
                    this.initData(this.state.currentPage);
                }else{
                    message.warning(res.data.message);
                }
            })
        }else if(this.state.flag == 3) {   // 组
            paramms.type = "group";
            paramms.id = this.group.id;
            Axios.post('/self/erp/baseinfo/addWarehouse', paramms).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.storeTreeList();
                    this.initData(this.state.currentPage)
                    this.setState({
                        visibleChecked: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }else if(this.state.flag == 4) {
            paramms.type = "group";
            paramms.id = 0;
            Axios.post('/self/erp/baseinfo/addWarehouse', paramms).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.storeTreeList();
                    this.initData(this.state.currentPage)
                    this.setState({
                        visibleChecked: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    cancle() {
        this.setState({
            storeCode: '',
            stroeName: '',
            personId: '',
            phone: '',
            checkedValue: false
        })
    }
    handleOk() {  // 修改
        this.setState({
            visibleChecked: true,
            msg: '修改',
            flag: 0
        })
    }
    deletes(row) {
        let that = this;
        confirm({
            title: '你确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                Axios.post('/self/erp/baseinfo/deleteWarehouse', {id: row.id}).then((res)=>{
                    if(res.data.success) {
                        message.success("删除成功");
                        that.initData(that.state.currentPage);
                        that.setState({
                            visible: false
                        })
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        })
    }
    componentDidMount() {
        this.storeTreeList();
        this.personList();
    }
}
export default StoreManagement;