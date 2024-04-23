import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
import authMenuList from "../src/assets/json/authMenuList.json";

export default [
  {
    url: "/user/list",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 0,
        message: "ok",
        type: "success",
        "data|100": [
          {
            id: "@integer(0, 100)",
            title: "@cparagraph( 2 )",
            create_time: "@date('yyyy-MM-dd')",
            author: "@cname()"
          }
        ]
      });
    }
  },
  {
    url: "/menu/list",
    method: "get",
    response: () => {
      return Mock.mock({
        code: 0,
        message: "ok",
        type: "success",
        data: authMenuList
      });
    }
  }
] as MockMethod[];
