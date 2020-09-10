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

app.use("/home/getMoreDatar", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      pageTotal: 100,
      pageNo: 100,
      pageSize: 100,
      pageData: {
        expected: {
          modelName: "近期最受期待",
          datas: [
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "变形金刚之大战葫芦娃",
              sort: "排序",
              runDate: "2020-10-16",
              posterUrl:
                "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
            },
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "泰坦尼克号",
              sort: "排序",
              runDate: "2020-10-17",
              posterUrl:
                "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
            },
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "爸爸去哪",
              sort: "排序",
              runDate: "2020-10-18",
              posterUrl:
                "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
            },
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "xxx变形记",
              sort: "排序",
              runDate: "2020-10-19",
              posterUrl:
                "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
            },
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "金刚",
              sort: "排序",
              runDate: "2020-10-20",
              posterUrl:
                "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
            }
          ]
        },
        nearCome: [
          {
            date: "2020-10-01",
            datas: [
              {
                movieId: "1",
                movieName: "变形金刚2",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "2",
                movieName: "张三变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "3",
                movieName: "xxx变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              }
            ]
          },
          {
            date: "2020-10-02",
            datas: [
              {
                movieId: "4",
                movieName: "李四变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "5",
                movieName: "王五变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              }
            ]
          },
          {
            date: "2020-10-03",
            datas: [
              {
                movieId: "6",
                movieName: "李六变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "7",
                movieName: "xxx变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "8",
                movieName: "爱情来了",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "9",
                movieName: "xxx变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              }
            ]
          },
          {
            date: "2020-10-04",
            datas: [
              {
                movieId: "10",
                movieName: "xxx变形记",
                score: "9.2",
                introduction:
                  "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
                hotScore: "3",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "管虎 | 王千源 张译 姜武"
              },
              {
                movieId: "11",
                movieName: "xxx变形记",
                introduction:
                  "送的还是覅都会死发货地发挥IDfish法华寺发挥好私服",
                hotScore: "1000",
                sort: "排序",
                posterUrl:
                  "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
                director: "小黄",
                actor: "小星星,本宝宝,爱学贷,苗疆客",
                runDate: "2020-08-15 18:00:00"
              }
            ]
          }
        ]
      }
    }
  });
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
      limit: 4,
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
        seatStatus: ["0", "1", "2", "3"],
        seats: [
          {
            rowId: "1",
            rowNum: "1", //<!-- status:0空，1可售，2不可售，3，已售 -->
            columns: [
              // <!-- type:0普通，1情侣左，2情侣右 -->
              {
                seatPrice: "50.00",
                status: "0",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "2",
                columnNum: "2",
                type: "0",
                seatId: "0002"
              },
              {
                seatPrice: "50.00",
                status: "3",
                columnId: "3",
                columnNum: "3",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "4",
                columnNum: "4",
                type: "0",
                seatId: "0004"
              },

              {
                seatPrice: "50.00",
                status: "1",
                columnId: "5",
                columnNum: "5",
                type: "0",
                seatId: "0005"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "6",
                columnNum: "6",
                type: "0",
                seatId: "0006"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "7",
                columnNum: "7",
                type: "0",
                seatId: "0007"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "8",
                columnNum: "8",
                type: "0",
                seatId: "0008"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "9",
                columnNum: "9",
                type: "0",
                seatId: "0009"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "10",
                columnNum: "10",
                type: "0",
                seatId: "0010"
              }
            ]
          },
          {
            rowId: "2",
            rowNum: "2",
            columns: []
          },
          {
            rowId: "3",
            rowNum: "3", //<!-- status:0空，1可售，2不可售，3，已售 -->
            columns: [
              // <!-- type:0普通，1情侣左，2情侣右 -->
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "11",
                columnNum: "1",
                type: "0",
                seatId: "0011"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "12",
                columnNum: "2",
                type: "0",
                seatId: "0012"
              },
              {
                seatPrice: "50.00",
                status: "3",
                columnId: "13",
                columnNum: "3",
                type: "0",
                seatId: "0013"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "14",
                columnNum: "4",
                type: "0",
                seatId: "0014"
              },

              {
                seatPrice: "50.00",
                status: "1",
                columnId: "15",
                columnNum: "5",
                type: "0",
                seatId: "0015"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "16",
                columnNum: "6",
                type: "0",
                seatId: "0016"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "17",
                columnNum: "7",
                type: "1",
                seatId: "0017"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "18",
                columnNum: "8",
                type: "2",
                seatId: "0018"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "19",
                columnNum: "9",
                type: "0",
                seatId: "0019"
              },
              {
                seatPrice: "50.00",
                status: "2",
                columnId: "20",
                columnNum: "10",
                type: "0",
                seatId: "0020"
              }
            ]
          }
        ]
      }
    }
  });
});
//*************************************************************************************最新修改接口模板
//首页接口一（轮播图和热门活动的接口）
app.use("/v1/homeInfo/getHomeData", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-09-07 10:21:33",
    data: {
      banner: [
        {
          bannerStatus: "02",
          cityCode: "110",
          createTime: 1598953752000,
          id: "1",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/536/0000536578.fid",
          linkUrl: "https://www.baidu.com/",
          place: "01",
          provinceCode: "11",
          sortOrder: 1,
          title: "红苹果",
          updateTime: 1599191736000
        },
        {
          bannerStatus: "02",
          cityCode: "110",
          createTime: 1599035518000,
          id: "5b11ac634b9c437ca6e646bdaffdc214",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/588/0000588314.fid",
          linkUrl: "https://www.baidu.com/",
          place: "01",
          provinceCode: "11",
          title: "dddddd",
          updateTime: 1599191674000
        },
        {
          bannerStatus: "02",
          cityCode: "110",
          createTime: 1599035518000,
          id: "5b11ac634b9c437ca6e646bdaffdc214",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/456/0000456738.fid",
          linkUrl: "https://www.baidu.com/",
          place: "01",
          provinceCode: "11",
          title: "dddddd",
          updateTime: 1599191674000
        },
        {
          bannerStatus: "02",
          cityCode: "110",
          createTime: 1599035518000,
          id: "5b11ac634b9c437ca6e646bdaffdc214",
          imageUrl: "http://img.jomoo.com.cn/dev1/0/000/457/0000457354.fid",
          linkUrl: "https://www.baidu.com/",
          place: "01",
          provinceCode: "11",
          title: "dddddd",
          updateTime: 1599191674000
        }
      ],
      activity: {
        modelName: null,
        data: [
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          },
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          },
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          },
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          },
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          },
          {
            bannerStatus: "02",
            cityCode: "110",
            createTime: 1599191769000,
            id: "0c440ab108e54609b37d7b3bd1deb02b",
            imageUrl:
              "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg",
            linkUrl: "https://www.baidu.com/",
            place: "02",
            provinceCode: "11",
            title: "eeeee",
            updateTime: 1599191810000
          }
        ]
      }
    }
  });
});

