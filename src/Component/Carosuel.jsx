import { useEffect } from "react";
import { getData } from "../Context/DataContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Category from "./Category";
import { Link } from "react-router-dom";

const Carosuel = () => {
  const { Data, fetchAllProducts } = getData();
  

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (slider?.track?.details) {
              slider.next();
            }
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );

  return (
    <div>
      <div ref={sliderRef} className="keen-slider">
        {Data?.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="keen-slider__slide bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#f1fafe] flex items-center min-h-screen px-6"
          >
            <div className="space-y-3 md:space-y-6 max-w-xl">
              <h3 className="text-red-500 font-semibold text-sm">
                Powering Your World with the Best in Products
              </h3>

              <h1 className="text-xl md:text-4xl font-bold uppercase text-white">
                {item.title}
              </h1>
              <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                {item.description}
              </p>
              <Link to={"/Product"}>
                <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">
                  Shop Now
                </button>
              </Link>
            </div>
            <div>
              <img
                src={item.images}
                alt={item.title}
                className="rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
              />
            </div>
          </div>
        ))}
      </div>
      <Category />
    </div>
  );
};

export default Carosuel;
