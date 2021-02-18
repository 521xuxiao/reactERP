import React, {Component} from 'react';
import {Input, Select, DatePicker, Table, Pagination} from 'antd';
import Axios from 'axios';
import './outboundDeliveryOrder.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
const {Option} = Select;
const {RangePicker } =  DatePicker;
class OutboundDeliveryOrder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            typeId: '',   typeIdList: [{label: '生产出库', value: 1}, {label: '采购退货出库', value: 2}, {label: '移库出库', value: 3}],
            startTime: '',  endTime: '',
            currentPage: 1,
            pageSize: 10,
            pageTotle: 0,
            dataSource: []
        }
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (text, record, index)=>(
                    <span>{(index+1) + (this.state.currentPage-1)* this.state.pageSize}</span>
                )
            },
            {
                title: '出库单名称',
                dataIndex: 'sheetName',
                key: 'sheetName',
                align: 'center'
            } ,
            {
                title: '桶编码',
                dataIndex: 'bucketCode',
                key: 'bucketCode',
                align: 'center'
            },
            {
                title: '出库重量',
                dataIndex: 'warehouseOutWeight',
                key: 'warehouseOutWeight',
                align: 'center'
            },
            {
                title: '制单人',
                dataIndex: 'realName',
                key: 'realName',
                align: 'center'
            },
            {
                title: '出库类型',
                dataIndex: 'outboundType',
                key: 'outboundType',
                align: 'center',
                render: (text)=>(
                    <span>{text==1?"生产出库":text==2?"采购退货出库":"移库出库"}</span>
                )
            },
            {
                title: '出库时间',
                dataIndex: 'outboundTime',
                key: 'outboundTime',
                align: 'center'
            }
        ];
        return(
            <div id="outboundDeliveryOrder">
                <div className="outboundDeliveryOrder">
                    <div className="placeSearch">
                        <div className="left1">
                            <span className="span1">出库单号</span>
                            <Input onChange={(e)=>{this.setState({code: e.target.value})}} className="input1" allowClear/>
                        </div>
                        <div className="left1">
                            <span className="span1">出库类型</span>
                            <Select className={"input1"} allowClear onChange={(e)=>{this.setState({typeId: e})}}>
                                {
                                    this.state.typeIdList.map((item, index)=>{
                                        return(
                                            <Option value={item.value} key={index}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="left1 left2">
                            <span className="span1">时间</span>
                            <RangePicker renderExtraFooter={() => 'extra footer'} className="input1 input2" showTime locale={locale} onChange={this.timePick.bind(this)}/>
                        </div>
                        <div className="btn">
                            <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                        </div>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} columns={columns} dataSource={this.state.dataSource}></Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotle} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotle} showSizeChanger={false}/>
                    </div>
                </div>
            </div>
        )
    }
    timePick(dates, pickys) {
        if(pickys[0]) {
            this.setState({
                startTime: pickys[0],
                endTime: pickys[1]
            })
        }else{
            this.setState({
                startTime: "",
                endTime: ""
            })
        }
    }
    initData(currentPage) {
        let params = {
            currentPage,
            pageSize: this.state.pageSize,
            sheetCode: this.state.code,
            outboundType: this.state.typeId,
            outboundTimeStart: this.state.startTime,
            outboundTimeEnd: this.state.endTime
        };
        Axios.post('self/erp/warehouseout/queryWareHouseOutSheet', params).then((res)=>{
            if(res.data.success) {
                res.data.data.outHouseSheetDatas.forEach((item)=>{
                    item.key = item.sheetCode;
                });
                this.setState({
                    dataSource: res.data.data.outHouseSheetDatas,
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
        this.setState({
            currentPage: 1
        });
        this.initData(1);
    }
    changePages(val) {
        this.setState({
            currentPage: val
        });
        this.initData(val);
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default OutboundDeliveryOrder;