import userThumb1 from '../images/user-img1.png'
import userThumb2 from '../images/user-img2.png'
import countImage1 from '../images/counter-icon1.svg'
import countImage2 from '../images/counter-icon2.svg'
import countImage3 from '../images/counter-icon3.svg'
import countImage4 from '../images/counter-icon4.svg'

import blogThumb1 from '../images/blog1.png'; 
import blogThumb2 from '../images/blog2.png'; 
import blogThumb3 from '../images/blog3.png'; 
import blogThumb4 from '../images/property-4.png'; 
import blogThumb5 from '../images/property-5.png'; 
import blogThumb6 from '../images/property-6.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faMapMarkedAlt, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';


const homeList=[
    {
        "id": "1",
        "name": "Rawat House",
        "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "areaName": "66 Broklyant, New York America",
        "Price":"400",
        "avgRating": 4.4,
        "Bedrooms" : 2,
        "Bathrooms" :2,
        "Area" : "Turning Dreams into Addresses Home State"

    },
    {
      "id": "2",
      "name": "Rawat House",
      "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "areaName": "66 Broklyant, New York America",
      "Price":"400",
      "avgRating": 4.4,
      "Bedrooms" : 2,
      "Bathrooms" :2,
      "Area" : "Turning Dreams into Addresses Home State"

    },
    {
    "id": "3",
    "name": "Rawat House",
        "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "areaName": "66 Broklyant, New York America",
        "Price":"400",
        "avgRating": 4.4,
        "Bedrooms" : 2,
        "Bathrooms" :2,
        "Area" : "Turning Dreams into Addresses Home State"

    },
    {
    "id": "4",
    "name": "Rawat House",
        "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "areaName": "66 Broklyant, New York America",
        "Price":"400",
        "avgRating": 4.4,
        "Bedrooms" : 2,
        "Bathrooms" :2,
        "Area" : "Turning Dreams into Addresses Home State"

    },
    {
    "id": "5",
    "name": "Rawat House",
    "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "areaName": "66 Broklyant, New York America",
    "Price":"400",
    "avgRating": 4.4,
    "Bedrooms" : 2,
    "Bathrooms" :2,
    "Area" : "Turning Dreams into Addresses Home State"

    },
    {
    "id": "6",
    "name": "Rawat House",
    "ImageLink": "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "areaName": "66 Broklyant, New York America",
    "Price":"400",
    "avgRating": 4.4,
    "Bedrooms" : 2,
    "Bathrooms" :2,
    "Area" : "Turning Dreams into Addresses Home State"

    }
  
]  

// const reviewList=[
//   {
//     "id":"1",
//     "name":"Prashant Baghel",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"2",
//     "name":"Shruti Mehta ",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"3",
//     "name":"Narayn Pratap",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"4",
//     "name":"Raghav Sharma",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"5",
//     "name":"Prashant",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"6",
//     "name":"Prashant",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"7",
//     "name":"Prashant",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   },
//   {
//     "id":"8",
//     "name":"Prashant",
//     "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam beatae maxime dolorem quas dignissimos fugit vero placeat sit veritatis harum"
//   }
// ]


const testimonialData = [
  {
      image: userThumb1,
      name: 'Robert Fox',
      designation: 'Prime Investments',
      desc: 'I couldnot be happier with the service I received from EstateXchange. The team was incredibly knowledgeable and guided me through every step of the home buying process. Thanks to their expertise, I found my dream home in no time!"',
  },
  {
      image: userThumb2,
      name: 'John Doe',
      designation: 'Money Investments',
      desc: 'I highly recommend EstateXchange to anyone in search of their perfect property. Their team will guide you to your exact needs and I am sure you will satisfy from them.',
  },
]


const aboutCheckLists = [
  {
      icon: <i className="fas fa-check"></i>,
      text: 'Investment opportunities'
  },
  {
      icon: <i className="fas fa-check"></i>,
      text: ' Trusted '
  },
  {
      icon: <i className="fas fa-check"></i>,
      text: 'Secure Property Partners'
  },
  {
      icon: <i className="fas fa-check"></i>,
      text: 'Best Prices'
  },
]

 const counterThreeContents = [ 
  {
      icon: countImage1,
      number: '800+',
      text: 'Happy Client'
  },
  {
      icon: countImage2,
      number: '440+',
      text: 'Project done'
  },
  {
      icon: countImage3,
      number: '500k',
      text: 'Employees'
  },
  {
      icon: countImage4,
      number: '80+',
      text: 'Award winning'
  }
]

 const faqs = [
  {
      id: 1,
      btnText: 'How do I determine the right time to buy or sell a property?',
      bodyText: "The right time to buy or sell depends on various factors such as market conditions, personal finances, and life circumstances. Consulting with a real estate agent can provide valuable insights tailored to your specific situation."
  },
  {
      id: 2,
      btnText: 'What should I look for when choosing a real estate agent?',
      bodyText: "When selecting a real estate agent, consider factors such as experience, expertise in your desired area, communication skills, and client testimonials. It's essential to find an agent who understands your needs and has a proven track record of success like ours."
  },
  {
      id: 3,
      btnText: 'How can I improve the chances of selling my home quickly?',
      bodyText: "To increase the likelihood of selling your home quickly, consider factors such as pricing it competitively, staging it effectively, enhancing curb appeal, and marketing it across various channels. Working with a skilled real estate agent can also streamline the selling process."
  },
  {
      id: 4,
      btnText: 'What are closing costs, and who is responsible for paying them?',
      bodyText: "Closing costs are fees associated with finalizing a real estate transaction and typically include expenses such as title insurance, appraisal fees, attorney fees, and taxes. The responsibility for paying closing costs can vary depending on the terms negotiated in the purchase agreement, but it's common for both buyers and sellers to share these costs."
  },
  {
      id: 5,
      btnText: 'What factors should I consider when choosing a neighborhood to buy a home?',
      bodyText: "When selecting a neighborhood, factors to consider include proximity to schools, amenities, transportation, safety, property values, future development plans, and overall community atmosphere. It's essential to prioritize aspects that align with your lifestyle and preferences."
  }
]

