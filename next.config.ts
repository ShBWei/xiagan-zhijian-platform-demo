import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const githubPagesBasePath = '/ganzhiyu-platform-demo';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? githubPagesBasePath : '',
  assetPrefix: isGitHubPages ? githubPagesBasePath : '',
  trailingSlash: isGitHubPages,
};

export default nextConfig;
