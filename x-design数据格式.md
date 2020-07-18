#### 数据库存储数据结构

**用户User：**

| 名称      | 类型    | 描述                                  | 是否可为空值 |
| --------- | ------- | ------------------------------------- | ------------ |
| id        | int     | 唯一标识                              | 否           |
| phone     | string  | 手机号码，后期用于跨平台数据连通，用户唯一      | 是           |
| nickname  | string  | 昵称                                  | 否           |
| email | string | 邮箱 | 是 |
| password | string | 密码 | 是 |
| avatarUrl | string  | 头像地址                              | 否           |
| gender    | int     | 性别，0代表未知，1代表男性，2代表女性 | 否           |
| country   | string  | 所在国家                              | 是  |
| province  | string  | 所在省份                              | 是  |
| city      | string  | 所在城市                              | 是   |
| isValid   | boolean | 账号是否可用                          | 否           |
| wxUnionId | string | 微信的unionid | 是 |
| qqUnionId    | string | QQ的unionid | 是 |
| registerTime | date | 注册时间 | 否 |

**图片Picture：**

| 名称  | 类型   | 描述       | 是否可为空值 |
| ----- | ------ | ---------- | ------------ |
| id    | int    | 唯一标识   | 否           |
| url   | string | 图片地址   | 否           |
| owner | string | 所属用户id | 否           |

**产品Product：**

| 名称      | 类型   | 描述                                  | 是否可为空值 |
| --------- | ------ | ------------------------------------- | ------------ |
| id        | int    | 唯一标识                              | 否           |
| preview   | string | 预览图地址                              | 否           |
| category | int | 产品种类    | 否           |
| model | string | 产品款式 | 是 |
| price | double | 产品单价      | 否           |
| owner | int | 所属用户id | 否 |
| remark | string | 产品备注 | 是           |

**地址Address：**

| 名称  | 类型   | 描述       | 是否可为空值 |
| ----- | ------ | ---------- | ------------ |
| id    | int    | 唯一标识   | 否           |
| owner | string | 所属用户id | 否           |
| province   | string | 省   | 否           |
| city   | string | 市   | 否           |
| district   | string | 区   | 否           |
| detail   | string | 详细住址   | 否           |

**订单Order：**

| 名称        | 类型   | 描述         | 是否可为NULL |
| ----------- | ------ | ------------ | ------------ |
| id          | int    | 唯一标识     | 否           |
| origin      | double | 原价         | 否           |
| discount    | double | 折扣         | 否           |
| actual      | double | 实际价格     | 否           |
| consignee   | string | 收货人姓名     | 否           |
| phone   | string | 收货人手机号码     | 否           |
| deliveryAddress   | string | 收货地址     | 否           |
| owner       | int    | 所属用户id   | 否           |
| createTime  | date   | 订单创建时间 | 否           |
| payTime     | date   | 订单付款时间 | 是           |
| arrivalTime | date   | 订单送达时间 | 是           |
| gradeTime   | date   | 订单评价时间 | 是           |
| grade | int | 用户评分 | 否（默认为0） |
| trackingNumber | string | 运单号       | 是           |
| expressCompany | string | 快递公司 | 是 |
| state | string | 订单状态 | 否 |

**订单单项OrderItem：**

| 名称      | 类型   | 描述                                  | 是否可为空值 |
| --------- | ------ | ------------------------------------- | ------------ |
| id        | int    | 唯一标识                              | 否           |
| preview | string | 预览图地址                              | 否           |
| category | string | 产品种类    | 否           |
| model | string | 产品款式 | 是           |
| price | double | 产品单价      | 否           |
| oid | int | 所属订单id | 否 |
| remark | string | 产品备注 | 是 |
| num | int | 购买产品数量 | 否 |

#### 数据库外数据结构：

**完整订单CompleteOrder**：同Order，新增字段items: Array\<OrderItem\>，存储关联的OrderItem；

**产品种类Category**：

| 名称   | 类型           | 描述               | 是否可为空值 |
| ------ | -------------- | ------------------ | ------------ |
| name   | string         | 种类名称           | 否           |
| models | Array\<Model\> | 种类中包含的款式   | 否(默认为[]) |
| price  | double         | 此种类产品基础价格 | 否           |

**产品款式Model**：

| 名称  | 类型            | 描述         | 是否可为空值 |
| ----- | --------------- | ------------ | ------------ |
| name  | string          | 款式名称     | 否           |
| price | Array\<string\> | 款式对应价格 | 否           |

