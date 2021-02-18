import React, {Component} from 'react';
import { Table, Button, Space, Input, Modal, message, Pagination, Select, Tree} from 'antd';
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './provider.scss'
const {Column} =  Table;  const { confirm } = Modal;
const {Option} = Select;
class Provider extends Component{
    constructor(props) {
        super(props);
        this.addBtn = "";  this.changeBtn = "";  this.deleteBtn = "";
        this.currentFlag= undefined;
        this.state = {
            currentIndex: 0,
            treeList: [{name: '代办', key: 1}, {name: '冷库', key: 2}, {name: '果园', key: 3}],
            providerStr: '',
            dataSource: [],
            pageTotle: 0,  currentPage: 1, pageSize: 10,
            msg: '',
            visible: false,
            names: '',
            phones: '',
            addreSs: '',
            yeCode: '',    yeCodeList: [],
            flag: 1,
            id: '',
            registrationOrchardList: [],   registrationOrchard: '',
            batchNumberId: '',    batchNumberIdList: [],
            states: "",   seachName: '',
            expandedKeys: [],
            treeData: [],
            parentId: '',
            defaultSelectedKeys: [],

            //////////////////
            providerCode: null,  providerName: null,   providerPhone: null,  providerNumber: null,     providerNumberList: [],
            providerOrchard: null,   providerOrchardList: [],   providerManage: null,   providerTaxRate: null,


            supplierCode: null,

            ///
            msg2: '', visible2: ''
        }
    }
    render() {
        return(
            <div id="provider">
                <div className="provider">
                    <div className="dictionaryLeft">
                        <div className="innerDiv">
                            <div className="dictType" onClick={this.addGroup.bind(this)}>供应商类型</div>
                            <ul className="ul1">
                                <Tree className="draggable-tree" defaultExpandedKeys={this.state.expandedKeys} blockNode
                                      treeData={this.state.treeData} onSelect={this.selected.bind(this)} showLine
                                      defaultSelectedKeys={this.state.defaultSelectedKeys}/>
                            </ul>
                        </div>
                    </div>
                    <div className="dictionaryRight">
                        <div className="innerRight">
                            <div className="placeSearch">
                                <span>名称</span>
                                <Input className="input1" allowClear onChange={(e)=>{this.setState({seachName: e.target.value})}} value={this.state.seachName}/>
                                <span className="span4">状态</span>
                                <Input className="input1" allowClear onChange={(e)=>{this.setState({states: e.target.value})}} value={this.state.states}/>
                                <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                            </div>
                            <div className="bg">
                                <button className="searchs" onClick={this.add.bind(this)}
                                    style={this.addBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}
                                >新增</button>
                            </div>
                            <div className="placeTable">
                                <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                                    <Column title="序号" align="center" width="100px" render={(text, record, index)=>(
                                        <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                                    )}/>
                                    <Column title="供应商编码" dataIndex="supplierCode" key="supplierCode" align="center"/>
                                    <Column title="名称" dataIndex="supplierName" key="supplierName" align="center"/>
                                    <Column title="联系方式" dataIndex="phone" key="phone" align="center"/>
                                    {/*<Column title="业务员" dataIndex="realname" key="realname" align="center"/>*/}
                                    <Column title="状态" dataIndex="isValid" key="isValid" align="center" render={(text, record)=>(
                                        <>
                                            <span>{text ==1?"在用":"停用"}</span>
                                        </>
                                    )}/>
                                    <Column title="操作" align="center"
                                        render={(text, record) => (
                                            <Space size="large">
                                                {/*<span onClick={this.changes.bind(this, record)} className="changes"*/}
                                                {/*      style={this.changeBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}*/}
                                                {/*>编辑</span>*/}
                                                {/*<span onClick={this.deletes.bind(this, record)} className="deletes"*/}
                                                {/*      style={this.deleteBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}*/}
                                                {/*>删除</span>*/}
                                                {/*<span onClick={this.details.bind(this, record)} className="details span11">查看</span>*/}
                                                {/*<span onClick={this.details.bind(this, record)} className="details span11">启用</span>*/}
                                                {/*<span onClick={this.details.bind(this, record)} className="details span11">禁用</span>*/}
                                            </Space>
                                        )}
                                    />
                                </Table>
                            </div>
                            <div className="placePagination">
                                <Pagination showTotal={()=>`共 ${this.state.pageTotle} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotle} showSizeChanger={false}/>
                            </div>
                        </div>
                    </div>
                    <Modal title={this.state.msg} width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*编码</span>
                                        <Input allowClear value={this.state.providerCode} onChange={(e)=>{this.setState({providerCode: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*名称</span>
                                        <Input allowClear value={this.state.providerName} onChange={(e)=>{this.setState({providerName: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*手机号</span>
                                        <Input allowClear value={this.state.providerPhone} onChange={(e)=>{this.setState({providerPhone: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*注册批次号</span>
                                        <Select  className={"input3"} allowClear onChange={(e)=>{this.setState({providerNumber: e})}} value={this.state.providerNumber}
                                                 disabled={this.state.flag==3?true:false}>
                                            {
                                                this.state.providerNumberList.map((item, index)=>{
                                                    return(
                                                        <Option value={item.id} key={index}>{item.batchNumber}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*果园注册号</span>
                                        <Select  className={"input3"} allowClear onChange={(e)=>{this.setState({providerOrchard: e})}} value={this.state.providerOrchard}
                                                 disabled={this.state.flag==3?true:false}>
                                            {
                                                this.state.providerOrchardList.map((item, index)=>{
                                                    return(
                                                        <Option value={item.id} key={index}>{item.registrationCode}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*经营编号</span>
                                        <Input allowClear value={this.state.providerManage} onChange={(e)=>{this.setState({providerManage: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*全名</span>
                                        <Input disabled allowClear value={this.state.providerManage1} onChange={(e)=>{this.setState({providerManage1: e.target.value})}} className={"input3"}
                                               />
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*税率</span>
                                        <Input allowClear value={this.state.providerTaxRate} onChange={(e)=>{this.setState({providerTaxRate: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>%
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
                                        <span className="span1">*编码</span>
                                        <Input allowClear value={this.state.providerCode} onChange={(e)=>{this.setState({providerCode: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*名称</span>
                                        <Input allowClear value={this.state.providerName} onChange={(e)=>{this.setState({providerName: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*税率</span>
                                        <Input allowClear value={this.state.providerTaxRate} onChange={(e)=>{this.setState({providerTaxRate: e.target.value})}} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>%
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
        )
    }
    initTree() {
        Axios.post("/self/erp/baseinfo/querySupplierGroup", {}).then((res)=>{
            // console.log(res.data);
            if(res.data.success) { // supplierName   id
                res.data.data.supplierGroups.forEach((item)=>{
                    item.title = item.supplierName;
                    item.key = item.id;
                })
                let defaultSelectedKeys= [];
                defaultSelectedKeys.push(''+res.data.data.supplierGroups[0].id);
                this.setState({
                    defaultSelectedKeys ,  //   高亮tree第一个数据
                    parentId: res.data.data.supplierGroups[0].id,
                    supplierCode: res.data.data.supplierGroups[0].supplierCode
                })
                setTimeout(()=>{
                    this.setState({
                        treeData: res.data.data.supplierGroups
                    })
                    this.initData(this.state.currentPage, res.data.data.supplierGroups[0].id);
                }, 30);
            }else{
                this.setState({
                    treeData: []
                })
            }
        })
    }
    initData(currentPage, ifNulls) {
        this.currentFlag = ifNulls == undefined ? 1: ifNulls;
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            // id: ifNulls == undefined ? 1 : ifNulls,
            id: ifNulls,
            supplierName: this.state.providerStr
        };
        Axios.post('/self/erp/baseinfo/querySupplierByParentId', params).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                res.data.data.suppliers.forEach((item)=>{
                    item.key = item.id;
                });
                this.setState({
                    pageTotle: res.data.data.num,
                    dataSource: res.data.data.suppliers
                })
            }else{
                this.setState({
                    pageTotle: 0,
                    dataSource: []
                })
            }
        })
    }

    // 业务员工号下拉框
    yeCodeListMethod() {
        // Axios.post('/self/erp/baseinfo/queryUser').then((res)=>{
        //     // console.log(res.data);
        //     if(res.data.success) {
        //         this.setState({
        //             yeCodeList: res.data.data.users
        //         })
        //     }else{
        //         this.setState({
        //             yeCodeList: []
        //         })
        //     }
        // });
        // 果园注册号下拉框
        Axios.post("/self/erp/qualityCheck/queryOrchard").then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                this.setState({
                    providerOrchardList: res.data.data.orchards
                })
            }else{
                this.setState({
                    providerOrchardList: []
                })
            }
        });
        // 批次号下拉框
        Axios.post('/self/erp/qualityCheck/queryBatchNumber', {}).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                this.setState({
                    providerNumberList: res.data.data.batchNumbers
                })
            }else{
                this.setState({
                    providerNumberList: []
                })
            }
        })
    }

    /**
     * 点击tree触发的方法
     * @param array
     */
    selected(selectedKeys, e) {
        this.initData(this.state.currentPage, e.selectedNodes[0].id);
        this.setState({
            parentCode: e.selectedNodes[0].materialCode,
            parentId: e.selectedNodes[0].id,
            supplierCode: e.selectedNodes[0].supplierCode
        })
    }

    searchMethods() {
        this.initData(1, this.state.parentId);
        this.setState({
            currentPage: 1
        })
    }
    add() {
        this.setState({
            msg: '新增',
            visible: true,
            flag: 1,
            providerCode: this.state.supplierCode+".",  providerName: null,   providerPhone: null,  providerNumber: null,
            providerOrchard: null, providerManage: null,   providerTaxRate: null
        })
    }

    /**
     * 新增组
     * @param row
     */
    addGroup() {
        this.setState({
            msg2: '新增组',
            visible2: true,
            providerName: null,
            providerTaxRate: null,
            providerCode: null
        })
    }
    changes(row) {
        console.log(row);
        this.setState({
            msg: '修改',
            visible: true,
            flag: 2,
            id: row.id,
            phones: row.phone,
            names: row.supplierName,
            addreSs: row.address,
            yeCode: row.empno,
            registrationOrchard: row.registrationCode  ,   batchNumberId: row.batchNumberId
        })
    }
    details(row) {
        this.setState({
            msg: '详情',
            visible: true,
            flag: 3,
            id: row.id,
            phones: row.phone,
            names: row.supplierName,
            addreSs: row.address,
            yeCode: row.empno
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
                Axios.post('/self/erp/baseinfo/deleteSupplier', params).then((res)=>{
                    if(res.data.success) {
                        message.success("删除成功");
                        that.initData(that.state.currentPage, that.state.parentId);
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        });
    }
    changePages(val) {
        this.initData(val, this.state.parentId);
        this.setState({
            currentPage: val
        })
    }
    handleOk() {
        let params = {
            supplierCode: this.state.providerCode,
            supplierName: this.state.providerName,
            phone: this.state.providerPhone,
            batchNumberId: this.state.providerNumber,
            orchardId: this.state.providerOrchard,
            businessNumber: this.state.providerManage,
            taxRate: this.state.providerTaxRate,
            type : 'item',
            id: this.state.parentId
        };
        if(this.state.flag == 1) {  // 新增
            Axios.post('/self/erp/baseinfo/addSupplier', params).then((res)=>{
                if(res.data.success) {
                    message.success("成功");
                    this.initData(this.state.currentPage, this.state.parentId);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{
            params.id = this.state.id;
            Axios.post('/self/erp/baseinfo/updateSupplier', params).then((res)=>{
                if(res.data.success) {
                    message.success("修改成功");
                    this.initData(this.state.currentPage, this.state.parentId);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }
    }
    handleOk2() {
        let params = {
            supplierName: this.state.providerName,
            taxRate: this.state.providerTaxRate,
            type: "group",
            id: 0,
            supplierCode: this.state.providerCode
        }
        Axios.post("/self/erp/baseinfo/addSupplier", params).then((res)=>{
            if(res.data.success) {
                message.success("新增成功");
                this.setState({
                    visible2: false
                })
                this.initTree();
            }else{
                message.warning(res.data.message);
            }
        })
    }
    componentDidMount() {
        this.yeCodeListMethod();
        this.initTree();
    }
    componentWillMount() {
        let buttonList = JSON.parse(sessionStorage.getItem("buttonList"));
        // console.log(buttonList);
        if(buttonList && buttonList.length) {
            buttonList.forEach((item)=>{
                if(item.localIndex == "2-1-1") {
                    this.addBtn = item.flag;
                }
                if(item.localIndex == "2-1-2") {
                    this.changeBtn = item.flag;
                }
                if(item.localIndex == "2-1-3") {
                    this.deleteBtn = item.flag;
                }
            })
        }
    }
}
export default Provider;
