import React, {Component} from 'react';
import {Input, Select, DatePicker, Table, Pagination} from 'antd';
import Axios from 'axios';
import './labelAccessRecord.scss';
const {Option} = Select;
const {RangePicker } =  DatePicker;
const {Column} =  Table;
class LabelAccessRecord extends Component{
    constructor(props) {
        super(props);
        this.state = {
            typeList: [{label: '入库异常', value: 0}, {label: '出库异常', value: 1}, {label: '其他异常', value: 2}],   typeId: '',    code: '',
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0
        }
    }
    render() {
        return(
            <div id="labelAccessRecord">
                <div className="labelAccessRecord">
                    <div className="placeSearch">
                        <div className="left1">
                            <span className="span1">桶编码</span>
                            <Input onChange={(e)=>{this.setState({code: e.target.value})}} className="input1" allowClear/>
                        </div>
                        <div className="left1">
                            <span className="span1">类型</span>
                            <Select className="input1" allowClear onChange={(e)=>{this.setState({typeId: e})}}>
                                {
                                    this.state.typeList.map((item, index)=>{
                                        return(
                                            <Option value={item.value} key={index}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="btn">
                            <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                        </div>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                            <Column title="桶编码" dataIndex="bucket_code" key="bucket_code" align="center"/>
                            <Column title="仓库名" dataIndex="house_name" key="house_name" align="center"/>
                            <Column title="类型" dataIndex="type" key="type" align="center" render={(text)=>(
                                <span>{text==0?"入库异常":text==1?"出库异常":text==2?"其他异常":""}</span>
                            )}/>
                            <Column title="异常时间" dataIndex="time" key="time" align="center"/>
                            <Column title="出入库记录" dataIndex="log" key="log" align="center"/>
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
            pageSize: this.state.pageSize,
            bucket_code: this.state.code,
            type: this.state.typeId
        };
        Axios.post('/self/erp/rfidCheck/queryRfidCheckErrorLog', params).then((res)=>{
            if(res.data.success) {
                this.setState({
                    dataSource: res.data.data.rfidCheckErrorDatas,
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
export default LabelAccessRecord;