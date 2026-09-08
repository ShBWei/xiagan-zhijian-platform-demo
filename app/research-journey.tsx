'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Download,
  FileSearch,
  Info,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const dimensions = ['临床随访', '影像资料', '分子资料'];
const exampleRows = [
  {
    id: 'DEMO-001',
    available: ['临床随访', '影像资料', '分子资料'],
    allowed: true,
  },
  { id: 'DEMO-002', available: ['临床随访', '分子资料'], allowed: true },
  { id: 'DEMO-003', available: ['影像资料'], allowed: false },
];
const references = [
  {
    name: 'NCI GDC',
    url: 'https://portal.gdc.cancer.gov/',
    use: '定位公开项目与组学资源；具体访问条件以来源平台为准。',
  },
  {
    name: 'Imaging Data Commons',
    url: 'https://portal.imaging.datacommons.cancer.gov/',
    use: '定位公开影像集合；核对集合、版本与模态。',
  },
  {
    name: 'cBioPortal',
    url: 'https://www.cbioportal.org/',
    use: '浏览公开研究资源；不代表本平台已导入这些数据。',
  },
];

type CheckRow = { id: string; status: string; action: string };

export function ResearchJourney() {
  const [title, setTitle] = useState('肝癌 TKI 耐药资料整理 · 演示项目');
  const [selected, setSelected] = useState(dimensions);
  const [sources, setSources] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [checks, setChecks] = useState<CheckRow[] | null>(null);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const invalidate = () => {
    setChecks(null);
    setReport('');
    setError('');
    setDownloadStatus('');
  };
  const check = () => {
    invalidate();
    if (!title.trim()) {
      setError('请填写演示项目名称，再检查资料。');
      return;
    }
    if (!selected.length) {
      setError('请至少选择一个资料维度，再检查资料。');
      return;
    }
    setChecks(
      exampleRows.map((row) => {
        const missing = selected.filter(
          (item) => !row.available.includes(item),
        );
        if (!row.allowed)
          return {
            id: row.id,
            status: '用途未确认',
            action: '暂停纳入，先核对研究用途与授权范围。',
          };
        return {
          id: row.id,
          status: missing.length ? '资料不完整' : '字段齐备',
          action: missing.length
            ? `缺少${missing.join('、')}；补充资料或调整研究设计，不自动填补。`
            : '仅示例字段齐备；仍需核对原始资料、时间线与研究适用性。',
        };
      }),
    );
  };
  const preview = () => {
    if (!checks) return;
    setDownloadStatus('');
    setReport(
      [
        '侠肝智鉴｜研究资料整理报告（演示）',
        '用途：产品操作体验，不包含耐药预测或用药建议。',
        `项目名称：${title.trim()}`,
        `整理维度：${selected.join('、')}`,
        '',
        '一、资料范围',
        'DEMO 编号及字段全部为人工构造，非患者数据，非公开数据库导入记录。',
        '本页仅对预设示例执行字段完整性与用途标记检查，未运行多组学模型。',
        '',
        '二、资料检查与待办',
        ...checks.map((row) => `${row.id}｜${row.status}｜${row.action}`),
        '',
        '三、公开资源参考入口',
        ...(sources.length
          ? references
              .filter((item) => sources.includes(item.name))
              .map((item) => `${item.name}\n${item.url}\n${item.use}`)
          : ['未选择参考入口。']),
        '上述链接仅作为资源索引，未提取文献结论，也未进行跨库个体关联。',
        '',
        '四、操作者备注（未经审核）',
        note.trim() || '未填写备注。',
        '',
        '五、复核与限制',
        '状态：待人工复核。字段齐备不代表可用于分析，未开展真实检测或预测。',
        '核对来源版本、纳入标准、时间线、授权范围及缺失处理后，再决定后续研究。',
        '本报告不能作为诊断、用药、检测结果或模型性能证明。',
        '本次内容未保存到云端；文本下载由使用者自行保管。',
      ].join('\n'),
    );
  };
  const download = () => {
    if (!report) return;
    try {
      const url = URL.createObjectURL(
        new Blob(['\uFEFF', report], { type: 'text/plain;charset=utf-8' }),
      );
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = '侠肝智鉴-研究资料整理报告-演示.txt';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDownloadStatus('已发起文本下载，请检查浏览器下载列表。');
    } catch {
      setDownloadStatus('下载未能启动，可复制下方报告文本保存。');
    }
  };
  return (
    <div className="service-page research-journey">
      <section className="panel service-heading">
        <span className="section-kicker">
          <FileSearch /> RESEARCH WALKTHROUGH
        </span>
        <h1>科研任务体验</h1>
        <p>配置一个演示项目，检查资料、整理来源，生成可下载的研究记录。</p>
        <div className="journey-boundary">
          <Info />
          <span>
            只使用下方虚构资料，不上传文件、不调用预测模型。请勿填写真实病历或未公开研究信息；切换模块或刷新后，本次输入会清除。
          </span>
        </div>
      </section>
      <section className="panel service-heading">
        <span className="about-number">01 / 配置研究项目</span>
        <h2>明确本次要整理的资料</h2>
        <div className="journey-field">
          <label htmlFor="demo-project">演示项目名称</label>
          <input
            id="demo-project"
            maxLength={80}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              invalidate();
            }}
          />
        </div>
        <fieldset className="journey-choices">
          <legend>选择资料维度（至少一项）</legend>
          {dimensions.map((item) => (
            <Button
              key={item}
              variant={selected.includes(item) ? 'default' : 'outline'}
              aria-pressed={selected.includes(item)}
              onClick={() => {
                setSelected(
                  selected.includes(item)
                    ? selected.filter((value) => value !== item)
                    : [...selected, item],
                );
                invalidate();
              }}
            >
              {item}
            </Button>
          ))}
        </fieldset>
        <p className="service-note">
          输入：演示项目名与所需维度。输出：本次检查清单，不创建云端项目。
        </p>
      </section>
      <section className="panel service-heading">
        <span className="about-number">02 / 资料检查</span>
        <h2>发现缺失项，明确下一步</h2>
        <p>
          下面三个编号完全虚构。检查会依据你的维度选择重新计算，并优先提示用途未确认的记录。
        </p>
        <div className="omics-table-wrap">
          <table className="omics-table">
            <caption>人工构造的资料清单 · 非真实队列</caption>
            <thead>
              <tr>
                <th scope="col">演示编号</th>
                <th scope="col">示例已具备维度</th>
                <th scope="col">用途标记（虚构）</th>
              </tr>
            </thead>
            <tbody>
              {exampleRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.id}</th>
                  <td>{row.available.join('、')}</td>
                  <td>{row.allowed ? '示例范围已标记' : '未确认'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button className="journey-action" onClick={check}>
          <ClipboardList />
          检查示例资料
        </Button>
        {error && (
          <p role="alert" className="journey-error">
            {error}
          </p>
        )}
        {checks && (
          <section aria-label="资料检查结果" className="journey-checks">
            <h3>资料检查结果</h3>
            {checks.map((row) => (
              <article key={row.id}>
                <b>
                  {row.id} · {row.status}
                </b>
                <p>{row.action}</p>
              </article>
            ))}
          </section>
        )}
      </section>
      <section className="panel service-heading">
        <span className="about-number">03 / 证据整理</span>
        <h2>记录资源入口与研究备注</h2>
        <p>
          选择需要保留的公开资源索引。链接不等于研究证据，仍需核对具体数据或文献。
        </p>
        <div className="journey-resources">
          {references.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.use}</p>
              <a href={item.url} target="_blank" rel="noreferrer">
                打开来源 <ArrowRight />
              </a>
              <Button
                variant={sources.includes(item.name) ? 'default' : 'outline'}
                aria-pressed={sources.includes(item.name)}
                onClick={() => {
                  setSources(
                    sources.includes(item.name)
                      ? sources.filter((value) => value !== item.name)
                      : [...sources, item.name],
                  );
                  setReport('');
                  setDownloadStatus('');
                }}
              >
                {sources.includes(item.name) ? '已选入报告' : '选入报告'} ·{' '}
                {item.name}
              </Button>
            </article>
          ))}
        </div>
        <div className="journey-field">
          <label htmlFor="demo-note">
            演示研究备注（选填，不填写敏感信息）
          </label>
          <textarea
            id="demo-note"
            rows={3}
            maxLength={2000}
            value={note}
            placeholder="例如：后续需要核对影像与随访的采集时间。"
            onChange={(event) => {
              setNote(event.target.value);
              setReport('');
              setDownloadStatus('');
            }}
          />
          <small>{note.length} / 2000 字符 · 未保存到云端</small>
        </div>
      </section>
      <section className="panel service-heading">
        <span className="about-number">04 / 报告与复核</span>
        <h2>生成本次操作记录</h2>
        <p>
          报告包含配置、缺失提醒、来源入口及备注，不生成模型结果。先完成资料检查，再预览与下载。
        </p>
        <Button disabled={!checks} onClick={preview}>
          生成研究报告预览
        </Button>
        {report && (
          <div className="report-preview">
            <label htmlFor="demo-report">研究报告预览</label>
            <textarea id="demo-report" readOnly value={report} rows={18} />
            <Button onClick={download}>
              <Download />
              下载演示报告（TXT）
            </Button>
          </div>
        )}
        {downloadStatus && (
          <output className="service-note" aria-live="polite">
            {downloadStatus}
          </output>
        )}
      </section>
    </div>
  );
}

