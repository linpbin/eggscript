# indexy-api

## API

### 上传PDF

`POST /indexy_api/api/v1/articles/${id}/uploadPDF`

#### URL参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |
| id       | `String` | `yes` | 文章id     |


#### 请求体参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |
| file       | file | `yes` | 上传的文件，仅可上传PDF     |



#### 例子

```
POST /indexy_api/api/v1/articles/1/uploadPDF
Host: 139.129.20.182:3004
Content-Type: multipart/form-data
Cache-Control: no-cache


HTTP/1.1 200 Success
{
    "success": true,
    "payload": {
        "name": "1511318360976_test.pdf"
    }
}

```
### 查看期刊
`GET /indexy_api/api/v1/tasks`

#### URL参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |
| userId | String | `yes` | 用户ID |
| page  | Int | `no` | 分页，请求的页数，默认值：1 |
| size | Int | `no` | 分页，每页显示的容量，默认值：10 |

#### 例子

```
GET /indexy_api/api/v1/tasks?page=1&size=5&userId=15
Host: 139.129.20.182:3004
Content-Type: application/json
Cache-Control: no-cache

HTTP/1.1 200 Success
{
    "success": true,
    "payload": {
        "rows": [
            {
                "journal": {
                    "id": 160,
                    "name": "河南农业科学",
                    "type": "农业",
                    "url": "http://www.hnnykx.org.cn/CN/volumn/current.shtml",
                    "userId": 15
                },
                "isFollow": true
            },
            {
                "journal": {
                    "id": 69,
                    "name": "安徽农业科学",
                    "type": "农业",
                    "url": "http://www.nykxw.com/product.asp?base_id=5&second_id=5002&pageIndex=1",
                    "userId": null
                },
                "isFollow": false
            },
            {
                "journal": {
                    "id": 93,
                    "name": "甘肃农业大学学报",
                    "type": "农业",
                    "url": "http://www.cqvip.com/QK/94944X/",
                    "userId": null
                },
                "isFollow": false
            },
            {
                "journal": {
                    "id": 94,
                    "name": "北方农业学报",
                    "type": "农业",
                    "url": "http://www.cqvip.com/qk/97018A/",
                    "userId": null
                },
                "isFollow": false
            },
            {
                "journal": {
                    "id": 95,
                    "name": "东北农业科学",
                    "type": "农业",
                    "url": "http://www.cqvip.com/QK/96566A/",
                    "userId": null
                },
                "isFollow": false
            }
        ],
        "count": 270
    }
}

```


### 订阅期刊

`POST /indexy_api/api/v1/userTasks/follow`

#### URL参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |


#### Body参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |
| userId       | String | `yes` | 用户ID     |
| taskId       | String | `yes` | 期刊ID     |



#### 例子

```
POST /indexy_api/api/v1/userTasks/follow
Host: 139.129.20.182:3004
Content-Type: application/json
Cache-Control: no-cache
body:{
	"userId" : 15,
	"taskId" : 160
}

HTTP/1.1 200 Success
{
    "success": true,
    "payload": {
        "id": 1,
        "userId": 15,
        "userId": 160,
        "name": "河南农业科学",
        "type": "农业",
        "url": "http://www.hnnykx.org.cn/CN/volumn/current.shtml",
        "updated_at": "2017-11-24T03:42:10.848Z",
        "created_at": "2017-11-24T03:42:10.848Z"
    }
}

```


### 请求全文

`PUT /api/v1/articles/:id/watch`

#### URL参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |


#### 请求体参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |



#### 例子
```
PUT /indexy_api/api/v1/articles/1/watch
Host: 139.129.20.182:3004
Content-Type: application/json
Cache-Control: no-cache

HTTP/1.1 200 Success
{
    "success": true,
    "payload": [
        1
    ]
}
```
### 查看用户订阅期刊的文章
`GET /indexy_api/api/v1/users/:userId/follow/tasks/articles`

#### URL参数说明

| 参数          | 类型       | 是否必须  | 说明        |
| ----------- | -------- | ----- | --------- |
| userId | String | `yes` | 用户ID |
| page  | Int | `no` | 分页，请求的页数，默认值：0 |
| size | Int | `no` | 分页，每页显示的容量，默认值：10 |

#### 例子

