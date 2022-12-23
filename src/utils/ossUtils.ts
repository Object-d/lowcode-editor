export const ossHost = process.env.REACT_APP_OSS_HOST;

export const getOssParams = () => {
  const accessid = process.env.REACT_APP_OSS_ACCESSID;
  const accesskey = process.env.REACT_APP_OSS_ACCESSKEY;

  const policyText = {
    expiration: '2023-01-01T12:00:00.000Z', //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
    ],
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, { asBytes: true });
  const signature = Crypto.util.bytesToBase64(bytes);

  return {
    key: '${filename}',
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    success_action_status: '200', //让服务端返回200,不然，默认会返回204
    signature: signature,
  };
};

export const obj2File = (obj: any, fileName: string) => {
  const theBlob: any = new Blob([JSON.stringify(obj, undefined, 2)], {
    type: 'application/json',
  });

  return new File([theBlob], fileName, {type: 'application/json'})
};
