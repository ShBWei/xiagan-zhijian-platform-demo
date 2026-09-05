import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Home from './page';

afterEach(cleanup);

describe('侠肝智鉴产业展示工作台', () => {
  it('首屏清楚表达平台定位和演示边界', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: '多组学驱动的肝癌 TKI 耐药研究辅助分析平台',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('产品原型演示')).toBeInTheDocument();
    expect(screen.getByText('核心参数已脱敏')).toBeInTheDocument();
    expect(screen.getByText('公开数据支撑')).toBeInTheDocument();
    expect(screen.getByText(/不作为临床诊断或治疗依据/)).toBeInTheDocument();
  });

  it('展示从数据到报告的四步平台能力闭环', () => {
    render(<Home />);

    const flow = screen.getByRole('region', { name: '平台能力闭环' });
    for (const label of ['多组学接入', '数据质控', '智能分析', '证据与报告']) {
      expect(flow).toHaveTextContent(label);
    }
    expect(
      screen.getByRole('button', { name: /进入演示工作台/ }),
    ).toBeInTheDocument();
  });

  it('保留专业工作台导航和公开数据依据', () => {
    render(<Home />);

    for (const label of ['平台工作台', '核心能力', '产业协同']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    for (const label of ['NCI TCGA', 'IDC', 'cBioPortal']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(/数据统计来自公开数据库/)).toBeInTheDocument();
  });

  it('可以切换研究工作台的能力视图', () => {
    render(<Home />);

    const workspace = screen.getByRole('region', { name: '研究分析工作台' });
    fireEvent.click(
      within(workspace).getByRole('button', { name: '智能研判' }),
    );
    expect(workspace).toHaveTextContent('输出研究分层与证据线索');
  });

  it('筛选演示任务后反馈当前状态', () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: '运行中' }));
    expect(screen.getByText('当前显示：运行中任务')).toBeInTheDocument();
  });

  it('导航切换到对应模块，且可以返回总览', () => {
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: '主导航' });
    fireEvent.click(within(nav).getByRole('button', { name: /智能分析/ }));
    expect(
      screen.getByRole('heading', { name: '智能分析', level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText('输出研究分层与证据线索')).toBeInTheDocument();
    fireEvent.click(within(nav).getByRole('button', { name: '平台总览' }));
    expect(
      screen.getByRole('region', { name: '公开数据概览' }),
    ).toBeInTheDocument();
  });

  it('公开数据集详情提供真实来源入口', async () => {
    render(<Home />);
    fireEvent.click(
      screen.getByRole('button', { name: /TCGA-LIHC 影像集合/ }),
    );
    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByRole('link', { name: /查看公开来源/ }),
    ).toHaveAttribute('href', 'https://portal.imaging.datacommons.cancer.gov/');
    expect(dialog).toHaveTextContent('以来源页面为准');
  });

  it('搜索模块并通过结果进入，搜索同时清空', () => {
    render(<Home />);
    const input = screen.getByRole('textbox', { name: '全局搜索' });
    fireEvent.change(input, { target: { value: '数据治理' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(
      screen.getByRole('heading', { name: '数据治理', level: 1 }),
    ).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('新建任务入口进入报告演示并关闭抽屉', async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /新建研究任务/ }));
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(
      within(dialog).getByRole('button', { name: /创建协作报告/ }),
    );
    expect(
      screen.getByRole('heading', { name: '证据与报告', level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText('形成可追溯的研究报告')).toBeInTheDocument();
  });
});
