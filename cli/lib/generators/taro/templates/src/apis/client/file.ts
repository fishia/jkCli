import _ from 'lodash'
import { uploadFile } from '@tarojs/taro'

import { combineUrl, getTokenHeader } from './inceptors'

export interface IFileClientOptions {
  url: string
  filePath: string
  fileName?: string
  name?: string
  header?: object
  data?: object
}

export default async function FileClient<T = any>(options: IFileClientOptions): Promise<T> {
  const { header, fileName, data, url, ...restOptions } = options
  const filename = _.initial((fileName || '').split('.')).join('')

  return uploadFile({
    url: combineUrl(url),
    name: 'file',
    formData: fileName ? { ...data, filename } : data,
    header: { ...getTokenHeader(), ...header },
    ...restOptions,
  }).then(res => JSON.parse(res.data).data)
}
