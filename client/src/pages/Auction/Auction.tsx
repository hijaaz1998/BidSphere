import Navbar from "../../components/user/Header/Navbar";
import LiveAuctions from "../../components/user/LiveAuctions/LiveAuctions";

const App = () => {
  return (
    <div className="h-screen">
      <div className="top-0 w-full bg-black text-white p-4 text-center">
        <Navbar />
      </div>
      <div className="bg-black h-full ">
        <LiveAuctions />
      </div>
    </div>
  );
};

export default App;
