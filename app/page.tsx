'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BrainCircuit,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Database,
  Dna,
  FileBarChart,
  FileSearch,
  FlaskConical,
  Gauge,
  Handshake,
  Layers3,
  LayoutDashboard,
  Library,
  Menu,
  Microscope,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  assessmentTasks,
  dashboardMetrics,
  publicDatasetCards,
  publicSources,
} from './dashboard-data';

const navGroups = [
  {
    title: '平台工作台',
    items: [[LayoutDashboard, '平台总览']],
  },
  {
    title: '核心能力',
    items: [
      [Layers3, '多组学工作台'],
      [BrainCircuit, '智能分析'],
      [FileBarChart, '证据与报告'],
    ],
  },
  {
    title: '产业协同',
    items: [
      [Building2, '应用场景'],
      [Users, '科研协作'],
      [ShieldCheck, '数据治理'],
    ],
  },
] as const;

const platformFlow = [
  { title: '多组学接入', desc: '临床 · 组学 · 影像', icon: Layers3 },
  { title: '数据质控', desc: '标准化与质量检查', icon: ShieldCheck },
  { title: '智能分析', desc: '脱敏算法能力演示', icon: BrainCircuit },
  { title: '证据与报告', desc: '解释、复核与协作', icon: FileBarChart },
];

const researchViews = {
  data: {
    label: '数据接入',
    kicker: 'DATA FOUNDATION',
    title: '构建标准化研究队列',
    desc: '从公开数据库或完成合规脱敏的研究资料开始，在统一工作区内组织临床、组学与影像维度。',
    chips: ['临床表型', '组学特征', '影像资料'],
    note: '演示内容取自公开数据，不代表平台内部数据。',
  },
  analysis: {
    label: '智能研判',
    kicker: 'AI ASSISTED ANALYSIS',
    title: '输出研究分层与证据线索',
    desc: '以抽象层级展示分析输出、证据一致性与待复核项，不披露算法结构、特征权重或内部参数。',
    chips: ['研究分层', '证据一致性', '人工复核'],
    note: '结果仅用于科研辅助，不作为临床诊断或治疗依据。',
  },
  report: {
    label: '报告协作',
    kicker: 'TRACEABLE REPORT',
    title: '形成可追溯的研究报告',
    desc: '将数据版本、分析过程与复核意见汇总到同一报告链路，支持科研团队协同讨论。',
    chips: ['过程留痕', '版本管理', '协作复核'],
    note: '页面展示为产品原型，任务状态与报告内容均为模拟。',
  },
} as const;

type ResearchView = keyof typeof researchViews;

const statusClass: Record<string, string> = {
  运行中: 'status running',
  待复核: 'status review',
  已完成: 'status done',
};

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark"><Dna /></span>
      <span>
        <strong>肝·智预</strong>
        <small>HEPALENS</small>
      </span>
    </div>
  );
}

