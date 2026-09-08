import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import Home from './page';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it('科研路径须先检查资料，修改配置后旧检查与报告失效', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '科研任务体验' },
    ),
  );
  expect(
    screen.getByRole('button', { name: '生成研究报告预览' }),
  ).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: '检查示例资料' }));
  expect(
    screen.getByRole('region', { name: '资料检查结果' }),
  ).toHaveTextContent('资料不完整');
  fireEvent.click(screen.getByRole('button', { name: '生成研究报告预览' }));
  expect(
    (
      screen.getByRole('textbox', {
        name: '研究报告预览',
      }) as HTMLTextAreaElement
    ).value,
  ).toContain('不包含耐药预测或用药建议');
  fireEvent.change(screen.getByRole('textbox', { name: '演示项目名称' }), {
    target: { value: '新的演示项目' },
  });
  expect(
    screen.queryByRole('textbox', { name: '研究报告预览' }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: '生成研究报告预览' }),
  ).toBeDisabled();
});

it('空白项目名阻止资料检查并给出可操作错误', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '科研任务体验' },
    ),
  );
  fireEvent.change(screen.getByRole('textbox', { name: '演示项目名称' }), {
    target: { value: '   ' },
  });
  fireEvent.click(screen.getByRole('button', { name: '检查示例资料' }));
  expect(screen.getByRole('alert')).toHaveTextContent('填写演示项目名称');
  expect(
    screen.queryByRole('region', { name: '资料检查结果' }),
  ).not.toBeInTheDocument();
});

it('患者材料可以勾选，进度案例切换展示下一步且不生成真实结果', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '患者服务' },
    ),
  );
  fireEvent.click(screen.getByRole('button', { name: '了解服务范围' }));
  expect(
    screen.getByRole('status', { name: '清单完成情况' }),
  ).toHaveTextContent('1 / 3');
  fireEvent.click(screen.getByRole('button', { name: '材料待补充案例' }));
  expect(
    screen.getByRole('region', { name: '示例进度详情' }),
  ).toHaveTextContent('联系受理机构核对缺失清单');
  fireEvent.click(screen.getByRole('button', { name: '报告待解读案例' }));
  expect(
    screen.getByRole('region', { name: '示例进度详情' }),
  ).toHaveTextContent('预约专业人员解读');
});

it('取消所有资料维度后不能生成检查结果', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '科研任务体验' },
    ),
  );
  for (const label of ['临床随访', '影像资料', '分子资料'])
    fireEvent.click(screen.getByRole('button', { name: label }));
  fireEvent.click(screen.getByRole('button', { name: '检查示例资料' }));
  expect(screen.getByRole('alert')).toHaveTextContent('至少选择一个资料维度');
  expect(
    screen.getByRole('button', { name: '生成研究报告预览' }),
  ).toBeDisabled();
});

it('所选来源和备注进入报告，下载失败时保留可复制文本', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '科研任务体验' },
    ),
  );
  fireEvent.click(screen.getByRole('button', { name: '检查示例资料' }));
  fireEvent.click(screen.getByRole('button', { name: '选入报告 · NCI GDC' }));
  fireEvent.change(screen.getByRole('textbox', { name: /演示研究备注/ }), {
    target: { value: '需要核对采集时间。' },
  });
  fireEvent.click(screen.getByRole('button', { name: '生成研究报告预览' }));
  const report = screen.getByRole('textbox', {
    name: '研究报告预览',
  }) as HTMLTextAreaElement;
  expect(report.value).toContain('https://portal.gdc.cancer.gov/');
  expect(report.value).toContain('需要核对采集时间。');
  expect(report.value).toContain('DEMO-003｜用途未确认');
  vi.stubGlobal('URL', {
    createObjectURL: () => {
      throw new Error('unavailable');
    },
  });
  fireEvent.click(screen.getByRole('button', { name: '下载演示报告（TXT）' }));
  expect(screen.getByText(/下载未能启动，可复制/)).toBeInTheDocument();
  expect(report.value).toContain('研究资料整理报告（演示）');
});
