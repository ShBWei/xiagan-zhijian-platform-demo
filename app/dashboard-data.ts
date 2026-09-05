export const dashboardMetrics = [
  {
    label: 'TCGA 覆盖癌种',
    value: '33',
    unit: '种',
    change: 'NCI TCGA',
    note: '公开研究资源',
  },
  {
    label: 'TCGA 研究样本',
    value: '20,000+',
    unit: '份',
    change: 'NCI TCGA',
    note: '原发癌及配对正常样本',
  },
  {
    label: 'TCGA 数据规模',
    value: '2.5+',
    unit: 'PB',
    change: 'NCI TCGA',
    note: '公开组学资源规模',
  },
  {
    label: 'IDC 影像集合',
    value: '176',
    unit: '个',
    change: 'IDC v24.0',
    note: '2026-04-27 公开统计',
  },
];

export const publicSources = [
  {
    name: 'NCI TCGA',
    detail: '癌症基因组图谱研究资源',
    color: '#477bdd',
    url: 'https://www.cancer.gov/ccg/research/genome-sequencing/tcga',
  },
  {
    name: 'IDC',
    detail: '影像与数字病理集合',
    color: '#477bdd',
    url: 'https://portal.imaging.datacommons.cancer.gov/',
  },
  {
    name: 'cBioPortal',
    detail: 'LIHC Firehose Legacy',
    color: '#477bdd',
    url: 'https://www.cbioportal.org/study/summary?id=lihc_tcga',
  },
  {
    name: 'NCI GDC',
    detail: '标准化数据访问入口',
    color: '#477bdd',
    url: 'https://portal.gdc.cancer.gov/',
  },
];

export const publicDatasetCards = [
  {
    source: 'IDC',
    title: 'TCGA-LIHC 影像集合',
    meta: '公开影像入口 · 以来源页面为准',
    tags: ['CT', 'MR', '病理切片'],
  },
  {
    source: 'cBioPortal',
    title: 'LIHC Firehose Legacy',
    meta: '肝细胞癌公开队列 · 分子特征浏览',
    tags: ['突变', '拷贝数', '表达'],
  },
  {
    source: 'NCI TCGA',
    title: 'TCGA 泛癌研究资源',
    meta: '33 种癌症 · 20,000+ 样本',
    tags: ['基因组', '转录组', '蛋白组'],
  },
];

export const chartData = {
  '7天': [21, 24, 23, 28, 31, 35, 37],
  '30天': [18, 22, 20, 27, 25, 31, 30, 35, 34, 40, 39, 44],
  '90天': [12, 15, 17, 16, 21, 24, 23, 27, 31, 30, 35, 38],
};

export const assessmentTasks = [
  {
    id: 'DEMO-ANALYSIS-019',
    drug: '公开队列分析',
    stage: '特征计算',
    progress: 78,
    status: '运行中',
    time: '8分钟前',
  },
  {
    id: 'DEMO-COHORT-018',
    drug: 'TCGA-LIHC',
    stage: '结果复核',
    progress: 92,
    status: '待复核',
    time: '26分钟前',
  },
  {
    id: 'DEMO-VIS-041',
    drug: '生存分析',
    stage: '图表生成',
    progress: 100,
    status: '已完成',
    time: '昨天 16:42',
  },
  {
    id: 'DEMO-QC-037',
    drug: 'IDC 影像集合',
    stage: '数据质控',
    progress: 34,
    status: '运行中',
    time: '昨天 14:08',
  },
];

export const analysisTools = [
  { title: '队列构建器', desc: '按临床表型与分子特征筛选', type: 'COHORT' },
  { title: '生存分析', desc: 'Kaplan–Meier 与组间比较', type: 'SURVIVAL' },
  { title: '表达热图', desc: '探索公开队列表达模式', type: 'HEATMAP' },
  { title: '影像浏览器', desc: '查看 IDC 多模态影像', type: 'IMAGING' },
];
