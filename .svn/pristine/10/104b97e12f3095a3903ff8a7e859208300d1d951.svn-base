import React,{Component} from "react";
import {Input, Select, Table, Space, Pagination, Modal, InputNumber, Button, DatePicker, Upload, message, Switch, TreeSelect} from 'antd';
import { ExclamationCircleOutlined ,UploadOutlined} from '@ant-design/icons';
import Axios from 'axios';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "./warehouseManagement.scss"
const {Option} = Select;
const {Column} = Table;
const {TextArea} = Input;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
class WarehouseManagement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startTime: '', endTime: '',
            receivingKeeperList: [],   receivingKeeper: '',
            status: '',   statusList: [],
            dataSource: [],
            currentPage: 1, pageSize: 10,
            pageTotal: 0,
            ////////////////////////////////////////////// 模态框   ////////////////////////////////////////////
            msg: '', flag:1, visible: false,
            modalData: [],
            materialCodeList: [],
            packagingLayoutList: [],salesTypeIdList: [],
            isIn: true,
            inboundTypeIdList: [],
            supplierIdList: [],
            deptIdList: [],warehouseIdList: [],
            keeperEmpnoList: [],
            outboundTypeIdList: [],
            id: ''
        }
    }
    render() {
        return(
            <div className="warehouseManagement">
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
                    <span className="span1 span2">收料仓库</span>
                    <Select allowClear className="input1" onChange={(e)=>{this.setState({receivingKeeper: e})}}>
                        {
                            this.state.receivingKeeperList.map((item)=>{
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
                    <button className="searchs" onClick={this.addIn.bind(this)}>新增入库</button>
                    <button className="searchs" onClick={this.addOut.bind(this)}>新增出库</button>
                    <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                </div>
                <div className="placeTable">
                    <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                        <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                            <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                        )}/>
                        <Column title="时间" dataIndex="date" key="date" align="center"/>
                        <Column title="类型" dataIndex="type" key="type" align="center" render={(text)=>(
                            <span>{text=='in'?"入库":"出库"}</span>
                        )}/>
                        <Column title="单据编号" dataIndex="code" key="code" align="center"/>
                        <Column title="部门" dataIndex="deptName" key="deptName" align="center"/>
                        <Column title="仓库" dataIndex="warehouseName" key="warehouseName" align="center"/>
                        <Column title="数量" dataIndex="number" key="number" align="center"/>
                        <Column title="制单" dataIndex="createName" key="createName" align="center"/>
                        <Column title="审核状态" dataIndex="auditStatus" key="auditStatus" align="center" render={(text)=>(
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
                            {this.state.isIn?(
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">入库类型</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.inboundTypeId}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({inboundTypeId: e})}}>
                                            {this.state.inboundTypeIdList.map((item)=>{
                                                return(
                                                    <Option value={item.valueId} key={item.valueId}>{item.value}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                            ):(
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">出库类型</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.outboundTypeId}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({outboundTypeId: e})}}>
                                            {this.state.inboundTypeIdList.map((item)=>{
                                                return(
                                                    <Option value={item.valueId} key={item.valueId}>{item.value}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
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
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">部门</span>
                                <div className="salesInvoiceDiv1">
                                    <TreeSelect
                                        style={{ width: '100%' }}
                                        value={this.state.deptId}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        treeData={this.state.deptIdList}
                                        placeholder=""
                                        treeDefaultExpandAll
                                        onChange={(e)=>{this.setState({deptId: e})}}
                                        showSearch
                                        filterTreeNode={(input, option) =>
                                            option.title.toLowerCase().indexOf(input.toLowerCase()) >=0
                                        }
                                        disabled={this.state.flag==3?true:false}
                                    />
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">仓库</span>
                                <div className="salesInvoiceDiv1">
                                    <Select className="input3" style={{width: '100%'}} value={this.state.warehouseId}
                                            disabled={this.state.flag==3?true:false}
                                            onChange={(e)=>{this.setState({warehouseId: e})}}>
                                        {this.state.warehouseIdList.map((item)=>{
                                            return(
                                                <Option value={item.id} key={item.id}>{item.fullName}</Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">车号</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.carNo} onChange={(e)=>{this.setState({
                                        carNo: e.target.value
                                    })}} disabled={this.state.flag==3?true:false}/>
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
                                                            if(record.materialCode != undefined && record.materialCode.indexOf(",")!=-1) {
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
                                <Column width={200} title="周转物类型" dataIndex="turnoverType" key="turnoverType" align="center" render={(text, record)=>(
                                    <>
                                        <Select style={{width: '100%', textAlign: "left"}} value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.turnoverType = e;
                                                }
                                            })
                                            this.setState({
                                                modalData: this.state.modalData
                                            })
                                        }} disabled={this.state.flag==3?true:false}>
                                            {this.state.materialCodeList.map((item)=>{
                                                return(
                                                    <Option value={item.materialCode} key={item.id}>{item.materialName}</Option>
                                                )
                                            })}
                                        </Select>
                                    </>
                                )}/>
                                <Column title="箱数" dataIndex="boxNum" key="boxNum" align="center" width={200} render={(text, record)=>(
                                    <>
                                        <InputNumber value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.boxNum = e;
                                                }
                                            })
                                            this.setState({modalData: this.state.modalData})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </>
                                )}/>
                                <Column title="桶数" dataIndex="bucketNum" key="bucketNum" align="center" width={200} render={(text, record)=>(
                                    <>
                                        <InputNumber value={text} onChange={(e)=>{
                                            this.state.modalData.forEach((item)=>{
                                                if(item.id == record.id) {
                                                    item.bucketNum = e;
                                                }
                                            })
                                            this.setState({modalData: this.state.modalData})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </>
                                )}/>
                                <Column title="单位" dataIndex="measurement" key="measurement" align="center" width={100}/>
                                <Column title="数量" dataIndex="number" key="number" align="center" width={200} render={(text, record)=>(
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
                                                    <Option value={item.id} key={item.id}>{item.fullName}</Option>
                                                )
                                            })}
                                        </Select>
                                    </>
                                )}/>
                                <Column title="规格型号" dataIndex="stock" key="stock" align="center" width={200}/>
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
                        <ul className="salesInvoiceUl salesInvoiceUl1" style={this.state.isIn?{display: 'block'}:{display: 'none'}}>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">验收</span>
                                <div className="salesInvoiceDiv1">
                                    <Select className="input3" style={{width: '100%'}} value={this.state.checkLeader}
                                            disabled={this.state.flag==3?true:false}
                                            onChange={(e)=>{this.setState({checkLeader: e})}}>
                                        {this.state.keeperEmpnoList.map((item)=>{
                                            return(
                                                <Option value={item.empno} key={item.id}>{item.realname}</Option>
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
                                                <Option value={item.empno} key={item.id}>{item.realname}</Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1" style={!this.state.isIn?{display: 'block'}:{display: 'none'}}>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">领料</span>
                                <div className="salesInvoiceDiv1">
                                    <Select className="input3" style={{width: '100%'}} value={this.state.materialGetter}
                                            disabled={this.state.flag==3?true:false}
                                            onChange={(e)=>{this.setState({materialGetter: e})}}>
                                        {this.state.keeperEmpnoList.map((item)=>{
                                            return(
                                                <Option value={item.empno} key={item.id}>{item.realname}</Option>
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
                                                <Option value={item.empno} key={item.id}>{item.realname}</Option>
                                            )
                                        })}
                                    </Select>
                                </div>
                            </li>
                        </ul>
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
            receivingKeeper: this.state.receivingKeeper,
            status: this.state.status
        }
        Axios.post("/self/erp/warehouse/queryVirtualWarehouse", params).then((res)=>{
            if(res.data.success) {
                res.data.data.virtualWarehouses.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.virtualWarehouses,
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
            type: "in",   // 类型


            date: "",
            supplierId: "",
            keeperEmpno: "",
            checkLeader: "",
            deptId: "",
            inboundTypeId: "",
            carNo: "",
            warehouseId: "",
        })
        this.createCodeIn();

        this.initListIn();
    }
    addOut() {
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            isIn: false,
            type: "out",   // 类型
            date: "",
            supplierId: "",
            deliveryEmpno: "",
            materialGetter: "",
            deptId: "",
            outboundTypeId: "",
            carNo: "",
            warehouseId: "",
        })
        this.initListIn();
        this.createCodeOut();
    }
    donload() {

    }
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    changes(row) {
        this.initListIn();
        this.setState({
            visible: true,
            flag: 2,
            msg: '修改',
            id: row.id,
            code: row.code,
            date: row.date,
            supplierId: row.supplierId,
            type: row.type,
            deptId: row.deptId,
            carNo: row.carNo,
            warehouseId: row.warehouseId
        })
        this.queryId(row);
    }
    details(row) {
        this.initListIn();
        this.setState({
            visible: true,
            flag: 3,
            msg: '详情',
            id: row.id,
            code: row.code,
            date: row.date,
            supplierId: row.supplierId,
            type: row.type,
            deptId: row.deptId,
            carNo: row.carNo,
            warehouseId: row.warehouseId
        })
        this.queryId(row);
    }
    queryId(row) {
        if(row.type=="in") {  // 入库回显
            this.setState({
                keeperEmpno : row.keeperEmpno,
                checkLeader : row.checkLeader,
                inboundTypeId : row.inboundTypeId,
            })
        }else{  // 出库回显
            this.setState({
                deliveryEmpno : row.deliveryEmpno,
                materialGetter : row.materialGetter,
                outboundTypeId : row.outboundTypeId
            })
        }
        Axios.post("/self/erp/warehouse/queryVirtualWarehouseById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                let obj = res.data.data.virtualWarehouse;
                let modalData = [];
                obj.virtualWarehouseItems.forEach((item)=>{
                    modalData.push({
                        key: item.id,
                        materialCode: ","+item.materialName+","+item.measurement+","+item.stock+","+item.materialCode+","+item.baseInfoType,
                        materialName: item.materialName,
                        warehouseId: item.warehouseId,
                        boxNum: item.boxNum,
                        bucketNum: item.bucketNum,
                        number: item.number,
                        turnoverType: item.turnoverType,
                        note: item.note,
                        measurement: item.measurement,
                        stock: item.stock
                    })
                })
                this.setState({
                    createName: obj.createName,
                    check: obj.auditName,
                    checkTime: obj.auditTime,
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
                Axios.post('/self/erp/warehouse/deleteVirtualWarehouse', params).then((res)=>{
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
                Axios.post('/self/erp/warehouse/auditVirtualWarehouse', params).then((res)=>{
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
                Axios.post('/self/erp/warehouse/auditVirtualWarehouse', params).then((res)=>{
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
    handleOk() {
        let virtualWarehouseItems = [];
        this.state.modalData.forEach((item)=>{
            virtualWarehouseItems.push({
                materialCode: item.materialCode!=null || item.materialCode!= undefined || item.materialCode != '' ? item.materialCode.split(",")[4] :"",
                materialName: item.materialName,
                warehouseId: item.warehouseId,
                boxNum: item.boxNum,
                bucketNum: item.bucketNum,
                number: item.number,
                turnoverType: item.turnoverType,
                note: item.note,
                measurement: item.measurement,
                baseInfoType: item.materialCode!=null || item.materialCode!= undefined || item.materialCode != '' ? item.materialCode.split(",")[5] :""
            })
        })
        let params = {
            code: this.state.code,
            date: this.state.date,
            supplierId: this.state.supplierId,
            type: this.state.type,
            deptId: this.state.deptId,
            carNo: this.state.carNo,
            warehouseId: this.state.warehouseId,
            virtualWarehouseItems,
        }
        if(this.state.isIn) {
            params.keeperEmpno = this.state.keeperEmpno;
            params.checkLeader = this.state.checkLeader;
            params.inboundTypeId = this.state.inboundTypeId
        }else{
            params.deliveryEmpno = this.state.deliveryEmpno;
            params.materialGetter = this.state.materialGetter;
            params.outboundTypeId = this.state.outboundTypeId
        }
        if(this.state.flag == 1) {
            Axios.post("/self/erp/warehouse/addVirtualWarehouse", params).then((res)=>{
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
            Axios.post("/self/erp/warehouse/updateVirtualWarehouse", params).then((res)=>{
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
    createCodeIn() {
        Axios.post("/self/erp/warehouse/generateVirtualWarehouseCode", {prefix: 'XCRK'}).then((res)=>{
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
    createCodeOut() {
        Axios.post("/self/erp/warehouse/generateVirtualWarehouseCode", {prefix: 'XCCK'}).then((res)=>{
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
    initListIn() {
        // 入库类型
        Axios.post("/self/erp/baseinfo/queryDictTypeAndValue", {}).then((res)=>{
            if(res.data.success) {
                // console.log(res.data.data)
                this.setState({
                    inboundTypeIdList: res.data.data.inboundType
                })
            }else{
                this.setState({
                    inboundTypeIdList: []
                })
            }
        })
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
        //查询部门
        Axios.post("/self/erp/dept/queryDept", {}).then((res)=>{
            if(res.data.success) {
                this.again2(res.data.data.deptList);
            }else{
                this.setState({
                    deptIdList: []
                })
            }
        })
        // 查询仓库

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
        // 验收, 保管
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
        // 虚仓管理
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

        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        this.setState({
            date: year+"-"+month+"-"+day,   // 日期
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
    again2(array) {
        array.forEach((item)=>{
            item.title = item.deptName;
            item.value = item.deptId;
            if(item.children != undefined) {
                this.again2(item.children);
            }
        })
        this.setState({
            deptIdList: array
        })
    }
}
export default WarehouseManagement;