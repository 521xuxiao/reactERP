import React, {Component} from 'react';
import {Tree, Input,Button,message, Table} from 'antd';
import Axios from 'axios';
import { DownOutlined } from '@ant-design/icons';
import './menuConfig.scss';
class MenuConfig extends Component{
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            path: '',
            component: '',
            fuIndex: '',
            selfIndex: '',   icon: '', name: '',
            id: '',
            btnName: '',
            keys: '',

            //////////////////////////////////////
            defaultExpandedKeys: [],
            defaultSelectedKeys: [],
            defaultCheckedKeys: [],
            treeDataList: [],

            dataSource: [
                {
                    key: '0',
                    name: 'John Brown',
                    age:22,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    key: '1',
                    name: "许潇",
                    age: 42,
                    address: 'London No. 1 Lake Park'
                },
                {
                    key: '2',
                    name: 'John Brown',
                    age:22,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    key: '5',
                    name: 'Joe Black',
                    age: 3,
                    address: 'Sidney No. 1 Lake Park'
                },
                {
                    key: '6',
                    name: 'Joe Black',
                    age: 342,
                    address: 'Sidney No. 1 Lake Park'
                },
                {
                    key: '7',
                    name: 'Joe Black',
                    age: 62,
                    address: 'Sidney No. 1 Lake Park'
                }
            ],
            columns: [
                {
                    title: '分类名称',
                    dataIndex: 'name',
                    key: 'name',
                    render(_, row) {
                        return {
                            children: row.name,
                            props: {
                                rowSpan: row.rowSpan,
                            }
                        }
                    }
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                },
            ]
        }
    }
    render() {
        return(
            <div id="menuConfig">
                <div className="menuConfig">
                    <div className="placeTree">
                        <div className="innerLeft">
                            <Tree
                                switcherIcon={<DownOutlined />}
                                onSelect={this.onSelect.bind(this)}
                                treeData={this.state.treeData}
                            />
                        </div>
                        <div className="innerRight">
                            <h3>菜单</h3>
                            <ul className="ul1">
                                <li className="li1">
                                    <span className="span1">path</span>
                                    <Input className="input1" value={this.state.path} onChange={(e)=>{this.setState({path:e.target.value})}}/>
                                </li>
                                <li className="li1">
                                    <span className="span1">component</span>
                                    <Input className="input1" value={this.state.component} onChange={(e)=>{this.setState({component:e.target.value})}}/>
                                </li>
                            </ul>
                            <ul className="ul1">
                                <li className="li1">
                                    <span className="span1">父索引</span>
                                    <Input className="input1" value={this.state.fuIndex} onChange={(e)=>{this.setState({fuIndex:e.target.value})}}/>
                                </li>
                                <li className="li1">
                                    <span className="span1">自身的索引</span>
                                    <Input className="input1" value={this.state.selfIndex} onChange={(e)=>{this.setState({selfIndex:e.target.value})}}/>
                                </li>
                                <li className="li1">
                                    <span className="span1">icon</span>
                                    <Input className="input1" value={this.state.icon} onChange={(e)=>{this.setState({icon:e.target.value})}}/>
                                </li>
                                <li className="li1">
                                    <span className="span1">名字</span>
                                    <Input className="input1" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
                                </li>
                            </ul>
                            <div className="placeBtn">
                                <Button onClick={this.add.bind(this)}>新增</Button>
                                <Button onClick={this.deletes.bind(this)}>删除</Button>
                            </div>
                            <h3>按钮</h3>
                            <li className="li1">
                                <span className="span1">按钮名字</span>
                                <Input className="input1" value={this.state.btnName} onChange={(e)=>{this.setState({btnName:e.target.value})}}/>
                            </li>
                            <li className="li1">
                                <span className="span1">按钮key x-x</span>
                                <Input className="input1" value={this.state.keys} onChange={(e)=>{this.setState({keys:e.target.value})}}/>
                            </li>
                            <div className="placeBtn">
                                <Button onClick={this.addBtn.bind(this)}>新增</Button>
                                <Button onClick={this.deletesBtn.bind(this)}>删除</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            this.xxx()
                        }
                    </div>

                    <Table dataSource={this.createNewArr(this.state.dataSource)} columns={this.state.columns} />
                </div>
            </div>
        )
    }
    xxx() {
        if(this.state.defaultCheckedKeys && this.state.defaultCheckedKeys.length) {
            return(
                <>
                    <Tree checkable  defaultExpandedKeys={this.state.defaultExpandedKeys} defaultSelectedKeys={this.state.defaultSelectedKeys}
                          defaultCheckedKeys={this.state.defaultCheckedKeys} onSelect={this.selected.bind(this)}  onCheck={this.onCheck.bind(this)} treeData={this.state.treeDataList}
                    />
                </>
            )
        }else{
            return(
                <>null</>
            )
        }
    }
    initTree() {
        setTimeout(()=>{
            let treeDataList = [
                {title: '父一', key: '1', children: [
                        {title: '父一1', key: '7'},
                        {title: '父一2', key: '8'},
                        {title: '父一3', key: '9'},
                ]},
                {title: '父二', key: '2'},
                {title: '父三', key: '3'},
                {title: '父四', key: '4'},
                {title: '父五', key: '5'},
                {title: '父六', key: '6', children: [
                        {title: '父六1', key: '10'},
                        {title: '父六2', key: '11'},
                        {title: '父六3', key: '12'},
                    ]}
            ]
            this.setState({
                treeDataList,
                defaultCheckedKeys: ['3', '8']
            })
        }, 300)
    }
    onCheck() {

    }
    selected() {

    }
    initData() {
    	Axios.post('/self/erp/menu/queryMenu').then((res)=>{
//  		console.log(res.data);
    		if(res.data.success) {
    			this.recursion(res.data.data.menuList);
    		}else{
    			message.warning(res.data.message);
    		}
    	})
    }
    recursion(array) {  // 递归处理数据
    	if(array && array.length) {
    		array.forEach((item)=>{
    			if(item.children && item.children.length) {
    				item.title = item.name;
    				item.key = item.id;
    				this.recursion(item.children);
    			}else{
    				item.title = item.name;
    				item.key = item.id;
    			}
    		})
    	}
    	this.setState({
    		treeData: array
    	})
    }
    onSelect(selectedKeys) {
        if(selectedKeys.length>0) {
        	this.setState({
        		id: selectedKeys[0]
        	})
        }
    }
    add() {
        let params = {
            path: this.state.path,
            component: this.state.component,
            fatherIndex: this.state.fuIndex,
            localIndex: this.state.selfIndex,
            menuName: this.state.name,
            icon: this.state.icon,
            permission: ''
        };
        Axios.post('/self/erp/menu/addMenu', params).then((res)=>{
        	if(res.data.success) {
        		message.success("成功");
        		this.initData();
        	}else{
        		message.warning(res.data.message);
        	}
        })
    }
    deletes() {
		Axios.post('/self/erp/menu/deleteMenuAndButton', {id: this.state.id}).then((res)=>{
			if(res.data.success) {
				message.success("成功");
				this.initData();
			}else{
				message.warning(res.data.message);
			}
		})
    }
    // 新增按钮
    addBtn() {
        let params = {
            buttonName: this.state.btnName,
            localIndex: this.state.keys,
            menuId: this.state.id,
            permission: ''
        };
        Axios.post('/self/erp/menu/addButton', params).then((res)=>{
            if(res.data.success) {
                message.success("成功");
                this.initData();
            }else{
                message.warning(res.data.message);
            }
        })
    }
    // 删除按钮
    deletesBtn() {
        Axios.post('/self/erp/menu/deleteButton', {id: ''}).then((res)=>{
            if(res.data.success) {
                message.success("成功");
                this.initData();
            }else{
                message.warning(res.data.message);
            }
        })
    }
    componentDidMount() {
    	this.initData();
    	this.initTree();

    }

    createNewArr=(data)=>{
        return data.reduce((result, item) => {
            //首先将name字段作为新数组result取出
            if (result.indexOf(item.name) < 0) {
                result.push(item.name)
            }
            return result
        }, []).reduce((result, name) => {
            //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
            const children = data.filter(item => item.name === name);
            result = result.concat(
                children.map((item, index) => ({
                    ...item,
                    rowSpan: index === 0 ? children.length : 0,//将第一行数据添加rowSpan字段
                }))
            )
            return result;
        }, [])
    }
}
export default MenuConfig;