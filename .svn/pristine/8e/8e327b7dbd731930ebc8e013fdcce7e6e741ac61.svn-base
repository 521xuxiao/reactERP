import React, {Component} from "react"
import {Input, Select, Table, Space, Pagination, Modal, InputNumber, Button, DatePicker, Cascader, message, Switch, TreeSelect,Radio,
    Checkbox, Divider,Upload} from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { ExclamationCircleOutlined ,PlusOutlined} from '@ant-design/icons';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import "./messageLists.scss"
const {Option} = Select;
const {Column} = Table;
const {TextArea} = Input;
const { confirm } = Modal;
const {Search} = Input; const { RangePicker } = DatePicker;
class MessageLists extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusList: [],
            dataSource: [],
            currentPage: 1, pageSize: 10,
            pageTotal: 0,
            visible: false,
            files: []
        }
    }
    render() {
        return(
            <div className="messageLists">
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
                    <span className="span1 span2">标题</span>
                    <Input className="input1" allowClear onChange={(e)=>{this.setState({title: e.target.value})}}/>
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
                    {/*<button className="searchs" onClick={this.add.bind(this)}>新增</button>*/}
                </div>
                <div className="placeTable">
                    <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText: '暂无数据'}}>
                        <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                            <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                        )}/>
                        <Column title="日期" dataIndex="modifiedTime" key="modifiedTime" align="center"/>
                        <Column title="标题" dataIndex="messageTitle" key="messageTitle" align="center"/>
                        <Column title="发文人" dataIndex="createdName" key="createdName" align="center"/>
                        <Column title="状态" dataIndex="isRead" key="isRead" align="center" render={(text)=>(
                            <span>{text==0?"未读":text==1?"已读":"-"}</span>
                        )}/>
                        <Column title="操作" align="center" key="records" dataIndex="records" width="240px"
                            render={(text, record) => (
                                <Space size="large">
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

                <Modal title="详情" width="80%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                    <div className="modal1">
                        <div className="div3">
                            <h2 className="h4">{this.state.messageTitle}</h2>
                            <h5 className="h5">{this.state.modifiedTime}</h5>
                            <p className="p1">{this.state.messageContent}</p>
                            {this.state.files.map((item, index)=>{
                                return(
                                    <img className="img111" key={index} src={JSON.parse(sessionStorage.getItem("userInfo"))["host"]+item.fileAddr}/>
                                )
                            })}
                        </div>
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
        Axios.post("/self/erp/message/queryUserMessages", params).then((res)=>{
            if(res.data.success) {
                res.data.data.messages.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.messages,
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
                Axios.post('/self/erp/message/deleteUserMessage', params).then((res)=>{
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
    details(row) {
        this.setState({
            visible: true
        })
        Axios.post("/self/erp/message/queryUserMessageById", {messageId: row.messageId}).then((res)=>{
            if(res.data.success) {
                this.setState({
                    messageTitle: res.data.data.message.messageTitle,
                    modifiedTime: res.data.data.message.modifiedTime,
                    messageContent: res.data.data.message.messageContent,
                    files: res.data.data.message.files
                })
            }else{
                this.setState({
                    messageTitle: "",
                    modifiedTime: "",
                    messageContent: "",
                    files: []
                })
            }
        })
    }
    changePages(currentPage) {
        this.initData(currentPage);
        this.setState({currentPage});
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default MessageLists;