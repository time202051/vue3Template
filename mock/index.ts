import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

export default [
  {
    url: '/user/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        message: 'ok',
        type: 'success',
        'data|100': [
          {
            id: '@integer(0, 100)',
            title: '@cparagraph( 2 )',
            create_time: "@date('yyyy-MM-dd')",
            author: '@cname()'
          }
        ]
      });
    }
  }
] as MockMethod[];
