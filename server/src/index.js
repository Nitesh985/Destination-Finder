import app from "./app.js";
import 'dotenv/config'
import { connectToDB } from "./db/connectToDB.js";
import { Location } from './model/location.model.js'
import { Destination } from "./model/destination.model.js";
import { Category } from "./model/category.model.js";


// const touristDestinations = [
//   {
//     name: "Pokhara",
//     description: "Pokhara is renowned for its stunning views of the Annapurna range, serene Phewa Lake, and as a gateway to famous trekking routes like the Annapurna Circuit."
//   },
//   {
//     name: "Annapurna Base Camp",
//     description: "A world-renowned trekking destination, Annapurna Base Camp offers trekkers breathtaking views of the Annapurna massif and an immersive Himalayan experience."
//   },
//   {
//     name: "Ghandruk",
//     description: "Ghandruk is a picturesque Gurung village offering cultural insights, traditional hospitality, and panoramic views of Annapurna and Machapuchare."
//   },
//   {
//     name: "Bandipur",
//     description: "A hilltop settlement with well-preserved cultural heritage, Bandipur is known for its historic architecture, local crafts, and stunning mountain vistas."
//   },
//   {
//     name: "Manang",
//     description: "Manang, a remote village along the Annapurna Circuit, is famous for its dramatic landscapes, rich Tibetan culture, and proximity to Tilicho Lake."
//   },
//   {
//     name: "Muktinath",
//     description: "A sacred pilgrimage site for both Hindus and Buddhists, Muktinath is revered for its temple, natural springs, and breathtaking high-altitude landscapes."
//   },
//   {
//     name: "Begnas Lake",
//     description: "Begnas Lake offers a tranquil retreat with opportunities for boating, fishing, and enjoying the serene natural beauty away from the bustle of Pokhara."
//   },
//   {
//     name: "Sarangkot",
//     description: "Sarangkot is a popular viewpoint near Pokhara, offering spectacular sunrise and sunset views over the Himalayas and opportunities for paragliding."
//   },
//   {
//     name: "Poon Hill",
//     description: "Famous for its panoramic sunrise views of the Himalayas, Poon Hill is a popular trekking destination that offers stunning vistas without a strenuous trek."
//   },
//   {
//     name: "Lumbini",
//     description: "Though technically in Lumbini Province, Lumbini is often visited from Gandaki Province; it is the birthplace of Lord Buddha and a major pilgrimage site."
//   }
// ];

// const categories = [
//   "Lakes",
//   "Temples",
//   "Stupas",
//   "Cave",
//   "Waterfall",
//   "Hiking Places",
//   "Adventurous Places",
//   "Mountains",
//   "Nature & Wildlife"
// ]

const destinations = [
  {
    name: "Fewa Lake",
    category: "Lakes",
    location: "Pokhara",
    description: "A serene freshwater lake offering boating and stunning reflections of the surrounding mountains."
  },
  {
    name: "Begnas Lake",
    category: "Lakes",
    location: "Pokhara",
    description: "A tranquil lake ideal for fishing, boating, and enjoying peaceful nature views."
  },
  {
    name: "Bindhyabasini Temple",
    category: "Temples",
    location: "Pokhara",
    description: "A historic Hindu temple dedicated to the goddess Bhagwati, with panoramic city views."
  },
  {
    name: "Talbarahi Temple",
    category: "Temples",
    location: "Pokhara",
    description: "A pagoda-style Hindu temple located on a small island in Fewa Lake."
  },
  {
    name: "Shanti Stupa",
    category: "Stupas",
    location: "Pokhara",
    description: "A Buddhist pagoda built for peace with a vantage point offering panoramic views of the Annapurna range."
  },
  {
    name: "Mahendra Cave",
    category: "Caves",
    location: "Pokhara",
    description: "A large limestone cave featuring stalactites and stalagmites, named after King Mahendra Bir Bikram Shah Dev."
  },
  {
    name: "Gupteshwor Cave",
    category: "Caves",
    location: "Pokhara",
    description: "A sacred cave near Devi's Fall, known for its stalactites and a shrine dedicated to Lord Shiva."
  },
  {
    name: "Devi's Fall",
    category: "Waterfall",
    location: "Pokhara",
    description: "A famous waterfall where the water forms an underground tunnel after reaching the bottom."
  },
  {
    name: "Mardi Himal Trek",
    category: "Hiking Places",
    location: "Pokhara",
    description: "A scenic trekking route offering stunning views of Mardi Himal and the Annapurna range."
  },
  {
    name: "Khumai Dada Trek",
    category: "Hiking Places",
    location: "Pokhara",
    description: "A less-explored trekking route providing beautiful vistas and a chance to experience local culture."
  },
  {
    name: "Bungee Jumping",
    category: "Adventure",
    location: "Pokhara",
    description: "An exhilarating bungee jump offering an adrenaline rush amidst scenic landscapes."
  },
  {
    name: "Zip Flyer",
    category: "Adventure",
    location: "Pokhara",
    description: "One of the world's longest zip lines, providing a thrilling ride with spectacular mountain views."
  },
  {
    name: "Machhapuchre",
    category: "Mountains",
    location: "Pokhara",
    description: "A distinctive, sacred mountain also known as Fishtail, revered for its unique shape and climbing restrictions."
  },
  {
    name: "Annapurna",
    category: "Mountains",
    location: "Pokhara",
    description: "A massif in the Himalayas offering some of the best trekking routes and panoramic mountain views."
  },
  {
    name: "Mardi",
    category: "Mountains",
    location: "Pokhara",
    description: "A prominent peak providing an adventurous trekking experience with breathtaking vistas."
  },
  {
    name: "Australian Camp",
    category: "Nature & Wildlife",
    location: "Pokhara",
    description: "A popular camping spot offering stunning views of the Annapurna range and surrounding forests."
  },
  {
    name: "Dhampus Village",
    category: "Nature & Wildlife",
    location: "Pokhara",
    description: "A traditional village providing insights into local culture and panoramic views of the Annapurna range."
  },
  {
    name: "Ghandruk Village",
    category: "Nature & Wildlife",
    location: "Pokhara",
    description: "A picturesque Gurung village known for its traditional houses and views of Annapurna and Machhapuchre."
  },
  {
    name: "Ghorepani Poon Hill",
    category: "Nature & Wildlife",
    location: "Pokhara",
    description: "A popular trekking destination renowned for its sunrise views over the Annapurna and Dhaulagiri ranges."
  }
];






connectToDB()
.then(() => {
    app.get("/", (req, res) => {
      res.send("Welcome to the Destination Finder");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`The app is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection to Mongodb failed ::", error);
  });
