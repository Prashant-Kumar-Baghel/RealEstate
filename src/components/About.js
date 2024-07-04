import { ABOUT_IMG_URL, ABOUT_URL } from "../utils/constants";
const About=()=>{
    return(<>
        <h1 className="text-center font-bold text-[2rem] bg-cover bg-no-repeat bg-center h-[20vh] text-white py-10 mt-[4rem] md:mt-[6rem]" style={{ backgroundImage: `url(${ABOUT_IMG_URL})` }}>ABOUT US</h1>
        <div className="max-w-[1180px] mx-auto px-[20px] overflow-hidden my-[5vh] flex-wrap">
            <div className="flex gap-[40px] md:items-start flex-col-reverse md:flex-row w-[100%]">
                <div className="md:w-[calc(45%-20px)] w-[100%] ">
                    <h2 className="text-orange-600 text-[2rem] md:text-[3rem] mb-2 text"><b>Welcome To</b> Company</h2>
                    <p className="text-justify md:text-[1.2rem]">At EstateXchange, we're dedicated to revolutionizing your real estate experience in the vibrant Tricity area, encompassing Chandigarh, Zirakpur, Mohali, and Panchkula. Whether you're buying, selling, or renting, we're here to make the process seamless and rewarding. Our commitment to excellence, paired with cutting-edge technology, ensures that your journey in the real estate market is nothing short of exceptional.</p>
                </div>
                <div className="md:w-[calc(55%-20px)] w-[100%]">
                    <img className="w-[100%] h-[40vh] border-green-500" src={ABOUT_URL} alt="" />
                </div>
            </div>
            <div className="flex gap-[10px] items-start flex-col mt-[4.5rem]">
                <h3 className="text-orange-600 text-[1.5rem] md:text-[2.5rem] mb-2">Who We Are</h3>
                <p className="text-justify md:text-[1.2rem]">EstateXchange is more than just a real estate agency; we're your trusted partners in navigating the dynamic world of property transactions in the Tricity region. With years of industry expertise under our belt, we've cultivated a team of passionate professionals who are ready to guide you every step of the way. Our comprehensive knowledge of local markets, combined with a global outlook, empowers us to offer tailored solutions that meet your unique needs.</p>
            </div>
            <div className="flex gap-[10px] items-start flex-col mt-[3rem]">
                <h3 className="text-orange-600 text-[1.5rem] md:text-[2.5rem] mb-2">What We Do</h3>
                <p className="text-justify md:text-[1.2rem]">Whether you're in the market to buy, sell, or rent in Chandigarh, Zirakpur, Mohali, or Panchkula, EstateXchange has you covered. We specialize in residential and commercial properties, ensuring that you find the perfect space to call home or establish your business in these thriving locations. From luxurious estates to cozy apartments, we have an extensive portfolio to cater to diverse preferences and budgets. Our commitment to transparency and integrity means you can trust us to negotiate the best deals on your behalf.</p>
            </div>

            <div className="flex gap-[10px] items-start flex-col mt-[3rem]">
                <h3 className="text-orange-600 text-[1.5rem] md:text-[2.5rem] mb-2">Why Choose Us</h3>
                <p className="text-justify md:text-[1.2rem]">Choosing EstateXchange means choosing excellence in the Tricity area. Here's why we stand out:</p>

                <ul>
                    <li className="text-[1.2rem]"><b>1. Personalized Service: </b>We believe in building relationships, not just transactions. Our dedicated agents take the time to understand your goals and preferences, offering tailored solutions that exceed your expectations.</li>
                    <li className="text-[1.2rem]"><b>2. Innovative Technology: </b>We leverage the latest technology to streamline the buying, selling, and renting process in Chandigarh, Zirakpur, Mohali, and Panchkula. From virtual tours to advanced analytics, we provide tools that empower you to make informed decisions.</li>
                    <li className="text-[1.2rem]"><b>3. Market Expertise: </b>With a finger on the pulse of the real estate market in the Tricity area, we offer valuable insights and strategic advice to help you navigate market fluctuations and capitalize on opportunities.</li>
                    <li className="text-[1.2rem]"><b>4. Customer Satisfaction: </b>Your satisfaction is our top priority. We're committed to delivering unparalleled service that leaves a lasting impression, earning your trust and loyalty for years to come.</li>
                </ul>
            </div>
            
            <div className="flex gap-[10px] items-start flex-col mt-[3rem]">
                <h3 className="text-orange-600 text-[1.5rem] md:text-[2.5rem] mb-2">Get in Touch</h3>
                <p className="text-justify md:text-[1.2rem]">Ready to embark on your real estate journey in Tricity? Contact EstateXchange today to experience the difference. Whether you're a first-time buyer, seasoned investor, or property owner looking to sell or rent, we're here to turn your dreams into reality. Let's make your real estate aspirations a success with EstateXchange in the vibrant Tricity area.</p>
            </div>
        </div>
        <div className="mt-[10vh]">
                <h2 className="text-orange-600 text-[2rem] mb-4 text-center md:text-[3rem]">Our <b>Company</b> Locations</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.698682412772!2d76.68857587503625!3d30.69875288727499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffaea0e29d5%3A0x1fa5fa633af789af!2sGSPL%20Tower!5e0!3m2!1sen!2sin!4v1704200629015!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="google map"></iframe>
        </div>
        </>
    )
}
export default About ;

