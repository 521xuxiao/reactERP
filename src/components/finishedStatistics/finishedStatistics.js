import React, {Component} from "react";
import {Input, Select, Table, Space, Pagination, Modal, InputNumber, Button, DatePicker, Upload, message, Switch, TreeSelect} from 'antd';
import Axios from 'axios';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "./finishedStatistics.scss"
const {Option} = Select;
const {Column} = Table;
class FinishedStatistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deliveryDate: '',
            consignment: '',    consignmentList: [],
            states: '',         statesList: [],
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,
            titleName: ["成品统计", "工作量"],
            currentIndex: 0,

            ///////////////////////////////////////////////////////////////////////
            deliveryDate1: '',
            consignment1: "",   consignment1List: [] ,
            no: '',      noList: [],
            dataSource1: [],
            currentPage1: 1,
            pageSize1: 10,
            pageTotal1: 0,
            obj: {},
            // tableList: [],
            finishProduct: [],
            visible1: false,
            obj1: {},
            arrayList: []
        }
    }
    render() {
        return(
            <div className="finishedStatistics">
                <ul className="finishedStatistics_ul1">
                    {this.state.titleName.map((item, index)=>{
                        return(
                            <li key={index} className={this.state.currentIndex==index?"finishedStatistics_li1 active":"finishedStatistics_li1"}
                            onClick={this.tabSwitch.bind(this, index)}>{item}</li>
                        )
                    })}

                </ul>
                <div style={this.state.currentIndex==0?{display: 'block'}:{display: 'none'}}>
                    <div className="placeSearch">
                        <span className="span1">日期</span>
                        <DatePicker onChange={(e, time)=>{
                            this.setState({deliveryDate: time})
                        }}
                                    value={this.state.deliveryDate==undefined || this.state.deliveryDate=='' ?"":moment(this.state.deliveryDate, 'YYYY-MM-DD')} locale={locale}
                                    className="input1"/>
                        <span className="span1 span2">交货部门</span>
                        <Select allowClear className="input1" onChange={(e)=>{this.setState({consignment: e})}}>
                            {
                                this.state.consignmentList.map((item)=>{
                                    return(
                                        <Option value={item.value} key={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>

                        <span className="span1 span2">状态</span>
                        <Select allowClear className="input1" onChange={(e)=>{this.setState({states: e})}}>
                            {
                                this.state.statesList.map((item)=>{
                                    return(
                                        <Option value={item.value} key={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                        <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                    </div>
                    <div className="bg">
                        <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )}/>
                            <Column title="时间" dataIndex="accountingDate" key="accountingDate" align="center"/>
                            <Column title="编码" dataIndex="code" key="code" align="center"/>
                            <Column title="交货部门" dataIndex="deptName" key="deptName" align="center"/>
                            <Column title="收货仓库" dataIndex="warehouseName" key="warehouseName" align="center"/>
                            <Column title="实收数量" dataIndex="number" key="number" align="center"/>
                            <Column title="成品入库单" dataIndex="outboundNum" key="outboundNum" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records"
                                    render={(text, record) => (
                                        <Space size="large">
                                            <span key={"details"} onClick={this.details.bind(this, record)} className="details span11">详情</span>
                                        </Space>
                                    )}
                            />
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotal} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotal} showSizeChanger={false}/>
                    </div>
                </div>

                <div style={this.state.currentIndex==1?{display: 'block'}:{display: 'none'}}>
                    <div className="placeSearch">
                        <span className="span1">日期</span>
                        <DatePicker onChange={(e, time)=>{
                            this.setState({deliveryDate1: time})
                        }}
                                    value={this.state.deliveryDate1==undefined || this.state.deliveryDate1=='' ?"":moment(this.state.deliveryDate1, 'YYYY-MM-DD')} locale={locale}
                                    className="input1"/>
                        <span className="span1 span2">交货部门</span>
                        <Select allowClear className="input1" onChange={(e)=>{this.setState({consignment1: e})}}>
                            {
                                this.state.consignment1List.map((item)=>{
                                    return(
                                        <Option value={item.value} key={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>

                        <span className="span1 span2">工位</span>
                        <Select allowClear className="input1" onChange={(e)=>{this.setState({no: e})}}>
                            {
                                this.state.noList.map((item)=>{
                                    return(
                                        <Option value={item.value} key={item.value}>{item.label}</Option>
                                    )
                                })
                            }
                        </Select>
                        <button className="searchs" onClick={this.searchMethods1.bind(this)}>查询</button>
                    </div>
                    <Table pagination={false} dataSource={this.state.dataSource1} locale={{emptyText: '暂无数据'}}>
                        <Column title="序号" align="center" key="index" dataIndex="index" width="100px"
                            render={(text, record, index) => (
                                <span>{(this.state.currentPage1 - 1) * this.state.pageSize1 + index + 1}</span>
                            )}/>
                        <Column title="工位" dataIndex="stationNo" key="stationNo" align="center"/>
                        <Column title="箱数" dataIndex="boxNum" key="boxNum" align="center"/>
                        <Column title="总量" dataIndex="number" key="number" align="center"/>
                        <Column title="操作" align="number" key="number" dataIndex="records" width={180}
                            render={(text, record) => (
                                <Space size="large">
                                    <span key={"details"} onClick={this.details1.bind(this, record)}
                                    style={{color:'#9516D1', cursor:'pointer'}}>详情</span>
                                </Space>
                            )}
                        />
                    </Table>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotal1} 条`} current={this.state.currentPage1} onChange={this.changePages1.bind(this)} pageSize={this.state.pageSize1} total={this.state.pageTotal1} showSizeChanger={false}/>
                    </div>
                </div>


                {/*详情*/}
                <Modal title="详情" width="80%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                    <div className="modal1">
                        <ul className="salesInvoiceUl">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">编码</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.code} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">时间</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.accountingDate} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">交货部门</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.deptName} disabled/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">收货仓库</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.warehouseName} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">制单</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.createdName} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">制单日期</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.createdTime} disabled/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">实收数量</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.number} disabled/>
                                </div>
                            </li>
                        </ul>
                        {this.state.finishProduct.map((item, index)=>{
                            return(
                                <div key={index}>
                                    <ul className="salesInvoiceUl salesInvoiceUl1">
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">产品编码</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.materialCode} disabled/>
                                            </div>
                                        </li>
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">产品名称</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.materialName} disabled/>
                                            </div>
                                        </li>
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">包装版面</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.packagingLayoutName} disabled/>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="salesInvoiceUl salesInvoiceUl1">
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">数量</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.number} disabled/>
                                            </div>
                                        </li>
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">箱数</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.boxNum} disabled/>
                                            </div>
                                        </li>
                                        <li className="salesInvoiceLi">
                                            <span className="salesInvoiceSpan">单位净重</span>
                                            <div className="salesInvoiceDiv1">
                                                <Input allowClear value={item.unitNetWeight} disabled/>
                                            </div>
                                        </li>
                                    </ul>
                                    {item.productAccountingTypesItems.forEach((item)=>{
                                        item.key = item.id;
                                    })}
                                    <Table pagination={false} dataSource={item.productAccountingTypesItems} locale={{emptyText: '暂无数据'}}>
                                        <Column title="工位" dataIndex="stationNo" key="stationNo" align="center" width={300}/>
                                        <Column title="箱数" dataIndex="boxNum" key="boxNum" align="center"/>
                                    </Table>
                                </div>
                            )
                        })}
                    </div>
                    <div className="div4">
                        <li className="li4">
                            <Button className="btn4" type="danger" onClick={()=>{this.setState({visible: false})}}>取消</Button>
                        </li>
                    </div>
                </Modal>

                {/*工作量详情*/}
                <Modal title="详情" width="80%" footer={null} getContainer={false} closable={false}  visible={this.state.visible1} centered={true}>
                    <div className="modal1">
                        <ul className="salesInvoiceUl">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">工位</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj1.stationNo} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">箱数</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj1.boxNum} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">数量</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj1.number} disabled/>
                                </div>
                            </li>
                        </ul>
                        {this.state.arrayList.forEach((item, index)=>{
                            item.key = index;
                        })}
                         <div>
                             <Table pagination={false} dataSource={this.state.arrayList} locale={{emptyText: '暂无数据'}}>
                                 <Column title="产品名称" dataIndex="materialName" key="materialName" align="center" width={300}/>
                                 <Column title="包装包面" dataIndex="packagingLayoutName" key="packagingLayoutName" align="center"/>
                                 <Column title="单位净重" dataIndex="unitNetWeight" key="unitNetWeight" align="center"/>
                                 <Column title="箱数" dataIndex="boxNum" key="boxNum" align="center"/>
                                 <Column title="数量" dataIndex="number" key="number" align="center"/>
                            </Table>
                         </div>
                    </div>
                    <div className="div4">
                        <li className="li4">
                            <Button className="btn4" type="danger" onClick={()=>{this.setState({visible1: false})}}>取消</Button>
                        </li>
                    </div>
                </Modal>
            </div>
        )
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            warehouseId: this.state.consignment,
            accountingDate: this.state.deliveryDate,
            status: this.state.states
        }
        Axios.post("/self/erp/productManage/queryProductAccounting", params).then((res)=>{
            if(res.data.success) {
                res.data.data.productAccountings.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.productAccountings,
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
    initData1(currentPage) {
        let params1 = {
            currentPage,
            pageSize: this.state.pageSize1,
            deptId: this.state.consignment1,
            accountingDate: this.state.deliveryDate1,
            stationNo: this.state.no
        }
        Axios.post("/self/erp/productManage/queryProductWorkload", params1).then((res)=>{
            if(res.data.success) {
                res.data.data.productWorkloads.forEach((item)=>{
                    item.key = item.stationNo;
                })
                this.setState({
                    dataSource1: res.data.data.productWorkloads,
                    pageTotal1: res.data.data.num
                })
            }else{
                this.setState({
                    dataSource1: [],
                    pageTotal1: 0
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
    searchMethods1() {
        this.initData1(1);
        this.setState({
            currentPage1: 1
        })
    }
    donload() {

    }
    tabSwitch(index) {
        this.setState({currentIndex: index})
        if(index==0) {
            console.log("成品统计")
            this.initData(this.state.currentPage);
        }else if(index==1) {
            console.log("工作量");
            this.initData1(this.state.currentPage1);
        }
    }
    details(row) {
        this.setState({
            visible: true
        })
        Axios.post("/self/erp/productManage/queryProductAccountingById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    obj: res.data.data.productAccounting,
                    finishProduct: res.data.data.productAccounting.productAccountingTypes
                })
            }else{
                this.setState({
                    obj: {},
                    finishProduct: []
                })
            }
        })
    }
    details1(row) {
        this.setState({
            visible1: true
        })
        Axios.post("/self/erp/productManage/queryProductWorkloadByStationNo", {stationNo: row.stationNo}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    obj1: res.data.data.productWorkload,
                    arrayList: res.data.data.productWorkload.productAccountingTypes
                })
            }else{
                this.setState({
                    obj1: {},
                    arrayList: []
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
    changePages1(val) {
        this.initData1(val);
        this.setState({
            currentPage1: val
        })
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default FinishedStatistics;