const patientCases = [
  {
    title: '机构待审核案例',
    status: '待审核',
    next: '等待受理机构确认材料范围；此处没有真实申请。',
    report: '报告尚未形成，不能据此判断检测或治疗结果。',
  },
  {
    title: '材料待补充案例',
    status: '需补充材料',
    next: '联系受理机构核对缺失清单，通过机构指定的安全渠道补充。',
    report: '材料不齐时不展示虚构检测结论，也不自动推进检测。',
  },
  {
    title: '报告待解读案例',
    status: '待专业解读',
    next: '预约专业人员解读，结合实际服务范围理解报告。',
    report:
      '报告结构：服务范围、材料说明、方法与限制、复核信息、解读说明。本案例没有检测数值、风险评分或用药建议。',
  },
];

export function PatientPractice() {
  const [checked, setChecked] = useState<string[]>([]);
  const [caseIndex, setCaseIndex] = useState(0);
  const current = patientCases[caseIndex];
  return (
    <section className="panel service-heading patient-practice">
      <span className="section-kicker">
        <CheckCircle2 /> 操作体验
      </span>
      <h2>准备清单与服务案例</h2>
      <p>
        勾选表示你已了解这一项，不代表已提交材料或签署授权。切换模块或刷新后清除。
      </p>
      <fieldset className="journey-choices">
        <legend>准备清单 · 仅作阅读记录</legend>
        {['了解服务范围', '了解材料要求', '了解科研授权独立性'].map((item) => (
          <Button
            key={item}
            variant={checked.includes(item) ? 'default' : 'outline'}
            aria-pressed={checked.includes(item)}
            onClick={() =>
              setChecked(
                checked.includes(item)
                  ? checked.filter((value) => value !== item)
                  : [...checked, item],
              )
            }
          >
            {item}
          </Button>
        ))}
      </fieldset>
      <output aria-label="清单完成情况" className="service-note">
        已了解 {checked.length} / 3 项；不构成服务受理条件。
      </output>
      <fieldset className="journey-choices">
        <legend>选择一个虚构服务案例</legend>
        {patientCases.map((item, index) => (
          <Button
            key={item.title}
            variant={index === caseIndex ? 'default' : 'outline'}
            aria-pressed={index === caseIndex}
            onClick={() => setCaseIndex(index)}
          >
            {item.title}
          </Button>
        ))}
      </fieldset>
      <section
        aria-label="示例进度详情"
        className="patient-case"
        aria-live="polite"
      >
        <span className="service-note">虚构状态 · 非真实申请</span>
        <h3>{current.status}</h3>
        <p>
          <b>下一步：</b>
          {current.next}
        </p>
        <p>
          <b>报告说明：</b>
          {current.report}
        </p>
      </section>
    </section>
  );
}
