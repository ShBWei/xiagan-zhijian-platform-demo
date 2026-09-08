import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import Home from './page';

afterEach(cleanup);

it('患者入口展示步骤且不会提交真实检测申请', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '患者服务' },
    ),
  );
  fireEvent.click(screen.getByRole('button', { name: '下一步' }));
  expect(screen.getByRole('heading', { name: '材料准备' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '下一步' }));
  expect(
    screen.getByRole('heading', { name: '独立科研授权' }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '下一步' }));
  expect(
    screen.getByRole('button', { name: '提交检测申请（尚未开放）' }),
  ).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: '重新体验' }));
  expect(screen.getByRole('heading', { name: '服务须知' })).toBeInTheDocument();
});

it('角色指南切换后展示对应操作且可以跳转', () => {
  render(<Home />);
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '操作指南' },
    ),
  );
  fireEvent.click(screen.getByRole('button', { name: '研究者指南' }));
  expect(screen.getByText('建立研究问题与纳入标准')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '前往多组学工作台' }));
  expect(
    screen.getByRole('heading', { name: '多组学工作台', level: 1 }),
  ).toBeInTheDocument();
});

it('首页团队介绍与数据回流入口可达，详情说明权限边界', async () => {
  render(<Home />);
  expect(
    screen.getByRole('region', { name: '关于侠肝智鉴' }),
  ).toBeInTheDocument();
  fireEvent.click(
    within(screen.getByRole('navigation', { name: '主导航' })).getByRole(
      'button',
      { name: '授权数据回流' },
    ),
  );
  fireEvent.click(screen.getByRole('button', { name: /独立授权与用途说明/ }));
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toHaveTextContent('不同意科研使用，不影响检测服务申请');
});
