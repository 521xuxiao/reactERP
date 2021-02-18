import React, {Component} from 'react';
import {Input, Select, Table, Space, Pagination, Modal,DatePicker,Button,InputNumber,Cascader,message} from 'antd';
import Axios from 'axios';
import "./materialManagement.scss";
const {Column} = Table;
const {Option} = Select; const { RangePicker } = DatePicker;
class MaterialManagement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            currentPage: 1,
            pageSize: 10,
            pageTotle: 0,
            visible: false,
            obj: {},
            modalData: []
        }
    }
    render() {
        return(
            <div id="materialManagement">
                <div className="materialManagement">
                    <div className="bg">
                        <button className="searchs searchs1" onClick={this.donload.bind(this)}>导出</button>
                    </div>
                    <div className="placeTable">
                        <Table pagination={false} dataSource={this.state.dataSource}>
                            <Column title="序号" align="center" key="index" dataIndex="index" width="100px" render={(text, record, index)=>(
                                <span>{(this.state.currentPage-1)*this.state.pageSize+index+1}</span>
                            )}/>
                            <Column title="名称" dataIndex="name" key="name" align="center"/>
                            <Column title="原料规格" dataIndex="rawMaterialStandard" key="rawMaterialStandard" align="center"/>
                            <Column title="原料等级" dataIndex="rawMaterialLevel" key="rawMaterialLevel" align="center"/>
                            <Column title="质检人" dataIndex="checkmanName" key="checkmanName" align="center"/>
                            <Column title="车间" dataIndex="workroomName" key="workroomName" align="center"/>
                            <Column title="操作" align="center" key="records" dataIndex="records"
                                render={(text, record) => (
                                    <Space size="large">
                                        <span key={"changes"} onClick={this.details.bind(this, record)} className="changes">详情</span>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    <div className="placePagination">
                        <Pagination showTotal={()=>`共 ${this.state.pageTotle} 条`} current={this.state.currentPage} onChange={this.changePages.bind(this)} pageSize={this.state.pageSize} total={this.state.pageTotle} showSizeChanger={false}/>
                    </div>

                    <Modal title="详情" width="60%" footer={null} getContainer={false} closable={false}  visible={this.state.visible} centered={true}>
                        <div className="modal1">
                            <div className="div3">
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">任务编码</span>
                                        <Input disabled value={this.state.obj.taskCode} className={"input3"}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">原料规格</span>
                                        <Input disabled value={this.state.obj.rawMaterialStandard} className={"input3"}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">原料等级</span>
                                        <Input disabled value={this.state.obj.rawMaterialLevel} className={"input3"}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">总重量</span>
                                        <Input disabled value={this.state.obj.totalRawMaterialWeight} className={"input3"}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">车间名称</span>
                                        <Input disabled value={this.state.obj.workroomName} className={"input3"}/>
                                    </li>
                                    <li className="li1 li2">
                                        <span className="span1">质检人</span>
                                        <Input disabled value={this.state.obj.checkmanName} className={"input3"}/>
                                    </li>
                                </ul>
                                <ul className="ul1">
                                    <li className="li1">
                                        <span className="span1">已领重量</span>
                                        <Input disabled value={this.state.obj.receivedRawMaterialWeight} className={"input3"}/>
                                    </li>
                                </ul>
                            </div>
                            <div className="rawMaterial">
                                <div className="placeChangeTable">
                                    <Table pagination={false} dataSource={this.state.modalData}>
                                        <Column title="质检单号" dataIndex="qualityCheckSheetCode" id="qualityCheckSheetCode" align="center"/>
                                        <Column title="原料规格" dataIndex="rawMaterialStandard" id="rawMaterialStandard" align="center"/>
                                        <Column title="原谅等级" dataIndex="rawMaterialLevel" id="rawMaterialLevel" align="center"/>
                                        <Column title="桶编码" dataIndex="bucketCode" id="bucketCode" align="center"/>
                                        <Column title="该桶原料实际重量" dataIndex="realWeight" id="realWeight" align="center"/>
                                        <Column title="状态" dataIndex="productName" id="productName" align="center" render={(text)=>(
                                            <span>{text==0?"待确认":"已确认"}</span>
                                        )}/>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className="div4">
                            <li className="li4">
                                <Button className="btn4" type="danger" onClick={()=>{this.setState({visible:false})}}>返回</Button>
                            </li>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
    initData(currentPage) {
        let param = {
            currentPage,
            pageSize: this.state.pageSize
        };
        Axios.post('/self/erp/productMaterial/queryProductRawMaterial', param).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                if(res.data.data.productRawMaterials && res.data.data.productRawMaterials.length) {
                    res.data.data.productRawMaterials.forEach((item)=>{
                        item.key = item.id;
                    })
                }
                this.setState({
                    dataSource: res.data.data.productRawMaterials,
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
    donload() {

    }
    changePages(val) {
        this.setState({currentPage: val});
        this.initData(val);
    }
    details(row) {
        this.setState({
            visible: true
        });
        Axios.post('/self/erp/productMaterial/queryProductRawMaterialById', {id:row.id}).then((res)=>{
            // console.log(res.data.data);
            if(res.data.success) {
                this.setState({
                    obj: res.data.data.productRawMaterial,
                    modalData: res.data.data.productRawMaterial.productRawMaterialOutBoundRecords
                })
            }else{
                this.setState({
                    obj: {},
                    modalData: []
                })
            }
        })
    }
    componentDidMount() {
        this.initData(this.state.currentPage);
    }
}
export default MaterialManagement;