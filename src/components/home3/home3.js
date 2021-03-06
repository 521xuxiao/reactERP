import React, {Component} from 'react';
import echarts from "echarts";
import Axios from "axios";
import 'echarts/map/js/world';
import "./home3.scss"

class Home3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myChart: null,
            series: [],
            realtimeStock: [],  todayInbound: '',  todayOutbound: '',
            todaySalesAmountMoney: '', todaySalesWeight: '', todayProductedWeight: '',   totalDeliveryWeight: '',
            todayAvgPrice: '',  daysTopPrice: '',  daysFloorPrice: '',  daysAvgPrice: '',  priceChange: "",
            applePriceDatas: [],
            applePriceDatas1: [],   applePriceDatas2: []
        }
    }

    render() {
        return (
            <div id="home3">
                <div className="home3">
                    <ol className="home3_top">
                        <div className="home3_top_left">
                            <ol className="home3_top_left_inner">
                                <ol className="home3_top_left_inner-top">
                                    <ul className="ul1">
                                        {
                                            this.state.realtimeStock.map((item, index) => {
                                                return (
                                                    <li className="li1" key={index}>{item}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </ol>
                                <ol className="home3_top_left_inner-bottom">
                                    <div className="home3_top_left_inner-bottom-left">
                                        <div className="reals">
                                            <h3 className="h1">今日入库量</h3>
                                            <h3 className="h2"></h3>
                                            <h3 className="h3">
                                                <p className="p1">{this.state.todayInbound}</p>
                                                <a className="a1">吨</a>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="home3_top_left_inner-bottom-right home3_top_left_inner-bottom-left">
                                        <div className="reals">
                                            <h3 className="h1">今日出库量</h3>
                                            <h3 className="h2"></h3>
                                            <h3 className="h3">
                                                <p className="p1 p2">{this.state.todayOutbound}</p>
                                                <a className="a1">吨</a>
                                            </h3>
                                        </div>
                                    </div>
                                </ol>
                            </ol>
                        </div>
                        <div className="home3_top_center">
                            <ol className="home3_top_center_inner" id="home3_top_center_inner"></ol>
                        </div>
                        <div className="home3_top_right">
                            <ol className="home3_top_right_inner">
                                <ol className="home3_top_right_inner_top">
                                    <div className="home3_top_right_inner_top_left">
                                        <div className="home3_top_right_inner_top_left_inner">
                                            <p className="home3_top_right_inner_top_left_inner_p4">{this.state.todaySalesAmountMoney}</p>
                                            <p className="home3_top_right_inner_top_left_inner_p5">今日销售额（元）</p>
                                        </div>
                                    </div>
                                    <div className="home3_top_right_inner_top_right">
                                        <div className="home3_top_right_inner_top_right_inner">
                                            <p className="home3_top_right_inner_top_left_inner_p4  home3_top_right_inner_top_left_inner_p42">{this.state.todaySalesWeight}</p>
                                            <p className="home3_top_right_inner_top_left_inner_p5">今日销售量（kg）</p>
                                        </div>
                                    </div>
                                </ol>
                                <ol className="home3_top_right_inner_bottom  home3_top_right_inner_top">
                                    <div className="home3_top_right_inner_top_left home3_top_right_inner_top_left1">
                                        <div className="home3_top_right_inner_top_left_inner">
                                            <p className="home3_top_right_inner_top_left_inner_p4 home3_top_right_inner_top_left_inner_p41">{this.state.todayProductedWeight}</p>
                                            <p className="home3_top_right_inner_top_left_inner_p5">今日生产量（kg）</p>
                                        </div>
                                    </div>
                                    <div className="home3_top_right_inner_top_right home3_top_right_inner_top_left1">
                                        <div className="home3_top_right_inner_top_right_inner">
                                            <p className="home3_top_right_inner_top_left_inner_p4 home3_top_right_inner_top_left_inner_p43">{this.state.totalDeliveryWeight}</p>
                                            <p className="home3_top_right_inner_top_left_inner_p5">今日发货量（kg）</p>
                                        </div>
                                    </div>
                                </ol>
                            </ol>
                        </div>
                    </ol>
                    <ol className="home3_bottom">
                        <ol className="home3_bottom_left">
                            <ul className="home3_bottom_left_inner">
                                <p className="home3_bottom_left_inner_content">
                                    齐鲁泉源供应链有限公司，结合齐鲁交通强大的资源优势及泉源公司完善的购销网络、丰富的行业经验，共同建设“天下果仓”项目。以栖霞为基础，用具体的行动响应和落实党的十九大有关“实施乡村振兴”的战略部署。为促进农业产业化转型升级，推动当地经济社会发展，乃至为山东的乡村振兴建设探索新模式，注入新动能。
                                </p>
                                <ul className="home3_bottom_left_inner_three">
                                    <li className="home3_bottom_left_inner_three_li4">
                                        <div className="home3_bottom_left_inner_three_li4_a1">2003 <a
                                            className="a1">年</a></div>
                                        <a className="home3_bottom_left_inner_three_li4_a2">始创于</a>
                                    </li>
                                    <li className="home3_bottom_left_inner_three_li4">
                                        <div
                                            className="home3_bottom_left_inner_three_li4_a1 home3_bottom_left_inner_three_li4_a11">5004 <a
                                            className="a1">万元</a></div>
                                        <a className="home3_bottom_left_inner_three_li4_a2">注册资本</a>
                                    </li>
                                    <li className="home3_bottom_left_inner_three_li4">
                                        <div
                                            className="home3_bottom_left_inner_three_li4_a1 home3_bottom_left_inner_three_li4_a111">5.6 <a
                                            className="a1">万吨</a></div>
                                        <a className="home3_bottom_left_inner_three_li4_a2">储藏能力</a>
                                    </li>
                                </ul>
                            </ul>
                        </ol>
                        <ol className="home3_bottom_right">
                            <ul className="home3_bottom_right_inner">
                                <ol className="home3_bottom_right_inner_left">
                                    <ol className="home3_bottom_right_inner_left_echarts"
                                        id="home3_bottom_right_inner_left_echarts"></ol>
                                </ol>
                                <ol className="home3_bottom_right_inner_right">
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b0">当日价格</span>
                                     <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b2">当日均价（元/斤）：{this.state.todayAvgPrice}</span>
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b3">相对比前日：{this.state.priceChange}</span>
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b4 home3_bottom_right_inner_right_b0">近7日价格</span>
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b5">近7日最高价（元/斤）：{this.state.daysTopPrice}</span>
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b6">近7日最低价（元/斤）：{this.state.daysFloorPrice}</span>
                                    <span
                                        className="home3_bottom_right_inner_right_b1 home3_bottom_right_inner_right_b7">近7日均价（元/斤）：{this.state.daysAvgPrice}</span>
                                </ol>
                            </ul>
                        </ol>
                    </ol>
                </div>
            </div>
        )
    }
    initData() {
        let flyCity =[
            {
                "name":"烟台",
                "type":null,
                "userid":null,
                "fromName":"上海",
                "coords":[
                    [121.39, 37.52],
                    [121.383863, 31.241423]
                ],
                "color":"#FFF68F"
            },
            {
                "name":"烟台",
                "fromName":"菲律宾",
                "type":null,
                "userid":null,
                "coords":[
                    [121.39, 37.52],
                    [120.354238, 15]
                ],
                "color":"#FFEFD5"
            },
            {
                "name":"烟台",
                "fromName":"加拿大",
                "type":null,
                "userid":null,
                "coords":[
                    [121.39, 37.52],
                    [43, 79]
                ],
                "color":"#FFEFD5"
            },
            {
                "name":"烟台",
                "fromName":"纽约",
                "type":null,
                "userid":null,
                "coords":[
                    [121.39, 37.52],
                    [-74.0059731, 40.7143528]
                ],
                "color":"#FFEFD5"
            },
            {
                "name":"烟台",
                "fromName":"多伦多",
                "type":null,
                "userid":null,
                "coords":[
                    [121.39, 37.52],
                    [-79.38333, 43.6528]
                ],
                "color":"#FFEFD5"
            }
        ]
        let allCity = [
            {
                "id":1,
                "cityName":"上海",
                "fromLa":121.383863,
                "fromlo":31.241423,
                "type":"doneCity",
                "color":"#FFF68F",
                "createts":null,
                "modifyts":null,
                "saleStoreName":null,
                "userId":null
            },
            {
                "id":2,
                "cityName":"菲律宾",
                "fromLa":120.354238,
                "fromlo":15,
                "type":"doneCity",
                "color":"#FFEFD5",
                "createts":null,
                "modifyts":null,
                "saleStoreName":null,
                "userId":null
            },
            {
                "id":3,
                "cityName":"加拿大",
                "fromLa":43,
                "fromlo":79,
                "type":"doneCity",
                "color":"#FFEFD5",
                "createts":null,
                "modifyts":null,
                "saleStoreName":null,
                "userId":null
            },
            {
                "id":4,
                "cityName":"纽约",
                "fromLa":-74.0059731,
                "fromlo":40.7143528,
                "type":"doneCity",
                "color":"#FFEFD5",
                "createts":null,
                "modifyts":null,
                "saleStoreName":null,
                "userId":null
            },
            {
                "id":5,
                "cityName":"多伦多",
                "fromLa":-79.38333,
                "fromlo":43.6528,
                "type":"doneCity",
                "color":"#FFEFD5",
                "createts":null,
                "modifyts":null,
                "saleStoreName":null,
                "userId":null
            },
        ]
        let doneCity =[
            {
                "name":"烟台",
                "fromName":"上海",
                "coords":[
                    [121.39, 37.52],
                    [121.383863, 31.241423]
                ],
                "color":"#FFF68F",
                "type":null,
                "userid":null
            },
            {
                "name":"烟台",
                "fromName":"临沂",
                "coords":[
                    [121.39, 37.52],
                    [120.354238, 15]
                ],
                "color":"#FFEFD5",
                "type":null,
                "userid":null
            },
            {
                "name":"烟台",
                "fromName":"加拿大",
                "coords":[
                    [121.39, 37.52],
                    [43, 79]
                ],
                "color":"#FFEFD5",
                "type":null,
                "userid":null
            },
            {
                "name":"烟台",
                "fromName":"纽约",
                "coords":[
                    [121.39, 37.52],
                    [-74.0059731, 40.7143528]
                ],
                "color":"#FFEFD5",
                "type":null,
                "userid":null
            },
            {
                "name":"烟台",
                "fromName":"多伦多",
                "coords":[
                    [121.39, 37.52],
                    [-79.38333, 43.6528]
                ],
                "color":"#FFEFD5",
                "type":null,
                "userid":null
            }
        ]
        let series = [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 4,
            symbolSize: 20,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    color: 'white'
                }
            },
            itemStyle: {
                normal: {
                    color: '#c9b972'
                }
            },
            rippleEffect: {
                scale: 10,
                brushType: 'stroke'
            },
            data: [{
                name: "烟台",
                value: [121.39, 37.52],
                visualMap: false
            }]
        }];
        flyCity.forEach(function(item) {
            series.push({
                name: item.name,
                type: 'lines',
                zlevel: 2,
                symbol: ['none'],
                effect: {
                    show: true,
                    period: 3,
                    trailLength: 0.5,
                    symbol: 'arrow', //箭头图标
                    symbolSize: 8,
                    loop: true,
                    color:"#F7E588"
                },
                lineStyle: {
                    normal: {
                        width: 0, //尾迹线条宽度
                        opacity: 0.2, //尾迹线条透明度
                        curveness: -0.2 //尾迹线条曲直度
                    }
                },
                data: [{
                    fromName: item.fromName,
                    toName: item.toName,
                    coords: item.coords
                }]

            })
        });
        //绘制已经起飞完成的线
        doneCity.forEach(function(item) {
            series.push({
                name: item.name,
                type: 'lines',
                zlevel: 2,
                lineStyle: {
                    normal: {
                        color: item.color,
                        width: 2,
                        opacity: 0.4,
                        curveness: -0.2
                    }
                },
                data: [{
                    fromName: item.fromName,
                    toName: item.toName,
                    coords: item.coords
                }]

            })
        });

        //绘制所有城市 显示特效
        allCity.forEach(function(item) {
            series.push({
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 4,
                symbolSize: 10,
                rippleEffect: {
                    scale: 4,
                    brushType: 'stroke'
                },
                data: [{
                    name: item.cityName,
                    value: [item.fromLa, item.fromlo],
                    visualMap: true
                }],
                showEffectOn: 'render',
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                }
            })
        });
        setTimeout(()=>{
            this.setState({series})
            this.mapMethods1();
        }, 100);
    }
    initdata() {
        Axios.post("/self/erp/dataAnalysis/queryIndexData").then((res)=>{
            if(res.data.success) {
                let realtimeStock = res.data.data.realtimeStock.toString().split("");
                let applePriceDatas1 = [], applePriceDatas2 = [];
                if(res.data.data.appleMarket != null) {
                    res.data.data.appleMarket.applePriceDatas.forEach((item)=>{
                        applePriceDatas1.push(item.time);
                        applePriceDatas2.push(item.avg_price);
                    })
                }
                this.setState({
                    todaySalesAmountMoney: res.data.data.todaySalesAmountMoney / 100,
                    todaySalesWeight: res.data.data.todaySalesWeight,
                    todayProductedWeight: res.data.data.todayProductedWeight,
                    totalDeliveryWeight: res.data.data.totalDeliveryWeight,
                    realtimeStock: realtimeStock,
                    todayInbound: res.data.data.todayInbound,
                    todayOutbound: res.data.data.todayOutbound,

                    todayAvgPrice: res.data.data.appleMarket.todayAvgPrice,
                    daysTopPrice: res.data.data.appleMarket["7daysTopPrice"],
                    daysFloorPrice: res.data.data.appleMarket["7daysFloorPrice"],
                    daysAvgPrice: res.data.data.appleMarket["7daysAvgPrice"],
                    priceChange: res.data.data.appleMarket.priceChange,
                    applePriceDatas1,
                    applePriceDatas2,
                })
                this.initEcharts()
                setTimeout(()=>{
                    this.props.parent.giveParentData();
                }, 0);
            }else{
                this.setState({
                    todaySalesAmountMoney: 0,
                    todayProductedWeight: 0,
                    totalDeliveryWeight: 0,
                    todaySalesWeight: 0,
                    realtimeStock: [],
                    todayInbound: 0,
                    todayOutbound: 0,
                    todayAvgPrice: 0,
                    daysTopPrice: 0
                    ,
                    daysFloorPrice: 0,
                    daysAvgPrice: 0,
                    priceChange: 0,
                    applePriceDatas1: [],
                    applePriceDatas2: []
                })
                setTimeout(()=>{
                    this.props.parent.giveParentData();
                }, 0);
            }
        }).catch((err)=>{
            setTimeout(()=>{
                this.props.parent.giveParentData();
            }, 800);
        })
    }
    componentDidMount() {
        this.initEcharts();   this.mapMethods1();
        this.initData();
        this.initdata();
    }



    initEcharts() {
        let myChart = echarts.init(document.getElementById('home3_bottom_right_inner_left_echarts'));
        this.setState({myChart});
        let option = {
            grid: {
                top: '15%',
                right: '10%',
                left: '10%',
                bottom: '12%'
            },
            xAxis: [{
                type: 'category',
                data: this.state.applePriceDatas1,
                axisLabel: {
                    margin: 20,
                    color: '#fff',
                    textStyle: {
                        fontSize: 12
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#0F2C4D',
                    }
                },
                axisTick: {
                    show: false
                },
            }],
            yAxis: [{
                axisLabel: {
                    formatter: '{value}元',
                    color: '#fff',
                    textStyle: {
                        fontSize: 12
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#0F2C4D',
                    }
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    lineStyle: {
                        color: '#0F2C4D',
                        type: 'dashed',
                    }
                }
            }],
            series: [{
                data: this.state.applePriceDatas2,
                type: 'line',
                smooth: true,
                name: '折线图',
                // symbol: 'none',
                symbol: 'circle',
                symbolSize: 16,
                itemStyle: {
                    normal: {
                        color: "#00D3FF",
                        label : {
                            show: true
                        }
                    }
                },
                lineStyle: {
                    color: '#FFDC1D',
                    width: 4,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',//设置折线阴影
                    shadowBlur: 15,
                    shadowOffsetY: 20,
                }
            }]
        };
        myChart.setOption(option);
    }
    mapMethods1() {
        let myChart1 = echarts.init(document.getElementById('home3_top_center_inner'));
        let color = ['#00ff78', '#ff971b', '#acff43', '#ff73b7', '#ffff46', '#27bbfe'];
        let option1 = {
            grid:{
                top:"0px",
                left:"px",
                right:"px",
                bottom:"0px"
            },
            tooltip: {
                trigger: 'item',
                show: false
            },
            geo: {
                map: 'world',
                zoom: 1,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            series: this.state.series
        };
        myChart1.setOption(option1);
    }
}

export default Home3;
