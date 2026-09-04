export const dashboardMetrics = [
  { label: 'TCGA-LIHC 研究对象', value: '377', unit: '人', change: 'NCI TCGA', note: '公开队列' },
  { label: '公开影像模态', value: '5', unit: '类', change: 'IDC', note: 'SM / SEG / CT / MR / PT' },
  { label: 'TCGA 覆盖癌种', value: '33', unit: '种', change: '20,000+', note: '原发癌及配对样本' },
  { label: '公开数据规模', value: '2.5', unit: 'PB', change: 'TCGA', note: '多维组学数据' },
];

export const publicSources = [
  { name: 'NCI TCGA', count: '377 人', coverage: 100, detail: 'TCGA-LIHC 临床与组学', color: '#117c72' },
  { name: 'IDC', count: '5 类模态', coverage: 84, detail: '影像与数字病理集合', color: '#2770a8' },
  { name: 'cBioPortal', count: '379 人', coverage: 92, detail: 'LIHC Firehose Legacy', color: '#7a5ea7' },
  { name: 'NCI GDC', count: '持续更新', coverage: 76, detail: '标准化数据访问入口', color: '#b36a3c' },
];

export const publicDatasetCards = [
  { source: 'IDC', title: 'TCGA-LIHC 影像集合', meta: '377 名研究对象 · 公开访问', tags: ['CT', 'MR', '病理切片'] },
  { source: 'cBioPortal', title: 'LIHC Firehose Legacy', meta: '379 名患者 · 373 个样本', tags: ['突变', '拷贝数', '表达'] },
  { source: 'NCI TCGA', title: 'TCGA 泛癌研究资源', meta: '33 种癌症 · 20,000+ 样本', tags: ['基因组', '转录组', '蛋白组'] },
];

export const chartData = {
  '7天': [21, 24, 23, 28, 31, 35, 37],
  '30天': [18, 22, 20, 27, 25, 31, 30, 35, 34, 40, 39, 44],
  '90天': [12, 15, 17, 16, 21, 24, 23, 27, 31, 30, 35, 38],
};

export const assessmentTasks = [
  { id: 'DEMO-ANALYSIS-019', drug: '公开队列分析', stage: '特征计算', progress: 78, status: '运行中', time: '8分钟前' },
  { id: 'DEMO-COHORT-018', drug: 'TCGA-LIHC', stage: '结果复核', progress: 92, status: '待复核', time: '26分钟前' },
  { id: 'DEMO-VIS-041', drug: '生存分析', stage: '图表生成', progress: 100, status: '已完成', time: '昨天 16:42' },
  { id: 'DEMO-QC-037', drug: 'IDC 影像集合', stage: '数据质控', progress: 34, status: '运行中', time: '昨天 14:08' },
];

export const analysisTools = [
  { title: '队列构建器', desc: '按临床表型与分子特征筛选', type: 'COHORT' },
  { title: '生存分析', desc: 'Kaplan–Meier 与组间比较', type: 'SURVIVAL' },
  { title: '表达热图', desc: '探索公开队列表达模式', type: 'HEATMAP' },
  { title: '影像浏览器', desc: '查看 IDC 多模态影像', type: 'IMAGING' },
];
