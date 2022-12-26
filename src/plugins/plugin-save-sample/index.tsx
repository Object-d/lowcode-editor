import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { Button } from '@alifd/next';
import { saveSchema2Oss } from 'src/services/service';

// 保存功能示例
const SaveSamplePlugin = (ctx: ILowCodePluginContext) => {
  return {
    async init() {
      const { skeleton, hotkey } = ctx;

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
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema2Oss();
      });
    },
  };
}
SaveSamplePlugin.pluginName = 'SaveSamplePlugin';
SaveSamplePlugin.meta = {
  dependencies: ['EditorInitPlugin'],
};
export default SaveSamplePlugin;