const blogs = [
  {
      id: 1,
      thumb: blogThumb1,
      admin: 'By Stanio lainto',
      meta: [
          {
              icon: <FontAwesomeIcon icon={faUser} color="orange"/>,
              text: ' By admin'
          },
          {
              icon: <FontAwesomeIcon icon={faComment} color="orange"/>,
              text: 'Comments (30)'
          },
      ],
      title: 'Discover Endless Possibilities in Real Estate Live Your Best Life in a ',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
  {
      id: 2,
      thumb: blogThumb2,
      date: '28 Mar',
      admin: 'By John Doe',
      meta: [
        {
            icon: <FontAwesomeIcon icon={faUser} color="orange" />,
            text: ' By admin'
        },
        {
            icon: <FontAwesomeIcon icon={faComment} color="orange" />,
            text: 'Comments (30)'
        }
    ],
      title: 'Turn Your Real Estate Dreams Into Reality Embrace the Real Estate ',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
  {
      id: 3,
      thumb: blogThumb3,
      admin: 'By Rakibul Islam',
      meta: [
        {
            icon: <FontAwesomeIcon icon={faUser} color="orange" />,
            text: ' By admin'
        },
        {
            icon: <FontAwesomeIcon icon={faComment} color="orange" />,
            text: 'Comments (30)'
        }
    ],
      title: 'Your journey to home ownership starts a here the satisfaction',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
  {
      id: 4,
      thumb: blogThumb4,
      admin: 'By Alex',
      meta: [
          {
              icon: <i className="fas fa-user"></i>,
              text: ' By admin'
          },
          {
              icon: <i className="fas fa-comments"></i>,
              text: 'Comments (10)'
          },
      ],
      title: 'Experience the best in real estate services a here the satisfaction',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
  {
      id: 5,
      thumb: blogThumb5,
      admin: 'By Jenon Doe',
      meta: [
          {
              icon: <i className="fas fa-user"></i>,
              text: ' By admin'
          },
          {
              icon: <i className="fas fa-comments"></i>,
              text: 'Comments (10)'
          },
      ],
      title: 'Let us find the perfect property for you Elite Realty Services',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
  {
      id: 6,
      thumb: blogThumb6,
      admin: 'By Akramul Hoq',
      meta: [
          {
              icon: <i className="fas fa-user"></i>,
              text: ' By admin'
          },
          {
              icon: <i className="fas fa-comments"></i>,
              text: 'Comments (10)'
          },
      ],
      title: 'Investing in real estate made easy the door to your new home',
      desc: 'Real estate is a lucrative industry that involves the buying, selling, and renting properties. It encompasses residential, commercial, and industrial properties. Real estate is a lucrative industry that involves the buying selling and renting properties It encompasses residential commercial and industrial properties. Real estate agents play a crucial role in facilitating transactions and helping',
      linkText: 'Read More',
  },
]

 const accountTabs = [
    {
        icon: <FontAwesomeIcon icon={faHome} />,
        text: 'Home '
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        text: ' Profile'
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        text: ' Account Details'
    },
    {
        icon: <FontAwesomeIcon icon={faList} />,
        text: ' My Properties'
    },
    {
        icon: <FontAwesomeIcon icon={faMapMarkedAlt} />,
        text: ' Add Property'
    }
]

//  const featureLists = [
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'Dream Property Solutions'
//     },
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'Prestige Property Management'
//     },
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'Secure Property Partners'
//     },
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'Global Real Estate Investments'
//     },
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'Doors to Your Future'
//     },
//     {
//         icon: <FaCheck
//         className='bg-orange-500 rounded-full'
//         style={{ padding: '3px', color: 'white' }}
//         />,
//         text: 'You Home with Experience'
//     },
// ]

//  const propertyDetailsAmenities = [ 
//     {
//         icon: amenitiesIcon1,
//         text: "Furnishing", 
//         title:"furnishing",
//     },
//     {
//         icon: amenitiesIcon2,
//         text: "BHK", 
//          title:"bhk"
//     },
//     {
//         icon: amenitiesIcon3,
//         text: "Parking",  
//         title:"parking"
//     },
//     {
//         icon: amenitiesIcon4,
//         text: "Space", 
//         title: "3 Space"  
//     },
//     {
//         icon: amenitiesIcon5,
//         text: "Size", 
//         title: "1020 sqft"  
//     },
//     {
//         icon: amenitiesIcon6,
//         text: " Property Type ", 
//         title: "Apartment"  
//     },
// ]
export {testimonialData,homeList,aboutCheckLists,counterThreeContents,faqs, blogs,accountTabs};
