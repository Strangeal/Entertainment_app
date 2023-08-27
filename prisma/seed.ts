import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { hash } from "bcrypt";

async function main() {
  // write your prima client query here
  // await prisma.user.deleteMany();
  await prisma.media.deleteMany();

  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@apple.com" },
    update: {},
    create: {
      email: "admin@apple.com",
      name: "Super Admin",
      password,
    },
  });
  console.log({ user });

  const media = await prisma.media.createMany({
    data: [
      {
        title: "Beyond Earth",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/beyond-trending-poster_zrvuho.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/beyond-original-poster_kqdqoe.jpg",
        year: 2019,
        category: "Movie",
        rating: "PG",
        isTrending: true,
      },
      {
        title: "Bottom Gear",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/bottom-gear-TP_sewfld.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/bottom-gear-OP_nlmmvv.jpg",
        year: 2021,
        category: "Movie",
        rating: "PG",
      },
      {
        title: "Undiscovered Cities",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/undiscovered-cities-TP_nuss69.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/undiscovered-cities-OP_gulooe.jpg",
        year: 2019,
        category: "TV Series",
        rating: "E",
        isTrending: true,
      },
      {
        title: "1998",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/1998-trending-poster_pr6wrk.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/1998-original-poster_omaveo.jpg",
        year: 2021,
        category: "Movie",
        rating: "18+",
      },
      {
        title: "Dark Side of the Moon",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/dark-side-moon-TP_i0ma9n.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/dark-side-moon-OP_jfwyve.jpg",
        year: 2018,
        category: "TV Series",
        rating: "PG",
        isTrending: true,
      },
      {
        title: "The Great Lands",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/asia-original-poster_yus7bx.jpgsets/thumbnails/beyond-earth/trending/large.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/the-great-lands-OP_bg67mx.jpg",
        year: 2019,
        category: "Movie",
        rating: "E",
      },
      {
        title: "The Diary",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/the-diary-OP_aolymo.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/the-diary-OP_aolymo.jpg",
        year: 2019,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "Earth’s Untouched",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/earths-untouched-OP_ad9pcx.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/earths-untouched-OP_ad9pcx.jpg",
        year: 2017,
        category: "Movie",
        rating: "18+",
      },
      {
        title: "No Land Beyond",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/no-land-beyond-OP_o7xiq1.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/no-land-beyond-OP_o7xiq1.jpg",
        year: 2019,
        category: "Movie",
        rating: "E",
      },
      {
        title: "During the Hunt",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/during-the-hunt-OP_d6hxv9.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/during-the-hunt-OP_d6hxv9.jpg",
        year: 2016,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "Autosport the Series",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/autosports-original-poster_u7fdt9.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/autosports-original-poster_u7fdt9.jpg",
        year: 2016,
        category: "TV Series",
        rating: "18+",
      },
      {
        title: "Same Answer II",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/same-answer-2-OP_h8apie.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/same-answer-2-OP_h8apie.jpg",
        year: 2017,
        category: "Movie",
        rating: "E",
      },
      {
        title: "Below Echo",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/below-original-poster_qfomhe.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/below-original-poster_qfomhe.jpg",
        year: 2016,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "The Rockies",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/the-rockies-OP_lawsjy.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/the-rockies-OP_lawsjy.jpg",
        year: 2015,
        category: "TV Series",
        rating: "E",
      },
      {
        title: "Relentless",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/relentless-OP_tl76fm.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/relentless-OP_tl76fm.jpg",
        year: 2017,
        category: "Movie",
        rating: "PG",
      },
      {
        title: "Community of Ours",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/community-OP_ozohof.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/community-OP_ozohof.jpg",
        year: 2018,
        category: "TV Series",
        rating: "18+",
      },
      {
        title: "Van Life",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/nav-life-OP_og5aqc.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/nav-life-OP_og5aqc.jpg",
        year: 2015,
        category: "Movie",
        rating: "PG",
      },
      {
        title: "The Heiress",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/the-heiress-OP_wt8adi.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/the-heiress-OP_wt8adi.jpg",
        year: 2021,
        category: "Movie",
        rating: "PG",
      },
      {
        title: "Off the Track",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/off-the-track-OP_auen32.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/off-the-track-OP_auen32.jpg",
        year: 2017,
        category: "Movie",
        rating: "18+",
      },
      {
        title: "Whispering Hill",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/whispering-hill-OP_hm87ik.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/whispering-hill-OP_hm87ik.jpg",
        year: 2017,
        category: "Movie",
        rating: "E",
      },
      {
        title: "112",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/112-original-poster_izirhk.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/112-original-poster_izirhk.jpg",
        year: 2013,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "Lone Heart",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/lone-heart-OP_ndzlld.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629042/enter_assets/lone-heart-OP_ndzlld.jpg",
        year: 2017,
        category: "Movie",
        rating: "E",
      },
      {
        title: "Production Line",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/production-line_biaexa.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/production-line_biaexa.jpg",
        year: 2018,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "Dogs",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/dogs-OP_zvbs2j.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629041/enter_assets/dogs-OP_zvbs2j.jpg",
        year: 2016,
        category: "TV Series",
        rating: "E",
      },
      {
        title: "Asia in 24 Days",
        overview: "lorem ipsum",
        trendingPoster: "/assets/thumbnails/beyond-earth/trending/large.jpg",
        originalPoster: "/assets/thumbnails/beyond-earth/regular/large.jpg",
        year: 2020,
        category: "TV Series",
        rating: "PG",
        isTrending: true,
      },
      {
        title: "The Tasty Tour",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/the-tasty-tour-OP_vidbcy.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/the-tasty-tour-OP_vidbcy.jpg",
        year: 2016,
        category: "TV Series",
        rating: "PG",
      },
      {
        title: "Darker",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/darker-OP_ecbiaa.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629043/enter_assets/darker-OP_ecbiaa.jpg",
        year: 2017,
        category: "Movie",
        rating: "18+",
        isTrending: true,
      },
      {
        title: "Unresolved Cases",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/unresolved-cases-OP_vu353y.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/unresolved-cases-OP_vu353y.jpg",
        year: 2018,
        category: "TV Series",
        rating: "18+",
      },
      {
        title: "Mission: Saturn",
        overview: "lorem ipsum",
        trendingPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/mission-saturn-OP_ahh11v.jpg",
        originalPoster:
          "https://res.cloudinary.com/dxsom7jmx/image/upload/v1692629040/enter_assets/mission-saturn-OP_ahh11v.jpg",
        year: 2017,
        category: "Movie",
        rating: "PG",
        isTrending: true,
      },
    ],
  });

  console.log(media.count);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
