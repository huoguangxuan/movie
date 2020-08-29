// import express from "express"
// import Mock from "mockjs"
const express = require("express"); //引入express
const Mock = require("mockjs"); //引入mock

let app = express();
const Random = Mock.Random;

//允许跨域
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// demo
app.use("/list", function(req, res) {
  res.json(
    Mock.mock({
      status: 200,
      "list|10": [
        {
          "name|+1": ["John Brown", "Jim Green", "Joe Black", "Jon Snow"],
          "age|18-70": 70,
          address: Random.region(),
          date: Random.date()
        }
      ]
    })
  );
});

//tickets
app.use("/ticket/getSeatDatas", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      date: "2020-08-06",
      showStartTime: "2020-08-06 17:38：22",
      showEndTime: "2020-08-06 17:38：22",
      note: [
        {
          sort: "1",
          content: "内容"
        },
        {
          sort: "2",
          content: "内容"
        }
      ],
      cinemaName: "首都国际",
      movieName: "战狼",
      language: "英文",
      showVersion: "3d",
      movieId: "0111",
      datas: {
        seatStatus: ["", ""],
        seats: [
          {
            rowId: "1",
            rowNum: "1",
            columns: [
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              }
            ]
          },
          {
            rowId: "2",
            rowNum: "2",
            columns: [
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              }
            ]
          }
        ]
      }
    }
  });
});

// 获取首页banner，热映，即将上映，热门活动的数据接口
app.use("/home/getHomeData", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      banner: [
        {
          sort: "1",
          name: "少时诵诗书",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/536/0000536578.fid",
          title: "",
          linkUrl: "https://img.yzcdn.cn/vant/apple-1.jpg"
        },
        {
          sort: "2",
          name: "少时诵诗书",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/588/0000588314.fid",
          title: "",
          linkUrl: "https://img.yzcdn.cn/vant/apple-2.jpg"
        },
        {
          sort: "3",
          name: "少时诵诗书",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/456/0000456738.fid",
          title: "",
          linkUrl: "https://img.yzcdn.cn/vant/apple-3.jpg"
        },
        {
          sort: "4",
          name: "少时诵诗书",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/457/0000457354.fid",
          title: "",
          linkUrl: "https://img.yzcdn.cn/vant/apple-4.jpg"
        }
      ],
      showing: {
        modelName: "正在热映",
        data: [
          {
            name: "图片",
            "id ": "",
            sort: "1",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484060.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "2",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484060.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "3",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484060.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "4",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484060.fid"
          }
        ]
      },
      coming: {
        modelName: "即将上映",
        data: [
          {
            name: "图片",
            "id ": "",
            sort: "1",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484061.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "2",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484061.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "3",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484061.fid"
          },
          {
            name: "图片",
            "id ": "",
            sort: "4",
            playBillUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484061.fid"
          }
        ]
      },
      activity: {
        modelName: "热门活动",
        data: [
          {
            name: "活动",
            "id ": "",
            sort: "1",
            photoUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484063.fid"
          },
          {
            name: "活动",
            "id ": "",
            sort: "2",
            photoUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484063.fid"
          },
          {
            name: "活动",
            "id ": "",
            sort: "3",
            photoUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484063.fid"
          },
          {
            name: "活动",
            "id ": "",
            sort: "4",
            photoUrl: "http://img.jomoo.com.cn/dev1/0/000/484/0000484063.fid"
          }
        ]
      }
    }
  });
});

app.listen("8090", () => {
  console.log("监听端口 8090");
});

// nodemon babel-node server.js
