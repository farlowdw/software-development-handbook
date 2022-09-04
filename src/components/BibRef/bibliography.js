// the default export must be an object whose key values are
// 1-dimensional arrays comprised of objects that possess AT LEAST
// "id" and "title" property values; author, time, and link property values are optional
// property names of the default export object may be chosen at will
const bibItems = {
  printMaterials: [
    {
      id: "SK2020",
      title: "Algorithm Design Manual",
      author: "Steven Skiena",
      time: "2020",
      link: "https://www.amazon.com/Algorithm-Design-Manual-Computer-Science/dp/3030542556",
    },
  ],
  onlineMaterials: [
    {
      id: 'fangprepSubstack',
      title: 'Fangprep - Big Tech Interview Prep',
      author: 'Daniel Habib',
      time: '',
      link: 'https://fangprep.substack.com/archive?sort=top',
    },
  ],
}

export default bibItems;
