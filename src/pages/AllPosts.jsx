import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AppForm() {
  const [blog, setBlog] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image: "",
    content: "",
    category: "",
    tags: [],
    published: false,
  });

  const handleFormData = (event) => {
    if (event.target.name === "published") {
      setFormData({
        ...formData,
        published: event.target.checked,
      });
    } else if (event.target.type === "checkbox") {
      if (event.target.checked) {
        setFormData({
          ...formData,
          tags: [...formData.tags, { title: event.target.name }],
        });
      } else {
        setFormData({
          ...formData,
          tags: formData.tags.filter((tag) => tag.title !== event.target.name),
        });
      }
    } else {
      const value = event.target.value;
      setFormData({
        ...formData,
        [event.target.name]: value,
      });
    }
  };

  // CHIAMATA POST DEI POST
  function handleOnSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/posts", formData)
      .then((response) => {
        console.log(response.data);
        setBlog([...blog, response.data]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    setFormData({
      title: "",
      slug: "",
      image: "",
      content: "",
      category: "",
      tags: [],
      published: false,
    });
  }

  // CHIAMATA GET DEI POST
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="p-4 text-center">
      <div>
        <Link to="/">Home</Link>
        <h2 className="text-4xl mb-4">Add a new post</h2>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="grid">
          <input
            className="border-2 border-gray-400 p-2 mb-2"
            type="text"
            name="title"
            onChange={handleFormData}
            value={formData.title}
            id="title"
            placeholder="Title"
          />
          <input
            className="border-2 border-gray-400 p-2 mb-2"
            type="text"
            name="slug"
            onChange={handleFormData}
            value={formData.slug}
            id="slug"
            placeholder="Slug"
          />
          <input
            className="border-2 border-gray-400 p-2 mb-2"
            type="text"
            name="image"
            onChange={handleFormData}
            value={formData.image}
            id="image"
            placeholder="URL image"
          />
          <textarea
            className="border-2 border-gray-400 p-2 mb-2"
            rows="4"
            cols="50"
            name="content"
            onChange={handleFormData}
            value={formData.content}
            id="content"
            placeholder="content"
          ></textarea>
          <select
            type="select-one"
            className="border-2 border-gray-400 p-2 mb-2"
            name="category"
            onChange={handleFormData}
            value={formData.category}
            id="category"
          >
            <option value="">Select a category</option>
            <option value="sport">Sport</option>
            <option value="tech">Tech</option>
            <option value="news">News</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
          <div>
            <h3>Tags</h3>
            <label htmlFor="html">Html</label>
            <input
              checked={formData.tags.some((tag) => tag.title === "html")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="html"
              onChange={handleFormData}
              id="html"
            />
            <label htmlFor="css">Css</label>
            <input
              checked={formData.tags.some((tag) => tag.title === "css")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="css"
              onChange={handleFormData}
              id="css"
            />
            <label htmlFor="js">Js</label>
            <input
              checked={formData.tags.some((tag) => tag.title === "js")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="js"
              onChange={handleFormData}
              id="js"
            />
          </div>
          <label>Publish</label>
          <input
            checked={formData.published}
            className="border-2 border-gray-400 p-2 mb-2"
            type="checkbox"
            name="published"
            onChange={handleFormData}
          />
          <button className="border-2 border-gray-400 p-2 mb-2" type="submit">
            Submit
          </button>
        </div>
      </form>
      <h3 className="text-2xl">List of posts</h3>
      <div>
        {blog &&
          blog.map((post) => (
            <div className="mb-4" key={post.id}>
              <Link to={`/posts/${post.slug}`}>
                <h3>{post.title}</h3>
                <img src={post.image} alt={post.title} />
                <p>{post.content}</p>
                <p>
                  Category:{" "}
                  {post.category && post.category.title
                    ? post.category.title
                    : "No Category"}
                </p>
                <p>Tags:</p>
                {post.tags &&
                  post.tags.map(
                    (tag, index) =>
                      tag && (
                        <span className="mr-4" key={index}>
                          {tag.title}
                        </span>
                      )
                  )}
                <p>Published: {post.published ? "Yes" : "No"}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