//*************************************************************************************最新修改接口模板
//首页接口二（首页热映，即将上映数据接口）
app.use("/v1/homeInfo/getShowingOrComing", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-09-03 20:52:00",
    data: {
      pageNo: 1,
      pageSize: 3,
      rows: 10,
      totalPage: 0,
      pageData: [
        {
          movieNname: "大头儿子小头爸爸",
          movieId: "000",
          sort: "0",
          posterUrl:
            "https://img.alicdn.com/bao/uploaded/i3/TB1PboqhGNj0u4jSZFyXXXgMVXa_.jpg_300x300.jpg"
        },
        {
          movieNname: "战狼2",
          movieId: "001",
          sort: "1",
          posterUrl:
            "https://img.alicdn.com/bao/uploaded/i3/TB1PboqhGNj0u4jSZFyXXXgMVXa_.jpg_300x300.jpg"
        },
        {
          movieNname: "大头儿子小头爸爸",
          movieId: "002",
          sort: "2",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
        },
        {
          movieNname: "八佰",
          movieId: "003",
          sort: "3",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
        },
        {
          movieNname: "小时代1",
          movieId: "004",
          sort: "4",
          posterUrl:
            "https://img.alicdn.com/bao/uploaded/i3/TB1PboqhGNj0u4jSZFyXXXgMVXa_.jpg_300x300.jpg"
        }
      ],
      pageDatas: [
        {
          movieNname: "天气之子",
          movieId: "005",
          sort: "5",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
        },
        {
          movieNname: "西红柿首富",
          movieId: "006",
          sort: "6",
          posterUrl:
            "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg"
        },
        {
          movieNname: "小时代2",
          movieId: "007",
          sort: "7",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
        },
        {
          movieNname: "小时代3",
          movieId: "008",
          sort: "8",
          posterUrl:
            "https://img.alicdn.com/bao/uploaded/i2/TB1oiRQSHY1gK0jSZTEXXXDQVXa_.jpg_160x240.jpg"
        },
        {
          movieNname: "小时代4",
          movieId: "0009",
          sort: "9",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c"
        }
      ]
    }
  });
});

