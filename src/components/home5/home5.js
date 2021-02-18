import React, {Component} from 'react';
import echarts from "echarts";
import {Progress} from "antd";
import "./home5.scss";
class Home5 extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div id="home5">
                <div className="home5">
                    <ol className="home5_top">
                        <ol className="home5_top_inner">
                            <ol className="home5_top_inner_left">
                                <ol className="home5_top_inner_left_inner">
                                    <ol className="home5_top_inner_left_inner_top">
                                        <ol className="home5_top_inner_left_inner_top_inner">
                                            <ol className="home5_top_inner_left_inner_top_inner_left">
                                                <ol className="home5_top_inner_left_inner_top_inner_left_text">
                                                    <span className="home5_top_inner_left_inner_top_inner_left_text_left">1545</span>
                                                    <span className="home5_top_inner_left_inner_top_inner_left_text_right">kg</span>
                                                </ol>
                                                <ol className="home5_top_inner_left_inner_top_inner_left_bottom">昨日生产量</ol>
                                            </ol>
                                            <ol className="home5_top_inner_left_inner_top_inner_right">
                                                <span className="home5_top_inner_left_inner_top_inner_right_num">+15%</span>
                                                <i className="home5_top_inner_left_inner_top_inner_right_img"></i>
                                            </ol>
                                        </ol>
                                    </ol>
                                    <ol className="home5_top_inner_left_inner_bottom">
                                        <ol className="home5_top_inner_left_inner_bottom_inner">
                                            <ol className="home5_top_inner_left_inner_bottom_inner_fu">
                                                <i className="home5_top_inner_left_inner_bottom_inner_collum"></i>
                                                <span className="home5_top_inner_left_inner_bottom_inner_title">总生产任务</span>
                                            </ol>
                                            <ol className="home5_top_inner_left_inner_bottom_inner_echarts"></ol>
                                        </ol>
                                    </ol>
                                </ol>
                            </ol>
                            <ol className="home5_top_inner_middle">
                                <ol className="home5_top_inner_middle_inner">
                                    <ol className="home5_top_inner_middle_inner_top">
                                        <ol className="home5_top_inner_middle_inner_top_left">
                                            <ol className="home5_top_inner_middle_inner_top_left_top">
                                                <span className="home5_top_inner_middle_inner_top_left_top_left">1545</span>
                                                <span className="home5_top_inner_middle_inner_top_left_top_right">kg</span>
                                            </ol>
                                            <ol className="home5_top_inner_middle_inner_top_left_content">今日领料</ol>
                                        </ol>
                                        <ol className="home5_top_inner_middle_inner_top_right">
                                            <span className="home5_top_inner_middle_inner_top_right_num">+10%</span>
                                            <i className="home5_top_inner_middle_inner_top_right_img"></i>
                                        </ol>
                                    </ol>
                                    <ol className="home5_top_inner_middle_inner_top">
                                        <ol className="home5_top_inner_middle_inner_top_left">
                                            <ol className="home5_top_inner_middle_inner_top_left_top">
                                                <span className="home5_top_inner_middle_inner_top_left_top_left home5_top_inner_middle_inner_top_left_top_left1">1545</span>
                                                <span className="home5_top_inner_middle_inner_top_left_top_right">kg</span>
                                            </ol>
                                            <ol className="home5_top_inner_middle_inner_top_left_content">今日成品入库</ol>
                                        </ol>
                                        <ol className="home5_top_inner_middle_inner_top_right">
                                            <span className="home5_top_inner_middle_inner_top_right_num">+10%</span>
                                            <i className="home5_top_inner_middle_inner_top_right_img"></i>
                                        </ol>
                                    </ol>
                                </ol>
                            </ol>
                            <ol className="home5_top_inner_right">
                                <ol className="home5_top_inner_right_inner">
                                    <ol className="home5_top_inner_right_inner_text">
                                        <i className="home5_top_inner_right_inner_text_collum"></i>
                                        <span className="home5_top_inner_right_inner_text_content">成品出入库</span>
                                    </ol>
                                    <div className="home5_top_inner_right_inner_echarts"></div>
                                </ol>
                            </ol>
                        </ol>
                    </ol>
                    <ol className="home5_bottom">
                        <ol className="home5_bottom_inner">
                            <ol className="home5_bottom_inner_left">
                                <ol className="home5_bottom_inner_left_inner">
                                    <ol className="home5_bottom_inner_left_inner_title">
                                        <i className="home5_bottom_inner_left_inner_title_collum"></i>
                                        <span className="home5_bottom_inner_left_inner_title_txt">各车间生产量</span>
                                    </ol>
                                    <ol className="home5_bottom_inner_left_inner_echarts"></ol>
                                </ol>
                            </ol>
                            <ol className="home5_bottom_inner_right">
                                <ol className="home5_bottom_inner_right_inner">
                                    <ol className="home5_bottom_inner_right_inner_title">
                                        <i className="home5_bottom_inner_right_inner_title_collum"></i>
                                        <span className="home5_bottom_inner_right_inner_title_txt">生产监管</span>
                                    </ol>
                                    <ol className="home5_bottom_inner_right_inner_content">
                                        <ol className="home5_bottom_inner_right_inner_content_ul1">
                                            <li className="home5_bottom_inner_right_inner_content_ul1_li1">序号</li>
                                            <li className="home5_bottom_inner_right_inner_content_ul1_li1">客户名称</li>
                                            <li className="home5_bottom_inner_right_inner_content_ul1_li1">成产进度</li>
                                            <li className="home5_bottom_inner_right_inner_content_ul1_li1">剩余交付日</li>
                                            <li className="home5_bottom_inner_right_inner_content_ul1_li1">车间</li>
                                        </ol>
                                        <ol className="home5_bottom_inner_right_inner_content_txt">
                                            <ul className="home5_bottom_inner_right_inner_content_txt_ul2">
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">1</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">马来西亚</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">
                                                    <Progress percent={50} status="active" trailColor="#0B01B8" strokeColor="#DA8F1A"/>
                                                </li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">1天</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">东车库一间</li>
                                            </ul>
                                            <ul className="home5_bottom_inner_right_inner_content_txt_ul2">
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">2</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">新加坡</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">
                                                    <Progress percent={70} status="active" trailColor="#0B01B8" strokeColor="#DA8F1A" className="progress"/>
                                                </li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">6天</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">东车库二间</li>
                                            </ul>
                                            <ul className="home5_bottom_inner_right_inner_content_txt_ul2">
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">3</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">法国</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">
                                                    <Progress percent={60} status="active" trailColor="#0B01B8" strokeColor="#DA8F1A"/>
                                                </li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">4天</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">北车库一间</li>
                                            </ul>
                                            <ul className="home5_bottom_inner_right_inner_content_txt_ul2">
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">4</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">澳洲</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">
                                                    <Progress percent={90} status="active" trailColor="#0B01B8" strokeColor="#DA8F1A"/>
                                                </li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">8天</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">北车库三间</li>
                                            </ul>
                                            <ul className="home5_bottom_inner_right_inner_content_txt_ul2">
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">5</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">菲律宾</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">
                                                    <Progress percent={95} status="active" trailColor="#0B01B8" strokeColor="#DA8F1A"/>
                                                </li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">10天</li>
                                                <li className="home5_bottom_inner_right_inner_content_txt_li2">南车库一间</li>
                                            </ul>
                                        </ol>
                                    </ol>
                                </ol>
                            </ol>
                        </ol>
                    </ol>
                </div>
            </div>
        )
    }
    componentWillMount() {

    }

    componentDidMount() {
        this.props.parent.giveParentData();
        this.init();
    }
    init() {
        let myChart1 = echarts.init(document.querySelector('.home5_top_inner_left_inner_bottom_inner_echarts'));
        let colorList = ['#0066FF', '#2E2EE6', '#4400CC', '#00AACC', '#9BBF30', '#E60000', '#92368D', '#BF9926'];
        let option1 = {
            title: {
                text: '93000',
                x: 'center',
                y: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                show: false
            },
            series: [
                {
                    type: 'pie',
                    z: 3,
                    center: ['50%', '50%'],
                    radius: ['50%', '70%'],
                    clockwise: true,
                    avoidLabelOverlap: true,
                    hoverOffset: 15,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}：{c}kg \n {d}%',
                        // rich: {
                        //     hr: {
                        //         backgroundColor: 't',
                        //         borderRadius: 3,
                        //         width: 3,
                        //         height: 3,
                        //         padding: [3, 3, 0, -12]
                        //     },
                        //     a: {
                        //         padding: [-30, 15, -20, 15]
                        //     }
                        // }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            length2: 10,
                            lineStyle: {
                                width: 1
                            }
                        }
                    },
                    data: [
                        {
                            name: "未入车间",
                            value: "40000"
                        }, {
                            name: "已入车间",
                            value: "53000"
                        }
                    ]
                }
            ]
        }
        myChart1.setOption(option1);
        let myChart2 = echarts.init(document.querySelector('.home5_top_inner_right .home5_top_inner_right_inner_echarts'));

        let option2 = {
            legend: {
                x: "right" ,
                orient: 'horizontal',
                padding: 30,
                itemGap: 20,
                data: [
                    {name: '仓库', icon: 'stack', textStyle: {color: "#fff"}},
                    {name: '在售', icon: 'stack', textStyle: {color: "#fff"}}
                ]
            },
            title: {
                // text: '分所销售水量占比',
                top: '5%',
                left: 'center',
                textStyle: {
                    color: '#FFF',
                    align: 'center',
                }
            },

            grid: {
                left: "5%",
                //   right: "2%",
                bottom: "5%",
                top: "15%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                //   boundaryGap: false,
                data: ['06.20', '06.21', '06.22', '06.23', '06.24', '06.25', '06.26'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff",
                        fontSize:12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'transparent',
                        width: 2 //这里是为了突出显示加上的
                    }
                }
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            yAxis: [{
                type: 'value',
                // name: '立方米',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#FFF',
                        fontSize:12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'transparent',
                        width: 2 //这里是为了突出显示加上的
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#11366e'
                    }
                }
            }],
            series: [
                {
                    name:"在售",
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#0092f6',
                            lineStyle: {
                                color: "#0092f6",
                                width: 1
                            }
                        }
                    },
                    data:[79, 60, 80, 60, 75, 75, 53]
                },
                {
                    name:"仓库",
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#FFC300',
                            lineStyle: {
                                color: "#FFC300",
                                width: 1
                            }
                        }
                    },
                    data:[179, 6, 180, 60, 75, 175, 3]
                }
            ]
        }
        myChart2.setOption(option2);

        let myChart3 = echarts.init(document.querySelector('.home5_bottom_inner_left_inner_echarts'));
        let option3 = {
            legend: {
                x: "right" ,
                orient: 'horizontal',
                padding: 30,
                itemGap: 20,
                data: [
                    {name: '东库区', textStyle: {color: "#fff"}},
                    {name: '南库区',  textStyle: {color: "#fff"}},
                    {name: '北库区', textStyle: {color: "#fff"}}
                ]
            },
            title: {
                // text: '分所销售水量占比',
                top: '5%',
                left: 'center',
                textStyle: {
                    color: '#FFF',
                    align: 'center',
                }
            },
            grid: {
                left: "5%",
                //   right: "2%",
                top: "25%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: ['06.20', '06.21', '06.22', '06.23', '06.24', '06.25', '06.26'],
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#fff",
                        fontSize:12
                    }
                }
            },
            tooltip: {
                show: false,
                trigger: 'item'
            },
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff',
                            fontSize:12
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#11366e'
                        }
                    }
                }
            ],
            series: [
                {
                    name:"东库区",
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#DA8F1A',
                            lineStyle: {
                                color: "#DA8F1A",
                                width: 1
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#DA8F1A'
                                    },
                                        {
                                            offset: 1,
                                            color: 'transparent'
                                        }
                                    ], false),
                                    shadowColor: '#09234A',
                                    shadowBlur: 20
                                }
                            }
                        }
                    },
                    data:[79, 60, 80, 60, 75, 75, 53]
                },
                {
                    name:"南库区",
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#2B80FF',
                            lineStyle: {
                                color: "#2B80FF",
                                width: 1
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#2B80FF'
                                    },
                                        {
                                            offset: 1,
                                            color: 'transparent'
                                        }
                                    ], false),
                                    shadowColor: 'transparent',
                                    shadowBlur: 20
                                }
                            }
                        }
                    },
                    data:[85, 96, 120, 100, 175, 95, 99]
                },
                {
                    name:"北库区",
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    itemStyle: {
                        normal: {
                            color: '#04CDF4',
                            lineStyle: {
                                color: "#04CDF4",
                                width: 1
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#04CDF4'
                                    },
                                        {
                                            offset: 1,
                                            color: 'transparent'
                                        }
                                    ], false),
                                    shadowColor: 'transparent',
                                    shadowBlur: 20
                                }
                            }
                        }
                    },
                    data:[44, 32, 77, 60, 75, 25, 10]
                }
            ]
        }
        myChart3.setOption(option3);
    }
}
export default Home5;
