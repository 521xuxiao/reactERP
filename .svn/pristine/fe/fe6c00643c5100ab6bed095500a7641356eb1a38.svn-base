import React ,{Component} from 'react';
import {Input, Select, DatePicker, Table, Pagination, Space, Modal, Button, InputNumber, TreeSelect, message} from 'antd';
import { ExclamationCircleOutlined ,UploadOutlined} from '@ant-design/icons';
import Axios from 'axios';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './finishedProductsStorage.scss';
const {Option} = Select;
const {RangePicker } =  DatePicker;
const {Column} =  Table;
const { confirm } = Modal;
class FinishedProductsStorage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sheetName: '',  startTime: '',   endTime: '',
            dataSource: [],
            currentPage: 1, pageSize: 10, pageTotal: 0,
            ///////////////////////////////////////////
            dataTimes: '',
            deliveryDepartment: '',    deliveryDepartmentList: [],
            status: '',                statusList: [],
            /////////////////////////////////////  modal  /////////////////////////////////////////
            msg: '', flag: 1, visible: false,
            code: '',
            deliveryDate: '',
            deliveryUnitList: [],   deliveryUnit: '',
            originalsingleTypeList: [], originalsingleType: '',
            modalData: [],
            materialCodeList: [],
            packagingLayoutList: [],
            deliveryEmpnoList: [],
            deptIdList: [],    deptId: '',
            sourceSheetTypeList: [{label: '无', value: ""}, {label:"产品统计单", value: "cptj"}],   sourceSheetType: '',
            registrationCode: '',
            batchNumber: '',
            warehouseId: '',   warehouseIdList: [],
            checkLeader: '',   keeperEmpno: '',
            id: ''
        }
    }
    render() {
        return(
            <div id="finishedProductsStorage">
                <div className="finishedProductsStorage">
                    <div className="placeSearch">
                        <span className="span1">日期</span>
                        <DatePicker onChange={(e, time)=>{
                            this.setState({dataTimes: time})
                        }}
                        value={this.state.dataTimes==undefined || this.state.dataTimes=='' ?"":moment(this.state.dataTimes, 'YYYY-MM-DD')} locale={locale}
                        className="input1"/>

                        <span className="span1 span2">交货部门</span>
                        <Select allowClear className="input1" onChange={(e)=>{this.setState({deliveryDepartment: e})}}>
                            {
                                this.state.deliveryDepartmentList.map((item)=>{
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
                        <button className="searchs" onClick={this.add.bind(this)}>新增</button>
                        <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                        <button className="searchs" onClick={this.allAdd.bind(this)}>生成</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )}/>
                            <Column title="时间" dataIndex="inboundDate" key="inboundDate" align="center"/>
                            <Column title="编号" dataIndex="code" key="code" align="center"/>
                            <Column title="交货部门" dataIndex="deptName" key="deptName" align="center" />
                            <Column title="收货仓库" dataIndex="warehouseName" key="warehouseName" align="center"/>
                            <Column title="实收数量" dataIndex="number" key="number" align="center"/>
                            <Column title="制单" dataIndex="createdName" key="createdName" align="center"/>
                            <Column title="审核" dataIndex="auditName" key="auditName" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records"
                                render={(text, record) => (
                                    <Space size="large">
                                        <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes">编辑</span>
                                        <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes">删除</span>
                                        <span key={"details"} onClick={this.details.bind(this, record)} className="changes">详情</span>
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
                                    <span className="salesInvoiceSpan">编码</span>
                                    <div className="salesInvoiceDiv1">
                                        <Input allowClear value={this.state.code} disabled/>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">日期</span>
                                    <div className="salesInvoiceDiv1">
                                        <DatePicker style={{width: '100%'}} onChange={(e, time)=>{
                                            this.setState({deliveryDate: time})
                                        }}
                                        value={this.state.deliveryDate==undefined || this.state.deliveryDate=='' ?"":moment(this.state.deliveryDate, 'YYYY-MM-DD')} locale={locale}
                                        disabled={this.state.flag==3?true:false}/>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">交货单位</span>
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
                            <ul className="salesInvoiceUl salesInvoiceUl1">
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">收货仓库</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.warehouseId}
                                                onChange={(e)=>{this.setState({warehouseId: e})}}
                                                disabled={this.state.flag==3?true:false}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                } showSearch>
                                            {this.state.warehouseIdList.map((item)=>{
                                                return(
                                                    <Option value={item.id} key={item.id}>{item.name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">果园号</span>
                                    <div className="salesInvoiceDiv1">
                                        <Input allowClear value={this.state.registrationCode} onChange={(e)=>{
                                            this.setState({registrationCode: e.target.value})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </div>
                                </li>
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">批次号</span>
                                    <div className="salesInvoiceDiv1">
                                        <Input allowClear value={this.state.batchNumber} onChange={(e)=>{
                                            this.setState({batchNumber: e.target.value})
                                        }} disabled={this.state.flag==3?true:false}/>
                                    </div>
                                </li>
                            </ul>
                            <ul className="salesInvoiceUl salesInvoiceUl1">
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">源单类型</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.sourceSheetType}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({sourceSheetType: e})}}>
                                            {this.state.sourceSheetTypeList.map((item)=>{
                                                return(
                                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </li>
                            </ul>

                            <div className="placeChangeTable">
                                <Table pagination={false} dataSource={this.state.modalData} locale={{emptyText: '暂无数据'}} scroll={{x: 1500}}>
                                    <Column title="" align="center" key="records" dataIndex="records" width={120} fixed='left'
                                        render={(text, record) => (
                                            <>
                                                <span className="span_img1 span_img" onClick={this.addModalData.bind(this)}>+</span>
                                                <span className="span_img2 span_img" onClick={this.subtraction.bind(this, record)}>-</span>
                                            </>
                                        )}
                                    />
                                    <Column title="产品编码" dataIndex="materialCode" key="materialCode" align="center" width={300} render={(text, record)=>(
                                        <>
                                            <Select style={{width: '100%', textAlign: "left"}} value={text}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    } showSearch
                                                    disabled={this.state.flag==3?true:false}
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
                                                    }}>
                                                {this.state.materialCodeList.map((item)=>{
                                                    return(
                                                        <Option value={","+item.materialName+","+item.measurement+","+item.stock+","+item.materialCode} key={item.id}>{item.materialCode+"  "+item.materialName}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </>
                                    )}/>
                                    <Column title="产品名称" dataIndex="materialName" key="materialName" align="center" width={100}/>
                                    <Column width={200} title="包装版面" dataIndex="packagingLayout" key="packagingLayout" align="center" render={(text, record)=>(
                                        <>
                                            <Select style={{width: '100%', textAlign: "left"}} value={text} onChange={(e)=>{
                                                this.state.modalData.forEach((item)=>{
                                                    if(item.id == record.id) {
                                                        item.packagingLayout = e;
                                                    }
                                                })
                                                this.setState({
                                                    modalData: this.state.modalData
                                                })
                                            }} filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } showSearch disabled={this.state.flag==3?true:false}>
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
                                    <Column title="单位净重" dataIndex="unitNetWeight" key="unitNetWeight" align="center" width={200} render={(text, record)=>(
                                        <>
                                            <InputNumber value={text} onChange={(e)=>{
                                                this.state.modalData.forEach((item)=>{
                                                    if(item.id == record.id) {
                                                        item.unitNetWeight = e;
                                                    }
                                                })
                                                this.setState({modalData: this.state.modalData})
                                            }} disabled={this.state.flag==3?true:false}/>
                                        </>
                                    )}/>
                                    <Column title="单位" dataIndex="measurement" key="measurement" align="center" width={100}/>
                                    <Column title="实收数量" dataIndex="number" key="number" align="center" width={200} render={(text, record)=>(
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
                                    {/*<Column title="单价" dataIndex="stock" key="stock" align="center" width={200}/>*/}
                                    {/*<Column title="金额" dataIndex="stock" key="stock" align="center" width={200}/>*/}
                                    <Column title="收货仓库" dataIndex="warehouseIdItem" key="warehouseIdItem" align="center" width={200} render={(text, record)=>(
                                        <>
                                            <Select className="input3" style={{width: '100%'}} value={text} onChange={(e)=>{
                                                this.state.modalData.forEach((item)=>{
                                                    if(item.id == record.id) {
                                                        item.warehouseIdItem = e;
                                                    }
                                                })
                                                this.setState({modalData: this.state.modalData})
                                            }} filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } showSearch disabled={this.state.flag==3?true:false}>
                                                {this.state.warehouseIdList.map((item)=>{
                                                    return(
                                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                                    )
                                                })}
                                            </Select>
                                        </>
                                    )}/>
                                    <Column title="库存" dataIndex="stock" key="stock" align="center" width={200}/>
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
                                    <Column title="源单单号" dataIndex="sourceSheetCode" key="sourceSheetCode" align="center" width={200} render={(text, record)=>(
                                        <>
                                            <Input value={text} onChange={(e)=>{
                                                this.state.modalData.forEach((item)=>{
                                                    if(item.id == record.id) {
                                                        item.sourceSheetCode = e.target.value;
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
                            <ul className="salesInvoiceUl salesInvoiceUl1">
                                <li className="salesInvoiceLi">
                                    <span className="salesInvoiceSpan">验收</span>
                                    <div className="salesInvoiceDiv1">
                                        <Select className="input3" style={{width: '100%'}} value={this.state.checkLeader}
                                                disabled={this.state.flag==3?true:false}
                                                onChange={(e)=>{this.setState({checkLeader: e})}}>
                                            {this.state.deliveryEmpnoList.map((item)=>{
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
                                            {this.state.deliveryEmpnoList.map((item)=>{
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
            </div>
        )
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            sheetCode: this.state.code,
            sheetName: this.state.sheetName,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        };
        Axios.post('/self/erp/productManage/queryProductInboundSheet', params).then((res)=>{
            if(res.data.success) {
                res.data.data.productInboundSheets.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.productInboundSheets,
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
    add() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        this.setState({
            visible: true,
            flag: 1,
            msg: '新增',
            deliveryDate: year+"-"+month+"-"+day,
            modalData: [
                {id: new Date().getTime(), key: new Date().getTime()}
            ],

            deptId: '',
            warehouseId: '',
            registrationCode: '',
            batchNumber: '',
            sourceSheetType: '',
            createName: '',
            check: '',
            checkTime: '',
            checkLeader: '',
            keeperEmpno: ''
        })
        this.createCode();
        this.initList();
    }
    changes(row) {
        this.setState({
            visible: true,
            flag: 2,
            msg: '修改',
            id: row.id
        })
        this.initList();
        this.queryId(row);
    }
    details(row) {
        this.setState({
            visible: true,
            flag: 3,
            msg: '详情',
            id: row.id
        })
        this.initList();
        this.queryId(row);
    }
    queryId(row) {
        Axios.post("/self/erp/productManage/queryProductInboundSheetById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                let obj = res.data.data.productInboundSheet;
                let modalData = [];
                obj.productInboundSheetItems.forEach((item)=>{
                    modalData.push({
                        key: item.id,
                        sourceSheetId: '',  // 生成填写
                        boxNum: item.boxNum,
                        materialCode: ","+item.materialName+","+item.measurement+","+item.stock+","+item.materialCode,
                        materialName: item.materialName,
                        measurement: item.measurement,
                        note: item.note,
                        number: item.number,
                        packagingLayout: item.packagingLayout,
                        sourceSheetCode: item.sourceSheetCode,
                        stock: item.stock,
                        unitNetWeight: item.unitNetWeight,
                        warehouseIdItem: item.warehouseId
                    })
                })
                this.setState({
                    code: obj.code,
                    deliveryDate: obj.inboundDate,

                    deptId: obj.deptId,
                    warehouseId: obj.warehouseId,
                    registrationCode: obj.registrationCode,
                    batchNumber: obj.batchNumber,
                    sourceSheetType: obj.sourceSheetType,
                    createName: obj.createdName,
                    check: obj.auditName,
                    checkTime: obj.auditTime,
                    checkLeader: obj.checkLeader,
                    keeperEmpno: obj.keeperEmpno,
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
                Axios.post('/self/erp/productManage/deleteProductInboundSheet', params).then((res)=>{
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
    donload() {

    }
    allAdd() {

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
    handleOk() {
        let productInboundSheetItems= [];
        this.state.modalData.forEach((item)=>{
            productInboundSheetItems.push({
                sourceSheetId: '',  // 生成填写
                boxNum: item.boxNum,
                materialCode: item.materialCode.indexOf(",")!=-1?item.materialCode.split(",")[4]  : "",
                materialName: item.materialName,
                measurement: item.measurement,
                note: item.note,
                number: item.number,
                packagingLayout: item.packagingLayout,
                sourceSheetCode: item.sourceSheetCode,
                stock: item.stock,
                unitNetWeight: item.unitNetWeight,
                warehouseId: item.warehouseIdItem
            })
        })
        let params = {
            code: this.state.code,
            inboundDate: this.state.deliveryDate,
            deptId: this.state.deptId,
            warehouseId: this.state.warehouseId,
            registrationCode: this.state.registrationCode,
            batchNumber: this.state.batchNumber,
            sourceSheetType: this.state.sourceSheetType,
            keeperEmpno: this.state.keeperEmpno,
            checkLeader: this.state.checkLeader,
            productInboundSheetItems,
        }
        if(this.state.flag ==1) {
            Axios.post("/self/erp/productManage/addProductInboundSheet", params).then((res)=>{
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
        }else if(this.state.flag ==2) {
            params.id = this.state.id;
            Axios.post("/self/erp/productManage/updateProductInboundSheet", params).then((res)=>{
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
    componentDidMount() {
        this.initData(this.state.currentPage);
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

    /**
     * 生成产品入库单
     */
    createCode() {
        Axios.post("/self/erp/productManage/generateProductInboundSheetCode", {}).then((res)=>{
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

    /**
     * 下拉框里面的所有数据
     */
    initList() {
        Axios.post("/self/erp/dept/queryDept", {}).then((res)=>{
            if(res.data.success) {
                this.again(res.data.data.deptList);
            }else{
                this.setState({
                    deptIdList: []
                })
            }
        })
        //保管, 验收下拉框
        Axios.post("/self/erp/baseinfo/queryUser", {}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    deliveryEmpnoList: res.data.data.users
                })
            }else{
                this.setState({
                    deliveryEmpnoList: []
                })
            }
        })
        // 产品编码
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
        // 收货仓库
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
    }
    again(array) {
        array.forEach((item)=>{
            item.title = item.deptName;
            item.value = item.deptId;
            if(item.children != undefined) {
                this.again(item.children);
            }
        })
        this.setState({
            deptIdList: array
        })
    }
}
export default FinishedProductsStorage;