//*************************************************************************************最新修改接口模板
//首页接口三（首页资讯接口）
app.use("/home/getInformation", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 15:34:22",
    data: {
      totalPage: 1,
      pageSize: 1,
      pageNo: 1,
      pageData: [
        {
          id: "asdfghjk2345678",
          sort: "1",
          title: "特朗普称愿自掏腰包胜选",
          pushTime: "2020-08-09 13:59:22",
          content:
            "部分手机用户会使用系统或微信提供的字体放大功能，开启该功能后，组件的 font-size 和 line-height 会等比例放大，导致部分组件出现样式偏移的问题，在 2.8.0 版本中，我们针对这个场景进行了适配。",
          linkUrl: "https://www.baidu.com/",
          imageUrl: "https://www.baidu.com/"
        },
        {
          id: "asdfghjk2345678",
          sort: "1",
          title: "饿了么将推出多等5分钟功能",
          pushTime: "2020-08-12 13:59:22",
          content:
            "有赞前端团队是由一群年轻、皮实、对技术饱含热情的小伙伴组成的，目前共有 100 多名前端工程师，分布在业务中台、电商、零售、美业、资产、赋能等业务线。我们热爱分享和开源，崇尚用工程师的方式解决问题，因此造了很多工具来解决我们遇到的问题，目前我们维护的开源产品有。",
          linkUrl: "https://www.baidu.com/",
          imageUrl: "https://www.baidu.com/"
        }
      ]
    }
  });
});

//films
app.use("/film/getFilmDetail", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      movieName: "八佰",
      posterUrl: "海报地址",
      runDate: "2020-08-21 09:00 在中国大陆上映",
      duration: "147分钟",
      movieId: "唯一标识",
      movieCategory: "战争 历史",
      origin: "大陆",
      introduction:
        "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
      isCollection: "1",
      isWanted: "1",
      celebrityMovieRoles: [
        {
          roleType: "导演",
          actor: {
            id: "1",
            name: "管虎",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p1.meituan.net/moviemachine/eeb5bb038e4774f2641b9086c16fe5f6160391.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        },
        {
          roleType: "演员",
          actor: {
            id: "2",
            name: "王千源",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p0.meituan.net/moviemachine/1682480a9400f479772f2dcfc7b1dde1162980.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        },
        {
          roleType: "演员",
          actor: {
            id: "3",
            name: "张译",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p0.meituan.net/movie/92f35f4bec2c47fa045d0b65ddc9fe1929962.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        },
        {
          roleType: "演员",
          actor: {
            id: "4",
            name: "姜武",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p0.meituan.net/movie/6dddbe258f2a90738b66f37377b2541246141.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        },
        {
          roleType: "演员",
          actor: {
            id: "5",
            name: "黄志忠",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p0.meituan.net/movie/49b53a291d74fe5e795ea15fb30bf6fc32087.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        },
        {
          roleType: "演员",
          actor: {
            id: "6",
            name: "李晨",
            enName: "演职人员英文名",
            avatarLogo:
              "https://p0.meituan.net/movie/49b53a291d74fe5e795ea15fb30bf6fc32087.jpg@160w_200h_1e_1c",
            role: "饰演角色",
            roleAvatar: "图片剧中",
            roleDetail: "角色详情"
          }
        }
      ],
      photos: {
        all: [
          {
            sort: "1",
            photoUrl:
              "https://p0.meituan.net/movie/48f2fa0329c018fae54be3744f99cbef307649.jpg@106w_106h_1e_1c"
          },
          {
            sort: "2",
            photoUrl:
              "https://p0.meituan.net/movie/cd13ea8f99240c9786bc3af7945d4abb298083.jpg@106w_106h_1e_1c"
          },
          {
            sort: "3",
            photoUrl:
              "https://p0.meituan.net/movie/8325b14f02105c12fee1352d832f0596612534.jpg@106w_106h_1e_1c"
          },
          {
            sort: "4",
            photoUrl:
              "https://p0.meituan.net/movie/ecd157af3473d402b1f11272eb8dde16529384.jpg@106w_106h_1e_1c"
          },
          {
            sort: "5",
            photoUrl:
              "https://p0.meituan.net/movie/f1f71b08f0e7d8f5641de0d53fef0142480772.jpg@106w_106h_1e_1c"
          },
          {
            sort: "6",
            photoUrl:
              "https://p0.meituan.net/movie/f1f71b08f0e7d8f5641de0d53fef0142480772.jpg@106w_106h_1e_1c"
          },
          {
            sort: "7",
            photoUrl:
              "https://p1.meituan.net/movie/f25e2ae2d542b6a5614130d8df0a1b6d455606.jpg@106w_106h_1e_1c"
          },
          {
            sort: "8",
            photoUrl:
              "https://p0.meituan.net/movie/62e7a47c6d0933ee30160dfe8cd28726425215.jpg@106w_106h_1e_1c"
          },
          {
            sort: "9",
            photoUrl:
              "https://p1.meituan.net/movie/0cdfda6b48c81cf9edca90377b195830302799.jpg@106w_106h_1e_1c"
          },
          {
            sort: "10",
            photoUrl:
              "https://p0.meituan.net/movie/f15869831b7efad38e29175dd1961d84434387.jpg@106w_106h_1e_1c"
          },
          {
            sort: "11",
            photoUrl:
              "https://p1.meituan.net/movie/019c659fbcf153be8f1eeb7801a2ba5d358887.jpg@106w_106h_1e_1c"
          },
          {
            sort: "12",
            photoUrl:
              "https://p0.meituan.net/movie/517bc6f185eb643b2dbe8965a5c8c17c489028.jpg@106w_106h_1e_1c"
          },
          {
            sort: "13",
            photoUrl:
              "https://p0.meituan.net/movie/0f9370ae82bda635008817fa0388b6e9403641.jpg@106w_106h_1e_1c"
          },
          {
            sort: "14",
            photoUrl:
              "https://p0.meituan.net/movie/8800a2d66db164128be5b1acde1a75f4363813.jpg@106w_106h_1e_1c"
          },
          {
            sort: "15",
            photoUrl:
              "https://p0.meituan.net/movie/188dedec1092db901706a0374a75991b260407.jpg@106w_106h_1e_1c"
          }
        ],
        photo: [
          {
            sort: "1",
            photoUrl:
              "https://p0.meituan.net/movie/48f2fa0329c018fae54be3744f99cbef307649.jpg@400w_200h_1e_1c"
          },
          {
            sort: "2",
            photoUrl:
              "https://p0.meituan.net/movie/517bc6f185eb643b2dbe8965a5c8c17c489028.jpg@400w_200h_1e_1c"
          },
          {
            sort: "3",
            photoUrl:
              "https://p0.meituan.net/movie/517bc6f185eb643b2dbe8965a5c8c17c489028.jpg@400w_200h_1e_1c"
          },
          {
            sort: "4",
            photoUrl:
              "https://p0.meituan.net/movie/517bc6f185eb643b2dbe8965a5c8c17c489028.jpg@400w_200h_1e_1c"
          }
        ],
        poster: [
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          },
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          }
        ],
        clothes: [
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          },
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          }
        ],
        news: [
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          },
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          }
        ]
      }
    }
  });
});

