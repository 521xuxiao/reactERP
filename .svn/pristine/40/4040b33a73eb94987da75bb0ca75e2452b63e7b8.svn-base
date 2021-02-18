import React, {Component} from 'react'
import {Input, Select, DatePicker, Table, Pagination, message, Button, Modal, Cascader} from 'antd';
import Axios from 'axios';
import './leakageEvaluation.scss'
import {ExclamationCircleOutlined} from "@ant-design/icons";
const {Column} = Table
const {confirm} = Modal
class LeakageEvaluation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pageTotal: 0,
            currentPage: 1,
            pageSize: 10,
            modalCheck: []
        }
    }
    render() {
        return(
            <div id="leakageEvaluation">
                <div className="leakageEvaluation">
                    <div className="bg">
                        <button className="searchs" onClick={this.add.bind(this)}>异常处理</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource} rowSelection={{
                            onChange: this.onSelectChange.bind(this)
                        }} locale={{emptyText: '暂无数据'}}>
                            <Column title="入库单名称" dataIndex="sheetName" key="sheetName" align="center"/>
                            {/*<Column title="质检单编码" dataIndex="qualityCheckSheetCode" key="qualityCheckSheetCode" align="center"/>*/}

                            <Column title="仓库" dataIndex="realname" key="realname" align="center" render={(text, record)=>(
                                <span>{record.warehouseAreaName}{record.warehouseName}</span>
                            )}/>
                            <Column title="入库类型" dataIndex="inboundType" key="inboundType" align="center" render={(text)=>(
                                <span>{text==1?'采购入库':text==2?'生产剩余入库':'移库入库'}</span>
                            )}/>
                            <Column title="状态" dataIndex="statusIntro" key="statusIntro" align="center"/>
                            <Column title="桶编码" dataIndex="bucketCode" key="bucketCode" align="center"/>
                            <Column title="入库时间" dataIndex="warehousingTime" key="warehousingTime" align="center"/>
                            <Column title="重量" dataIndex="realWeight" key="realWeight" align="center"/>
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotal} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotal} showSizeChanger={false}/>
                    </div>
                </div>
            </div>
        )
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize
        };
        Axios.post('/self/erp/warehousing/queryUncheckedWarehousingSheet', params).then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                if(res.data.data.uncheckedWarehousingSheets && res.data.data.uncheckedWarehousingSheets.length) {
                    res.data.data.uncheckedWarehousingSheets.forEach((item)=>{
                        item.key = item.id;
                    })
                }
                this.setState({
                    dataSource: res.data.data.uncheckedWarehousingSheets,
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
    onSelectChange(item) {
        // console.log(item);
        this.setState({
            modalCheck: item
        })
    }
    changePages(val) {
        this.initData(val);
        this.setState({
            currentPage: val
        })
    }
    add() {
        if(this.state.modalCheck.length==0) {
            message.warning("请选中数据在进行异常处理");
            return false;
        }
        let that = this;
        confirm({
            title: '你确定要处理异常吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
                let params = {
                    ids: that.state.modalCheck
                };
                Axios.post('/self/erp/warehousing/uncheckedWarehousingHandling', params).then((res)=>{
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
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default LeakageEvaluation