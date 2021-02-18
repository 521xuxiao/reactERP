import React, {Component} from "react"
import {Input, Select, Table, Space, Pagination, Modal, InputNumber, Button, DatePicker, Upload, message, Switch, TreeSelect} from 'antd';
import { ExclamationCircleOutlined ,UploadOutlined} from '@ant-design/icons';
import Axios from 'axios';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "./borrowLendReturn.scss"
const {Option} = Select;
const {Column} = Table;
const {TextArea} = Input;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
class BorrowLendReturn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            searchType: '',   searchTypeList: [],
            status: '',       statusList:[],
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,
            ////////////////////////////////////// 模态框  ////////////////////////////////////////////////////////
            msg: '',
            visible: false, flag: 1,
            salesTypeIdList: [],
            modalData: [],
            packagingLayoutList: [],
            supplierIdList: [],
            keeperEmpnoList: [], checkLeaderList: [], deliveryEmpnoList: [], materialGetterList: [],
            warehouseIdList: [],
            isIn: true,
            materialCodeList: []
        }
    }
    render() {
        return(
            <div className="borrowLendReturn">
                <div className="placeSearch">
                    <span className="span1">日期</span>
                    <RangePicker onChange={(e, time)=>{
                        if(time[0]) {
                            this.setState({
                                startTime: time[0],
                                endTime: time[1]
                            })
                        }else{
                            this.setState({
                                startTime: "",
                                endTime: ""
                            })
                        }
                    }} className="input1 inputDatePicker" placeholder="" locale={locale} showTime/>
                    <span className="span1 span2">类型</span>
                    <Select allowClear className="input1" onChange={(e)=>{this.setState({searchType: e})}}>
                        {
                            this.state.searchTypeList.map((item)=>{
                                return(
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>

                    <span className="span1 span2">状态</span>
                    <Select allowClear className="input1" onChange={(e)=>{this.setState({status: e})}}>
                        {
                            this.state.statusList.map((item)=>{
                                return(
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>
                    <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                </div>
                <div className="bg">
                    <button className="searchs" onClick={this.addOut.bind(this)}>新增借出</button>
                    <button className="searchs" onClick={this.addIn.bind(this)}>新增归还</button>
                    <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                </div>
                <div className="placeTable">
                    <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                        <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                            <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                        )}/>
                        <Column title="时间" dataIndex="date" key="date" align="center"/>
                        <Column title="类型" dataIndex="type" key="type" align="center" render={(text)=>(
                            <span>{text=="return"?"归还单":"借出单"}</span>
                        )}/>
                        <Column title="编号" dataIndex="code" key="code" align="center"/>
                        <Column title="供应商" dataIndex="supplierName" key="supplierName" align="center"/>
                        <Column title="车牌号" dataIndex="carNo" key="carNo" align="center"/>
                        <Column title="数量" dataIndex="number" key="number" align="center"/>
                        <Column title="仓库" dataIndex="warehouseName" key="warehouseName" align="center"/>
                        <Column title="制单" dataIndex="createdName" key="createdName" align="center"/>
                        <Column title="审核" dataIndex="auditStatus" key="auditStatus" align="center" render={(text)=>(
                            <span>{text==0?"未审核":"已审核"}</span>
                        )}/>
                        <Column title="操作" align="center" key="records" dataIndex="records"
                            render={(text, record) => (
                                <Space size="large">
                                    <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes">编辑</span>
                                    <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes">删除</span>
                                    {record.auditStatus==0?(
                                        <span onClick={this.check.bind(this, record)} className="details span11">审核</span>
                                    ):(
                                        <span onClick={this.notCheck.bind(this, record)} className="details span11">反审核</span>
                                    )}
                                    <span onClick={this.details.bind(this, record)} className="details span11">查看</span>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
                <div className="placePagination">
                    <Pagination showTotal={()=>`共 ${this.state.pageTotal} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotal} showSizeChanger={false}/>
                </div>
                <Modal title={this.state.msg} width="80%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                    <div className="modal1">
                        <ul className="salesInvoiceUl">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">编号</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.code} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">类型</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.type} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">日期</span>
                                <div className="salesInvoiceDiv1">
                                    <DatePicker style={{width: '100%'}} onChange={(e, time)=>{
                                        this.setState({date: time})
                                    }}
                                    value={this.state.date==undefined || this.state.date=='' ?"":moment(this.state.date, 'YYYY-MM-DD')} locale={locale}
                                    disabled={this.state.flag==3?true:false}/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">车号</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.carNo} onChange={(e)=>{
                                        this.setState({
                                            carNo: e.target.value
                                        })
                                    }} disabled={this.state.flag==3?true:false}/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">供应商</span>
                                <div className="salesInvoiceDiv1">
                                    <TreeSelect
                                        style={{ width: '100%' }}
                                        value={this.state.supplierId}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={this.state.supplierIdList}
                                        placeholder=""
                                        treeDefaultExpandAll
                                        onChange={(e)=>{this.setState({supplierId: e})}}
                                        showSearch
                                        filterTreeNode={(input, option) =>
                                            option.title.toLowerCase().indexOf(input.toLowerCase()) >=0
                                        }
                                        disabled={this.state.flag==3?true:false}
                                    />
                                </div>
                            </li>
                        </ul>
                        <div className="placeChangeTable">
                            <Table pagination={false} dataSource={this.state.modalData} locale={{emptyText: '暂无数据'}} scroll={{x: 2000}}>
                                <Column title="" align="center" key="records" dataIndex="records" width={120} fixed='left'
                                    render={(text, record) => (
                                        <>
                                            <span className="span_img1 span_img" onClick={this.addModalData.bind(this)}>+</span>
                                            <span className="span_img2 span_img" onClick={this.subtraction.bind(this, record)}>-</span>
                                        </>
                                    )}
                                />
                                <Column title="物料编码" dataIndex="materialCode" key="materialCode" align="center" width={300} render={(text, record)=>(
                                    <>
                                        <Select style={{width: '100%', textAlign: "left"}} value={text}
                                                onChange={(e)=>{
                                                    this.state.modalData.forEach((item)=>{
                                                        if(item.id == record.id) {
                                                            item.materialCode = e;
                                                            if(record.materialCode != undefined || record.materialCode != '' && record.materialCode.indexOf(",")!=-1) {
                                                                item.materialName = item.materialCode.split(",")[1];
                                                                item.measurement = item.materialCode.split(",")[2];
                                                                item.stock = item.materialCode.split(",")[3];
                                                            }
                                                        }
                                                    })
                                                    this.setState({
                                                        modalData: this.state.modalData
                                                    })
                                                }} disabled={this.state.flag==3?true:false}>
                                            {this.state.materialCodeList.map((item)=>{
                                                return(
                                                    <Option value={","+item.materialName+","+item.measurement+","+item.stock+","+item.materialCode+","+item.baseInfoType} key={item.id}>{item.materialCode+"  "+item.materialName}</Option>
                                                )
                                            })}
                                        </Select>
                                    </>
                                )}/>
                                <Column title="物料名称" dataIndex="materialName" key="materialName" align="center" width={100}/>
                                <Column title="规格型号" dataIndex="stock" key="stock" align="center" width={200}/>
                                <Column title="类型" dataIndex="baseInfoType" key="baseInfoType" align="center" width={200}/>
                                <Column title="计量单位" dataIndex="measurement" key="measurement" align="center" width={100}/>
                                <Column width={200} title="数量" dataIndex="number" key="number" align="center" render={(text, record)=>(
                                    <>
                                        <InputNumber value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.number = e;
                                                }
                                            })
                                            this.setState({modalData: this.state.modalData})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </>
                                )}/>

                                <Column width={200} title="仓库" dataIndex="warehouseId" key="warehouseId" align="center" render={(text, record)=>(
                                    <>
                                        <Select style={{width: '100%', textAlign: "left"}} value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.warehouseId = e;
                                                }
                                            })
                                            this.setState({
                                                modalData: this.state.modalData
                                            })
                                        }} disabled={this.state.flag==3?true:false}>
                                            {this.state.warehouseIdList.map((item)=>{
                                                return(
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </>
                                )}/>

                                <Column title="备注" dataIndex="note" key="note" align="center" width={200} render={(text, record)=>(
                                    <>
                                        <Input value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.note = e.target.value;
                                                }
                                            })
                                            this.setState({modalData: this.state.modalData})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </>
                                )}/>
                            </Table>
                        </div>

                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">制单</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.createName} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">审核</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.check} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">审核日期</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.checkTime} disabled/>
                                </div>
                            </li>
                        </ul>
                        {!this.state.isIn?(
                            <ul className="salesInvoiceUl salesInvoiceUl1">
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">验收</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.checkLeader}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({checkLeader: e})}}>
                                            {this.state.keeperEmpnoList.map((item)=>{
                                                return(
                                                    <Option value={item.empno} key={item.empno}>{item.realname}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">保管</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.keeperEmpno}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({keeperEmpno: e})}}>
                                            {this.state.keeperEmpnoList.map((item)=>{
                                                return(
                                                    <Option value={item.empno} key={item.empno}>{item.realname}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                            </ul>
                        ):(
                            <ul className="salesInvoiceUl salesInvoiceUl1">
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">领料</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.materialGetter}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({materialGetter: e})}}>
                                            {this.state.keeperEmpnoList.map((item)=>{
                                                return(
                                                    <Option value={item.empno} key={item.empno}>{item.realname}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">发货</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.deliveryEmpno}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({deliveryEmpno: e})}}>
                                            {this.state.keeperEmpnoList.map((item)=>{
                                                return(
                                                    <Option value={item.empno} key={item.empno}>{item.realname}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="div4">
                        <li className="li4">
                            <Button className="btn4" type="danger" onClick={()=>{this.setState({visible: false})}}>取消</Button>
                        </li>
                        {this.state.flag==3?(null):(
                            <li className="li4">
                                <Button className="btn4" type="primary" onClick={this.handleOk.bind(this)}>确定</Button>
                            </li>
                        )}
                    </div>
                </Modal>
            </div>
        )
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            searchType: this.state.searchType,
            status: this.state.status
        }
        Axios.post("/self/erp/warehouse/queryLoanReturn", params).then((res)=>{
            if(res.data.success) {
                res.data.data.loanReturns.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.loanReturns,
                    pageTotal: res.data.data.num
                })
            }else{
                this.setState({
                    dataSource: [],
                    pageTotal: 0
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
    addIn() {
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            isIn: true,
            type: "return",


            date: "",
            supplierId: "",
            carNo: "",
            createName: '',
            check: '',
            checkTime: '',
            deliveryEmpno: '',
            materialGetter: ''
        })
        this.createCodeIn();
        this.initList();
    }
    addOut() {
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            isIn: false
        })
    }
    donload() {

    }
    changes(row) {
        this.setState({
            visible: true,
            flag: 2,
            msg: '修改',
            id: row.id,
            code: row.code,
            date: row.date,
            supplierId: row.supplierId,
            carNo: row.carNo,
            createName: row.createName,
            check: row.auditName,
            checkTime: row.auditTime,
            deliveryEmpno: row.deliveryEmpno,
            materialGetter: row.materialGetter,
            type: row.type
        })
        this.initList();
        this.queryId(row);
    }
    details(row) {
        this.setState({
            visible: true,
            flag: 3,
            msg: '详情',
            id: row.id,
            code: row.code,
            date: row.date,
            supplierId: row.supplierId,
            carNo: row.carNo,
            createName: row.createName,
            check: row.auditName,
            checkTime: row.auditTime,
            deliveryEmpno: row.deliveryEmpno,
            materialGetter: row.materialGetter,
            type: row.type
        })
        this.initList();
        this.queryId(row);
    }
    queryId(row) {
        Axios.post("/self/erp/warehouse/queryLoanReturnById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                let obj = res.data.data.loanReturn;
                let modalData= [];
                obj.loanReturnItems.forEach((item)=>{
                    modalData.push({
                        key: item.id,
                        id: item.id,
                        materialCode: ","+item.materialName+","+item.measurement+","+item.stock+","+item.materialCode+","+item.baseInfoType,
                        materialName: item.materialName,
                        number: item.number,
                        warehouseId: item.warehouseId,
                        measurement: item.measurement,
                        baseInfoType: item.baseInfoType,
                    })
                })
                this.setState({
                    modalData
                })
            }
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
                Axios.post('/self/erp/warehouse/deleteLoanReturn', params).then((res)=>{
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
    check(row) {
        let that = this;
        confirm({
            title: '你确定要审核吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                let params = {
                    id: row.id,
                    auditStatus: 1,
                    version: row.version
                };
                Axios.post('/self/erp/warehouse/auditLoanReturn', params).then((res)=>{
                    if(res.data.success) {
                        message.success("审核成功");
                        that.initData(that.state.currentPage);
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        });
    }
    notCheck(row) {
        let that = this;
        confirm({
            title: '你确定要反审核吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                let params = {
                    id: row.id,
                    auditStatus: 0,
                    version: row.version
                };
                Axios.post('/self/erp/warehouse/auditLoanReturn', params).then((res)=>{
                    if(res.data.success) {
                        message.success("反审核成功");
                        that.initData(that.state.currentPage);
                    }else{
                        message.warning(res.data.message);
                    }
                })
            },
            onCancel() {},
        });
    }
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    handleOk() {
        let loanReturnItems = [];
        this.state.modalData.forEach((item)=>{
            loanReturnItems.push({
                materialCode: item.materialCode!=null || item.materialCode!= undefined || item.materialCode != '' ? item.materialCode.split(",")[4] :"",
                materialName: item.materialName,
                number: item.number,
                warehouseId: item.warehouseId,
                measurement: item.materialCode!=null || item.materialCode!= undefined || item.materialCode != '' ? item.materialCode.split(",")[2] :"",
                baseInfoType: item.materialCode!=null || item.materialCode!= undefined || item.materialCode != '' ? item.materialCode.split(",")[5] :"",
            })
        })
        let params = {
            code: this.state.code,
            date: this.state.date,
            supplierId: this.state.supplierId,
            type: this.state.type,
            carNo: this.state.carNo,
            loanReturnItems
        }
        if(this.state.isIn) {
            params.deliveryEmpno = this.state.deliveryEmpno;
            params.materialGetter = this.state.materialGetter;
        }else{
            params.checkLeader = this.state.checkLeader;
            params.keeperEmpno = this.state.keeperEmpno;
        }
        if(this.state.flag == 1) {
            Axios.post("/self/erp/warehouse/addLoanReturn", params).then((res)=>{
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
        }else if(this.state.flag == 2) {
            params.id = this.state.id;
            Axios.post("/self/erp/warehouse/updateLoanReturn", params).then((res)=>{
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
    addModalData() {
        let str = new Date().getTime();
        this.state.modalData.push({id: str, key: str});
        this.setState({
            modalData: [...this.state.modalData]
        })
    }
    subtraction(row) {
        if(this.state.modalData.length > 1) {
            this.state.modalData.forEach((outItem, index)=>{
                if(outItem.id == row.id) {
                    this.state.modalData.splice(index, 1);
                }
            });
            this.setState({
                modalData: [...this.state.modalData]
            })
        }
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
    // 归还编码
    createCodeIn() {
        Axios.post("/self/erp/warehouse/generateLoanReturnCode", {prefix: 'HH'}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    code: res.data.data
                })
            }else{
                this.setState({
                    code: ""
                })
            }
        })
    }
    initList() {
        // 供应商
        Axios.post("/self/erp/purchaseOrder/querySupplier", {}).then((res)=>{
            if(res.data.success) {
                this.again(res.data.data.suppliers);
            }else{
                this.setState({
                    supplierIdList: []
                })
            }
        })
        //验收,保管
        Axios.post("/self/erp/baseinfo/queryUser", {}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    keeperEmpnoList: res.data.data.users
                })
            }else{
                this.setState({
                    keeperEmpnoList: []
                })
            }
        })

        // 物料编码
        Axios.post("/self/erp/baseinfo/queryMaterialInfoItems", {}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    materialCodeList: res.data.data.materialInfos
                })
            }else{
                this.setState({
                    materialCodeList: []
                })
            }
        })
        // 仓库
        Axios.post("/self/erp/baseinfo/queryWarehouseAreas", {}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    warehouseIdList: res.data.data.warehouseAreas
                })
            }else{
                this.setState({
                    warehouseIdList: []
                })
            }
        })




        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        let date = year+"-"+month+"-"+day;
        this.setState({
            date,
            modalData: [
                {id: new Date().getTime(), key: new Date().getTime()}
            ]
        })
    }

    again(array) {
        array.forEach((item)=>{
            item.title = item.fullName;
            item.value = item.id;
            if(item.children != undefined) {
                this.again(item.children);
            }
        })
        this.setState({
            supplierIdList: array
        })
    }
}
export default BorrowLendReturn;