window.globalData = {
    // 项目名称
    title: '针灸虚拟仿真实验',
    // 主题
    primaryColor: '#6e91ec',
    // 首页顶部轮播
    topRotationDiagram: ['./picture/rotation1.png', './picture/rotation2.png'],
    // 首页底部轮播
    bottomRotationDiagram: [
        './picture/bottomRotationDiagram1.jpg',
        './picture/bottomRotationDiagram2.jpg',
        './picture/bottomRotationDiagram3.jpg',
        './picture/bottomRotationDiagram4.jpg',
        './picture/bottomRotationDiagram5.jpg',
        './picture/bottomRotationDiagram4.jpg',
        './picture/bottomRotationDiagram3.jpg',
        './picture/bottomRotationDiagram2.jpg',
        './picture/bottomRotationDiagram1.jpg'
    ],
    // 数据统计
    // 饼图数据
    cakeDiagramData: {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'right',
            data: ['教师', '游客', '学生']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: [
                    { value: 580, name: '教师', itemStyle: { color: '#f38d2c' } },
                    { value: 484, name: '游客', itemStyle: { color: '#3a45e3' } },
                    { value: 300, name: '学生', itemStyle: { color: '#4e3293' } }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },
    // 折线数据
    foldingData: {
        legend: {
            left: 'right',
            data: ['学生', '教师', '游客']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['202208', '202209', '202210', '202211', '202212', '202301', '202302']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                name: '学生',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                itemStyle: { color: '#4e3293' }
            },
            {
                data: [1820, 1932, 1901, 1934, 11290, 1130, 1320],
                name: '教师',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                itemStyle: { color: '#f38d2c' }
            },
            {
                name: '游客',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [11820, 1932, 1901, 1934, 11290, 1130, 1320],
                itemStyle: { color: '#3a45e3' },
                label: {
                    show: true,
                    position: 'top'
                }
            }
        ]
    },
    // 实验数据
    experimentalData: [
        {
            image: './picture/sy_bg.png',
            title: '宠物针灸虚拟仿真实训',
            content: '首次打开本实验，建议使用火狐或谷歌浏览器打开',
            // 模型链接
            link: 'WebMessageSystem'
        }
    ],
    // 实验配置
    configurationRequirements: {
        hardware: {
            one: {
                item: 'CPU111',
                requirement: '英特尔酷睿TM 5-4590处理器(2.8GHz) 或更高配置'
            },
            two: {
                item: 'CPU',
                requirement: 'NMIDIA Geforce GTX970, AMD Radon R9 290.或更高配置'
            },
            three: {
                item: '内存',
                requirement: '8GB DDR3 或更高配置'
            },
            four: {
                item: '存储硬盘',
                requirement: '64G或更高配置'
            },
            five: {
                item: '显存',
                requirement: '1G或更高配置'
            }
        },
        configuration: {
            issue: '加载缓慢，加戟崩溃等问题',
            solution: '出现这种问题请刷新，清理缓存或者查看实验帮助'
        }
    },
    // 系统版权信息
    projectDescription:
        '针灸虚拟仿真实验，围绕传统实验教学的局限性和实际洪水调控的知识及能力需求，以“洪水形成—洪水传播—洪水调控”为主线，通过洪水形成感知实验、洪水预报仿真实验和洪水演进调控实验，将“降-产-汇-演-调”多环节融合贯通，实现水循环和洪水调控全过程虚拟仿真，使学生能够建立以应用为主线的知识体系，从而具备解决实际洪水调控问题的能力。实验上线以来，已服务多家高校及企事业单位，取得了显著效果。',
    copyright: '版权所有©甘肃农业职业技术学院 版权所有 12345678',
    siteInformation:
        ' 站点建设与维护：北京易用视点科技有限公司 |地址：北京市石景山区八大处路49号点石商务公园6号楼2层 | 邮编：710048',
    // 教学团队
    teachingTeam: {
        personal: {
            name: '罗军刚',
            gender: '男',
            date_of_birth: '1981.04',
            education: '研究生',
            degree: '博士',
            professional_title: '教授',
            administrative_position: '系副主任',
            department: '水利水电学院水文水资源系',
            avatar_url: './picture/avatar.png'
        },
        teachingContent: [
            {
                name: '实验教学项目负责人',
                content: [
                    '水文与水资源工程专业虚拟仿真实验教学项目设计研究及实现，水利水电国家级实验教学示范中心（西安理工大学），2019-2020年，主持人',
                    '深度融合信息技术的水文与水资源工程专业虚拟仿真实验教学平台建设与实践，陕西高等教育教学改革研究项目，2019-2020年，主要参与人',
                    '《水文预报》课程虚拟仿真实验教学模式研究，水利水电国家级实验教学示范中心（西安理工大学），2019-2020年，主要参与人',
                    '水利工程专业学位研究生实习实践基地建设与管理模式的探索，西安理工大学，2016-2018年，主持人',
                    '《水利能规划》课程虚拟仿真实验，西安理工大学，2016-2018年，主要参与人'
                ]
            },
            {
                name: '教学研究课题',
                content: [
                    '2019年，陕西省教学成果二等奖（第一完成人）',
                    '2018年，全国高校教师教学创新大学三等奖（第二完成人）',
                    '2017年，全国水利工程专业学位研究生优秀指导教师',
                    '2015年，第四届全国大学生水利创新设计大赛二等奖（指导教师）',
                    '2012年，全国水利学科青年教师讲课竞赛一等奖'
                ]
            },
            {
                name: '教学研究论文',
                content: [
                    '魏娜，解建仓，罗军刚，宋孝玉．虚拟仿真在《水文预报》课程教学中的应用[J]．中国教育信息化，2019(24):34-37.',
                    '魏娜，解建仓，罗军刚，宋孝玉，王义民，黄强．水资源与水环境虚拟仿真实验教学平台的建设[J]．实验技术与管理，2019,36(09):100-102.'
                ]
            },
            {
                name: '学术研究论文',
                content: [
                    '陕西省科技奖二等奖，区域水资源动态配置与严格管理支持系统研究，陕西省人民政府，第二名，2013年',
                    '大禹水利科技奖二等奖，黄河重点水功能区污染纳污能力控制技术研究，大禹水利科技奖评审委员会，第六名，2017年',
                    '第十一届陕西省青年科技奖，中共陕西省委组织部，陕西省人力资源和社会保障厅，陕西省科协，2016年',
                    '陕西省青年科技之星，中共陕西省委组织部，陕西省科技厅，陕西省教育厅，陕西省人力资源和社会保障厅，2015年',
                    '中国高水平科技期刊百篇优秀论文（Leader 5000）入选证书，基于熵权的水资源短缺风险的模糊综合评价模型及应用，中国科技情报研究所，第一名，2013年'
                ]
            }
        ],
        teachingTeam: [
            {
                name: '罗军刚',
                position: '教授',
                schoolName: '西安理工大学',
                task: '总体设计、开发建设、在线教学',
                avatar_url: './picture/avatar.png',
                remark: '总体设计、开发建设、在线教学'
            }
        ]
    }
};

// 申报书   declare.pdf
// 实验描述   cases.pdf
// 实验内容   materials.pdf
// 实验特色   experimental.pdf
