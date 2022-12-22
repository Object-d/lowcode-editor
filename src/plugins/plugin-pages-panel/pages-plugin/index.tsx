import * as React from 'react';
import { Button, Tree } from '@alifd/next';
import {
  project,
  config,
} from '@alilc/lowcode-engine';
import { getPageSchema } from 'src/services/mockService';
import FileDialog, { DataSource } from './FileDialog'
import './index.less'

const { useState } = React;

interface FileNode {
  label: string;
  id: string;
}

export default () => {
  const [visible, setVisible] = useState(false);
  const [treeData, setTreeData] = useState<FileNode[]>([{ label: '首页', id: 'home' }])

  const defaultCurrentPage = config.get('currentPage') || 'home';

  const onSelect = async (keys: string[]) => {
    const key: string = keys[0];

    const schema = await getPageSchema(key);
    console.log('schema: ', schema);
    // 加载 schema
    project.removeDocument(project.currentDocument as any);
    project.openDocument(schema);
    config.set('currentPage', key);
  };

  const onSubmit = async (values: DataSource) => {
    console.log('values: ', values);
    setTreeData([...treeData, { label: values.name, id: values.locator }])
  }

  const openFileCreator = async () => {
    setVisible(true);
  }

  const onVisibleChange = (visible: boolean) => {
    setVisible(visible);
  }

  return <div className='pages-plugin'>
    <div className='pages-plugin-topbtns'>
      <Button onClick={openFileCreator} type="secondary"> 新建 </Button>
    </div>
    <Tree defaultSelectedKeys={[defaultCurrentPage]} defaultExpandAll dataSource={treeData} onSelect={onSelect} />
    <FileDialog visible={visible} onVisibleChange={onVisibleChange} onSubmit={onSubmit} />
  </div>
}
