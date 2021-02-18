import React, {Component} from "react";
import {Button, Table, Space, Pagination, Modal, Input, message, InputNumber} from 'antd';
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './lot.scss';
const {Column} = Table;
const {TextArea} = Input;
const {confirm} = Modal;
class Lot extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            currentPage: 1, pageSize: 10, pageTotal: 10,
            msg: '',
            visible: false,
            flag: 1,
            batchNumber: '',    times: '',
            id: '',
            disabled: false
        }
    }
    render() {
        return(
            <div id="lot">
                <div className="lot">
                    <div className="bg">
                        <button className="searchs" onClick={this.add.bind(this)}>新增</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" id="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize + index+1}</span>
                            )}/>
                            <Column title="批次号" dataIndex="batchNumber" id="batchNumber" align="center"/>
                            <Column title="有效期" dataIndex="validPeriod" id="validPeriod" align="center"/>
                            <Column title="操作" align="center" id="records" dataIndex="records"
                                render={(text, record) => (
                                    <Space size="large">
                                    <span key={"changes"} onClick={this.changes.bind(this, record)} className="changes">编辑</span>
                                        <span key={"deletes"} onClick={this.deletes.bind(this, record)} className="deletes">删除</span>
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
                                    <li className="li3 li1">
                                        <span className="span1">*批次号</span>
                                        <Input allowClear disabled={this.state.disabled} onChange={(e)=>{this.setState({batchNumber: e.target.value})}} value={this.state.batchNumber} className={"input3"}/>
                                    </li>
                                </ul>
                                <ul className="ul1 ul2">
                                    <li className="li1 li3">
                                        <span className="span1">*有效期</span>
                                        <InputNumber allowClear onChange={(e)=>{this.setState({times: e})}} value={this.state.times} className={"input3"}
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
        let params = {
            currentPage,
            pageSize: this.state.pageSize
        };
        Axios.post('/self/erp/baseinfo/queryBatchNumber', params).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                this.setState({
                    dataSource: res.data.data.batchNumbers,
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
    add() {
        this.setState({
            msg: '新增',
            flag: 1,
            visible: true,
            times: '',  batchNumber: '',
            disabled: false
        })
    }
    changes(row) {
        this.setState({
            msg: '修改',
            flag: 0,
            visible: true,
            times: row.validPeriod,  batchNumber: row.batchNumber,
            id: row.id,
            disabled: true
        })
    }
    details(row) {
        this.setState({
            msg: '详情',
            flag: 3,
            visible: true,
            times: row.validPeriod,  batchNumber: row.batchNumber,
            id: row.id,
            disabled: true
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
                Axios.post('/self/erp/baseinfo/deleteBatchNumber', params).then((res)=>{
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
    handleOk() {
        let params = {
            batchNumber: this.state.batchNumber,
            validPeriod: this.state.times
        };
        if(this.state.flag == 1) {
            Axios.post('/self/erp/baseinfo/addBatchNumber', params).then((res)=>{
                if(res.data.success) {
                    message.success("成功");
                    this.initData(this.state.currentPage);
                    this.setState({
                        visible: false
                    })
                }else{
                    message.warning(res.data.message);
                }
            })
        }else{
            params.id = this.state.id;
            Axios.post('/self/erp/baseinfo/updateBatchNumber', params).then((res)=>{
                if(res.data.success) {
                    message.success("成功");
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
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default Lot;