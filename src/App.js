// import logo from './logo.svg';
// import './App.css';
// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './components/firebasesetup';

// function App() {
//   const { currentUser, isLoading, fetchUserInfo } = useUserStore();

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchUserInfo(user.uid, user.email); // Update store with email
//       }
//     });
  
//     return () => {
//       unSub();
//     };
//   }, [fetchUserInfo]);
  

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
