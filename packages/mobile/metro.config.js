// Metro config for Expo SDK 52 with pnpm workspace symlink support
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro picks up workspace package changes
config.watchFolders = [workspaceRoot];

// Resolve modules from both the project and workspace root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Required for pnpm: follow symlinks to workspace packages
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
