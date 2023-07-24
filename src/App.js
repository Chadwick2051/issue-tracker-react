import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import BugSummary from "./components/BugSummary";
import BugList from "./components/BugList";
import BugEditor from "./components/BugEditor";
import UserSummary from "./components/UserSummary";
import UserList from "./components/UserList";
import UserUpdate from "./components/UserEditor";
function App() {
  return (
    <div className='container'>
      <div className='App d-flex flex-column min-vh-100'>
        <header>Header</header>
          <main className='flex-grow-1'>
            {/* <LoginForm /> */}
            {/* <RegisterForm/> */}
            {/* <BugSummary /> */}
            {/* <BugList /> */}
            {/* <BugEditor /> */}
            {/* <UserSummary /> */}
            {/* <UserList /> */}
            <UserUpdate />
          </main>
        <footer>Footer</footer>    
      </div>
    </div>
  )
}

export default App;
