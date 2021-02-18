import React, {Component} from 'react';
import Axios from 'axios';

import { Table, Input,Space, Button,message, Pagination , Modal, Select, InputNumber} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './weighingBuckles.scss';
const {Column} = Table;
const {Option} = Select;
const { confirm } = Modal;
class WeighingBuckles extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            currentPage: 1, pageSize: 10, pageTotal: 0,
            msg: '',
            flag: 1,
            visible: false,
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
            weighingDiscountWeight: ''
        }
    }
    render() {
        return(
            <div id="weighingBuckles">
                <div className="weighingBuckles">
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )} fixed="left"/>
                            <Column fixed="left" title="评级单名称" dataIndex="sheetName" key="sheetName" align="center"/>
                            {/*<Column title="抽检单名称" dataIndex="randomCheckSheetName" key="randomCheckSheetName" align="center"/>*/}
                            <Column title="桶编码" dataIndex="bucketCode" key="bucketCode" align="center"/>
                            <Column title="评级扣称" dataIndex="ratingDiscountWeight" key="ratingDiscountWeight" align="center"/>
                            <Column title="称重扣称" dataIndex="weighingDiscountWeight" key="weighingDiscountWeight" align="center"/>
                            <Column title="制单人" dataIndex="createdName" key="createdName" align="center"/>
                            <Column title="修改时间" dataIndex="modifiedTime" key="modifiedTime" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records" fixed="right"
                                render={(text, record) => (
                                    <Space size="large">
                                        {/*<span key={"changes"} onClick={this.changes.bind(this, record)} className="changes">编辑</span>*/}
                                        {/*<span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes">删除</span>*/}
                                        <span key={"details"} onClick={this.details.bind(this, record)} className="details span11">详情</span>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotal} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotal} showSizeChanger={false}/>
                    </div>

                    <Modal title={this.state.msg} width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">评价单编码</span>
                                        <Input allowClear onChange={(e)=>{this.setState({sheetCode: e.target.value})}} value={this.state.sheetCode} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">评价单名称</span>
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
                                        <span className="span1">桶编码</span>
                                        <Input allowClear onChange={(e)=>{this.setState({bucketCode: e.target.value})}} value={this.state.bucketCode} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">抽检单名称</span>
                                        <Input allowClear onChange={(e)=>{this.setState({randomCheckSheetName: e})}} value={this.state.randomCheckSheetName} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">桶名称</span>
                                        <Input allowClear onChange={(e)=>{this.setState({bucketName: e.target.value})}} value={this.state.bucketName} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">批次号</span>
                                        <Input allowClear value={this.state.batchNumber} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">注册果园号</span>
                                        <Input allowClear onChange={(e)=>{this.setState({registrationCode: e.target.value})}} value={this.state.registrationCode} className={"input3"}
                                               disabled/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">评级扣称</span>
                                        <Input allowClear value={this.state.ratingDiscountWeight} className={"input3"}
                                               disabled/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1">
                                        <span className="span1">称重扣称</span>
                                        <InputNumber allowClear onChange={(e)=>{this.setState({weighingDiscountWeight: e})}} value={this.state.weighingDiscountWeight} className={"input3"}
                                               disabled={this.state.flag==3?true:false}/>
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
                </div>
            </div>
        )
    }
    initData(currentPage) {
        Axios.post('/self/erp/warehousing/queryWeighingSheet', {currentPage, pageSize: this.state.pageSize}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    dataSource: res.data.data.weighingSheets,
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
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    changes(row) {

    }
    deletes(row) {

    }
    details(row) {
        this.setState({
            visible: true,
            msg: '详情',
            flag: 3,

            sheetCode: row.sheetCode,
            sheetName: row.sheetName,
            createdName: row.createdName,
            createdTime: row.createdTime,
            bucketCode: row.bucketCode,
            randomCheckSheetName: row.randomCheckSheetName,
            bucketName: row.bucketName,
            batchNumber: row.batchNumber,
            registrationCode: row.registrationCode,
            ratingDiscountWeight: row.ratingDiscountWeight,
            weighingDiscountWeight: row.weighingDiscountWeight
        })
    }
    handleOk() {

    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default WeighingBuckles;