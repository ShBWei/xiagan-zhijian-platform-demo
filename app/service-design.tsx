'use client';

import { useState } from 'react';
import {
  ArrowRight,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Building2,
  BookOpen,
  Users,
  GraduationCap,
  Layers3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { omicsDimensions, patientSteps, roleGuides } from './service-content';
import { PatientPractice } from './research-journey';

export function ServiceEntrances({
  navigate,
}: {
  navigate: (name: string) => void;
}) {
  return (
    <section className="service-entrances" aria-label="角色服务入口">
      {[
        {
          icon: HeartPulse,
          title: '患者与家属',
          text: '了解检测申请、报告服务与随访流程',
          destination: '患者服务',
        },
        {
          icon: Microscope,
          title: '临床与科研人员',
          text: '组织多组学资料，追溯研究证据',
          destination: '科研任务体验',
        },
        {
          icon: Building2,
          title: '团队与机构',
          text: '查看协作、权限和机构服务方案',
          destination: '团队与机构服务',
        },
      ].map((item) => (
        <button key={item.title} onClick={() => navigate(item.destination)}>
          <item.icon aria-hidden="true" />
          <span>
            <b>{item.title}</b>
            <small>{item.text}</small>
          </span>
          <ArrowRight aria-hidden="true" />
        </button>
      ))}
    </section>
  );
}

export function PatientService() {
  const [step, setStep] = useState(0);
  const current = patientSteps[step];
  return (
    <div className="service-page">
      <section className="panel service-heading">
        <span className="section-kicker">
          <HeartPulse /> PATIENT SERVICES
        </span>
        <h1>患者服务</h1>
        <p>从申请到随访，了解每一步需要准备什么、资料如何使用。</p>
        <span className="service-note">
          流程演示 · 不受理检测、不收费、不收集真实病历
        </span>
      </section>
      <section className="panel patient-wizard" aria-label="检测申请流程演示">
        <ol className="service-steps">
          {patientSteps.map((item, index) => (
            <li
              key={item.title}
              aria-current={index === step ? 'step' : undefined}
            >
              <button
                onClick={() => setStep(index)}
                aria-label={`查看${item.title}`}
              >
                <span>0{index + 1}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="wizard-body" aria-live="polite">
          <small>步骤 {step + 1} / 4</small>
          <h2>{current.title}</h2>
          <p>{current.description}</p>
          <ul>
            {current.points.map((point) => (
              <li key={point}>
                <ShieldCheck aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="wizard-actions">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              上一步
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>下一步</Button>
            ) : (
              <>
                <Button disabled>提交检测申请（尚未开放）</Button>
                <Button variant="outline" onClick={() => setStep(0)}>
                  重新体验
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      <PatientPractice />
      <section className="service-duo">
        <article className="panel service-info">
          <h2>进度与报告服务</h2>
          <p>
            机构受理、材料补充、检测处理、专业复核、报告交付。未来由服务机构更新真实状态，患者在自己的账号内查看。
          </p>
          <span className="service-note">尚未接入机构 · 无真实检测进度</span>
        </article>
        <article className="panel service-info">
          <h2>随访与科研参与</h2>
          <p>
            后续随访将记录与研究目的相关的信息。科研使用需要独立授权与审核，研究者不因使用平台就能查看患者身份资料。
          </p>
          <span className="service-note">不提供自动用药建议</span>
        </article>
      </section>
    </div>
  );
}

export function OperationGuide({
  navigate,
}: {
  navigate: (name: string) => void;
}) {
  const [role, setRole] = useState(0);
  const guide = roleGuides[role];
  return (
    <section className="panel operation-guide service-heading">
      <span className="section-kicker">
        <BookOpen /> GETTING STARTED
      </span>
      <h1>操作指南</h1>
      <p>选择你的角色，按步骤了解平台。</p>
      <fieldset className="guide-switch" aria-label="选择使用角色">
        {roleGuides.map((item, index) => (
          <Button
            key={item.label}
            variant={index === role ? 'default' : 'outline'}
            aria-pressed={index === role}
            onClick={() => setRole(index)}
          >
            {item.label}
          </Button>
        ))}
      </fieldset>
      <ol className="guide-list">
        {guide.steps.map((text, index) => (
          <li key={text}>
            <span>0{index + 1}</span>
            <h2>{text}</h2>
          </li>
        ))}
      </ol>
      <p className="guide-output">{guide.output}</p>
      <Button onClick={() => navigate(guide.destination)}>
        前往{guide.destination}
        <ArrowRight />
      </Button>
      {role === 1 && (
        <Button
          className="journey-action"
          variant="outline"
          onClick={() => navigate('科研任务体验')}
        >
          开始科研任务体验
          <ArrowRight />
        </Button>
      )}
    </section>
  );
}

export function OmicsBlueprint() {
  return (
    <section className="panel service-heading">
      <span className="section-kicker">
        <Layers3 /> 数据组织设计
      </span>
      <h2>围绕同一研究对象，组织多源信息</h2>
      <p>
        先确认合法关联依据，再核对时间线与数据口径。并非每个样本都具备全部维度，缺失资料应保留记录。
      </p>
      <div className="omics-table-wrap">
        <table className="omics-table">
          <caption>多组学资料清单 · 字段结构示例，非真实病例</caption>
          <thead>
            <tr>
              <th scope="col">数据维度</th>
              <th scope="col">组织内容</th>
              <th scope="col">质量检查重点</th>
            </tr>
          </thead>
          <tbody>
            {omicsDimensions.map(([name, data, quality]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{data}</td>
                <td>{quality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function AboutPlatform({
  navigate,
}: {
  navigate: (name: string) => void;
}) {
  return (
    <section
      className="about-platform"
      aria-label="关于侠肝智鉴"
      id="about-platform"
    >
      <header className="about-intro">
        <span className="section-kicker">ABOUT XIAGAN ZHIJIAN</span>
        <h2>关于侠肝智鉴</h2>
        <p>多组学驱动的肝癌 TKI 耐药预测体系构建与临床科研共享平台研发</p>
      </header>
      <div className="about-origin">
        <span className="about-number">01 / 项目初心</span>
        <h3>让临床问题有可追溯的研究路径</h3>
        <p>
          项目从肝癌靶向治疗中的耐药研究需求出发，探索如何将分散的病理、影像、分子与随访信息组织起来，让患者服务与科研工作在清晰的授权边界内衔接。
        </p>
        <p>
          平台聚焦专项资料整合、证据复核与研究协作。预测体系和检测服务仍需经过相应验证及机构审核，页面不代表已取得临床应用资质。
        </p>
      </div>
      <div className="about-section">
        <span className="about-number">02 / 团队能力</span>
        <h3>以医学问题为起点的协作团队</h3>
        <p>
          结合既往团队材料，以专业分工呈现协作方式，不公开成员身份及未公开成果。
        </p>
        <div className="team-capabilities">
          {[
            [
              Microscope,
              '医学与科研',
              '梳理临床问题、研究方案与证据，参与结果复核。',
            ],
            [Layers3, '技术研发', '推进多源资料组织、分析流程设计与平台实现。'],
            [Users, '运营协作', '对接使用需求，组织项目管理、培训与服务支持。'],
            [
              GraduationCap,
              '老师指导',
              '指导研究方法、专业质量与学生实践成长。',
            ],
          ].map(([Icon, title, text]) => {
            const TeamIcon = Icon as typeof Users;
            return (
              <article key={title as string}>
                <TeamIcon aria-hidden="true" />
                <h4>{title as string}</h4>
                <p>{text as string}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="about-section">
        <span className="about-number">03 / 产业协同设计</span>
        <h3>连接服务机构与科研工作空间</h3>
        <div className="industry-loop" aria-label="服务与研究闭环设计">
          {[
            ['检测服务', '机构审核申请，规范服务流程'],
            ['授权回流', '独立科研授权，脱敏与质量检查'],
            ['科研沉淀', '受控队列、证据整理与关联分析'],
            ['验证反馈', '候选模型验证，复核后迭代'],
          ].map(([title, text], index) => (
            <div key={title}>
              <span>0{index + 1}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p>
          医院与检测机构承接服务流程，高校与科研团队开展经批准的研究，平台提供资料组织与协作工具。机构名称、合作数量和落地成果不在公开演示中作未经核实的展示。
        </p>
        <Button variant="outline" onClick={() => navigate('团队与机构服务')}>
          查看分层服务方案
          <ArrowRight />
        </Button>
      </div>
      <div className="about-section">
        <span className="about-number">04 / 社会价值目标</span>
        <h3>关注患者可及性，也关注研究效率</h3>
        <div className="social-values">
          <article>
            <HeartPulse />
            <h4>更清晰的服务路径</h4>
            <p>
              通过材料说明、进度沟通和随访流程设计，帮助患者理解服务过程与资料用途。
            </p>
          </article>
          <article>
            <BookOpen />
            <h4>基层科普与科研共享</h4>
            <p>
              延续团队材料中的基层健康科普方向，规划公开知识入口与受控研究资源协作。
            </p>
          </article>
          <article>
            <GraduationCap />
            <h4>跨学科实践培养</h4>
            <p>
              围绕文献研读、临床问题与平台研发，形成学生参与真实问题研究的实践路径。
            </p>
          </article>
        </div>
        <p className="service-note">
          以上为价值方向，不代表已证明降低治疗费用、改善疗效或创造就业。
        </p>
      </div>
      <div className="about-section">
        <span className="about-number">05 / 发展规划</span>
        <h3>从可用原型，逐步走向经验证的服务</h3>
        <ol className="roadmap">
          <li>
            <span>近期目标</span>
            <h4>完善平台 MVP</h4>
            <p>
              完善操作流程、账号与权限设计，建立数据治理规范，评估机构接入条件。
            </p>
          </li>
          <li>
            <span>中期目标</span>
            <h4>建立受控数据回流</h4>
            <p>
              在授权与审核前提下扩展多组学维度，开展候选模型验证和团队协作试点。
            </p>
          </li>
          <li>
            <span>长期探索</span>
            <h4>拓展机构协作网络</h4>
            <p>根据验证结果与实际资源推进多中心协作、机构服务和持续运维。</p>
          </li>
        </ol>
        <p className="service-note">
          阶段规划，非交付承诺；未接入功能均以正式上线说明为准。
        </p>
      </div>
    </section>
  );
}
