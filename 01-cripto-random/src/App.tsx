import { useRandom } from './hooks/useRandoms';
import './App.css'

export const App = () => {

  const query = useRandom();

  return (
      <div>
        { query.isFetching 
          ? ( <h2>Cargando...</h2> )
            : ( <h2>Numero aleatorio: { query.data as number } </h2> )

        }
        {
          !query.isLoading && query.isError && (<h3>  { `${query.error}` } </h3>)
        }

        <button onClick={ () => query.refetch() } disabled= { query.isFetching }>
          {
            query.isFetching ? '...' : 'Nuevo numero'
          } 
        </button>
      </div>
  );
}