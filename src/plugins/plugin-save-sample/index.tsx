import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import {
  saveSchema2Oss,
  resetSchema,
} from '../../services/mockService';

// 保存功能示例
const SaveSamplePlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey, config } = ctx;
      const scenarioName = config.get('scenarioName');

      skeleton.add({
        name: 'saveSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => saveSchema2Oss()}>
            保存
          </Button>
        ),
      });
      skeleton.add({
        name: 'resetSchema',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <Button onClick={() => resetSchema(scenarioName)}>
            重置页面
          </Button>
        ),
      });
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema2Oss(scenarioName);
      });
    },
  };
}
SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default SaveSamplePlugin;