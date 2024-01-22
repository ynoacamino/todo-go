import { Link } from 'react-router-dom';
import LayoutGlobal from './layouts/LayoutGlobal';
import todos from './assets/images/todos.png';

function App() {
  return (
    <LayoutGlobal>
      <div className="w-full flex flex-col items-center justify-start gap-10 my-20">
        <img src={todos} alt="todos" className="w-full max-w-xs" />
        <h1 className="text-6xl font-semibold">
          Todo created with Go and React
        </h1>
        <Link to="/withOutCount" className="py-3 px-6 bg-purple-700 rounded-md hover:bg-purple-600 text-2xl font-semibold">
          Cotinue with out count
        </Link>
      </div>
    </LayoutGlobal>
  );
}

export default App;