function QuickCreate() {
  return (
    <Sheet>
      <SheetTrigger render={<Button className="quick-create" />}>
        <Plus />新建研究任务
      </SheetTrigger>
      <SheetContent className="assessment-sheet sm:max-w-[500px]">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="text-xl">新建研究任务</SheetTitle>
          <SheetDescription>选择公开数据，或上传已完成合规脱敏的研究资料。</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 overflow-y-auto p-6">
          <div className="privacy-note">
            <ShieldCheck />
            <span><b>演示环境边界</b><br />不存储真实身份信息，核心技术参数不在演示界面呈现。</span>
          </div>
          {[
            [Database, '从公开数据集开始', 'TCGA / IDC / cBioPortal'],
            [Layers3, '创建多组学队列', '组织临床、组学与影像维度'],
            [BrainCircuit, '运行研究分析', '查看脱敏的能力与流程演示'],
            [ClipboardCheck, '创建协作报告', '汇总结果、备注和复核记录'],
          ].map(([Icon, title, desc]) => (
            <button className="upload-row" key={title as string}>
              <span className="upload-icon"><Icon /></span>
              <span><b>{title as string}</b><small>{desc as string}</small></span>
              <ChevronRight className="ml-auto" />
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Navigation({
  activeNav,
  setActiveNav,
}: {
  activeNav: string;
  setActiveNav: (value: string) => void;
}) {
  return (
    <nav aria-label="主导航">
      {navGroups.map((group) => (
        <div className="nav-group" key={group.title}>
          <p className="nav-label">{group.title}</p>
          {group.items.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={activeNav === label ? 'active' : ''}
            >
              <Icon />
              <span>{label}</span>
              {label === '智能分析' && <em className="nav-chip">AI</em>}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

function Sidebar({
  activeNav,
  setActiveNav,
}: {
  activeNav: string;
  setActiveNav: (value: string) => void;
}) {
  return (
    <aside className="sidebar">
      <Brand />
      <div className="workspace-switch">
        <span className="workspace-icon"><Microscope /></span>
        <span><b>产业展示工作区</b><small>产品原型 · 数据脱敏</small></span>
        <ChevronDown />
      </div>
      <QuickCreate />
      <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="sidebar-spacer" />
      <div className="security-card">
        <ShieldCheck />
        <span><b>安全展示模式</b><small>公开数据 · 参数脱敏 · 全程示意</small></span>
      </div>
      <button className="sidebar-setting"><Settings />平台设置</button>
      <div className="user-card">
        <span className="user-avatar">师</span>
        <span><b>老师</b><small>科研工作区</small></span>
        <MoreHorizontal />
      </div>
    </aside>
  );
}

function MobileNavigation({
  activeNav,
  setActiveNav,
}: {
  activeNav: string;
  setActiveNav: (value: string) => void;
}) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="mobile-menu" aria-label="打开菜单" />}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="mobile-sheet">
        <SheetHeader className="sr-only">
          <SheetTitle>平台导航</SheetTitle>
          <SheetDescription>选择平台功能模块</SheetDescription>
        </SheetHeader>
        <Brand />
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
      </SheetContent>
    </Sheet>
  );
}

function CapabilityMap() {
  return (
    <div className="capability-map" aria-label="多组学能力架构图">
      <div className="map-orbit orbit-one" />
      <div className="map-orbit orbit-two" />
      <div className="map-core">
        <span><Dna /></span>
        <strong>HEPALENS</strong>
        <small>研究分析中枢</small>
      </div>
      <div className="map-node node-clinical"><Activity /><span>临床维度</span></div>
      <div className="map-node node-omics"><Dna /><span>组学维度</span></div>
      <div className="map-node node-imaging"><BarChart3 /><span>影像维度</span></div>
      <div className="map-node node-report"><FileBarChart /><span>研究报告</span></div>
    </div>
  );
}

function ResearchWorkspace() {
  const [activeView, setActiveView] = useState<ResearchView>('data');
  const view = researchViews[activeView];

  return (
    <section id="demo-workspace" className="panel research-workspace" role="region" aria-label="研究分析工作台">
      <div className="panel-header">
        <div>
          <span className="section-kicker"><Gauge />平台工作区</span>
          <h2>多组学研究分析</h2>
          <p>公开队列 · 功能流程演示</p>
        </div>
        <span className="sample-badge">界面示意</span>
      </div>
      <div className="workspace-body">
        <div className="workspace-tabs" aria-label="能力视图">
          {(Object.entries(researchViews) as [ResearchView, (typeof researchViews)[ResearchView]][]).map(([key, item], index) => (
            <button
              key={key}
              aria-label={item.label}
              className={activeView === key ? 'active' : ''}
              onClick={() => setActiveView(key)}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ChevronRight />
            </button>
          ))}
        </div>
        <div className="workspace-detail">
          <div className="workspace-copy">
            <span className="workspace-kicker">{view.kicker}</span>
            <h3>{view.title}</h3>
            <p>{view.desc}</p>
            <div className="workspace-chips">
              {view.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <div className="workspace-note"><ShieldCheck />{view.note}</div>
          </div>
          <div className="evidence-preview" aria-label="分析证据示意">
            <div className="preview-heading">
              <span><i />公开队列示例</span>
              <em>已脱敏</em>
            </div>
            <div className="preview-grid">
              <div className="segment-ring">
                <div><strong>B</strong><small>研究分层</small></div>
              </div>
              <div className="evidence-bars">
                {[
                  ['临床维度', 82],
                  ['分子维度', 68],
                  ['影像维度', 75],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <span>{label as string}<small>已整合</small></span>
                    <i><em style={{ width: `${value}%` }} /></i>
                  </div>
                ))}
              </div>
            </div>
            <p>示例仅用于说明信息结构，不代表真实个体分析结果。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('平台总览');
  const [taskFilter, setTaskFilter] = useState('全部');
  const filteredTasks = useMemo(
    () => taskFilter === '全部' ? assessmentTasks : assessmentTasks.filter((task) => task.status === taskFilter),
    [taskFilter],
  );

  const goToWorkspace = () => {
    document.getElementById('demo-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="main-area">
        <header className="topbar">
          <MobileNavigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <div className="search-box">
            <Search />
            <input aria-label="全局搜索" placeholder="搜索数据集、研究队列或报告…" />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <span className="mode-badge"><ShieldCheck />安全展示模式</span>
            <span className="sync-status"><i />公开数据索引可用</span>
            <Button variant="ghost" size="icon" aria-label="帮助"><CircleHelp /></Button>
            <Button variant="ghost" size="icon" aria-label="通知"><Bell /></Button>
          </div>
        </header>

        <div className="content">
          <section className="showcase-hero">
            <div className="hero-copy">
              <p className="hero-eyebrow"><Sparkles />HEPALENS · RESEARCH WORKSPACE</p>
              <h1 aria-label="多组学驱动的肝癌 TKI 耐药研究辅助分析平台">
                <span>多组学驱动的肝癌 TKI 耐药</span>
                <span>研究辅助分析平台</span>
              </h1>
              <p className="hero-lead">
                将合规数据接入、研究分析、证据整合与报告协作串联为一体化工作流，
                为肝癌耐药机制探索提供清晰、可追溯的数字化研究工具。
              </p>
              <div className="trust-row">
                <span><i />产品原型演示</span>
                <span><ShieldCheck />核心参数已脱敏</span>
                <span><Database />公开数据支撑</span>
              </div>
              <div className="hero-actions">
                <Button className="primary-action" onClick={goToWorkspace}>
                  进入演示工作台 <ArrowRight />
                </Button>
                <span>科研辅助展示，不作为临床诊断或治疗依据</span>
              </div>
            </div>
            <CapabilityMap />
            <section className="platform-flow" aria-label="平台能力闭环">
              {platformFlow.map((step, index) => (
                <div className="flow-step" key={step.title}>
                  <span className="flow-index">0{index + 1}</span>
                  <span className="flow-icon"><step.icon /></span>
                  <span><b>{step.title}</b><small>{step.desc}</small></span>
                  {index < platformFlow.length - 1 && <ChevronRight className="flow-arrow" />}
                </div>
              ))}
            </section>
          </section>

          <section className="metric-grid" aria-label="公开数据概览">
            {dashboardMetrics.map((metric, index) => (
              <article className="metric-card" key={metric.label}>
                <div className="metric-top">
                  <span>{metric.label}</span>
                  <span className={`metric-icon metric-icon-${index}`}><Database /></span>
                </div>
                <div className="metric-value">{metric.value}<small>{metric.unit}</small></div>
                <p><b>{metric.change}</b> {metric.note}</p>
              </article>
            ))}
          </section>

          <section className="workspace-grid">
            <ResearchWorkspace />
            <article className="panel source-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker"><Database />公开依据</span>
                  <h2>数据连接与可访问性</h2>
                  <p>用于证明平台的数据兼容能力</p>
                </div>
                <Button variant="ghost" size="sm">数据目录 <ChevronRight /></Button>
              </div>
              <div className="source-list">
                {publicSources.map((source) => (
                  <div className="source-row" key={source.name}>
                    <span className="source-logo" style={{ '--source': source.color } as React.CSSProperties}>
                      {source.name.slice(0, 1)}
                    </span>
                    <span><b>{source.name}</b><small>{source.detail}</small></span>
                    <span className="source-state"><i />可访问</span>
                  </div>
                ))}
              </div>
              <div className="source-boundary">
                <ShieldCheck />
                <p><b>数据边界清晰</b><span>页面数据统计来自公开数据库，内部样本、关键指标与算法参数均未展示。</span></p>
              </div>
            </article>
          </section>

          <section className="operations-grid">
            <article className="panel task-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker"><Activity />流程状态</span>
                  <h2>演示研究任务</h2>
                  <p>任务名称、进度与状态均为界面模拟</p>
                </div>
                <Button variant="ghost" size="sm">全部任务 <ChevronRight /></Button>
              </div>
              <div className="filter-tabs">
                {['全部', '运行中', '待复核', '已完成'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTaskFilter(filter)}
                    className={taskFilter === filter ? 'active' : ''}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span className="sr-only" aria-live="polite">当前显示：{taskFilter}任务</span>
              <div className="task-list">
                {filteredTasks.map((task) => (
                  <button className="task-row" key={task.id}>
                    <span className="task-icon"><FlaskConical /></span>
                    <span className="task-main">
                      <b>{task.id}</b>
                      <small>{task.drug} · {task.stage}</small>
                      <i><em style={{ width: `${task.progress}%` }} /></i>
                    </span>
                    <span className="task-meta">
                      <span className={statusClass[task.status]}>{task.status}</span>
                      <small>{task.time}</small>
                    </span>
                  </button>
                ))}
              </div>
            </article>

            <article className="panel scenario-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker"><Handshake />应用场景</span>
                  <h2>从研究工具到协作平台</h2>
                  <p>围绕真实科研流程展示产品价值</p>
                </div>
              </div>
              <div className="scenario-list">
                {[
                  [FileSearch, '科研队列探索', '统一组织公开与合规脱敏数据'],
                  [Users, '多学科协作', '共享分析过程、证据和复核意见'],
                  [FileBarChart, '成果转化展示', '以可追溯报告承接研究输出'],
                ].map(([Icon, title, desc]) => (
                  <button key={title as string}>
                    <span><Icon /></span>
                    <span><b>{title as string}</b><small>{desc as string}</small></span>
                    <ChevronRight />
                  </button>
                ))}
              </div>
            </article>
          </section>

          <section className="panel datasets-panel">
            <div className="panel-header">
              <div>
                <span className="section-kicker"><Library />公开资源</span>
                <h2>推荐研究数据集</h2>
                <p>页面示例数据均可追溯至公开来源</p>
              </div>
              <Button variant="outline" size="sm">浏览全部</Button>
            </div>
            <div className="dataset-grid">
              {publicDatasetCards.map((dataset) => (
                <button className="dataset-card" key={dataset.title}>
                  <span className="dataset-source">{dataset.source}</span>
                  <b>{dataset.title}</b>
                  <small>{dataset.meta}</small>
                  <span className="dataset-tags">
                    {dataset.tags.map((tag) => <em key={tag}>{tag}</em>)}
                  </span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </section>

          <footer>
            数据统计来自 NCI TCGA、NCI GDC、Imaging Data Commons 与 cBioPortal 等公开数据库；
            分层结果、流程进度及任务状态均为界面示例，不对应真实个人或内部研究项目。
          </footer>
        </div>
      </main>
    </div>
  );
}
