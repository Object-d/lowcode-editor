import * as React from 'react';
import { Dialog, Form, Field, Input, Radio } from '@alifd/next';

export interface DataSource {
  name: string;
  locator: string;
  type: number;
}
export interface DialogFormProps {
  dataSource?: DataSource;
  visible?: boolean;
  onSubmit?: (data: DataSource) => void;
  onVisibleChange?: (visible: boolean) => void;
}

const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 14
  }
};

const DialogForm: React.FunctionComponent<DialogFormProps> = (props: DialogFormProps) => {
  const {
    dataSource = {},
    visible = true,
    onSubmit = () => { },
    onVisibleChange = () => { },
  } = props;

  const field = Field.useField({
    values: dataSource,
  });

  const submit = async () => {
    const { errors } = await field.validatePromise();
    if (errors && errors.length > 0) {
      return;
    }

    onSubmit(field.getValues());
    onVisibleChange(false);
  };

  const close = () => {
    onVisibleChange(false);
  };
  return (
    <Dialog
      visible={visible}
      title="新建"
      onOk={submit}
      onCancel={close}
    >
      <Form {...formItemLayout} field={field} style={{width: 300}} labelAlign='top'>
        <Form.Item
          name="name"
          label="文件名"
          required
          requiredMessage="请输入!"
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          name="locator"
          label="路由"
          required
          requiredMessage="请输入!"
        >
          <Input name="locator" />
        </Form.Item>
        <Form.Item
          name="type"
          label="类型"
          required
          requiredMessage="请选择!"
        >
          <Radio.Group name="type" dataSource={[
            {
              label: '文件夹',
              value: 1
            },
            {
              label: '文件',
              value: 2
            }
          ]} />

        </Form.Item>
      </Form>
    </Dialog>
  );
};

export default DialogForm;
