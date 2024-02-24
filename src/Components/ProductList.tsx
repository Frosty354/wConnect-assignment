import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsAuthenticated, selectUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const userToken = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  interface User {
    color: string;
    id: number;
    name: string;
    pantone_value: string;
    year: number;
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Make an API call to get the list of products here
      fetch('https://reqres.in/api/unknown', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`, // Include the user token in the headers
          'Content-type':'application/json'
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
            
          } else {
            throw new Error('Failed to fetch products');
          }
        })
        .then((data) => {
          console.log('Product data:', data);
          setUsers(data.data)
          // Dispatch an action to store the product data in your Redux store
          // dispatch(setProducts(data)); // Create a suitable action for this
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
    else {
      navigate('/')
    }
  }, [isAuthenticated, userToken, dispatch]);

  return (
    <div>
      
      {isAuthenticated&&<>
        <h2>List of Users:</h2>
      <table>
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Pantone Value</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user:User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.color}</td>
              <td>{user.pantone_value}</td>
              <td>{user.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>}
      
    </div>
  );
};

export default ProductList;
