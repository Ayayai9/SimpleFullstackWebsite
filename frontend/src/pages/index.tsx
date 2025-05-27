import UserList from "@/components/UserList";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="flex pt-20 pb-16 min-h-screen">
        <div className="w-1/4">
          <Navigation />
        </div>
        <div className="w-3/4">
          <UserList />
        </div>
      </div>
      <Footer />
    </div>
  );
}