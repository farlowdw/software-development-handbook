// the default export must be an object whose key values are
// 1-dimensional arrays comprised of objects that possess AT LEAST
// "id" and "title" property values; author, time, and link property values are optional
// property names of the default export object may be chosen at will
const bibItems = {
  printMaterials: [
    {
      id: 'DM2018',
      title: `Handbook of Data Structures and Applications (2nd Ed.)`,
      author: 'Dinesh P. Mehta and Sartaj Sahni',
      time: '2018',
      link: 'https://www.amazon.com/Handbook-Structures-Applications-Computer-Information/dp/149870185X',
    },
    {
      id: 'TC2022',
      title: 'Introduction to Algorithms - CLRS (4th Ed.)',
      author: 'Thomas Cormen, Charles Leiserson, Ronald Rivest, Clifford Stein',
      time: '2022',
      link: 'https://www.amazon.com/gp/product/026204630X',
    },
    {
      id: 'DS2011',
      title: `A Transition to Advanced Mathematics (7th Ed.)`,
      author: 'Douglas Smith, Maurice Eggen, and Richard St. Andre',
      time: '2011',
      link: 'https://www.amazon.com/dp/0495562025',
    },
    {
      id: "SK2020",
      title: "Algorithm Design Manual",
      author: "Steven Skiena",
      time: "2020",
      link: "https://www.amazon.com/Algorithm-Design-Manual-Computer-Science/dp/3030542556",
    },
    {
      id: "DK1994",
      title: "Concrete Mathematics",
      author: "Donald Knuth, Ronald Graham, and Oren Patashnik",
      time: "1994",
      link: "https://www.amazon.com/Concrete-Mathematics-Foundation-Computer-Science/dp/0201558025",
    },
    {
      id: 'AB2020',
      title: 'Learning SQL: Generate, Manipulate, and Retrieve Data',
      author: 'Alan Beaulieu',
      time: '2020',
      link: 'https://www.amazon.com/gp/product/1492057614',
    },
    {
      id: 'AM2020',
      title: 'SQL Cookbook: Query Solutions and Techniques for All SQL Users (2nd Ed.)',
      author: 'Anthony Molinaro and Robert de Graaf',
      time: '2020',
      link: 'https://www.amazon.com/gp/product/1492077445',
    },
    {
      id: 'JG2010',
      title: 'SQL Pocket Guide',
      author: 'Jonathan Gennick',
      time: '2010',
      link: 'https://www.amazon.com/gp/product/1449394094',
    },
    {
      id: 'GL2016',
      title: `Data Analysis Using SQL and Excel`,
      author: 'Gordon Linoff',
      time: '2016',
      link: 'https://amazon.com/Data-Analysis-Using-SQL-Excel/dp/111902143X',
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
  math: [
    {
      id: 'KR2002',
      title: `Discrete Mathematics and Its Applications (5th Ed.)`,
      author: 'Kenneth R. Rosen',
      time: '2002',
      link: 'https://www.amazon.com/gp/product/0072424346',
    },
    {
      id: 'DK2012',
      title: `Companion to the Papers of Donald Knuth`,
      author: 'Donald E. Knuth',
      time: '2012',
      link: 'https://www.amazon.com/Companion-Papers-Donald-Knuth-Lecture/dp/157586634X',
    },
    {
      id: 'DK1994',
      title: `Concrete Mathematics: A Foundation for Computer Science`,
      author: 'Donald E. Knuth, Ronald L. Graham, Oren Patashnik',
      time: '2012',
      link: 'https://www.amazon.com/gp/product/0201558025',
    },
    {
      id: 'HE1990',
      title: `An Introduction to the History of Mathematics`,
      author: 'Howard Eves',
      time: '1990',
      link: 'https://www.amazon.com/gp/product/0030295580',
    },
  ]
}

export default bibItems;