// 标记想看收藏
app.use("/film/markWanAlready", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22"
  });
});
//home
app.use("/user/getUserOrderDetai", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      posterUrl:
        "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
      movieName: "八佰",
      runDate: "08月23日 12:10-14:37 （国语2D）",
      showStartTime: 1599630301000,
      showEndTime: "散场时间",
      language: "国语2D",
      showVersionType: "放映版本",
      hallCode: "3D镭射厅",
      cinemaName: "大地影院",
      cinemaAddress: "影院名",
      qrCode: "二维码信息",
      ticketCode: "1221123212331213",
      seats: [
        {
          row: "1",
          column: "1"
        },
        {
          row: "1",
          column: "2"
        }
      ],
      pay: {
        payAmount: "支付金额",
        activity: ["", ""]
      },
      orderNo: "订单号",
      phoneNo: "手机号(脱敏)"
    }
  });
});
app.use("/home/getMoreData", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      pageTotal: "100",
      pageNo: "100",
      pageSize: "100",
      pageData: [
        {
          movieId: "1",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "69768",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "2",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "3",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "4",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "5",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "6",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "840082",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "7",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "8",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "9",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "840082",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "10",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "840082",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        },
        {
          movieId: "11",
          movieName: "xxx变形记",
          score: "9.2",
          introduction:
            "《八佰》由管虎执导，主演阵容包括张译、杜淳、李晨、王千源、黄志忠、姜武、魏晨、欧豪、俞灏明等人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役人。影片取材自1937年淞沪会战的最后一役",
          hotScore: "840082",
          sort: "排序",
          posterUrl:
            "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          director: "小黄",
          actor: "管虎 | 王千源 张译 姜武"
        }
      ]
    }
  });
});
//cinemas
app.use("/cinema/getMessage", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      phoneNo: "15022233733",
      orderNo: "twe999999923792737217",
      movieName: "战狼2",
      showStartTime: "2020-08-13 15:25:00",
      showEndTime: "2020-08-13 15:25:00",
      cinemaName: "万首都店",
      language: "英文3D",
      hallCode: "11号厅",
      showScreenType: "IMAX",
      posterUrl:
        "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@180w_240h_1e_1c",
      totalNum: "2",
      totalPrice: "64",
      features: ["儿童票", "可停车"],
      isRefund: "1",
      isChange: "1",
      seats: [
        {
          rowId: "1",
          columnId: "1",
          rowNum: "1",
          columnNum: "8",
          type: "0",
          regionId: "234567",
          seatId: "0001"
        },
        {
          rowId: "1",
          columnId: "1",
          rowNum: "1",
          columnNum: "9",
          type: "0",
          regionId: "234567",
          seatId: "0002"
        }
      ],
      discounts: [
        {
          name: "xxxxxxxx影城卡",
          sort: "1",
          discount: "3"
        },
        {
          name: "xxxxxxxx联名卡",
          sort: "2",
          discount: "9"
        }
      ]
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
      pageSize: "10",
      pageNo: "2",
      totalPage: "3",
      pageData: [
        {
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          movieName: "电影名",
          cinemaName: "影院名",
          payAmount: "100.00",
          runDate: "2020-09-03 13:53:35",
          orderNo: "订单号",
          creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式",
          runStatus: "1",
          sort: "1"
        },
        {
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          movieName: "电影名",
          cinemaName: "影院名",
          payAmount: "100.00",
          runDate: "2020-03-05 21:46:35",
          orderNo: "订单号",
          creatTime: "订单创建:yyyy-MM-dd hh:mm:ss格式",
          runStatus: "0",
          sort: "1"
        },
        {
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
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
// 我的影城卡
app.use("/user/getCinemaCard", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: [{
          cinemaName: "影院名",
          cardName: "影城卡名",
          cardStatus: "0",
          expiredDate: "有效期：2020-09-03",
          buyNum: "13",
          totalSaving: "130",
          cardId: "卡Id",
          sort: "1"
        },
        {
          cinemaName: "影院名",
          cardName: "影城卡名",
          cardStatus: "1",
          expiredDate: "有效期：2020-09-02",
          buyNum: "13",
          totalSaving: "130",
          cardId: "卡Id",
          sort: "1"
        },
        {
          cinemaName: "影院名",
          cardName: "影城卡名",
          cardStatus: "2",
          expiredDate: "有效期：2020-09-03",
          buyNum: "13",
          totalSaving: "130",
          cardId: "卡Id",
          sort: "1"
        }]
  });
});
// 我的收藏接口
app.use("/user/getUserCollect", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      pageSize: "10",
      pageNo: "1",
      totalPage: "3",
      pageData: [
        {
          sort: "1",
          cinemaScore: "9.0",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "9999",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "2",
          cinemaScore: "9.0",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "3",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "4",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "5",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "6",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "7",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "8",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "9",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "10",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "11",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "12",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "13",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "14",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "15",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        },
        {
          sort: "16",
          cinemaScore: "9.0",
          price: "30.45",
          dist: "300",
          movieName: "电影名",
          movieId: "电影Id,唯一标识",
          hotScore: "想看人数",
          posterUrl: "https://p1.meituan.net/moviemachine/a448ca6a5f4dafb88067722303ca0cfd96002.jpg@120w_200h_1e_1c",
          runDate: "上映日期",
          publicDesc: "上映描述",
          runStatus: "1",
          actors: [
            {
              sort: "1",
              name: "小张"
            },
            {
              sort: "1",
              name: "小张"
            }
          ]
        }
      ],
      pageData1: [
        {
          cinemaScore: "8.8",
          cinemaName: "影院名",
          price: "30.45",
          dist: "600",
          address: "影院地址",
          cinemaStatus: "1",
          cinemaId: "影院Id",
          isCollect: "是否收藏",
          features: ["卫生", "观影体验好", "服务到位"]
        },
        {
          cinemaScore: "8.8",
          cinemaName: "影院名",
          address: "影院地址",
          cinemaStatus: "1",
          cinemaId: "影院Id",
          isCollect: "是否收藏",
          features: ["卫生", "观影体验好", "服务到位"]
        }
      ]
    }
  });
});
// 个人中心
app.use("/user/getBaseMessage", function(req, res) {
  res.json({
    code: "0000",
    msg: "成功",
    dateTime: "2020-08-06 17:38：22",
    data: {
      unPayNu: "1",
      unUseNum: "2"
    }
  });
});
app.listen("8090", () => {
  console.log("监听端口 8090");
});

// nodemon babel-node server.js