```
GET /indexy_api/api/v1/users/15/follow/tasks/articles?page=1&size=5
Host: 139.129.20.182:3004
Content-Type: application/json
Cache-Control: no-cache

HTTP/1.1 200 Success
{
    "success": true,
    "payload": {
        "count": 1873,
        "rows": [
            {
                "id": 196102,
                "taskResult_id": 97,
                "title": "免疫分析方法在磺胺类药物残留检测中的应用",
                "summary": "磺胺类药物是一类常用的广谱型抗菌药，主要用于预防和治疗细菌感染性疾病，并可作为添加剂在动物饲料中长期添加。但磺胺类药物的不规范使用会导致不同程度的药物残留，从而引起生态环境污染，威胁人类健康。磺胺类药物在人体内蓄积会引起过敏反应、造血功能紊乱、肾脏损伤等。因此，研究简单快速、灵敏度高、特异性强的磺胺类药物残留检测方法十分必要。免疫分析方法利用高亲和力抗体对抗原进行特异性识别，是近几年磺胺类药物残留快速检测的研究热点。综述了放射性免疫、化学发光免疫、酶联免疫、免疫层析、免疫传感器等免疫分析方法在磺胺类药物残留快速检测中的应用，并对免疫分析方法今后的发展进行展望。",
                "author": "宋予震1,2，董 青1,2，邢广旭3，胡骁飞3，吕全建2，柳巨雄1*",
                "authorEmail": null,
                "keywords": "磺胺类药物 免疫分析 残留检测",
                "tags": null,
                "publisher": null,
                "journal": "河南农业科学",
                "sourceUrl": "http://www.hnnykx.org.cn/CN/abstract/abstract7594.shtml",
                "pdfUrl": null,
                "publishTime": "2017-01-01T00:00:00.000Z",
                "watch": 0,
                "created_at": "2017-11-03T02:37:14.000Z",
                "updated_at": "2017-11-03T02:37:14.000Z"
            },
            {
                "id": 196103,
                "taskResult_id": 97,
                "title": "植烟土壤微生态调控技术途径及发展趋势",
                "summary": "土壤微生态环境变劣已成为烟叶生产中主要的制约因素之一，生产上亟需有效的调控方法。综述了土壤微生态与烟草生产的关系，分析了影响烟田土壤微生态环境的主要因素，提出了施用有机肥及生物有机肥、施用土壤改良剂、秸秆还田、作物多样性栽培等调控措施，展望了植烟土壤微生态调控的研究和应用，为土壤微生态改良及优质烟叶生产提供参考。",
                "author": "阎海涛1,殷全玉1,任天宝1,许家来2,高卫锴3,刘国顺1*",
                "authorEmail": null,
                "keywords": "植烟土壤； 微生态环境； 调控措施； 发展趋势",
                "tags": null,
                "publisher": null,
                "journal": "河南农业科学",
                "sourceUrl": "http://www.hnnykx.org.cn/CN/abstract/abstract7593.shtml",
                "pdfUrl": null,
                "publishTime": "2017-01-01T00:00:00.000Z",
                "watch": 0,
                "created_at": "2017-11-03T02:37:14.000Z",
                "updated_at": "2017-11-03T02:37:14.000Z"
            },
            {
                "id": 196104,
                "taskResult_id": 97,
                "title": "拟南芥响应NO突变体的筛选及遗传分",
                "summary": "从甲基磺酸乙酯(EMS)诱变获得的拟南芥突变体库中筛选对一氧化氮(NO)胁迫敏感的突变体，以期为研究信号分子NO在植物中的分子调控机制提供遗传材料。从EMS诱变获得的拟南芥突变体库中筛选得到1株对NO敏感的突变体nsm1(nitric oxide sensitive mutant 1)，在正常生长条件下，突变体nsm1与野生型拟南芥的表型并没有明显区别，但是对NO胁迫的敏感性明显高于野生型拟南芥，在50 μmol/L SNP（NO供体）处理下，野生型拟南芥的相对根长(与在正常生长的根长比值)为50.8%，而突变体nsm1的相对根长为22.4%。进一步研究发现，突变体nsm1对甘露醇模拟的干旱胁迫敏感，在100 mmol/L甘露醇处理下，野生型拟南芥的相对根长为83.4%，而突变体nsm1的相对根长仅为45.7%，这可能与突变体nsm1的失水率、水势、气孔导度和蒸腾速率高于野生型拟南芥有关。遗传学分析表明，该突变体为单基因隐性突变。",
                "author": "夏金婵，张小莉*",
                "authorEmail": null,
                "keywords": "拟南芥； 一氧化氮； 突变体nsm1； 干旱",
                "tags": null,
                "publisher": null,
                "journal": "河南农业科学",
                "sourceUrl": "http://www.hnnykx.org.cn/CN/abstract/abstract7596.shtml",
                "pdfUrl": null,
                "publishTime": "2017-01-01T00:00:00.000Z",
                "watch": 0,
                "created_at": "2017-11-03T02:37:14.000Z",
                "updated_at": "2017-11-03T02:37:14.000Z"
            },
            {
                "id": 196105,
                "taskResult_id": 97,
                "title": "2个小麦品种的遗传性状分析及分子标记筛选",
                "summary": "为了明确宁春4号与河东乌麦各自的遗传性状，从农艺性状、品质性状、抗病性、分子标记等方面对2个品种进行鉴定。结果表明：相较于河东乌麦（Ⅰ和Ⅱ），宁春4号株高最低（86.70 cm），穗下茎长和穗长均最长（分别为36.60 cm、10.95 cm），穗粒质量和千粒质量最高（分别为1.95 g、46.61 g），小穗数、穗粒数和经济系数居中；而河东乌麦（Ⅰ和Ⅱ）较宁春4号有效穗均增多（分别为5.10个、6.60个），且表现为田间高抗白粉病、中抗条锈和叶锈病。在主要品质性状上，宁春4号籽粒饱满指数大（0.71）、含水率较高（10.23%）、面团稳定时间较长（9.45 min），其籽粒硬度、吸水率及淀粉回升终点值居中；而河东乌麦（Ⅰ和Ⅱ）蛋白质含量、面筋含量、沉降值均较高（平均值分别达16.21%、35.76%、40.27 mL），面团形成时间较长（2.38 min）。在2个品种上共筛选出具有多态性的SSR、ISSR标记分别为127个、7个；同时，12个已报道相关基因的标记得以鉴定，其中2个品种均携带有Wx-A1a/b、Wx-B1a/b、Wx-D1a/b、Dy12、Pm2、Pm4、Pm6、Sr31基因，宁春4号还携带有Psy-A1基因，河东乌麦（Ⅰ和Ⅱ）携带有Pm16、Yr2和抗赤霉病QFhs.ndsu-3BS基因。",
                "author": "刘 妍1，田蓉蓉1，王天佑1，刘凤楼1，亢 玲2，刘生祥1，张晓岗1，刘 萍1，王掌军1*",
                "authorEmail": null,
                "keywords": "小麦 河东乌麦 宁春4号 农艺性状 品质性状 抗病性 分子标记辅助选择",
                "tags": null,
                "publisher": null,
                "journal": "河南农业科学",
                "sourceUrl": "http://www.hnnykx.org.cn/CN/abstract/abstract7595.shtml",
                "pdfUrl": null,
                "publishTime": "2017-01-01T00:00:00.000Z",
                "watch": 0,
                "created_at": "2017-11-03T02:37:14.000Z",
                "updated_at": "2017-11-03T02:37:14.000Z"
            },
            {
                "id": 196106,
                "taskResult_id": 97,
                "title": "河南红花种质资源表型性状的综合评价",
                "summary": "采用主成分分析法和聚类分析法，对150份河南红花优质种质资源的12个表型性状开展遗传多样性研究和综合评价，旨在为选育红花新品种提供参考。结果表明：河南红花种质资源具有较丰富的遗传多样性，其中，顶果球着粒数的多样性指数最高，其次是顶果球直径、千粒质量和节间长度；单株有效果球总数的变异系数最大，其次是分枝总数、顶果球着粒数、节间长度，最小的为粒长和粒宽。基于各种质间12个表型性状的遗传差异，对150份红花种质进行聚类分析，可在遗传距离为10.15处将其划分为6大类群。第Ⅰ类群以顶果球直径和顶果球着粒数均最大；第Ⅱ类群粒长最大、茎秆最粗、节间长度最短；第Ⅳ类群千粒质量最大、籽粒最宽；第Ⅴ类群株高最高，节间数、分枝总数和单株有效果球总数最多；第Ⅲ和Ⅵ类群的有益性状不明显。在主成分分析中，前4个主成分反映了12个性状的绝大部分信息，累计方差贡献率达到70.08%。第1主成分贡献率为26.07%，主要是分枝总数和单株有效果球总数的综合反映；第2主成分贡献率为17.58%，主要是顶果球着粒数和顶果球直径的综合反映；第3主成分贡献率为14.23%，主要是千粒质量、粒长及粒宽的综合反映；第4主成分贡献率为12.20%，主要是株高、第一分枝高度和节间数的综合反映。河南红花种质的表型综合值（F值）平均为0.36。其中，HH085的综合性状表现较好，其F值最高，为0.89。",
                "author": "许兰杰1，梁慧珍1*，余永亮1，谭政委1，杨红旗1，董 薇1，芦海灵1，司 冰2，刘诗慧2",
                "authorEmail": null,
                "keywords": "河南省')\" href=\"#\">河南省 红花 种质资源表型性状 遗传多样性 主成分分析 综合评价",
                "tags": null,
                "publisher": null,
                "journal": "河南农业科学",
                "sourceUrl": "http://www.hnnykx.org.cn/CN/abstract/abstract7597.shtml",
                "pdfUrl": null,
                "publishTime": "2017-01-01T00:00:00.000Z",
                "watch": 0,
                "created_at": "2017-11-03T02:37:14.000Z",
                "updated_at": "2017-11-03T02:37:14.000Z"
            }
        ]
    }
}

```
