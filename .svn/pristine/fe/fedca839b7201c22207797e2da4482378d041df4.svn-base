import React, {Component} from "react";
import {
    Input,
    Select,
    Table,
    Space,
    Pagination,
    Modal,
    DatePicker,
    Button,
    InputNumber,
    Cascader,
    message,
    TreeSelect
} from 'antd';
import "./cachet.scss"
import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const {Column} = Table;
const {Option} = Select; const { RangePicker } = DatePicker;
const {TextArea}= Input;
class Cachet extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotal: 0,


            msg: "",   visible: false,   flag: 0,   options: [],    userList: [],
            modalName: "",   deptId: '',    dataTime: '',    info: '',   userId: ''
        }
    }
    render() {
        return(
            <div id="cachet">
                <div className="cachet">
                    <div className="placeSearch">
                        <span className="span1">姓名</span>
                        <Input className="input1" allowClear onChange={(e)=>{this.setState({name: e.target.value})}}/>
                        <button className="searchs" onClick={this.searchMethods.bind(this)}>查询</button>
                    </div>
                    <div className="bg">
                        <button className="searchs" onClick={this.add.bind(this)}>新增</button>
                        <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource} locale={{emptyText:"暂无数据"}}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )}/>
                            <Column title="用户" dataIndex="username" key="username" align="center"/>
                            <Column title="部门" dataIndex="deptName" key="deptName" align="center"/>
                            <Column title="使用时间" dataIndex="workroomName" key="workroomName" align="center" render={(text, record)=>(
                                <span>{record.startTime}--{record.endTime}</span>
                            )}/>
                            <Column title="用章事由" dataIndex="useReason" key="useReason" align="center"/>
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

                    <Modal title={this.state.msg} width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*部门</span>
                                        <TreeSelect showSearch className={"input3"} value={this.state.deptId}
                                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                    placeholder=""  allowClear treeDefaultExpandAll onChange={(val)=>{this.userListMethods(val);this.setState({deptId: val, userId: ''})}}
                                                    treeData={this.state.options}
                                                    disabled={this.state.flag==3?true:false}>
                                        </TreeSelect>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">*用户</span>
                                        <Select onChange={(value)=>{this.setState({userId: value})}} value={this.state.userId} allowClear className={"input3"}
                                                disabled={this.state.flag==3?true:false}>
                                            {
                                                this.state.userList.map((item, index)=>{
                                                    return(
                                                        <Option key={item.id}>{item.realname}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">*用章时间</span>
                                        <RangePicker className="input3" onChange={(d1,d2)=>{this.setState({dataTime:d2})}}
                                                     value={this.state.dataTime!=''&&this.state.dataTime!=null&&this.state.dataTime!=undefined?
                                                         [moment(this.state.dataTime[0], "YYYY-MM-DD"), moment(this.state.dataTime[1],"YYYY-MM-DD")]: []}
                                                     locale={locale} allowClear={false}
                                                     disabled={this.state.flag==3?true:false}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1 li3">
                                        <span className="span1">*用章事宜</span>
                                        <TextArea allowClear value={this.state.info} onChange={(e)=>{this.setState({info: e.target.value})}} disabled={this.state.flag==3?true:false}/>
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
        }
        Axios.post("/self/erp/finance/queryOfficialSealUseRedords", params).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                res.data.data.officialSealUseRedords.forEach((item)=>{
                    item.key = item.id;
                })
                this.setState({
                    dataSource: res.data.data.officialSealUseRedords,
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
    add() {
        this.departmentList();
        this.setState({
            visible: true,
            flag: 1,
            msg: "新增",
            modalName: "",   deptId: '',    dataTime: '',    info: '',   userId: ''
        })
    }
    // 部门下拉框
    departmentList() {
        Axios.post('/self/erp/dept/queryDept').then((res)=>{
            // console.log(res.data);
            if(res.data.success) {
                this.deptAgin(res.data.data.deptList);
            }else{
                this.setState({
                    options: []
                })
            }
        })
    }
    // 递归部门级联狂
    deptAgin(arr) {
        if(arr && arr.length) {
            arr.forEach((item, index)=>{
                item.title = item.deptName;
                item.value = item.deptId;
                delete item.deptName;
                delete item.deptId;
                if(item.children && item.children.length) {
                    this.deptAgin(item.children);
                }
            })
        }
        this.setState({
            options: arr
        })
    }
    userListMethods(id) {
        Axios.post("/self/erp/dept/queryDeptUsers", {deptId: id}).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                this.setState({
                    userList: res.data.data.userList
                })
            }else{
                this.setState({
                    userList: []
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
    donload() {

    }
    details(row) {
        let startTime = "", endTime= '';
        if(row.startTime.indexOf(" ") != -1) {
            startTime = row.startTime.split(" ")[0]
        }
        if(row.endTime.indexOf(" ") != -1) {
            endTime = row.endTime.split(" ")[0]
        }
        this.departmentList();
        this.setState({
            visible: true,
            flag: 3,
            msg: "详情",
            modalName: row.username,
            deptId : row.deptId,
            dataTime: [startTime, endTime],
            userId: row.username,
            info: row.useReason
        })
    }
    handleOk() {
        console.log(this.state.dataTime)
        let params = {
            deptId: this.state.deptId,
            userId: this.state.userId,
            startTime: this.state.dataTime[0],
            endTime: this.state.dataTime[1],
            useReason: this.state.info
        };
        if(this.state.flag == 1) {
            Axios.post('/self/erp/finance/addOfficialSealUseRedord', params).then((res)=>{
                if(res.data.success) {
                    message.success("新增成功");
                    this.setState({
                        visible: false
                    })
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
}
export default Cachet;