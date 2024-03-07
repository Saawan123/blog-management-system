import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../Slices/PostSlice";
import {
  commentIcon,
  deleteIcon,
  editIcon,
  likeRedIcon,
  likeWhiteIcon,
  searchIcon,
} from "../Icons/icons";
import Comments from "../Components/Comments";
import ModalShow from "../Components/ModalShow";
import LoginPage from "./LoginPage";
import ToastifyShow from "../Components/ToastifyShow";

const HomePage = () => {
  const navigate = useNavigate();
  const posts = useSelector((state: any) => state.posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(posts);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showComments, setShowComments]: any = useState({});
  const initialPostsToShow = 4;
  const [currentDisplayLimit, setCurrentDisplayLimit] =
    useState(initialPostsToShow);
  const visiblePosts = filteredData.slice(0, currentDisplayLimit);
  const [postsData, setPostsData] = useState(
    posts?.map((post: any) => ({
      ...post,
      isEditing: false,
      editData: { ...post },
      liked: false,
    }))
  );
  const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36)}`;
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
  const handleShowMore = () => {
    setCurrentDisplayLimit((prevLimit) => prevLimit + initialPostsToShow);
  };
  const toggleComments = (postId: any) => {
    // if (!isLoggedIn) {
    //   ToastifyShow("Please log in to perform this action.", "error");

    //   setShowModal(false);
    //   setShowLoginModal(true);
    //   return;
    // }
    setShowComments((prevShowComments: any) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }));
  };

  const toggleEdit = (id: any) => {
    if (!isLoggedIn) {
      ToastifyShow("Please log in to perform this action.", "error");
      setShowModal(false);
      setShowLoginModal(true);
      return;
    }
    const updatedPosts = postsData?.map((post: any) => {
      if (post.ID === id) {
        return { ...post, isEditing: !post.isEditing };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };
  useEffect(() => {
    const updatedFilteredData = postsData.filter(
      (data: any) =>
        data.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.Author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(updatedFilteredData);
  }, [postsData, searchQuery]);

  // const handleEditChange = (id: any, field: string, value: string) => {
  //   const updatedPosts = postsData?.map((post: any) => {
  //     if (post.ID === id) {
  //       return { ...post, editData: { ...post.editData, [field]: value } };
  //     }
  //     return post;
  //   });
  //   setPostsData(updatedPosts);
  // };
  const handleEditChange = (
    postId: string,
    idx: number | null,
    field: string,
    value: string
  ) => {
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === postId) {
        // Check if idx is null, meaning the update is for fields outside of Content array
        if (idx === null) {
          return { ...post, editData: { ...post.editData, [field]: value } };
        } else {
          // Handling for Content array updates
          const newContent = post.editData?.Content
            ? [...post.editData.Content]
            : [...post.Content];
          if (newContent[idx]) {
            newContent[idx] = { ...newContent[idx], [field]: value };
          }
          return {
            ...post,
            editData: { ...post.editData, Content: newContent },
          };
        }
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const saveEdit = (id: any) => {
    const updatedPosts = postsData.map((post: { ID: any; editData: any }) => {
      if (post.ID === id) {
        dispatch(editPost({ ...post.editData }));
        return { ...post, isEditing: false, ...post.editData };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const addNewSection = (postId: any) => {
    const newSection = { section: "", text: "" };
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === postId) {
        return {
          ...post,
          editData: {
            ...post.editData,
            Content: [...post.editData.Content, newSection],
          },
        };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const deleteContentSection = (postId: any, sectionIdx: any) => {
    const updatedPosts = postsData?.map((post: any) => {
      if (post.ID === postId) {
        let newContent = [...post.editData.Content];
        newContent.splice(sectionIdx, 1);
        return { ...post, editData: { ...post.editData, Content: newContent } };
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const handleLike = (id: any) => {
    // if (!isLoggedIn) {
    //   ToastifyShow("Please log in to perform this action.", "error");

    //   setShowModal(false);
    //   setShowLoginModal(true);
    //   return;
    // }
    const updatedPosts = postsData.map((post: any) => {
      if (post.ID === id) {
        if (post.liked) {
          return { ...post, Likes: post.Likes - 1, liked: false };
        } else {
          return { ...post, Likes: post.Likes + 1, liked: true };
        }
      }
      return post;
    });
    setPostsData(updatedPosts);
  };

  const addReplyToComment = (postId: any, commentId: any, replyText: any) => {
    const updatedPosts = postsData?.map((post: any) => {
      if (post?.ID === postId) {
        const updatedComments = addReplyToCommentHelper(
          post.comments,
          commentId,
          replyText
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPostsData(updatedPosts);
  };

  const addReplyToCommentHelper = (
    comments: any,
    commentId: any,
    replyText: any
  ) => {
    return comments?.map((comment: any) => {
      if (comment.ID === commentId) {
        const newReply = {
          id: generateUniqueId(),
          text: replyText,
          replies: [],
        };
        const updatedReplies = [...comment.Replies, newReply];
        return { ...comment, replies: updatedReplies };
      } else if (comment.Replies) {
        const updatedReplies = addReplyToCommentHelper(
          comment.Replies,
          commentId,
          replyText
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
  };
  const handleClose = () => {
    setShowModal(false);
    setShowLoginModal(false);
  };

  const handleDelete = () => {
    if (postIdToDelete === null) return;

    const updatedPosts = postsData.filter(
      (post: any) => post.ID !== postIdToDelete
    );
    setPostsData(updatedPosts);
    setShowModal(false);
    setPostIdToDelete(null);
    ToastifyShow("Blog Deleted Successfully", "success");
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    ToastifyShow("Logged Out Successfully", "success");
  };
  useEffect(() => {
    setFilteredData(posts);
  }, [posts]);
  return (
    <>
      <p className="font-bold text-6xl text-white flex flex-wrap justify-center mt-2">
        Blog Management System
      </p>
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

      <div className="addButton m-3 flex justify-between">
        <button
          className="text-black bg-white 
        hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
        font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg-white 
        dark:focus:ring-white"
          onClick={() => {
            if (!isLoggedIn) {
              ToastifyShow("Please log in to perform this action.", "error");

              setShowModal(false);
              setShowLoginModal(true);
              return;
            }
            navigate(`/add/post`);
          }}
          style={{ margin: "20px" }}
        >
          Add New Blog
        </button>

        {isLoggedIn ? (
          <button
            className="text-black bg-white 
          hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
          font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg:white 
          dark:focus:ring-white"
            onClick={handleLogout}
            style={{ margin: "20px" }}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-black bg-white 
          hover:bg-white focus:ring-4 focus:outline-none focus:ring-white 
          font-medium rounded-lg text-sm px-4 py-2 dark:bg-white dark:hover:bg:white 
          dark:focus:ring-white"
            onClick={() => {
              setShowLoginModal(true);
            }}
            style={{ margin: "20px" }}
          >
            Login
          </button>
        )}

        {showLoginModal && (
          <ModalShow
            handleView={showLoginModal}
            className="bg-primary"
            handleApi={handleLogin}
            size="sm"
            handleClose={() => setShowLoginModal(false)}
            title="Login"
            title1={<LoginPage onLoginSuccess={handleLogin} />}
          />
        )}
      </div>

      <main className="gap-6 m-8 justify-center">
        {visiblePosts?.map((post: any, idx: any) => (
          <div
            key={post.ID}
            className="w-3/4 mx-auto rounded-lg overflow-hidden m-4 bg-white "
          >
            {post.isEditing ? (
              <div className="space-y-4 p-4">
                <input
                  type="text"
                  value={post?.editData?.Title}
                  onChange={(e: any) =>
                    handleEditChange(post.ID, null, "Title", e.target.value)
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={post.editData.Author}
                  onChange={(e: any) =>
                    handleEditChange(post.ID, null, "Author", e.target.value)
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Author"
                />
                {post?.editData?.Content?.map((content: any, idx: any) => (
                  <div key={idx} className="space-y-2">
                    <input
                      value={content?.section}
                      onChange={(e) =>
                        handleEditChange(
                          post.ID,
                          idx,
                          "section",
                          e.target.value
                        )
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Section Title"
                    />
                    <textarea
                      value={content.text}
                      onChange={(e) =>
                        handleEditChange(post.ID, idx, "text", e.target.value)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Content"
                      rows={4}
                    />
                    <button
                      onClick={() => deleteContentSection(post.ID, idx)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete Section
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addNewSection(post.ID)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Add New Section
                </button>
                <div className="flex justify-between">
                  <button
                    onClick={() => saveEdit(post.ID)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => toggleEdit(post.ID)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <p className="text-gray-900 text-lg">{post.Author}</p>
                <h2 className="text-gray-800 text-xl font-bold">
                  {post.Title}
                </h2>
                {post.Content.map((content: any, idx: any) => (
                  <section key={idx} className="mt-2">
                    <h5 className="text-gray-900 font-bold">
                      {content.section}
                    </h5>
                    <p className="text-gray-600">{content.text}</p>
                  </section>
                ))}
                <div className="flex justify-between mt-4">
                  <button onClick={() => toggleEdit(post.ID)}>
                    {editIcon}
                  </button>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        ToastifyShow(
                          "Please log in to perform this action.",
                          "error"
                        );

                        setShowModal(false);
                        setShowLoginModal(true);
                        return;
                      }
                      setShowModal(true);
                      setPostIdToDelete(post.ID);
                    }}
                  >
                    {deleteIcon}
                  </button>
                </div>
                {showModal && (
                  <ModalShow
                    handleView={showModal}
                    handleApi={() => handleDelete()}
                    size="sm"
                    handleClose={handleClose}
                    title="Delete Your Blog"
                    title1={"Are You Sure You Want To Delete Blog?"}
                    title2="Confirm"
                    cancelBtn="Cancel"
                  />
                )}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleLike(post.ID)}
                className="p-4 flex items-center"
              >
                {post.liked ? likeRedIcon : likeWhiteIcon}
                <span className="ml-2">{post.Likes} Likes</span>
              </button>
              <div onClick={() => toggleComments(post?.ID)} className="p-4">
                {commentIcon}
              </div>
            </div>
            {showComments[post?.ID] && (
              <div className="p-4">
                {posts.map((post: any) => (
                  <div className="p-4">
                    {post?.Comments?.map((comment: any) => (
                      <Comments
                        key={comment.ID}
                        comment={comment}
                        onReply={(commentId: any, replyText: any) =>
                          addReplyToComment(post.ID, commentId, replyText)
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>

      {currentDisplayLimit < filteredData.length && (
        <div className="show-more-btn flex justify-center m-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-white transition-colors duration-300"
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
