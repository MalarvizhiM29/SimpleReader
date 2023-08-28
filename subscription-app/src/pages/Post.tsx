import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Post.css";

interface MyPost {
  _id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const MyPost = () => {
  const [myposts, setMyposts] = useState<MyPost[]>([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subscription");
      setMyposts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      {myposts.length ? (
        <div className="arti">
          {myposts.map((mypost) => (
            <div className="my-article" key={mypost._id}>
              <img className="my-img" src={mypost.imageUrl} />
              <h3 className="my-title">{mypost.title}</h3>
              <p className="my-content">{mypost.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="buy-plan">
          <div className="plan-content">You don't have access yet</div>
          <Link to="/sub-plan" className="plan-link">
            Buy a Plan
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPost;
