import React, {Component} from 'react'
import {Input, Table, Space, Pagination, Modal, Select, Button, InputNumber, message} from 'antd';
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './qualityOrder.scss'
const {Column} = Table;
const {Option} = Select;
const {confirm} = Modal;
class QualityOrder extends Component{
    constructor(props) {
        super(props);
        this.downLoadBtn = "";  this.deleteBtn = "";  this.changeBtn = "";
        this.state = {
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotle: 0,
            visible: false,
            specification: '',
            specificationList: [],
            levelId: '',
            levelIdList: [],
            barrelsMaterial: '',  barrelsMaterialList: [],
            distributor: '',   distributorList: [],
            gardenId: '',  gardenIdList: [],
            weight: null,
            id: '',
            msg: '',
            flag: 1,

            /////////////////////////////////////////////////  搜索的数据    //////////////////////////////////////////////////
            name: '',          code: '',
            commission: '',    commissionList: [],
            touchingList: [],  touching: '',

            ///////////////////////////////////////////  模态框里面的数据    ////////////////////////////////////////////////////
            sheetCode: '',
            sheetName: '',
            createdName: '',
            createdTime: '',
            bucketCode: '',
            randomCheckSheetName: '',
            bucketName: '',
            batchNumber: '',
            registrationCode: '',
            ratingDiscountWeight: '',
            weighingDiscountWeight: '',
            flag2: true,
            ulList: [],   //     箱的原料规格
            bucketNames: '',
            materialVarietys: '',
            materialStandards: '',
            materialLevels: '',
            realWeight: '',
            status: '',
            inboundTime: '',
            warehouseName: '',
            outboundTime: '',
        }
    }
    render() {
        return(
            <div id="qualityOrder">
                <div className="qualityOrder">
                    <div className="placeSearch">
                        <span className="span1">评级单名称</span>
                        <Input className="input1" allowClear onChange={(e)=>{this.setState({name: e.target.value})}} value={this.state.name}/>
                        <span className="span1 span2">桶/架编号</span>
                        <Input className="input1" allowClear onChange={(e)=>{this.setState({code: e.target.value})}} value={this.state.code}/>
                        <span className="span1 span2">代办</span>
                        <Select value={this.state.commission} onChange={(e)=>{this.setState({commission: e})}} className="input1" allowClear>
                            {this.state.commissionList.map((item, index)=>{
                                return(
                                    <Option value={item.id} key={item.id}>{item.supplierName}</Option>
                                )
                            })}
                        </Select>
                        <span className="span1 span2">制单</span>
                        <Select value={this.state.touching} onChange={(e)=>{this.setState({touching: e})}} className="input1" allowClear>
                            {this.state.touchingList.map((item, index)=>{
                                return(
                                    <Option value={item.empno} key={item.empno}>{item.realname}</Option>
                                )
                            })}
                        </Select>
                        <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                    </div>
                    <div className="bg">
                        {/*<button className="searchs searchs1" onClick={this.downLoad.bind(this)}*/}
                        {/*        style={this.downLoadBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}*/}
                        {/*>导出</button>*/}
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="60px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )}/>
                            <Column title="评级单编码" dataIndex="code" key="code" align="center"/>
                            <Column title="评级单名称" dataIndex="sheetName" key="sheetName" align="center"/>
                            <Column title="类型" dataIndex="type" key="type" align="center" render={(text)=>(
                                <span>{text=='box'?"箱":"桶"}</span>
                            )}/>
                            <Column title="桶/架编号" dataIndex="bucketCode" key="bucketCode" align="center"/>
                            <Column title="代办" dataIndex="supplierName" key="supplierName" align="center"/>
                            <Column title="制单" dataIndex="createdName" key="createdName" align="center"/>
                            <Column title="修改时间" dataIndex="modifiedTime" key="modifiedTime" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records" width="200px" fixed="right"
                                render={(text, record) => (
                                    <Space size="large">
                                        {/*<span key={"changes"} onClick={this.changes.bind(this, record)} className="changes"*/}
                                        {/*      style={this.changeBtn == 1 ? {display: 'inlineBlock'} : {display: "none"}}*/}
                                        {/*>编辑</span>*/}
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
                                    <li className="li1">
                                        <span className="span1">编码</span>
                                        <Input allowClear onChange={(e)=>{this.setState({sheetCode: e.target.value})}} value={this.state.sheetCode} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">名称</span>
                                        <Input allowClear onChange={(e)=>{this.setState({sheetName: e.target.value})}} value={this.state.sheetName} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">制单人</span>
                                        <Input allowClear onChange={(e)=>{this.setState({createdName: e.target.value})}} value={this.state.createdName} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">制单时间</span>
                                        <Input allowClear value={this.state.createdTime} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">抽检编码</span>
                                        <Input allowClear onChange={(e)=>{this.setState({bucketCode: e.target.value})}} value={this.state.bucketCode} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">抽检名称</span>
                                        <Input allowClear onChange={(e)=>{this.setState({randomCheckSheetName: e})}} value={this.state.randomCheckSheetName} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">代办</span>
                                        <Input allowClear onChange={(e)=>{this.setState({bucketName: e.target.value})}} value={this.state.bucketName} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">批次号</span>
                                        <Input allowClear value={this.state.batchNumber} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">果园号</span>
                                        <Input allowClear onChange={(e)=>{this.setState({registrationCode: e.target.value})}} value={this.state.registrationCode} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    {/*<li className="li1 li2">*/}
                                    {/*    /!*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*!/*/}
                                    {/*    <span className="span1">铁架编号</span>*/}
                                    {/*    <Input allowClear value={this.state.ratingDiscountWeight} className={"input3"}*/}
                                    {/*           disabled={this.state.flag==3?true:false}/>*/}
                                    {/*</li>*/}
                                </ul>
                                {this.state.ulList.map((item)=>{    // 显示桶的数据
                                    return(
                                        <>
                                            <ul className="ul1 ul2">
                                                <li className="li1">
                                                    <span className="span1">原料品种</span>
                                                    <Input allowClear value={item.materialVariety} className={"input3"}
                                                           disabled={this.state.flag==3?true:false}/>
                                                </li>
                                                <li className="li1 li2">
                                                    {/*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*/}
                                                    <span className="span1">原料规格</span>
                                                    <Input allowClear value={item.materialStandard} className={"input3"}
                                                           disabled={this.state.flag==3?true:false}/>
                                                </li>
                                            </ul>
                                            <ul className="ul1 ul2">
                                                <li className="li1">
                                                    <span className="span1">原料等级</span>
                                                    <Input allowClear value={item.materialLevel} className={"input3"}
                                                           disabled={this.state.flag==3?true:false}/>
                                                </li>
                                                <li className="li1 li2">
                                                    {/*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*/}
                                                    <span className="span1">箱数</span>
                                                    <Input allowClear value={item.boxNum} className={"input3"}
                                                           disabled={this.state.flag==3?true:false}/>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                })}
                                {/*桶的显示*/}
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">RFID编码</span>
                                        <Input allowClear value={this.state.ratingDiscountWeight} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        {/*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*/}
                                        <span className="span1">原料桶</span>
                                        <Input allowClear value={this.state.bucketNames} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">原料品种</span>
                                        <Input allowClear value={this.state.materialVarietys} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        {/*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*/}
                                        <span className="span1">原料规格</span>
                                        <Input allowClear value={this.state.materialStandards} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">原料等级</span>
                                        <Input allowClear value={this.state.materialLevels} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                    <li className="li1 li2">
                                        {/*style={this.state.flag2?{display: 'inline-block'}:{display: 'none'}}*/}
                                        <span className="span1">重量</span>
                                        <Input allowClear value={this.state.realWeight} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                {/*下面状态的数据*/}
                                <div className="placeStatus">
                                    <li className="li1">
                                        <span className="span1">状态: </span>
                                        <span className="span2">{this.state.status==0?"未入库":this.state.status==1?"已入库":this.state.status==2?"已出库":"越库"}</span>
                                    </li>
                                    <li className="li1" style={this.state.createdTime == null || this.state.createdTime == undefined ? {display: 'none'} :{display: 'inline-block'}}>
                                        <span className="span1">{this.state.createdTime} </span>
                                        <span className="span2">评级</span>
                                        <span className="span2">{this.state.createdName}</span>
                                    </li>
                                    <li className="li1" style={this.state.inboundTime == null || this.state.inboundTime == undefined ? {display: 'none'} :{display: 'inline-block'}}>
                                        <span className="span1">{this.state.inboundTime} </span>
                                        <span className="span2">入库</span>
                                        <span className="span2">{this.state.warehouseName}</span>
                                    </li>
                                    <li className="li1" style={this.state.outboundTime == null || this.state.outboundTime == undefined ? {display: 'none'} :{display: 'inline-block'}}>
                                        <span className="span1">{this.state.outboundTime} </span>
                                        <span className="span2">出库</span>
                                        <span className="span2">未出库</span>
                                    </li>
                                </div>
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
                </div>
            </div>
        )
    }
    initData(currentPage) {
        let params =  {
            pageSize: this.state.pageSize,
            currentPage,
            createdUser: this.state.touching,
            sheetName: this.state.name,
            supplierId: this.state.commission,
            bucketCode: this.state.code
        };
        Axios.post('/self/erp/qualityCheck/queryCheckSheet', params).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                res.data.data.qualityCheckSheets.forEach((item)=>{
                    item.key = item.id;
                });
                this.setState({
                    dataSource: res.data.data.qualityCheckSheets,
                    pageTotle: res.data.data.num
                })
            }else{
                this.setState({
                    dataSource: [],
                    pageTotle: 0
                })
            }
        })
    }
    searchMethods() {
        this.initData(1);
        this.setState({
            currentPage:1
        })
    }
    //
    specificationListMethods() {
        Axios.post('/self/erp/randomCheck/querySupplier', {}).then((res)=>{   // 代办
            // console.log(res.data);
            if(res.data.success) {
                this.setState({
                    commissionList: res.data.data.suppliers
                })
            }else{
                this.setState({
                    commissionList: []
                })
            }
        })
        Axios.post('/self/erp/baseinfo/queryUser', {}).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                this.setState({
                    touchingList: res.data.data.users
                })
            }else{
                this.setState({
                    touchingList: []
                })
            }
        })
    }
    changes(row) {
        // this.specificationListMethods();
        this.setState({
            visible: true,
            id: row.id,
            msg: '修改',
            flag: 0,
            specification: row.standard,
            levelId: row.level,
            barrelsMaterial: row.bucketMaterial,
            distributor: row.supplierId,
            gardenId: row.orchardId,
            weight: row.discountWeight
        })
    }
    details(row) {
        this.setState({
            visible: true,
            id: row.id,
            msg: '详情',
            flag: 3,
            flag2: row.type=='box'?true:false
        })
        Axios.post("/self/erp/qualityCheck/queryCheckSheetById", {id: row.id}).then((res)=>{
            if(res.data.success) {
                let obj = res.data.data.qualityCheckSheet;
                console.log(obj)
                this.setState({
                    sheetCode: obj.code,
                    sheetName: obj.sheetName,
                    createdName: obj.createdName,
                    createdTime: obj.createdTime,
                    bucketCode: obj.randomCheckSheetCode,
                    randomCheckSheetName: obj.randomCheckSheetName,
                    bucketName: obj.supplierName,
                    batchNumber: obj.batchNumberId,
                    registrationCode: obj.registrationCode,
                    ratingDiscountWeight: obj.bucketCode,
                    bucketNames: obj.bucketName,
                    materialVarietys: obj.materialVariety,
                    materialStandards: obj.materialStandard,
                    materialLevels: obj.materialLevel,
                    realWeight: obj.realWeight,
                    status: obj.status,
                    inboundTime: obj.inboundTime,
                    outboundTime: obj.outboundTime,
                    warehouseName: obj.warehouseName,
                    ulList: obj.qualityCheckSheetBoxs
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
                Axios.post('/self/erp/qualityCheck/deleteCheckSheet', params).then((res)=>{
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
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    downLoad() {

    }
    handleOk() {
        let params = {
            id: this.state.id,
            standard: this.state.specification,
            level: this.state.levelId,
            bucketMaterial: this.state.barrelsMaterial,
            supplierId: this.state.distributor,
            orchardId: this.state.gardenId,
            discountWeight: this.state.weight
        };
        Axios.post('/self/erp/qualityCheck/updateCheckSheet', params).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                this.initData(this.state.currentPage);
                this.setState({
                    visible: false
                })
                message.success('成功');
            }else{
                message.warning(res.data.message);
            }
        })
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
        this.specificationListMethods();
    }
    componentWillMount() {
        let buttonList = JSON.parse(sessionStorage.getItem("buttonList"));
        console.log(buttonList);
        if(buttonList && buttonList.length) {
            buttonList.forEach((item)=>{
                if(item.localIndex == "1-3-1") {
                    this.changeBtn = item.flag;
                }
                if(item.localIndex == "1-3-2") {
                    this.deleteBtn = item.flag;
                }
                if(item.localIndex == "1-3-3") {
                    this.downLoadBtn = item.flag;
                }
            })
        }
    }
}
export default QualityOrder;
