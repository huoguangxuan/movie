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
// 我的订单接口
app.use("/user/getUserOrders", function(req, res) {
  res.json({
      code: "0000", 
      msg: "成功", 
      dateTime: "2020-08-06 17:38：22", 
      data: {
          pageSize: "", 
          pageNo: "", 
          totalPage: "1", 
          pageData: [
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "1", 
                  sort: "1"
              }, 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
              , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
              , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
              , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
              , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
              , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              } , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              } , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              } , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              } , 
              {
                  posterUrl: "https://img.yzcdn.cn/vant/ipad.jpeg", 
                  movieName: "电影名", 
                  cinemaName: "影院名", 
                  payAmount: "100.00", 
                  runDate: "放影时间:yyyy-MM-dd hh:mm:ss格式", 
                  orderNo: "订单号", 
                  creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式", 
                  runStatus: "0", 
                  sort: "1"
              }
          ]
      }
  });
});
app.listen("8090", () => {
  console.log("监听端口 8090");
});

// nodemon babel-node server.js
