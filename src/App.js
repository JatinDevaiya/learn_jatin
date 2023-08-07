import "./App.css";
import LoginForm from "./loginform/LoginForm";
import Products from "./react_table/Products";
import Api from "./useFatch Hook/Api";

function App() {
  return (
    <div>
      {/* <LoginForm /> */}
      {/* <Products/> */}
      <Api/>
    </div>
  );
}

export default App;
