"use client";  // Add this line to make the component a Client Component
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState, useEffect } from "react";

// Define GraphQL queries and mutations
const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id){
    id
    }
  }
`;

const Books = () => {
  // Manage client-side rendering state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures that Apollo's `useQuery` only runs on the client side
  }, []);

  // GraphQL hooks
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh list after creating a book
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh list after updating
  });
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh list after deleting
  });

  // States for new book input
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  if (!isClient) {
    return <p>Loading...</p>; // Prevent SSR from trying to access React hooks
  }

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCreateBook = () => {
    createBook({ variables: { title: newTitle, author: newAuthor } });
    setNewTitle("");
    setNewAuthor("");
  };

  const handleUpdateBook = (id, title, author) => {
    updateBook({ variables: { id, title, author } });
  };

  const handleDeleteBook = (id) => {
    deleteBook({ variables: { id } });
  };

  return (
    <div>
      <h1>Books</h1>
      <div>
        <h2>Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button onClick={handleCreateBook}>Add Book</button>
      </div>

      {data.books.map((book) => (
        <div key={book.id}>
          <p>
            {book.title} by {book.author}
          </p>
         <button onClick={() => handleUpdateBook(book.id, `${book.title} updated`, `${book.author} updated`)}>Update</button>
          <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Books;
