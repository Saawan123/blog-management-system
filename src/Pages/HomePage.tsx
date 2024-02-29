import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../Slices/PostSlice";
import { searchIcon } from "../Icons/icons";

const HomePage = () => {
  const navigate = useNavigate();
  const posts = useSelector((state: any) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(posts);
  const [postsData, setPostsData] = useState(
    posts.map((post: any) => ({
      ...post,
      isEditing: false,
      editData: { ...post },
    }))
  );

  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (!query) {
      setFilteredData(posts);
    } else {
      const filtered = posts.filter(
        (data: any) =>
          data.Title.toLowerCase().includes(query.toLowerCase()) ||
          data.Author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  const toggleEdit = (id: any) => {
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === id) {
        return { ...post, isEditing: !post.isEditing };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };
  useEffect(() => {
    // This effect ensures filteredData is updated when postsData changes
    // and applies the current search query to the updated data.
    const updatedFilteredData = postsData.filter(
      (data: any) =>
        data.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(updatedFilteredData);
  }, [postsData, searchQuery]);
  
  const handleEditChange = (id: any, field: string, value: string) => {
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === id) {
        return { ...post, editData: { ...post.editData, [field]: value } };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const saveEdit = (id: any) => {
    const updatedPosts = postsData.map((post: { ID: any; editData: any }) => {
      if (post.ID === id) {
        dispatch(editPost({ ...post.editData })); // Dispatch update action
        return { ...post, isEditing: false, ...post.editData };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };
  const deleteContentSection = (postId: any, sectionIdx: any) => {
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === postId) {
        let newContent = [...post.editData.Content];
        newContent.splice(sectionIdx, 1);
        return { ...post, editData: { ...post.editData, Content: newContent } };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const handleDelete = (postId: any) => {
    console.log("Deleting post with ID:", postId);
    const updatedPosts = postsData.filter(
      (post: { ID: any }) => post.ID !== postId
    );
    console.log("Updated posts data:", updatedPosts);
    setPostsData(updatedPosts);
  };
  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);
  return (
    <>
      {/* <h1>Blog Post Management System</h1> */}
      <div className="header relative m-8">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {searchIcon}
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title or author"
          className="block w-full p-4 ps-10 text-sm text-gray-900
           border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
               focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="text-black absolute end-2.5 bottom-2.5 bg-white
              hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
              font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
              dark:focus:ring-white"
        >
          Reset Search
        </button>
      </div>

      <div className="addButton m-3">
        <button
          className="text-black bg-white 
              hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
              font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
              dark:focus:ring-white"
          onClick={() => navigate(`/add/post`)}
          style={{ margin: "20px" }}
        >
          Add New Blog
        </button>
      </div>
      <main className="gap-6 m-8 flex flex-wrap justify-center">
        {filteredData.map((post: any) => (
          <div
            key={post.ID}
            className="shadow mt-8 w-4/5 rounded-xl p-8 transition ease-in-out delay-150 bg-[#5D5FEF]
      hover:-translate-y-1 hover:scale-110 hover:bg-[#5D5FEF] duration-300 spin 1s cursor-auto"
          >
            {post.isEditing ? (
              // Edit mode
              <div>
                <input
                  type="text"
                  value={post.editData.Title}
                  onChange={(e) =>
                    handleEditChange(post.ID, "Title", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={post.editData.Author}
                  onChange={(e) =>
                    handleEditChange(post.ID, "Author", e.target.value)
                  }
                />
                {post.editData.Content.map((content: any, idx: any) => (
                  <div key={idx}>
                    <input
                      type="text"
                      value={content.section}
                      onChange={(e) =>
                        handleEditChange(post.ID, "section", e.target.value)
                      }
                    />
                    <textarea
                      value={content.text}
                      onChange={(e) =>
                        handleEditChange(post.ID, "text", e.target.value)
                      }
                    />
                    <button onClick={() => deleteContentSection(post.ID, idx)}>
                      Delete Section
                    </button>
                  </div>
                ))}
                <button onClick={() => saveEdit(post.ID)}>Save</button>
                <button onClick={() => toggleEdit(post.ID)}>Cancel</button>
              </div>
            ) : (
              // Display mode
              <div>
                <p className="mt-2 text-white rounded-xl ">{post.Author}</p>
                <h2 className="text-2xl font-bold  text-white">{post.Title}</h2>
                <div>
                  {post.Content.map((content: any, idx: any) => (
                    <section key={idx} className=" rounded-xl gap-4 ">
                      <h5>{content.section}</h5>
                      <p>{content.text}</p>
                    </section>
                  ))}
                </div>
                <button
                  className="text-black  bg-white w-full hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
            font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
            dark:focus:ring-white"
                  onClick={() => toggleEdit(post.ID)}
                >
                  Edit
                </button>
                <button
                  className="text-black  bg-white  w-full hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
            font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
            dark:focus:ring-white"
                  onClick={() => handleDelete(post.ID)}
                >
                  Delete Blog
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
      {/* <main className="gap-6 m-8 flex flex-wrap justify-center">
        {displayedPosts.map((data: any, index: number) => (
          <div
            key={data.ID || index}
            className="shadow mt-8 w-4/5 rounded-xl p-8 transition ease-in-out delay-150 bg-[#5D5FEF]
             hover:-translate-y-1 hover:scale-110 hover:bg-[#5D5FEF] duration-300 spin 1s cursor-auto"
          >
            <p className="text-2xl font-bold  text-white">{data.Author}</p>

            <p className="mt-2 text-white rounded-xl ">{data.Title}</p>
            <div>
              {data?.Content?.map((content: any, idx: any) => (
                <section key={idx} className=" rounded-xl gap-4 ">
                  <h5>{content.section}</h5>
                  <p>{content.text}</p>
                </section>
              ))}
            </div>
            <div className=" mr-20 border-gray-800 border-solid">
              <p className="text-white font-light ">
                Date: {new Date(data.Date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className="text-black  bg-white w-full
            hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
            font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
            dark:focus:ring-white"
                onClick={() => navigate(`/edit/post/${data.ID}`)}
              >
                Edit Blog
              </button>
              <button
                className="text-black  bg-white  w-full
                 hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
                 font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
                 dark:focus:ring-white"
                onClick={() => handleDelete(data.ID)}
              >
                Delete Blog
              </button>
            </div>
          </div>
        ))}
      </main> */}
      {!showAll && (
        <div className="pagination-controls gap-6 flex justify-center">
          <button
            className="text-black bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white dark:focus:ring-white"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        </div>
      )}
      <div
        className="footer flex justify-center w-full font-bold text-3xl p-4 ps-10 text-sm text-gray-900
           border border-gray-300  bg-gray-50 focus:ring-blue-500
               focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        OS Blogs
      </div>
    </>
  );
};

export default HomePage;
