import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then(result =>
      dispatch({ type: 'todos/setTodos', payload: result }),
    );
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {Array.isArray(todos) && todos.length > 0 ? (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
