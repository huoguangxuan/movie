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
              movieName: "xxx变形记",
              sort: "排序",
              runDate: "2020-08-15 18:00:00",
              posterUrl: "https://www.sojson.com/"
            },
            {
              movieId: "1234567",
              hotScore: "10000",
              movieName: "xxx变形记",
              sort: "排序",
              runDate: "2020-08-15 18:00:00",
              posterUrl: "https://www.sojson.com/"
            }
          ]
        },
        nearCome: [
          {
            date: "2020-08-07",
            datas: [
              {
                movieId: "1234567",
                movieName: "xxx变形记",
                introduction:
                  "送的还是覅都会死发货地发挥IDfish法华寺发挥好私服",
                hotScore: "1000",
                sort: "排序",
                posterUrl: "https://www.sojson.com/",
                director: "小黄",
                actor: "小星星,本宝宝,爱学贷,苗疆客",
                runDate: "2020-08-15 18:00:00"
              },
              {
                movieId: "1234567",
                movieName: "xxx变形记",
                introduction:
                  "送的还是覅都会死发货地发挥IDfish法华寺发挥好私服",
                hotScore: "1000",
                sort: "排序",
                posterUrl: "https://www.sojson.com/",
                director: "小黄",
                actor: "小星星,本宝宝,爱学贷,苗疆客",
                runDate: "2020-08-15 18:00:00"
              }
            ]
          },
          {
            date: "2020-08-07",
            datas: [
              {
                movieId: "1234567",
                movieName: "xxx变形记",
                introduction:
                  "送的还是覅都会死发货地发挥IDfish法华寺发挥好私服",
                hotScore: "1000",
                sort: "排序",
                posterUrl: "https://www.sojson.com/",
                director: "小黄",
                actor: "小星星,本宝宝,爱学贷,苗疆客",
                runDate: "2020-08-15 18:00:00"
              },
              {
                movieId: "1234567",
                movieName: "xxx变形记",
                introduction:
                  "送的还是覅都会死发货地发挥IDfish法华寺发挥好私服",
                hotScore: "1000",
                sort: "排序",
                posterUrl: "https://www.sojson.com/",
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
                status: "0",
                columnId: "1",
                columnNum: "1",
                type: "0",
                seatId: "0001"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "2",
                columnNum: "1",
                type: "0",
                seatId: "0002"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },

              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
              },
              {
                seatPrice: "50.00",
                status: "1",
                columnId: "3",
                columnNum: "1",
                type: "0",
                seatId: "0003"
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
                status: "1",
                columnId: "6",
                columnNum: "6",
                type: "0",
                seatId: "0006"
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
          },
          {
            name: "活动",
            "id ": "",
            sort: "4",
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
      isCollection: "是否收藏",
      isWanted: "是否想看",
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
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
          },
          {
            sort: "排序",
            photoUrl: "https://www.sojson.com/"
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
app.listen("8090", () => {
  console.log("监听端口 8090");
});

// nodemon babel-node server.js
