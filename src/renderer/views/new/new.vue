<style lang="less">
@import "./new.less";
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>
<template>
    <div class="home-new">
        <Row :gutter="10">
            <Col :md="24" :lg="24">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="4" :lg="4" :style="{marginBottom: '10px'}">
                        <Card>
                           <Tree :data="data1"></Tree>
                        </Card>
                    </Col>
                    <Col :md="20" :lg="20" :style="{marginBottom: '10px'}">
                        <Card>
                         <Table :data="tableData1" :columns="tableColumns1" stripe ref="table2image"></Table>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                <Card>

                </Card>
            </Col>

        </Row>

    </div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import toDoListItem from "./components/toDoListItem.vue";

import html2canvas from "html2canvas";
export default {
  name: "home-new",
  data() {
    return {
      tableData1: this.mockTableData1(),
      imageName: "",
      tableColumns1: [
        {
          title: "项目名称",
          key: "name"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1 ? "blue" : row.status === 2 ? "green" : "red";
            const text =
              row.status === 1 ? "构建中" : row.status === 2 ? "构建完成" : "构建失败";

            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "涉及领域",
          key: "portrayal",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.portrayal.length + "个领域",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.portrayal.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData1[params.index].portrayal.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "研究人员数",
          key: "people",
          render: (h, params) => {
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: params.row.people.length + "个小组",
                  placement: "bottom"
                }
              },
              [
                h("Tag", params.row.people.length),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "ul",
                      this.tableData1[params.index].people.map(item => {
                        return h(
                          "li",
                          {
                            style: {
                              textAlign: "center",
                              padding: "4px"
                            }
                          },
                          item.n + "：" + item.c + "人"
                        );
                      })
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "总经费",
          key: "money",
          render: (h, params) => {
            return h("div", 10000);
          }
        },
        {
          title: "已投入经费",
          key: "money2",
          render: (h, params) => {
            return h("div", 8000);
          }
        },
        {
          title: "更新时间",
          key: "update",
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(this.tableData1[params.index].update)
            );
          }
        }
      ],

      data1: [
        {
          title: "清华大学",
          expand: true,
          children: [
            {
              title: "物理系",
              expand: true,
              children: [
                {
                  title: "1室"
                },
                {
                  title: "2室"
                }
              ]
            },
            {
              title: "计算机系",
              expand: true,
              children: [
                {
                  title: "软件室"
                },
                {
                  title: "网络室"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    mockTableData1() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: "项目" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ["理论研究", "应用研究", "应用开发", "社会实践", "日常教学"],
          people: [
            {
              n: "高职",
              c: Math.floor(Math.random() * 100 + 100)
            },
            {
              n: "中职",
              c: Math.floor(Math.random() * 100 + 100)
            },
            {
              n: "初职",
              c: Math.floor(Math.random() * 100 + 100)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        });
      }
      return data;
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    exportImage() {
      let vm = this;
      let table = this.$refs.table2image.$el;
      /* 这部分代码用来解决生成的图片不清晰的问题 */
      // let tableWidth = table.offsetWidth;
      // let tableHeight = table.offsetHeight;
      // let canvas = document.createElement('canvas');
      // canvas.width = tableWidth * 2;
      // canvas.height = tableHeight * 2;
      // canvas.style.width = tableWidth + 'px';
      // canvas.style.height = tableHeight + 'px';
      // document.body.appendChild(canvas);
      // var context = canvas.getContext('2d');
      // context.scale(2, 2);
      /* 这部分代码用来解决生成的图片不清晰的问题 */
      html2canvas(table, {
        // canvas: canvas,
        onrendered(image) {
          var url = image.toDataURL();
          document.getElementById("exportedImage").src = url;
          let a = document.createElement("a");
          a.href = url;
          a.download = vm.imageName ? vm.imageName : "未命名";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          // document.body.removeChild(canvas);
        }
      });
    }
  }
};
</script>
