const mushrooms = [
{
_id: '6694f21d9da0b904a348fc39',
sciName: 'Laetiporus sulphureus',
comName: 'Chicken of the Woods',
edibility: 'edible',
image: 'https://www.mushroom.world/data/fungi/Laetiporussulphureus3.jpg',
description: 'Laetiporus sulphureus, commonly known as the Sulfur Shelf or Chicken of the Woods, is a species of bracket fungus. It is characterized by its vibrant orange-to-yellow colour and shelf-like growth pattern. The undersurface of the fruit body is made up of tubelike pores rather than gills. This fungus typically grows on decaying wood, often appearing in large clusters.',
owner: '6692ad17446f1cea54cb0d0b',
__v: 0
},
{
_id: '6695043f9da0b904a348fc56',
sciName: 'Calocybe gambosa',
comName: "St George's Mushroom",
edibility: 'inedible/toxic',
image: 'https://www.mushroom.world/data/fungi/Calocybegambosa4.jpg',
description: "Calocybe gambosa, commonly known as St. George's mushroom is a medium to large, fleshy, cream-coloured mushroom. It grows mainly in fields, grass verges and roadsides, but also less frequently appears in mixed woods.",
owner: '6692ad17446f1cea54cb0d0b',
__v: 0
},
{
_id:'669504b79da0b904a348fc59',
sciName: 'Rubroboletus satanas',
comName: "Satan's Bolete",
edibility: 'inedible/toxic',
image: 'https://www.mushroom.world/data/fungi/Rubroboletussatanas1.jpg',
description: "Rubroboletus satanas (formerly Boletus satanas), commonly known as Satan's Bolete, is a fleshy bolete with a smooth, bun-shaped cap that is almost white. It can be identified by its orange to blood-red pores and prominent yellow to blood-red net pattern. Additionally, it has a stout, yellow to red stem. ",
owner:'6692ad17446f1cea54cb0d0b',
__v: 0
}
]

mushrooms.sort(function (a, b) {
    if (a.sciName < b.sciName) {
      return -1;
    }
    if (a.sciName > b.sciName) {
      return 1;
    }
    return 0;
  });

  console.log(mushrooms)