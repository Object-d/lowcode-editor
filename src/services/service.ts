import { project } from '@alilc/lowcode-engine';
import { TransformStage } from '@alilc/lowcode-types';
import { ossHost } from './../utils/ossUtils';
import { getOssParams, obj2File } from 'src/utils/ossUtils';

export const saveSchema2Oss = () => {
  const currentDocument = project.currentDocument
  const filename = `${currentDocument}.json`
  const schema = project.exportSchema(TransformStage.Save)
  const params: any = {
    ...getOssParams(),
    name: filename,
  }
  const body = new FormData()
  Object.keys(params).forEach(k => {
    body.append(k, params[k])
  })
  body.append('file', obj2File(schema, filename))

  fetch(ossHost, {
    method: 'POST',
    headers: {},
    body: body
  }).then(res => {
    console.log(res)
  })

  console.log('xxxx', params)
}
