import { ILowCodePluginContext, project } from '@alilc/lowcode-engine';
import PagesPlugin from './pages-plugin';

const  PagesPanelPlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;
      // 注册组件面板
      const  pagePane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: ' pagePane',
        content: <PagesPlugin />,
        contentProps: {},
        props: {
          align: 'top',
          icon: 'kaiwenjianjia',
          description: '页面管理',
        },
      });
      pagePane?.disable?.();
      project.onSimulatorRendererReady(() => {
        pagePane?.enable?.();
      })
    },
  };
}
PagesPanelPlugin.pluginName = ' PagesPanelPlugin';
export default PagesPanelPlugin;
