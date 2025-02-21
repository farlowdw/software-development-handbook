// the default export must be an object whose key values are
// 1-dimensional arrays comprised of objects that possess AT LEAST
// "id" and "title" property values; author, time, and link property values are optional
// property names of the default export object may be chosen at will
const bibItems = {
  printMaterials: [
    {
      id: 'MM2025',
      title: `Beyond Cracking the Coding Interview`,
      author: 'Gayle Laakmann McDowell, Mike Mroczka, Aline Lerner, Nil Mamano',
      time: '2025',
      link: 'https://www.amazon.com/dp/195570600X',
    },
    {
      id: 'AL2011Puzzles',
      title: `Algorithmic Puzzles`,
      author: 'Anany Levitin and Maria Levitin',
      time: '2011',
      link: 'https://www.amazon.com/Algorithmic-Puzzles-Anany-Levitin/dp/0199740445/ref=sr_1_1',
    },
    {
      id: 'AL2011',
      title: `Introduction to the Design and Analysis of Algorithms (3rd Ed.)`,
      author: 'Anany Levitin',
      time: '2011',
      link: 'https://www.amazon.com/Introduction-Design-Analysis-Algorithms-3rd/dp/0132316811/ref=sr_1_1',
    },
    {
      id: 'PB2017',
      title: `Forest Management and Planning`,
      author: 'Pete Bettinger et al.',
      time: '2017',
      link: 'https://www.amazon.com/Forest-Management-Planning-Peter-Bettinger/dp/0128094761',
    },
    {
      id: 'AL2024',
      title: `Guide to Competitive Programming: Learning and Improving Algorithms Through Contests`,
      author: 'Antti Laaksonen',
      time: '2024',
      link: 'https://www.amazon.com/gp/product/3030393569',
    },
    {
      id: 'CP4B2',
      title: `Competitive Programming 4 - Book 2`,
      author: 'Steven Halim',
      time: '2018',
      link: 'https://www.amazon.com/gp/product/B093K67NVN',
    },
    {
      id: 'CP4B1',
      title: `Competitive Programming 4 - Book 1`,
      author: 'Steven Halim',
      time: '2018',
      link: 'https://www.amazon.com/gp/product/B093G64LY2',
    },
    {
      id: 'DPV',
      title: `Algorithms`,
      author: 'Sanjoy Dasgupta, Christos Papadimitriou, and Umesh Vazirani',
      time: '2006',
      link: 'https://www.amazon.com/gp/product/0073523402',
    },
    {
      id: 'AL2011_Puzzles',
      title: `Algorithmic Puzzles`,
      author: 'Anany Levitin',
      time: '2011',
      link: 'https://www.amazon.com/gp/product/0199740445',
    },
    {
      id: 'AL2011',
      title: `Introduction to the Design and Analysis of Algorithms (3rd Ed.)`,
      author: 'Anany Levitin',
      time: '2011',
      link: 'https://www.amazon.com/Introduction-Design-Analysis-Algorithms-3rd/dp/0132316811/ref=sr_1_1',
    },
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
