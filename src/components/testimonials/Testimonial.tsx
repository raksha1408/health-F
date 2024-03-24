import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface StudentData {
  name: string;
  img: string;
  review: string;
}

const Testimonials: React.FC = () => {
  const data: StudentData[] = [
    {
      name: `Arjun Patel`,
      img: `https://th.bing.com/th?id=OIP.H5a5wQRrusPmE4sDoslUKgHaMG&w=195&h=319&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2`,
      review: `Physiotherapy sessions helped me recover from chronic back pain. The exercises provided were instrumental in strengthening my back. The team's expertise and support were invaluable.`,
    },
    {
      name: `Ayesha Gupta`,
      img: `https://th.bing.com/th/id/OIP.HaNd-o54kFJwDoxql_4ZAQHaJQ?rs=1&pid=ImgDetMain`,
      review: `Thanks to the comprehensive physiotherapy program, I not only recovered from my sports injury but also enhanced my performance. Personalized care made all the difference!`,
    },
    {
      name: `Neha Singh`,
      img: `https://i.pinimg.com/originals/a1/ce/6b/a1ce6b8acab1b454c2a99eb4e9c30864.jpg`,
      review: `Physiotherapy turned out to be a game-changer for my mobility as a senior. The compassionate therapists guided me through exercises, making me feel more active and independent.`,
    },
    {
      name: `Rahul Kumar`,
      img: `https://th.bing.com/th/id/OIP.MJp3QKUIQkmwXPc9lU8mTAHaLH?rs=1&pid=ImgDetMain`,
      review: `Dealing with post-surgery stiffness was challenging, but physiotherapy helped me regain my range of motion and confidence. The dedicated team played a crucial role in my recovery.`,
    },
    {
      name: `Mitali Desai`,
      img: `https://hackinitbpit.github.io/img/Shruti_Dhankar.jpg`,
      review: `Physiotherapy not only relieved my neck pain but also educated me on preventive measures as a busy professional. It's been transformative for my well-being.`,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="font-bold text-white text-center text-3xl mt-8 mb-6">
        Patient Recovery Stories
      </h2>

      <div className="mt-8">
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img src={d.img} alt={d.name} className="w-full h-64 object-cover" />
              <div className="bg-white p-6">
                <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
                <p className="text-gray-700">{d.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
