import React, {Component} from "react";
import {Input, Select, Table, Space, Pagination, Modal, InputNumber, Button, DatePicker, Upload, message, Switch, TreeSelect} from 'antd';
import "./rawMaterials.scss"
import Axios from 'axios';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const {Option} = Select;
const {Column} = Table;
class RawMaterials extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deliveryDate: '',
            storesRequisition: '',   storesRequisitionList: [],
            genre: '',   genreList: [],
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,
            visible: false,
            obj: {},
            List: []
        }
    }
    render() {
        return(
            <div className="rawMaterials">
                <div className="placeSearch">
                    <span className="span1">日期</span>
                    <DatePicker onChange={(e, time)=>{
                        this.setState({deliveryDate: time})
                    }}
                    value={this.state.deliveryDate==undefined || this.state.deliveryDate=='' ?"":moment(this.state.deliveryDate, 'YYYY-MM-DD')} locale={locale}
                    className="input1"/>
                    <span className="span1 span2">领料部门</span>
                    <Select allowClear className="input1" onChange={(e)=>{this.setState({storesRequisition: e})}}>
                        {
                            this.state.storesRequisitionList.map((item)=>{
                                return(
                                    <Option value={item.value} key={item.value}>{item.label}</Option>
                                )
                            })
                        }
                    </Select>

                    <span className="span1 span2">类型</span>
                    <Select allowClear className="input1" onChange={(e)=>{this.setState({genre: e})}}>
                        {
                            this.state.genreList.map((item)=>{
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
                        <Column title="时间" dataIndex="createdTime" key="createdTime" align="center"/>
                        <Column title="编码" dataIndex="code" key="code" align="center"/>
                        <Column title="领料部门" dataIndex="deptName" key="deptName" align="center"/>
                        <Column title="类型" dataIndex="type" key="type" align="center" render={(text)=>(
                            <span>{text==1?"出库凭证":"越库"}</span>
                        )}/>
                        <Column title="发料仓库" dataIndex="warehouseName" key="warehouseName" align="center"/>
                        <Column title="实领桶数" dataIndex="outboundNum" key="outboundNum" align="center"/>
                        <Column title="实领重量" dataIndex="number" key="number" align="center"/>
                        <Column title="制单" dataIndex="createdName" key="createdName" align="center"/>
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
                                <span className="salesInvoiceSpan">类型</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.type==1?"出库凭证":"越库"} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">日期</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.createdTime} disabled/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">制单人</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.createdName} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">领料部门</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.deptName} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">领料仓库</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.warehouseName} disabled/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">预领桶数</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.tobeOutboundNum} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">实领桶数</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.outboundNum} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">实领重量</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.number} disabled/>
                                </div>
                            </li>
                        </ul>
                        <ul className="salesInvoiceUl salesInvoiceUl1">
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">桶数</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.outboundNum} disabled/>
                                </div>
                            </li>
                            <li className="salesInvoiceLi">
                                <span className="salesInvoiceSpan">重量</span>
                                <div className="salesInvoiceDiv1">
                                    <Input allowClear value={this.state.obj.number} disabled/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="placeStatus">
                        <h3 className="placeStatus_h3">出库记录</h3>
                        <ol className="placeStatus_h3_ol1">
                            {this.state.List.map((item, index)=>{
                                return(
                                    <li className="placeStatus_h3_ol1_li1" key={index}>
                                        <span className="placeStatus_h3_span1">{item.outboundTime}</span>
                                        <span className="placeStatus_h3_span1">{item.rfidCode}</span>
                                        <span className="placeStatus_h3_span1">{item.sheetName}</span>
                                        <span className="placeStatus_h3_span1">{item.realWeight}</span>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                    <div className="placeStatus">
                        <h3 className="placeStatus_h3">领取记录</h3>
                        <ol className="placeStatus_h3_ol1">
                            {this.state.List.map((item, index)=>{
                                return(
                                    <li className="placeStatus_h3_ol1_li1" key={index}>
                                        <span className="placeStatus_h3_span1">{item.outboundTime}</span>
                                        <span className="placeStatus_h3_span1">{item.rfidCode}</span>
                                        <span className="placeStatus_h3_span1">{item.sheetName}</span>
                                        <span className="placeStatus_h3_span1">{item.realWeight}</span>
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                    <div className="div4">
                        <li className="li4">
                            <Button className="btn4" type="danger" onClick={()=>{this.setState({visible: false})}}>取消</Button>
                        </li>
                    </div>
                </Modal>
            </div>
        )
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize
        }
        Axios.post("/self/erp/productManage/queryAllOutboundPrerecord", params).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                res.data.data.outboundPrerecords.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.outboundPrerecords,
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
        this.initData(this.state.currentPage);
    }
    donload() {

    }
    details(row) {
        this.setState({
            visible: true
        })
        Axios.post("/self/erp/productManage/queryOutboundPrerecordById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    obj: res.data.data.outboundPrerecord,
                    List: res.data.data.outboundPrerecord.qualityCheckSheets
                })
            }else{
                this.setState({
                    obj: {},
                    List: []
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
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default RawMaterials;