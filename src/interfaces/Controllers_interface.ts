//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.


export interface IConvert {
  status_code: 0 | 1,
  status: string,
  mess: string,
  c_status: string,
  vid: string,
  title: string,
  ftype: string,
  fquality: string,
  dlink: string,
}
export interface ILinks {
  f: string,
  q: string,
  k: string
}
export interface IFetch {
  status_code: 0 | 1,
  status: string,
  mess: string,
  vid: string,
  title: string,
  a: string,
  links?: ILinks[]
}

