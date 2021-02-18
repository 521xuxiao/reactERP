import React, {Component} from 'react';
import "./home2.scss"
import echarts from "echarts";
class Home2 extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div id="home2">
                <div className="home2">
                    <ol className="home2_left">
                        <ol className="home2_left_inner">
                            <ol className="home2_left_inner_top">
                                <ol className="home2_left_inner_top_inner">
                                    <ol  className="home2_left_inner_top_inner_left">
                                        <ol className="home2_left_inner_top_inner_left_left">
                                            <span className="home2_left_inner_top_inner_left_left_top">今日入库量</span>
                                            <ol className="home2_left_inner_top_inner_left_left_bottom">
                                                <span className="home2_left_inner_top_inner_left_left_bottom_left_content">1545</span>
                                                <span className="home2_left_inner_top_inner_left_left_bottom_left_cool">吨</span>
                                            </ol>
                                        </ol>
                                        <ol className="home2_left_inner_top_inner_left_right">
                                            <ol className="home2_left_inner_top_inner_left_right_top"></ol>
                                            <ol className="home2_left_inner_top_inner_left_right_bottom">
                                                <span className="home2_left_inner_top_inner_left_right_bottom_span1">+15%</span>
                                                <i className="home2_left_inner_top_inner_left_right_bottom_span2"></i>
                                            </ol>
                                        </ol>
                                    </ol>
                                    <ol  className="home2_left_inner_top_inner_right home2_left_inner_top_inner_left">
                                        <ol className="home2_left_inner_top_inner_left_left">
                                            <span className="home2_left_inner_top_inner_left_left_top">今日出库量</span>
                                            <ol className="home2_left_inner_top_inner_left_left_bottom">
                                                <span className="home2_left_inner_top_inner_left_left_bottom_left_content">1545</span>
                                                <span className="home2_left_inner_top_inner_left_left_bottom_left_cool">吨</span>
                                            </ol>
                                        </ol>
                                        <ol className="home2_left_inner_top_inner_left_right">
                                            <ol className="home2_left_inner_top_inner_left_right_top"></ol>
                                            <ol className="home2_left_inner_top_inner_left_right_bottom">
                                                <span className="home2_left_inner_top_inner_left_right_bottom_span1">+15%</span>
                                                <i className="home2_left_inner_top_inner_left_right_bottom_span2"></i>
                                            </ol>
                                        </ol>
                                    </ol>
                                </ol>
                            </ol>
                            <ol className="home2_left_inner_bottom">
                                <ol className="home2_left_inner_bottom_inner">
                                    <ol className="home2_left_inner_bottom_inner_box">
                                        <i className="home2_left_inner_bottom_inner_box_collun"></i>
                                        <span className="home2_left_inner_bottom_inner_box_title">总各车间生产量</span>
                                    </ol>
                                    <ol className="home2_left_inner_bottom_inner_box_echarts" id="home2_left_inner_bottom_inner_box_echarts"></ol>
                                </ol>
                            </ol>
                        </ol>
                    </ol>
                    <ol className="home2_center">
                        <ol className="home2_center_inner">
                            <ol className="home2_center_inner_top">
                                <ol className="home2_center_inner_top_inner">
                                    <ol className="home2_center_inner_top_inner_echarts" id="home2_center_inner_top_inner_echarts"></ol>
                                </ol>
                            </ol>
                            <ol className="home2_center_inner_middle">
                                <ol className="home2_center_inner_middle_inner">
                                    <ul className="home2_center_inner_middle_inner_ul1">
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                    </ul>
                                    <ul className="home2_center_inner_middle_inner_ul1">
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                        </li>
                                    </ul>
                                </ol>
                            </ol>
                            <ol className="home2_center_inner_bottom home2_center_inner_middle">
                                <ol className="home2_center_inner_bottom_inner home2_center_inner_middle_inner">
                                    <ul className="home2_center_inner_middle_inner_ul1">
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                    </ul>
                                    <ul className="home2_center_inner_middle_inner_ul1">
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                        </li>
                                        <li className="home2_center_inner_middle_inner_ul1_li1">
                                            <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                        </li>
                                    </ul>
                                </ol>
                            </ol>
                        </ol>
                    </ol>
                    <ol className="home2_right">
                        <ol className="home2_right_inner">
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                            </ul>
                            <ul className="home2_center_inner_middle_inner_ul1">
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1">满</span>
                                </li>
                                <li className="home2_center_inner_middle_inner_ul1_li1">
                                    <span className="home2_center_inner_middle_inner_ul1_li1_span1 home2_center_inner_middle_inner_ul1_li1_span2"></span>
                                </li>
                            </ul>
                        </ol>
                    </ol>
                </div>
            </div>
        )
    }
    componentDidMount() {
        setTimeout(()=>{
            this.props.parent.giveParentData();
            this.init();
        }, 100);
    }
    init() {
        let myChart1 = echarts.init(document.getElementById('home2_left_inner_bottom_inner_box_echarts'));
        let data = [78, 60, 60, 70, 69]
        let titlename = ['红富士', '二级金帅', '一级金星', '五级富士', '三级富士'];
        let valdata = [683, 234, 234, 523, 345]
        let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
        let option1 = {
            xAxis: {
                show: true,
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        // type: 'dashed',
                        color: '#65A3FF'
                    }
                }
                ,
                splitLine: {
                    show: false
                }
            },
            yAxis: [{
                show: true,
                data: titlename,
                inverse: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        // type: 'dashed',
                        color: '#65A3FF'
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: "#FFF"
                    }
                }
            }, {
                show: true,
                inverse: true,
                data: valdata,
                axisLabel: {
                    textStyle: {
                        color: function(value, index) {
                            var num = myColor.length;
                            return myColor[index % num]
                        }
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: valdata,
                barWidth: 20,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: function(params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                    }
                },
            }]
        }
        myChart1.setOption(option1);


        let myChart2 = echarts.init(document.getElementById('home2_center_inner_top_inner_echarts'));
        var scaleData = [
            {
                'name': '东库区',
                'value': 30
            },
            {
                'name': '北库区',
                'value': 30
            },
            {
                'name': '南库区',
                'value': 30
            }
        ];
        var rich = {
            white: {
                color: '#fff',
                align: 'center',
                fontWeight:'bold',
                padding: [3, 0]
            }
        };
        var data2 = [];
        var color1 = ['rgb(255, 153, 153)', 'rgb(255, 176, 63)', 'rgb(61, 186, 45)'];

        for (var i = 0; i < scaleData.length; i++) {
            data2.push({
                value: scaleData[i].value,
                name: scaleData[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 4,
                        shadowBlur: 30,
                        borderColor:color1[i],
                        shadowColor: color1[i],
                        color: color1[i],
                        opacity:0.75,
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        let option2 = {
            tooltip: {
                show: false
            },
            legend: {
                show: false
            },
            toolbox: {
                show: false
            },
            series: [{
                name: '',
                type: 'pie',
                clockWise: false,
                radius: [50, 120],
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inner',
                            fontWeight:'bold',
                            formatter: function(params) {
                                var percent = 0;
                                var total = 0;
                                for (var i = 0; i < scaleData.length; i++) {
                                    total += scaleData[i].value;
                                }
                                percent = ((params.value / total) * 100).toFixed(0);
                                if(params.name !== '') {
                                    return params.name + '\n{white|' + '占比' + percent + '%}';
                                }else {
                                    return '';
                                }
                            },
                            rich: rich
                        },
                        labelLine: {
                            show: false,
                        }
                    }
                },
                data: data2
            }]
        }
        myChart2.setOption(option2);



    }
}
export default Home2;
