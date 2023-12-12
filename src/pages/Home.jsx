import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-4xl">Home</h1>
      <div>
        <Link to="/posts">All posts</Link>
      </div>
    </div>
  );
}
